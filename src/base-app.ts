import {RouterConfiguration, Router, RouteConfig, NavigationInstruction} from "aurelia-router";
import {RouteMapper} from "aurelia-route-mapper";

import {ModuleDescription} from "src/module-manager/module-description";
import {ModuleContainer} from "src/module-manager/module-container";
import {EventAggregator} from "aurelia-event-aggregator";

export class BaseApp {

    protected router: Router;
    public routeMapper: RouteMapper;
    protected moduleContainer: ModuleContainer;

    public constructor(ModuleContainer: ModuleContainer, routeMapper: RouteMapper, ea: EventAggregator) {
        this.moduleContainer = ModuleContainer;
        this.routeMapper = routeMapper;

        ea.subscribe('router:navigation:success', route => {
            this.instructionChanged(route.instruction);
        });
    }

    protected registerModule(moduleDescription: ModuleDescription) {
        this.moduleContainer.modules.push(moduleDescription);
    }

    public configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'IT Suite';
        config.options.pushState = true;

        let map: RouteConfig[] = [];
        for (let module of this.moduleContainer.modules) {
            map.push(module.routeConfig);
        }

        config.map(map);
        this.routeMapper.map(map);

        this.router = router;
    }

    private instructionChanged(instruction: NavigationInstruction) {
        let moduleId = instruction.config.moduleId;

        for (let module of this.moduleContainer.modules) {
            if (module.routeConfig.moduleId == moduleId) {
                this.moduleContainer.current = module;
            }
        }
    }
}