import {inject} from 'aurelia-framework';
import {Router, RouterConfiguration} from 'aurelia-router';
import {CompositionEngine} from 'aurelia-templating';
import {relativeToFile} from 'aurelia-path';
import {Origin} from 'aurelia-metadata';

/**
 * https://gist.github.com/tdamir/34861b86c015e3fb5c0e25d477b11bbb
 *
 * Usage:
 *  app.ts
 *    async attached(params, routeConfig, navigationInstruction) {
 *      await this.routeGenerator.configure(this.router);
 *    }
 *
 *  page.ts
 *
 *  let url = routeGeneratorService.generate([{ route: 'products', params: { id: 1 } }, { route: 'top', params: { top: 100 } } ])
 *  // url should be 'products/1/top/100'
 *
 */
@inject(CompositionEngine)
export class RouteGeneratorService {
    private _isConfigured: boolean = false;
    private _routers: Router[] = [];

    constructor(private compositionEngine: CompositionEngine) {
    }

    public async configure(router: Router) {
        this._routers.push(router);
        let childRouters = await this.getChildRouters(router);
        this._routers.push(...childRouters);
        this._isConfigured = true;
    }

    private async getChildRouters(router: Router): Promise<Array<Router>> {
        let routers: Array<Router> = [];

        for (let i = 0; i < router.navigation.length; i++) {
            let navModel = router.navigation[i];

            if (navModel.config.moduleId) {
                const childContainer = router.container.createChild();
                let context: any = {
                    viewModel: relativeToFile(navModel.config.moduleId, Origin.get((<any>router.container).viewModel.constructor).moduleId),
                    container: router.container,
                    childContainer: childContainer,
                    view: (<any>navModel.config).view || (<any>navModel.config).viewStrategy
                };

                context = await this.compositionEngine.ensureViewModel(context);
                if ('configureRouter' in context.viewModel) {
                    const childRouter = new Router(childContainer, router.history);
                    const childConfig = new RouterConfiguration();

                    context.viewModel.configureRouter(childConfig, childRouter);
                    childConfig.exportToRouter(childRouter);

                    routers.push(childRouter);

                    let childRouters = await this.getChildRouters(childRouter);
                    routers.push(...childRouters);
                }
            }
        }

        return routers;
    }

    public generate(routes: [{ routeName: string, params?: any, options?: any }]): string {
        if (!this._isConfigured)
            return '';

        return routes.map(route => {
            return this._generate(route.routeName, route.params, route.options).replace('#', '');
        }).join('');
    }

    private _generate(routeName: string, params?: any, options?: any): string {
        if (!this._isConfigured)
            return '';

        let url: string = '';
        for (let i = 0; i < this._routers.length; i++) {
            let router = this._routers[i];

            if (router.hasRoute(routeName)) {
                url = router.generate(routeName, params, options);
                break;
            }
        }

        return url;
    }
}