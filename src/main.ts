import {Aurelia, PLATFORM} from 'aurelia-framework';
import * as Bluebird from 'bluebird';

// remove out if you don't want a Promise polyfill (remove also from webpack.config.js)
Bluebird.config({ warnings: { wForgottenReturn: false } });

export function configure(aurelia: Aurelia) {
    aurelia.use
        .standardConfiguration()
        .developmentLogging()
        .plugin(PLATFORM.moduleName('aurelia-computed'), { // optimized computing and debug info about dirty checks
            enableLogging: true
        })
        .plugin(PLATFORM.moduleName('shared/core'))
        .plugin(PLATFORM.moduleName('shared/ux'));

    aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
