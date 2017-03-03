import {inject, customElement} from 'aurelia-framework';
import {AppService} from "src/shared/app-service";

@customElement('its-shared-navbar')
@inject(AppService)
export class NavbarCustomElement {
    public appService: AppService;

    constructor(appService: AppService) {
        this.appService = appService;
    }
}