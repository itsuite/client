import {inject} from 'aurelia-framework';

import {AppDefinition} from "src/apps/app-definition";
import {AppList} from "src/apps/app-list";
import {AppService} from "src/apps/app-service";

@inject(AppService)
export class Dashboard {
    public apps: AppDefinition[];

    public constructor(appService: AppService) {
        // reset the current app back to null; dashboard isn't an "app"
        appService.current = null;

        this.apps = AppList;
    }
}