import {FrameworkConfiguration} from "aurelia-framework";
import {PLATFORM} from 'aurelia-pal';

export function configure(aurelia: FrameworkConfiguration) {
    aurelia.globalResources([
        PLATFORM.moduleName('shared/ux/mdc-button/mdc-button'),
        PLATFORM.moduleName('shared/ux/mdc-card/mdc-card'),
        PLATFORM.moduleName('shared/ux/mdc-checkbox/mdc-checkbox'),
        PLATFORM.moduleName('shared/ux/mdc-dialog/mdc-dialog'),
        PLATFORM.moduleName('shared/ux/mdc-drawer/mdc-drawer'),
        PLATFORM.moduleName('shared/ux/mdc-drawer/mdc-drawer-selected'),
        PLATFORM.moduleName('shared/ux/mdc-drawer/mdc-drawer-collapse'),
        PLATFORM.moduleName('shared/ux/mdc-ripple/mdc-ripple'),
        PLATFORM.moduleName('shared/ux/mdc-menu/mdc-menu'),
        PLATFORM.moduleName('shared/ux/mdc-menu/mdc-menu-contents.html')
    ]);
}