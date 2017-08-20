import {FrameworkConfiguration} from "aurelia-framework";
import {PLATFORM} from 'aurelia-pal';

export function configure(aurelia: FrameworkConfiguration) {
    aurelia.globalResources([
        './mdc-button/mdc-button',
        './mdc-card/mdc-card',
        './mdc-checkbox/mdc-checkbox',
        './mdc-dialog/mdc-dialog',
        './mdc-drawer/mdc-drawer',
        './mdc-drawer/mdc-drawer-selected',
        './mdc-drawer/mdc-drawer-collapse',
        './mdc-ripple/mdc-ripple',
        './mdc-menu/mdc-menu',
        './mdc-menu/mdc-menu-contents.html'
    ].map((item) => PLATFORM.moduleName(item)));
}