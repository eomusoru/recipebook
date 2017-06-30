import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})

export class DropdownDirective {
    @HostBinding('class.open') dropdownOpened = false;

    @HostListener('click') onToggleDrodpown() {
        this.dropdownOpened = !this.dropdownOpened;
    } 
}