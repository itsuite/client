import {Router, RouterConfiguration} from 'aurelia-router';
import {inject, computedFrom} from 'aurelia-framework';

import {AppService} from './shared/app-service';
import {RouteGeneratorService} from './shared/route-generator-service';
import {SidebarToggleState} from "src/shared/components/sidebar/sidebar-toggle-state";

@inject(AppService, RouteGeneratorService, SidebarToggleState)
export class App {
    private appService: AppService;
    private routeGeneratorService: RouteGeneratorService;
    private router: Router;
    private sidebarToggle: SidebarToggleState;

    public constructor(appService: AppService, routeGeneratorService: RouteGeneratorService, sidebarToggle: SidebarToggleState) {
        this.appService = appService;
        this.routeGeneratorService = routeGeneratorService;
        this.sidebarToggle = sidebarToggle;
    }

    @computedFrom('appService.current')
    get menuLength() {
        if (this.appService.current && this.appService.current.router) {
            return this.appService.current.router.navigation.length;
        }

        return 0;
    }

    public configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'IT Suite';

        config.map([
            { route: '/',   name: 'home',   moduleId: './apps/home/home', nav: true},
            { route: '/pm', name: 'pm',     moduleId: './apps/project-management/project-management', nav: true}
        ]);

        this.router = router;
    }

    public async attached() {
        await this.routeGeneratorService.configure(this.router);
    }
}
