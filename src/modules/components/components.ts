import {autoinject} from 'aurelia-framework';
import {RouterConfiguration} from "aurelia-router";

import {Module} from "src/module-manager/module";

import {description} from "./description";

@autoinject()
export class Components implements Module {

    public configureRouter(config: RouterConfiguration) {
        config.map(description.routeConfig.settings.childRoutes);
    }
}