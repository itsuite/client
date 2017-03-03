import {customElement, inject} from 'aurelia-framework';

import {SidebarToggleState} from 'src/shared/components/sidebar/sidebar-toggle-state';

@inject(SidebarToggleState)
@customElement('its-shared-sidebar-switcher')
export class SidebarSwitcherCustomComponent {
    public sidebarToggle: SidebarToggleState;

    public constructor(sidebarToggle: SidebarToggleState) {
        this.sidebarToggle = sidebarToggle;
    }

    public toggle() {
        this.sidebarToggle.open = !this.sidebarToggle.open;
    }
}