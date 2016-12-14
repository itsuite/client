import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from "./dashboard-routing.module";

import { DashboardComponent } from "./dashboard.component";
import { AppListComponent } from "./app-list/app-list.component";
import { AppCardComponent } from "./app-card/app-card.component";

@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule
    ],
    declarations: [
        DashboardComponent,
        AppListComponent,
        AppCardComponent
    ]
})
export class DashboardModule {}