import {autoinject} from 'aurelia-framework';
import {Router, RouterConfiguration} from "aurelia-router";

import {Module} from "src/module-manager/module";
import {DrawerItems} from "src/shared/core/nav-items/drawer-items";
import {RouteLink} from "src/shared/core/route-link";

import {description} from "./description";

@autoinject()
export class Components implements Module {

    public router: Router;

    public constructor(
        private drawer: DrawerItems
    ) { }

    public configureRouter(config: RouterConfiguration, router: Router) {
        config.map(description.routeConfig.settings.childRoutes);
        this.router = router;
    }

    public attached() {
        this.drawer.items = [
            { title: 'Buttons', route: new RouteLink('components/buttons') }
        ];
    }
}