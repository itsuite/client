import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from "./navigation.component";
import { SearchComponent } from "./search/search.component";

@NgModule({
    imports: [
        CommonModule
    ],

    exports: [
        NavigationComponent
    ],

    declarations: [
        NavigationComponent,
        SearchComponent
    ]
})
export class NavigationModule {}