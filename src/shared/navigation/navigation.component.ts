import { Component } from '@angular/core';
import { List } from "src/shared/support/list";
import { NavItem } from './nav-item';

@Component({
    selector: 'its-navigation',
    template: require('./navigation.component.html')
})
export class NavigationComponent {
    public items: List<NavItem>;
    
    public constructor() {
        this.items = new List<NavItem>([
            new NavItem('Home'),
            new NavItem('Category 1'),
            new NavItem('Category 2')
        ]);
    }
}