import {computedFrom} from 'aurelia-framework';

export abstract class SlotControlCustomElement {
    protected abstract element: Element;

    public slots: {[name: string]: any} = {};

    protected initSlotControl() {
        let element = <any> this.element;

        // for some reason the slots object doesn't have the Object prototype
        this.slots = Object.assign({}, element.au.controller.view.slots);
    }

    @computedFrom('slots')
    get $slots(): Object {
        return {
            defined: (...slots: string[]) => this.slotDefined(...slots)
        };
    }

    /**
     * Checks if at least one slot is defined on the component.
     *
     * @param slots
     * @returns {boolean}
     */
    public slotDefined(...slots: string[]): boolean {
        //console.log('asking for ' + slots.join(','));
        for (let slot of slots) {
            if (this.slots.hasOwnProperty(slot) && this.slots[slot].children.length) {
                return true;
            }
        }

        //console.log('' + slots.join(',') + ' not defined though, only ' + Object.keys(this.slots).join(', ') + ' defined');

        return false;
    }
}