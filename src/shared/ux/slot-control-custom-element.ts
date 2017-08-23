import {computedFrom} from 'aurelia-framework';

export abstract class SlotControlCustomElement {
    protected abstract element: Element;

    public slots: {[name: string]: any} = {};

    protected initSlotControl() {
        let element = <any> this.element;
        let auSlots = element.au.controller.view.slots;
        let slots = {};

        for (let key of Object.keys(auSlots)) {
            let slot = auSlots[key];

            if (slot.hasOwnProperty('children') && slot.children.length) {
                slot.children = slot.children.filter((item) => item.nodeType !== Node.COMMENT_NODE);
            }

            slots[key] = slot;
        }

        // need to assign at once, otherwise @computedFrom doesn't trigger change on $slots
        this.slots = slots;
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

        for (let slot of slots) {
            if (this.slots.hasOwnProperty(slot) && this.slots[slot].children.length) {
                return true;
            }
        }

        return false;
    }
}