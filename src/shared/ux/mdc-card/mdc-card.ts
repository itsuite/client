import {customElement, autoinject, computedFrom} from 'aurelia-framework';
import {SlotControlCustomElement} from "src/shared/ux/slot-control-custom-element";

@autoinject
@customElement('mdc-card')
export class MdcCardCustomElement extends SlotControlCustomElement {

    public constructor(protected element: Element) {
        super();
    }

}