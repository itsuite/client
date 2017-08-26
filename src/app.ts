import {autoinject, computedFrom} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {RouteMapper} from 'aurelia-route-mapper';
import {RouterConfiguration, Router, RouteConfig, NavigationInstruction} from "aurelia-router";

import {DrawerItems} from "src/shared/core/nav-items/drawer-items";
import {RouteLink} from "src/shared/core/route-link";
import {DrawerLink} from "src/shared/core/nav-items/drawer-link";
import {ModuleManager} from "src/module-manager/module-manager";


@autoinject()
export class App {

    public router: Router;

    public constructor(
        private moduleManager: ModuleManager,
        private routeMapper: RouteMapper,
        private ea: EventAggregator,
        private drawerItems: DrawerItems
    ) {

        this.moduleManager = moduleManager;
        this.routeMapper = routeMapper;

        this.ea.subscribe('router:navigation:success', route => {
            this.instructionChanged(route.instruction);
        });
    }

    get moduleDescription() {
        return this.moduleManager.current;
    }

    get navigation() {
        return this.drawerItems.items;
    }


    /**
     * Returns a list of all modules used for the app switcher component.
     *
     * @returns {Array<{name: string; route: RouteLink}>}
     */
    @computedFrom('moduleManager.modules')
    get moduleList(): Array<{name: string, route: RouteLink}> {

        let list = [];

        for (let module of this.moduleManager.modules) {

            let link: RouteLink = {name: module.id};

            list.push({
                name: module.name,
                route: link
            });
        }

        return list;
    }


    /**
     * Navigate to a route.
     *
     * @param {RouteLink} route
     */
    public navigate(route: RouteLink) {
        this.router.navigateToRoute(route.name, route.params);
    }

    public configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'IT Suite';
        config.options.pushState = true;

        let map: RouteConfig[] = [];
        for (let module of this.moduleManager.modules) {
            map.push(...module.routes);
        }

        config.map(map);
        this.routeMapper.map(map);

        this.router = router;
    }

    /**
     * Switches to a different module.
     * @param {ModuleDescription} module
     */
    public switchModule(module: ModuleDescription) {
        this.moduleManager.current = module;

        // Drawer contents need to be set before the event is dispatched so they can be overwritten by the app if required
        this.drawerItems.items = this.createNavFromModule(module);

        // broadcast the module change
        this.ea.publish('suite:module:change', {module});
    }

    private instructionChanged(instruction: NavigationInstruction) {
        let moduleId = instruction.config.moduleId;

        for (let module of this.moduleManager.modules) {
            if (module.routeConfig.moduleId == moduleId && module != this.moduleManager.current) {
                this.switchModule(module);
            }
        }

        this.findActiveNavigationFromInstruction(instruction);
    }

    /**
     * Creates navigation data from a specific module.
     *
     * @param {ModuleDescription} module
     * @returns {DrawerLink[]}
     */
    public createNavFromModule(module: ModuleDescription): DrawerLink[] {

        return module.routeConfig.settings.childRoutes.reduce((items: DrawerLink[], route) => {
            if (route.title) {
                items.push({
                    title: route.title,
                    icon: route.icon,
                    route: {
                        name: module.routeConfig.name + '/' + route.name
                    },
                });
            }

            return items;
        }, []);
    }

    public findActiveNavigationFromInstruction(instruction: NavigationInstruction) {
        console.log(instruction);
    }
}
