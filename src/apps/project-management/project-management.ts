import {inject} from 'aurelia-framework';
import {RouterConfiguration, Router} from "aurelia-router";

import {AppService} from 'src/shared/app-service';
import {AppModule} from "src/shared/app-module";

import {ProjectManagementConfig} from "src/apps/project-management/project-management-config";
import {AppConfig} from "src/shared/app-config";

@inject(AppService, Router)
export class ProjectManagement implements AppModule {

    private appService: AppService;
    public router: Router;
    public config: AppConfig = ProjectManagementConfig;

    public constructor(appService: AppService) {
        this.appService = appService;
    }

    public configureRouter(config: RouterConfiguration, router: Router) {
        config.map([
            { route: '',  moduleId: './dashboard/dashboard', nav: true,  title: 'Dashboard', settings: {
                icon: 'fa fa-home'
            }},
            { route: 'projects', moduleId: './projects/projects', nav: true, title: 'Projects'}
        ]);

        this.router = router;
    }

    public attached() {
        this.appService.current = this;
    }
}