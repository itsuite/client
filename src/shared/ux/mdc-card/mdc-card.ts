import {customElement, autoinject, computedFrom} from 'aurelia-framework';
import {SlotControl} from "src/shared/ux/support/slot-control";

@autoinject
@customElement('mdc-card')
export class MdcCard extends SlotControl {

    public constructor(protected element: Element) {
        super();
    }

}