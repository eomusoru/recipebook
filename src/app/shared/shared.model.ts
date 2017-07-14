import { DropdownDirective } from './dropdown.directive';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [ 
        DropdownDirective 
    ],
    exports: [
        CommonModule,
        DropdownDirective
    ]
})

export class SharedModule {

}