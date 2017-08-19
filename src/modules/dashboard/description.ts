import {ModuleDescription} from "src/module-manager/module-description";

export const description: ModuleDescription = {

    title: 'Dashboard',
    perex: 'News from all apps',

    routeConfig: {
        route: '/dashboard',
        name: 'dashboard',
        moduleId: 'modules/dashboard/index',

        settings: {
            childRoutes: [
                {
                    route: '/',
                    moduleId: './feed/feed',
                    name: 'feed',
                    nav: true,
                    title: 'Feed',
                    icon: 'apps'
                },
                {
                    route: '/users',
                    moduleId: './users/users',
                    name: 'users',
                    nav: true,
                    title: 'Users',
                    icon: 'person'
                }
            ]
        }
    }
};