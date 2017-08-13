
import {bindable, customAttribute, autoinject} from 'aurelia-framework';
import {MDCRipple} from '@material/ripple';
import * as boolean from 'boolean';

@customAttribute('mdc-ripple')
@autoinject()
export class MdcRippleCustomAttribute {

    @bindable public unbounded = false;

    private mdcRipple: MDCRipple | null;

    public constructor(private element: Element) { }

    public bind() {
        this.mdcRipple = new MDCRipple(this.element);
        this.mdcRipple.unbounded = true;
    }

    public attached() {
        this.element.classList.add('mdc-ripple-surface');
    }

    public detached() {
        this.mdcRipple.destroy();
    }

   /* public unboundedChanged(newValue: string | boolean) {
        this.mdcRipple.unbounded = boolean(newValue);
    }*/
}