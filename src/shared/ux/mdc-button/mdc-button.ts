
import {bindable, customAttribute, autoinject} from 'aurelia-framework';
import {ElementTools} from '../element-tools';;

@customAttribute('mdc-button')
@autoinject()
export class MdcButtonCustomAttribute {

    @bindable public accent = false;
    @bindable public raised = false;
    @bindable public primary = false;

    public constructor(private element: Element) { }

    public attached() {
        this.element.classList.add('mdc-button');
    }

    public detached() {
        const classes: string[] = [
            'mdc-button',
            'mdc-button--accent',
            'mdc-button--raised',
            'mdc-button--primary'
        ];

        this.element.classList.remove(...classes);
    }

    public accentChanged(newValue: string | boolean) {
        ElementTools.switchClass(this.element, newValue, 'mdc-button--accent');
    }
    
    public raisedChanged(newValue: string | boolean) {
        ElementTools.switchClass(this.element, newValue, 'mdc-button--raised');
    }

    public primaryChanged(newValue: string | boolean) {
        ElementTools.switchClass(this.element, newValue, 'mdc-button--primary');
    }
}