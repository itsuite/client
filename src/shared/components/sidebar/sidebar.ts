import {customElement, inject, computedFrom} from 'aurelia-framework';
import {AppService} from "src/shared/app-service";
import {NavModel} from "aurelia-router";

@inject(AppService)
@customElement('its-shared-sidebar')
export class SidebarCustomElement {

    public appService: AppService;

    public constructor(appService: AppService) {
        this.appService = appService;
    }

    @computedFrom('appService.current')
    get navigation(): NavModel[] {
        if (this.appService.current && this.appService.current.router) {
            return this.appService.current.router.navigation;
        }

        return [];
    }
}