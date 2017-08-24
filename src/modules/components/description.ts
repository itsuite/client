import {ModuleDescription} from "src/module-manager/module-description";
import {PLATFORM} from 'aurelia-pal';

export const description: ModuleDescription = {

    title: 'Components',
    perex: 'Present static content to your customers',
    thumbnail: 'http://icons.iconarchive.com/icons/cornmanthe3rd/plex/512/Media-play-icon.png',

    routeConfig: {
        route: '/components',
        name: 'components',
        breadcrumbs: true,
        title: 'Components',
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
                    breadcrumbs: true,
                    moduleId: PLATFORM.moduleName('./buttons/buttons'),
                    nav: true,
                    title: 'Buttons',
                    icon: 'signal_wifi_4_bar'
                }
            ]
        }
    }
};