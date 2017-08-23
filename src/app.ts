
import {autoinject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {RouteMapper} from 'aurelia-route-mapper';

import {ModuleContainer} from './module-manager/module-container';
import {BaseApp} from "src/base-app";

import {description as dashboard} from "src/modules/dashboard/description";
import {description as components} from "src/modules/components/description";
import {description as taskboard} from "src/modules/taskboard/description";
import {DrawerItems} from "src/shared/core/nav-items/drawer-items";
import {RouteLink} from "src/shared/core/route-link";

@autoinject()
export class App extends BaseApp {

    public constructor(
        moduleContainer: ModuleContainer,
        routeMapper: RouteMapper,
        ea: EventAggregator,
        drawerItems: DrawerItems
    ) {
        super(moduleContainer, routeMapper, ea, drawerItems);

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

    get moduleList() {
        let list: Array<object> = [];

        for (let module of this.moduleContainer.modules) {

            let link: RouteLink = {name: module.routeConfig.name};

            list.push({
                name: module.title,
                route: link
            });
        }

        return list;
    }

    public route(route: RouteLink) {
        this.router.navigateToRoute(route.name, route.params);
    }
}
