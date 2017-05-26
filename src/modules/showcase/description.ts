import {ModuleDescription} from "src/module-manager/module-description";

export const description: ModuleDescription = {

    title: 'Showcase',
    perex: 'Present static content to your customers',

    routeConfig: {
        route: '/showcase',
        name: 'showcase',
        moduleId: 'modules/showcase/index',
        settings: {
            childRoutes: [
                {
                    route: '/',
                    name: 'browse',
                    moduleId: './browse/browse',
                    nav: true,
                    title: 'Browse'
                },
                {
                    route: '/new',
                    name: 'new',
                    moduleId: './new/new',
                    nav: true,
                    title: 'Create new'
                }
            ]
        }
    }
};