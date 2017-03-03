import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class SidebarToggleState {
    private _open: boolean = true;
    private ea;

    public constructor(ea: EventAggregator) {
        this.ea = ea;
    }

    set open(value: boolean) {
        this._open = value;

        this.ea.publish('app:ui:sidebar-toggle', {
            open: value
        });
    }

    get open() {
        return this._open;
    }
}