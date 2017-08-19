import {FrameworkConfiguration} from "aurelia-framework";

export function configure(aurelia: FrameworkConfiguration) {
    aurelia.globalResources([
        './suite-href/suite-href'
    ]);
}