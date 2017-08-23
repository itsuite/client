import {autoinject, customElement, computedFrom} from 'aurelia-framework';
import {NavigationInstruction, Router} from 'aurelia-router';
import {EventAggregator} from "aurelia-event-aggregator";

@customElement('suite-breadcrumbs')
@autoinject()
export class SuiteBreadcrumbs {

    public router: Router;
    public instructions: NavigationInstruction[];

    public constructor(router: Router, ea: EventAggregator) {
        while (router.parent) {
            router = router.parent;
        }

        this.router = router;

        ea.subscribe('router:navigation:complete', () => {
            this.instructions = this.getNewInstructions();
        });
    }

    public getNewInstructions(): NavigationInstruction[] {
        if (!this.router.currentInstruction) {
            return [];
        }

        let instructions = [];

        for (let instruction of this.router.currentInstruction.getAllInstructions()) {
            if (instruction.config.title && instruction.config.breadcrumbs) {
                instructions.push(instruction);
            }
        }

        return instructions;
    }
}