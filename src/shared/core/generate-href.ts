import {DOM} from 'aurelia-pal';
import {customAttribute, inject, bindable} from 'aurelia-framework';
import {RouteMapper} from "aurelia-route-mapper";
import {RouteLink} from "src/shared/core/route-link";

@customAttribute('suite-core-generate-href')
@inject(RouteMapper, DOM.Element)
export class GenerateHrefCustomAttribute {
    @bindable({ primaryProperty: true}) route: RouteLink;
    @bindable({ defaultValue: 'href' }) attribute: string;

    public constructor(
        private routeMapper: RouteMapper,
        private element
    ) { }

    public routeChanged() {
        let href = this.routeMapper.generate(this.route.route, this.route.params);

        if (this.element.au.controller) {
            this.element.au.controller.viewModel[this.attribute] = href;
        } else {
            this.element.setAttribute(this.attribute, href);
        }
    }
}
