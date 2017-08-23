import {DOM} from 'aurelia-pal';
import {customAttribute, inject, bindable} from 'aurelia-framework';
import {RouteMapper} from "aurelia-route-mapper";

@customAttribute('suite-href')
@inject(RouteMapper, DOM.Element)
export class SuiteHrefCustomAttribute {
    @bindable({ primaryProperty: true}) name: string;
    @bindable params: {} = {};
    @bindable({ defaultValue: 'href' }) attribute: string;

    public constructor(
        private routeMapper: RouteMapper,
        private element
    ) { }

    public nameChanged() {
        this.regenerateHref();
    }

    public paramsChanged() {
        this.regenerateHref();
    }

    private regenerateHref() {
        let href = this.routeMapper.generate(this.name, this.params || {});

        if (this.element.au.controller) {
            this.element.au.controller.viewModel[this.attribute] = href;
        } else {
            this.element.setAttribute(this.attribute, href);
        }
    }
}
