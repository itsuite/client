import { Component } from '@angular/core';

import { List } from 'src/shared/support/list';
import { AppDefinition } from 'src/shared/app-definition';
import { PmDefinition } from "src/apps/pm/pm-definition";

@Component({
    selector: 'its-dashboard-app-list',
    template: require('./app-list.component.html')
})
export class AppListComponent {
    public apps: List<AppDefinition>;

    constructor() {
        this.apps = new List<AppDefinition>([
            PmDefinition
        ]);
    }
}