import {inject, bindable, customAttribute} from 'aurelia-framework';

@inject(Element)
@customAttribute('mdc-drawer-collapse')
export class MdcDrawerCollapseCustomAttribute {
    @bindable public ref;

    private attachableTo: string[] = [
        'temporary',
        'persistent'
    ];

    public constructor(private element: HTMLElement) {}

    public attached() {
        this.element.onclick = () => this.click();
    }

    private click() {
        if (!this.attachableTo.includes(this.ref.type)) {
            throw new Error(`mdc-drawer-collapse can only be used with ${this.attachableTo.join(', ')} types.`);
        }

        this.ref.mdcDrawer.open = !this.ref.mdcDrawer.open;
    }
}