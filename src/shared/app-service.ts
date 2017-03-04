import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

import {AppModule} from "src/shared/app-module";
import {NavModel} from "aurelia-router";

@inject(EventAggregator)
export class AppService {
    private _current: AppModule;
    public ea: EventAggregator;

    public constructor(ea: EventAggregator) {
        this.ea = ea;
    }

    set current(app: AppModule) {
        this._current = app;

        this.ea.publish('app:changed', {
            app: app
        });
    }

    get current(): AppModule {
        return this._current;
    }

    public getMenu(): NavModel[] {
        if (this.current && this.current.router) {
            return this.current.router.navigation;
        }

        return [];
    }
}