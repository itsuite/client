import {Aurelia} from 'aurelia-framework';

export async function configure(aurelia: Aurelia) {
    aurelia.use
        .standardConfiguration()
        .developmentLogging()
        .plugin('aurelia-computed', { // optimized computing and debug info about dirty checks
            enableLogging: true
        })
        .feature('shared/ux');

    await aurelia.start();
    aurelia.setRoot('app');
}
