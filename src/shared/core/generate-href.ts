import {DOM} from 'aurelia-pal';
import {customAttribute, inject, bindable} from 'aurelia-framework';
import {RouteMapper} from "aurelia-route-mapper";

@customAttribute('suite-core-generate-href')
@inject(RouteMapper, DOM.Element)
export class GenerateHrefCustomAttribute {
    @bindable({ primaryProperty: true, changeHandler: 'attrChanged' }) route: string;
    @bindable({ changeHandler: 'attrChanged' }) params: object;
    @bindable({ defaultValue: 'href' }) attribute: string;

    public constructor(
        private routeMapper: RouteMapper,
        private element
    ) { }

    public attrChanged() {
        let href = this.routeMapper.generate(this.route, this.params);

        if (this.element.au.controller) {
            this.element.au.controller.viewModel[this.attribute] = href;
        } else {
            this.element.setAttribute(this.attribute, href);
        }
    }
}
