import {inject} from 'aurelia-framework';
import {AppService} from "src/shared/app-service";
import {AppModule} from "src/shared/app-module";

import {HomeConfig} from "src/apps/home/home-config";
import {ProjectManagementConfig} from "src/apps/project-management/project-management-config";

import {AppConfig} from "src/shared/app-config";

@inject(AppService)
export class Home implements AppModule {
    private appService: AppService;

    public config: AppConfig = HomeConfig;

    public apps: AppConfig[] = [
        ProjectManagementConfig
    ];

    public constructor(appService: AppService) {
        // reset the current app back to null; home isn't an "app"
        this.appService = appService;
    }

    public attached() {
        this.appService.current = this;
    }
}