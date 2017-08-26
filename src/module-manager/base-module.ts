import {Router, RouterConfiguration} from 'aurelia-router';
import {autoinject} from 'aurelia-dependency-injection';
import {ModuleContainer} from "./module-container";
import {ModuleConfig} from "./module-config";

@autoinject()
export abstract class BaseModule {
    public router: Router;
    public moduleConfig: ModuleConfig;

    constructor(protected moduleContainer: ModuleContainer) { }

    public configureRouter(routeConfig: RouterConfiguration) {
        routeConfig.map(this.moduleConfig.routes);
        this.moduleContainer.register(this.moduleConfig);
    }
}