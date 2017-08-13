import {FrameworkConfiguration} from "aurelia-framework";

export function configure(aurelia: FrameworkConfiguration) {
    aurelia.globalResources([
        './mdc-button/mdc-button',
        './mdc-card/mdc-card',
        './mdc-checkbox/mdc-checkbox',
        './mdc-dialog/mdc-dialog',
        './mdc-drawer/mdc-drawer',
        './mdc-ripple/mdc-ripple',
        './mdc-menu/mdc-menu',
        './mdc-menu/mdc-menu-contents.html'
    ]);
}