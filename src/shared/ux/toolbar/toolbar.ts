import * as mdc from 'material-components-web';
import {autoinject, customAttribute} from 'aurelia-framework';

@customAttribute('suite-ux-toolbar')
@autoinject()
export class ToolbarCustomAttribute {
    constructor(private element: Element) {
        const MDCToolbar = mdc.toolbar.MDCToolbar;
    }
}