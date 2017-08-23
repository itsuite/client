import {ModuleDescription} from "src/module-manager/module-description";
import {PLATFORM} from 'aurelia-pal';

export const description: ModuleDescription = {

    title: 'Project Management',
    perex: 'pm',

    routeConfig: {
        route: '/projects',
        name: 'project-management',
        moduleId: PLATFORM.moduleName('modules/project-management/project-management'),

        settings: {
            childRoutes: [
                {
                    route: '/',
                    moduleId: PLATFORM.moduleName('./overview/overview'),
                    name: 'overview',
                    nav: true,
                    title: 'Overview'
                }
            ]
        }
    }
};