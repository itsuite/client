import {customElement, autoinject} from 'aurelia-framework';
import {RouteMapper} from "aurelia-route-mapper";

import {DrawerItems} from "./drawer-items";

@customElement('suite-core-nav-items')
@autoinject()
export class NavItemsCustomElement {
    public constructor(
        private drawer: DrawerItems,
        public mapper: RouteMapper
    ) { }

    get navigation() {
        return this.drawer.items;
    }
}