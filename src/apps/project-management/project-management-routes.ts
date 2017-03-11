import {RouteConfig} from "aurelia-router";

export const routes: RouteConfig[] = [
    {
        route: '',
        moduleId: './dashboard/dashboard',
        nav: true,
        settings: {
            icon: 'fa fa-home'
        }
    },
    {
        route: 'tasks',
        moduleId: './tasks/tasks',
        nav: true,
        settings: {
            icon: 'fa fa-task'
        }
    }
];