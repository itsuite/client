
import {autoinject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {RouteMapper} from 'aurelia-route-mapper';

import {ModuleContainer} from './module-manager/module-container';
import {BaseApp} from "src/base-app";

import {description as dashboardDescription} from "src/modules/dashboard/description";
import {description as showcaseDescription} from "src/modules/showcase/description";

@autoinject()
export class App extends BaseApp {

    public constructor(moduleContainer: ModuleContainer, routeMapper: RouteMapper, ea: EventAggregator) {
        super(moduleContainer, routeMapper, ea);

        this.registerModule(dashboardDescription);
        this.registerModule(showcaseDescription);
    }

    get moduleDescription() {
        return this.moduleContainer.current;
    }
}
