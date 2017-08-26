import {autoinject} from 'aurelia-dependency-injection';
import {PLATFORM} from 'aurelia-pal';
import {ModuleConfig} from "src/module-manager/module-config";
import {module} from "src/module-manager/decorators";
import {BaseModule} from "src/module-manager/base-module";

export const config: ModuleConfig = {
    id: 'dashboard',
    name: 'Dashboard',
    perex: 'News from all apps',
    thumbnail: 'http://icons.iconarchive.com/icons/marcus-roberto/google-play/512/Google-Drive-icon.png',

    routes: [
        {
            route: '/',
            moduleId: PLATFORM.moduleName('./feed/feed'),
            name: 'feed',
            nav: true,
            title: 'Feed',
            icon: 'apps'
        },
        {
            route: '/users',
            moduleId: PLATFORM.moduleName('./users/users'),
            name: 'users',
            nav: true,
            breadcrumbs: true,
            title: 'Users',
            icon: 'person'
        }
    ],
};

@autoinject()
@module(config)
export class Dashboard extends BaseModule {

}