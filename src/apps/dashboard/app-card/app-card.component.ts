import { Component, Input } from '@angular/core';
import { AppDefinition } from "src/shared/app-definition";

@Component({
    selector: 'its-dashboard-app-card',
    template: require('./app-card.component.html')
})
export class AppCardComponent {
    @Input() app: AppDefinition
}