import {customElement, inject, Parent} from 'aurelia-framework';
import {MdcDrawerCustomElement} from "src/shared/ux/mdc-drawer/mdc-drawer";

@customElement('mdc-drawer-toolbar-spacer')
@inject(Parent.of(MdcDrawerCustomElement))
export class MdcDrawerToolbarSpacerCustomElement {
    public constructor(public drawer: MdcDrawerCustomElement) {}
}