import {customAttribute, inject, bindable} from 'aurelia-framework';
import {MDCSimpleMenu} from '@material/menu';
import * as boolean from 'boolean';

@customAttribute('mdc-menu')
@inject(Element)
export class MdcMenu {
    @bindable public ref: HTMLElement;
    @bindable public placement: string = 'top-left';
    @bindable public autoClose: boolean = false;

    private placementClasses: string[] = [
        'mdc-simple-menu--open-from-top-left',
        'mdc-simple-menu--open-from-top-right',
        'mdc-simple-menu--open-from-bottom-left',
        'mdc-simple-menu--open-from-bottom-right'
    ];

    public mdcMenu: MDCSimpleMenu;

    public constructor(
        private element: HTMLElement
    ) {}

    public attached() {
        this.placementChanged(this.placement);
        this.autoCloseChanged(this.autoClose);

        this.list.classList.add('mdc-simple-menu__items');

        this.mdcMenu = new MDCSimpleMenu(this.rootElement);

        this.element.addEventListener('click', () => {
            this.mdcMenu.open = !this.mdcMenu.open;
        });

        this.list.addEventListener('click', event => this.onClick(event));
    }

    public autoCloseChanged(newValue: string | boolean) {
        this.autoClose = boolean(newValue);
    }

    public placementChanged(newValue: string) {

        if (!this.ref) {
            return;
        }

        this.rootElement.classList.remove(...this.placementClasses);
        this.rootElement.classList.add('mdc-simple-menu--open-from-' + newValue);
    }

    private onClick(event: MouseEvent) {
        if (this.autoClose) {
            this.mdcMenu.open = false;
        }
    }

    public detached() {
        this.mdcMenu = null;
        this.list.classList.remove('mdc-simple-menu__items', ...this.placementClasses);
    }

    get list() {
        return this.ref.querySelector('ul');
    }

    get rootElement() {
        return this.ref.querySelector('.mdc-simple-menu');
    }
}