import {Aurelia} from 'aurelia-framework';

export async function configure(aurelia: Aurelia) {
    aurelia.use
        .standardConfiguration()
        .developmentLogging()
        .plugin('aurelia-computed', {
            enableLogging: true
        });

    await aurelia.start();
    aurelia.setRoot('app');
}
