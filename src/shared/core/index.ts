import {FrameworkConfiguration} from "aurelia-framework";
import {PLATFORM} from 'aurelia-pal';

export function configure(aurelia: FrameworkConfiguration) {
    aurelia.globalResources([
        './suite-href/suite-href'
    ].map((item) => PLATFORM.moduleName(item)));
}