import {RouterConfiguration, Router, RouteConfig, NavigationInstruction} from "aurelia-router";
import {RouteMapper} from "aurelia-route-mapper";

import {ModuleDescription} from "src/module-manager/module-description";
import {ModuleContainer} from "src/module-manager/module-container";
import {EventAggregator} from "aurelia-event-aggregator";
import {DrawerLink} from "src/shared/core/nav-items/drawer-link";
import {RouteLink} from "src/shared/core/route-link";
import {DrawerItems} from "src/shared/core/nav-items/drawer-items";

export class BaseApp {

    protected router: Router;
    public routeMapper: RouteMapper;
    protected moduleContainer: ModuleContainer;

    public constructor(moduleContainer: ModuleContainer, routeMapper: RouteMapper, 
        protected ea: EventAggregator,
        protected drawerItems: DrawerItems
    ) {
        this.moduleContainer = moduleContainer;
        this.routeMapper = routeMapper;

        this.ea.subscribe('router:navigation:success', route => {
            this.instructionChanged(route.instruction);
        });
    }

    protected add(moduleDescription: ModuleDescription): this {
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
    
    public switchModule(module: ModuleDescription) {
        this.moduleContainer.current = module;
        
        this.drawerItems.items = this.createNavFromModule(module);
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
    
    private createNavFromModule(module: ModuleDescription): DrawerLink[] {
        return module.routeConfig.settings.childRoutes.reduce((items: DrawerLink[], route) => {
            if (route.title) {
                items.push({
                    title: route.title,
                    icon: route.navIcon || null,
                    route: new RouteLink(module.routeConfig.name + '/' + route.name)
                });
            }

            return items;
        }, []);
    }
}