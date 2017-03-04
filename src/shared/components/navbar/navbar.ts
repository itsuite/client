import {inject, customElement, computedFrom} from 'aurelia-framework';
import {AppService} from "src/shared/app-service";

@customElement('its-shared-navbar')
@inject(AppService)
export class NavbarCustomElement {
    public appService: AppService;

    constructor(appService: AppService) {
        this.appService = appService;
    }

    @computedFrom('appService.current')
    get menuLength() {
        return this.appService.getMenu().length;
    }
}