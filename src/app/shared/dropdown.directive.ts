import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})

export class DropdownDirective {
    @HostBinding('class.open') dropdownOpened = false;

    @HostListener('click') onToggleDropdown() {
        this.dropdownOpened = !this.dropdownOpened;
    } 
}