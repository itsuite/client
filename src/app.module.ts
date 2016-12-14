import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app-routing.module";

import { NavigationModule } from './shared/navigation/navigation.module';
import { DashboardModule } from './apps/dashboard/dashboard.module';

@NgModule({
    imports: [
        BrowserModule,
        NavigationModule,
        DashboardModule,
        AppRoutingModule
    ],
    bootstrap: [
        AppComponent
    ],
    declarations: [
        AppComponent
    ]
})
export class AppModule {}