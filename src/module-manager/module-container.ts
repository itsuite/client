import {autoinject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

import {ModuleDescription} from "./module-description";

@autoinject()
export class ModuleContainer {
    private _current: ModuleDescription;

    public modules: ModuleDescription[] = [];
    
    private ea: EventAggregator;

    public constructor(ea: EventAggregator) {
        this.ea = ea;
    }

    set current(module: ModuleDescription) {
        this._current = module;

        this.ea.publish('suite:module:change', {
            module: module
        });
    }

    get current(): ModuleDescription {
        return this._current;
    }
}