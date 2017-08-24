import {autoinject, computedFrom} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {RouteMapper} from 'aurelia-route-mapper';
import {RouterConfiguration, Router, RouteConfig, NavigationInstruction} from "aurelia-router";

import {ModuleContainer} from './module-manager/module-container';

import {description as dashboard} from "src/modules/dashboard/description";
import {description as components} from "src/modules/components/description";
import {description as taskboard} from "src/modules/taskboard/description";
import {DrawerItems} from "src/shared/core/nav-items/drawer-items";
import {RouteLink} from "src/shared/core/route-link";
import {ModuleDescription} from "./module-manager/module-description";
import {DrawerLink} from "src/shared/core/nav-items/drawer-link";


@autoinject()
export class App {

    public router: Router;

    public constructor(
        private moduleContainer: ModuleContainer,
        private routeMapper: RouteMapper,
        private ea: EventAggregator,
        private drawerItems: DrawerItems
    ) {

        this.moduleContainer = moduleContainer;
        this.routeMapper = routeMapper;

        this.ea.subscribe('router:navigation:success', route => {
            this.instructionChanged(route.instruction);
        });

        // enable modules here
        this
            .add(dashboard)
            .add(components)
            .add(taskboard);
    }

    get moduleDescription() {
        return this.moduleContainer.current;
    }

    get navigation() {
        return this.drawerItems.items;
    }


    /**
     * Returns a list of all modules used for the app switcher component.
     *
     * @returns {Array<{name: string; route: RouteLink}>}
     */
    @computedFrom('moduleContainer.modules')
    get moduleList(): Array<{name: string, route: RouteLink}> {

        let list = [];

        for (let module of this.moduleContainer.modules) {

            let link: RouteLink = {name: module.routeConfig.name};

            list.push({
                name: module.title,
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

    /**
     * Activate a module
     *
     * @param {ModuleDescription} moduleDescription
     * @returns {this}
     */
    public add(moduleDescription: ModuleDescription): this {
        this.moduleContainer.modules.push(moduleDescription);
        return this;
    }

    public configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'IT Suite';
        config.options.pushState = true;

        let map: RouteConfig[] = [];
        for (let module of this.moduleContainer.modules) {
            map.push(module.routeConfig);
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
        this.moduleContainer.current = module;

        // Drawer contents need to be set before the event is dispatched so they can be overwritten by the app if required
        this.drawerItems.items = this.createNavFromModule(module);

        // broadcast the module change
        this.ea.publish('suite:module:change', {module});
    }

    private instructionChanged(instruction: NavigationInstruction) {
        let moduleId = instruction.config.moduleId;

        for (let module of this.moduleContainer.modules) {
            if (module.routeConfig.moduleId == moduleId && module != this.moduleContainer.current) {
                this.switchModule(module);
            }
        }
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
}
