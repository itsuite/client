import {ModuleDescription} from "src/module-manager/module-description";
import {PLATFORM} from 'aurelia-pal';

export const description: ModuleDescription = {

    title: 'Components',
    perex: 'Present static content to your customers',

    routeConfig: {
        route: '/components',
        name: 'components',
        moduleId: PLATFORM.moduleName('modules/components/components'),
        settings: {
            childRoutes: [
                {
                    route: '/',
                    name: 'introduction',
                    moduleId: PLATFORM.moduleName('./introduction/introduction'),
                    nav: true,
                    title: 'Introduction',
                    icon: 'sd_storage'
                },
                {
                    route: '/buttons',
                    name: 'buttons',
                    moduleId: PLATFORM.moduleName('./buttons/buttons'),
                    nav: true,
                    title: 'Buttons',
                    icon: 'signal_wifi_4_bar'
                }
            ]
        }
    }
};