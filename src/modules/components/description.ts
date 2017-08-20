import {ModuleDescription} from "src/module-manager/module-description";

export const description: ModuleDescription = {

    title: 'Components',
    perex: 'Present static content to your customers',

    routeConfig: {
        route: '/components',
        name: 'components',
        moduleId: 'modules/components/index',
        title: 'Components',
        breadcrumbs: true,
        settings: {
            childRoutes: [
                {
                    route: '/',
                    name: 'introduction',
                    moduleId: './introduction/introduction',
                    nav: true,
                    title: 'Introduction'
                },
                {
                    route: '/buttons',
                    name: 'buttons',
                    moduleId: './buttons/buttons',
                    nav: true,
                    breadcrumbs: true,
                    title: 'Buttons'
                }
            ]
        }
    }
};