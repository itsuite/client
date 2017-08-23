import {customAttribute, inject, Parent, bindable} from 'aurelia-framework';
import {MdcDrawerCustomElement} from "src/shared/ux/mdc-drawer/mdc-drawer";
import * as boolean from 'boolean';

@customAttribute('mdc-drawer-selected')
@inject(Parent.of(MdcDrawerCustomElement), Element)
export class MdcDrawerSelectedCustomAttribute {

    @bindable public enabled = true;

    public constructor(
        private drawer: MdcDrawerCustomElement,
        private element: HTMLElement
    ) {}

    public attached() {
        this.enabledChanged(this.enabled);
    }

    public detached() {
        this.detachClass();
    }

    public enabledChanged(newValue: boolean | string) {
        let ensuredValue: boolean = boolean(newValue);

        if (ensuredValue) {
            this.attachClass();
        } else {
            this.detachClass();
        }
    }

    private attachClass() {
        this.element.classList.add(this.drawer.baseClass + '--selected');
    }

    private detachClass() {
        this.element.classList.remove(this.drawer.baseClass + '--selected');
    }
}