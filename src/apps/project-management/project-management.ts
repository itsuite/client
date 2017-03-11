import {inject} from 'aurelia-framework';
import {RouterConfiguration, Router} from "aurelia-router";

import {AppService} from 'src/shared/app-service';
import {AppModule} from "src/shared/app-module";
import {AppConfig} from "src/shared/app-config";

import {ProjectManagementConfig} from "./project-management-config";
import {routes} from "./project-management-routes";

@inject(AppService, Router)
export class ProjectManagement implements AppModule {

    private appService: AppService;
    public router: Router;
    public config: AppConfig = ProjectManagementConfig;

    public constructor(appService: AppService) {
        this.appService = appService;
    }

    public configureRouter(config: RouterConfiguration, router: Router) {
        config.map(routes);

        this.router = router;
    }

    public attached() {
        this.appService.current = this;
    }
}