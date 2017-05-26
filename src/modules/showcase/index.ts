import {autoinject} from 'aurelia-framework';
import {Router, RouterConfiguration} from "aurelia-router";

import {Module} from "src/module-manager/module";
import {DrawerItems} from "src/shared/core/nav-items/drawer-items";
import {RouteLink} from "src/shared/core/route-link";

import {description} from "./description";

@autoinject()
export class Showcase implements Module {

    public router: Router;

    public constructor(
        private drawer: DrawerItems
    ) { }

    public configureRouter(routerConfiguration: RouterConfiguration, router: Router) {
        routerConfiguration.map(description.routeConfig.settings.childRoutes);
        this.router = router;
    }

    public attached() {
        this.drawer.items = [
            { title: 'Browse', route: new RouteLink('showcase/browse') },
            { title: 'New', route: new RouteLink('showcase/new') }
        ];
    }
}