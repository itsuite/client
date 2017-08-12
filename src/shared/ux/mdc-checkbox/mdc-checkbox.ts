import {autoinject, bindable, bindingMode, customElement} from 'aurelia-framework';
import {MDCCheckbox} from '@material/checkbox';
import * as boolean from 'boolean';
import {UidGenerator} from 'src/shared/ux/support/uid-generator';

@customElement('mdc-checkbox')
@autoinject()
export class MdcCheckboxCustomElement {
    @bindable({ defaultBindingMode: bindingMode.twoWay }) isChecked = false;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) isIndeterminate = false;
    @bindable() isDisabled = false;

    private mdcCheckbox: MDCCheckbox;
    public inputId: string;

    public constructor(private element: Element, uid: UidGenerator) {
        this.inputId = uid.generate('checkbox');
    }

    public handleChange(e: Event) {
        e.stopPropagation();
    }

    public bind() {
        this.mdcCheckbox = new MDCCheckbox(this.element);

        this.isIndeterminateChanged(this.isIndeterminate);
        this.isDisabledChanged(this.isDisabled);
        this.isCheckedChanged(this.isChecked);
    }

    public isCheckedChanged(newValue: string | boolean) {
        newValue = boolean(newValue);

        this.isIndeterminate = false;

        const event = new CustomEvent('change', {
            bubbles: true,
            detail: { value: newValue }
        });

        this.element.dispatchEvent(event);
    }

    public isDisabledChanged(newValue: string | boolean) {
        this.mdcCheckbox.disabled = boolean(newValue);
    }

    public isIndeterminateChanged(newValue: string | boolean) {
        this.mdcCheckbox.indeterminate = boolean(newValue);
    }
}
