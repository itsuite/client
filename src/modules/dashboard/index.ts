import {autoinject} from 'aurelia-framework';

import {Module} from "src/module-manager/module";
import {DrawerItems} from "src/shared/core/nav-items/drawer-items";
import {ModuleContainer} from "src/module-manager/module-container";
import {RouteLink} from "src/shared/core/route-link";
import {DrawerLink} from "src/shared/core/nav-items/drawer-link";

@autoinject()
export class Index implements Module {

    public constructor(
        private drawer: DrawerItems,
        private moduleContainer: ModuleContainer
    ) {}

    public activate() {
        let items: DrawerLink[] = [];

        for (let module of this.moduleContainer.modules) {

            let route: string = <string>module.routeConfig.route;

            while (route.charAt(0) === '/') {
                route = route.substr(1);
            }

            let item: DrawerLink = {
                title: module.title,
                route: new RouteLink(route)
            };

            items.push(item);
        }

        this.drawer.items = items;
    }
}