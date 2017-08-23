import {ModuleDescription} from "src/module-manager/module-description";
import {PLATFORM} from 'aurelia-pal';

export const description: ModuleDescription = {

    title: 'Dashboard',
    perex: 'News from all apps',

    routeConfig: {
        route: '/dashboard',
        name: 'dashboard',
        moduleId: PLATFORM.moduleName('modules/dashboard/dashboard'),

        settings: {
            childRoutes: [
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
                    title: 'Users',
                    icon: 'person'
                }
            ]
        }
    }
};