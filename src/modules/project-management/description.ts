import {ModuleDescription} from "src/module-manager/module-description";

export const description: ModuleDescription = {

    title: 'Project Management',
    perex: 'pm',

    routeConfig: {
        route: '/projects',
        name: 'project-management',
        moduleId: 'modules/project-management/index',
        title: 'Project Management',
        breadcrumbs: true,

        settings: {
            childRoutes: [
                {
                    route: '/',
                    moduleId: './overview/overview',
                    name: 'overview',
                    nav: true,
                    title: 'Overview'
                }
            ]
        }
    }
};