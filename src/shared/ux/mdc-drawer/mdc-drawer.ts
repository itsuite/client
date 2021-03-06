import {customElement, inject, bindable} from 'aurelia-framework';
import {MDCTemporaryDrawer, MDCPersistentDrawer} from '@material/drawer';
import {SlotControl} from "src/shared/ux/support/slot-control";

@inject(Element)
@customElement('mdc-drawer')
export class MdcDrawer extends SlotControl {

    public mdcDrawer: MDCTemporaryDrawer | MDCPersistentDrawer;
    private allowedTypes: string[] = [
        "permanent",
        "persistent",
        "temporary"
    ];

    @bindable public type: string = "permanent";
    private isAttached: boolean;

    public constructor(protected element: HTMLElement) {
        super();
    }

    public attached() {

        this.initSlotControl();
        this.isAttached = true;
        this.typesChanged(this.type);
    }

    public detached() {
        this.mdcDrawer = null;
    }

    get baseClass(): string {
        return 'mdc-' + this.type + '-drawer';
    }

    public typesChanged(newValue: string) {
        // not attached yet
        if (!this.isAttached) {
            return;
        }

        if (!this.allowedTypes.includes(newValue)) {
            throw new Error(`${newValue} is not a valid type. Allowed types: ${this.allowedTypes.join(', ')}`);
        }

        this.attachDrawer();
    }

    private attachDrawer() {
        this.mdcDrawer = null; // unattach the previous drawer

        const rootElement: HTMLElement = this.element.querySelector('aside');

        if (this.type === 'persistent') {
            this.mdcDrawer = new MDCPersistentDrawer(rootElement);
        } else if (this.type === 'temporary') {
            this.mdcDrawer = new MDCTemporaryDrawer(rootElement);
        }
    }
}