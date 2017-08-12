import {customElement, autoinject} from 'aurelia-framework';
import {MDCDialog} from '@material/dialog';

@autoinject()
@customElement('mdc-dialog')
export class MdcDialogCustomElement {

    private mdcDialog: MDCDialog;

    public constructor(private element: Element) {}

    public bind() {
        this.mdcDialog = new MDCDialog(this.element);
    }
}