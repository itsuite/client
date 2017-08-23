import {RouterConfiguration, Router, RouteConfig, NavigationInstruction} from "aurelia-router";
import {RouteMapper} from "aurelia-route-mapper";

import {ModuleDescription} from "src/module-manager/module-description";
import {ModuleContainer} from "src/module-manager/module-container";
import {EventAggregator} from "aurelia-event-aggregator";
import {DrawerLink} from "src/shared/core/nav-items/drawer-link";
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


}