import {RouterConfiguration} from "aurelia-router";
import {description} from "./description";



export class Index {

    public configureRouter(config: RouterConfiguration) {
        config.map(description.routeConfig.settings.childRoutes);
    }
}