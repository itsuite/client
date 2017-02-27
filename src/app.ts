import {Router, RouterConfiguration} from 'aurelia-router';

export class App {
    public router: Router;
    public sidebarOpen: boolean;

    public toggleSidebar() {
        this.sidebarOpen = !this.sidebarOpen;
    }

    public configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'IT Suite';

        config.map([
            { route: '',    name: 'dashboard',  moduleId: './dashboard/dashboard', nav: true,  title: 'Dashboard'},
            { route: '/pm',  name: 'pm', moduleId: './apps/pm/pm', nav: true, title: 'Project Management'}
        ]);

        this.router = router;
    }
}
