import {autoinject} from 'aurelia-framework';

import {Module} from "src/module-manager/module";
import {RouterConfiguration} from "aurelia-router";
import {description} from './description';

@autoinject()
export class Index implements Module {

    public configureRouter(config: RouterConfiguration) {
        config.map(description.routeConfig.settings.childRoutes);
    }
}