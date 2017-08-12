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
                    route: ['', '/'],
                    moduleId: './feed/feed',
                    nav: true,
                    title: 'Feed'
                },
                {
                    route: '/users',
                    moduleId: './users/users',
                    nav: true,
                    title: 'Users'
                }
            ]
        }
    }
};