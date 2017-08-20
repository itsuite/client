import {Aurelia, PLATFORM} from 'aurelia-framework';

export async function configure(aurelia: Aurelia) {
    aurelia.use
        .standardConfiguration()
        .developmentLogging()
        .plugin(PLATFORM.moduleName('aurelia-computed'), { // optimized computing and debug info about dirty checks
            enableLogging: true
        })
        .feature(PLATFORM.moduleName('shared/core'))
        .feature(PLATFORM.moduleName('shared/ux'));

    await aurelia.start();
}
