
import {autoinject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {RouteMapper} from 'aurelia-route-mapper';

import {ModuleContainer} from './module-manager/module-container';
import {BaseApp} from "src/base-app";

import {description as dashboard} from "src/modules/dashboard/description";
import {description as components} from "src/modules/components/description";
import {description as projectManagement} from "src/modules/project-management/description";
import {DrawerItems} from "src/shared/core/nav-items/drawer-items";

@autoinject()
export class App extends BaseApp {

    public constructor(moduleContainer: ModuleContainer, routeMapper: RouteMapper, ea: EventAggregator, private drawerItems: DrawerItems) {
        super(moduleContainer, routeMapper, ea);

        // enable modules here
        this
            .add(dashboard)
            .add(components)
            .add(projectManagement);
    }

    get moduleDescription() {
        return this.moduleContainer.current;
    }

    get navigation() {
        return this.drawerItems.items;
    }

    get moduleList() {
        let list: [] = [];

        for (let module of this.moduleContainer.modules) {
            list.push({
                name: module.title,
                route: module.routeConfig
            });
        }

        return list;
    }
}
