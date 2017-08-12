import {autoinject} from 'aurelia-framework';

import {Module} from "src/module-manager/module";
import {DrawerItems} from "src/shared/core/nav-items/drawer-items";
import {ModuleContainer} from "src/module-manager/module-container";
import {RouteLink} from "src/shared/core/route-link";
import {DrawerLink} from "src/shared/core/nav-items/drawer-link";
import {Router, RouterConfiguration} from "aurelia-router";
import {description} from './description';

@autoinject()
export class Index implements Module {

    private router: Router;

    public constructor(
        private drawer: DrawerItems,
        private moduleContainer: ModuleContainer
    ) {}

    public configureRouter(config: RouterConfiguration, router: Router) {
        config.map(description.routeConfig.settings.childRoutes);
        this.router = router;
    }

    public activate() {
        let items: DrawerLink[] = [];

        for (let module of this.moduleContainer.modules) {

            let route: string = module.routeConfig.name;

            let item: DrawerLink = {
                title: module.title,
                route: new RouteLink(route)
            };

            items.push(item);
        }

        this.drawer.items = items;
    }
}