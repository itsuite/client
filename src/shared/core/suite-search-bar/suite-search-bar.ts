import {customElement, autoinject} from 'aurelia-framework';
import {bindable} from 'aurelia-templating';

@autoinject()
@customElement('suite-search-bar')
export class SuiteSearchBar {

    @bindable() public query;

    public constructor(private element: Element) { }

    public submit(e: Event): void {
        e.stopPropagation();
        this.element.dispatchEvent(this.createEvent('submit', { query: this.query }));
    }

    public queryChanged(newValue: string): void {
        this.element.dispatchEvent(this.createEvent('change', { query: newValue }));
    }

    private createEvent(name: string, detail?: object): CustomEvent {
        return new CustomEvent(name, {
            bubbles: true,
            detail
        });
    }
}