import {Aurelia} from 'aurelia-framework';

export async function configure(aurelia: Aurelia) {
    aurelia.use
        .standardConfiguration()
        .developmentLogging()
        .plugin('aurelia-computed', { // optimized computing and debug info about dirty checks
            enableLogging: true
        })
        .plugin('aurelia-bootstrap', config => config.options.version = 4); //bootstrap 4 native components

    await aurelia.start();
    aurelia.setRoot('app');
}
