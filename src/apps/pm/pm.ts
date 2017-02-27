import {AppService} from 'src/apps/app-service';
import {inject} from 'aurelia-framework';
import {PmDefinition} from "src/apps/pm/pm-definition";

@inject(AppService)
export class Pm {
    constructor(appService: AppService) {
        appService.current = PmDefinition
    }
}