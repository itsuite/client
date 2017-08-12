import {EventAggregator} from 'aurelia-event-aggregator';
import {autoinject} from 'aurelia-framework';

import {DrawerLink} from "./drawer-link";

@autoinject()
export class DrawerItems {

    private _items: DrawerLink[];

    public constructor(
        private ea: EventAggregator
    ) {}

    set items(items: DrawerLink[]) {
        this._items = items;

        this.notifyChange();
    }

    get items() {
        return this._items;
    }

    private notifyChange() {
        this.ea.publish('suite:nav-items:change', {
            items: this.items
        });
    }
}

