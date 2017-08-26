import {autoinject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {ModuleConfig} from "./module-config";

@autoinject()
export class ModuleManager {
    private _current: string;
    public modules: Array<{name: string, config: ModuleConfig}> = [];

    public constructor(private ea: EventAggregator) {}

    set current(name: string) {
        this._current = name;

        this.ea.publish('module-manager:change', this.modules.find(module => module.name === name));
    }

    get current(): string {
        return this._current;
    }

    public register(name: string, config: ModuleConfig) {
        this.modules.push({name, config});
    }
}