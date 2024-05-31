import { Directive, HostListener } from '@angular/core';

@Directive({
    selector: '[onlyLetter]'
})

export class OnlyLettersDirective {

    private pattern = '^[a-z-A-Z]+$'

    @HostListener('keydown', ['$event']) onKeydown(event: KeyboardEvent) {
        return this.isValid(event.key);
    }

    isValid(key: string) {
        return new RegExp(this.pattern).test(key);
    }
}
