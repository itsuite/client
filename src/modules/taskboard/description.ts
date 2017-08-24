import {ModuleDescription} from "src/module-manager/module-description";
import {PLATFORM} from 'aurelia-pal';

export const description: ModuleDescription = {

    title: 'Taskboard',
    perex: '',

    routeConfig: {
        route: '/taskboard',
        name: 'taskboard',
        title: 'Taskboard',
        breadcrumbs: true,
        moduleId: PLATFORM.moduleName('modules/taskboard/taskboard'),

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