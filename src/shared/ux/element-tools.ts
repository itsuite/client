import * as boolean from 'boolean';

export class ElementTools {

    public static switchClass(element: Element, enabled: boolean | string, ...classNames: string[]) {
        // make sure the value is a valid truthy value
        enabled = boolean(enabled);

        classNames.concat(classNames);

        if (enabled) {
            element.classList.add(...classNames);
        } else {
            element.classList.remove(...classNames);
        }
    }
}