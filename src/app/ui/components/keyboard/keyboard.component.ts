import { DOCUMENT } from "@angular/common";
import { AfterViewInit, ChangeDetectionStrategy, Component, Inject, OnDestroy } from "@angular/core";
import Keyboard from 'simple-keyboard';
import { OnlyLettersDirective } from "../only-letters/only-letters.directive";

@Component({
    selector: 'app-keyboard',
    template: `<mat-card cdkDrag class="container primary-color"><div class="simple-keyboard"></div></mat-card>`,
    styleUrl: './keyboard.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [OnlyLettersDirective]
})
export class KeyboardComponent implements AfterViewInit, OnDestroy {

    get isShow() {
        return this.keyboard != null;
    }

    private keyboard?: Keyboard;

    constructor(@Inject(DOCUMENT) private document: Document, private onlyLettersDirective: OnlyLettersDirective) { }

    ngAfterViewInit() {
        this.show();
    }

    alternate() {
        if (this.isShow) {
            this.hide();
        } else {
            this.show();
        }
    }

    show() {
        if (!this.keyboard) {
            this.keyboard = new Keyboard({
                preventMouseDownDefault: true,
                onKeyPress: this.keyPress
            });
        }
    }

    keyPress = (input: string) => {
        const currentInput = this.document.activeElement as HTMLInputElement;
        if (this.onlyLettersDirective.isValid(input)) {
            currentInput.value = input;
            currentInput.dispatchEvent(new Event('input'));
        }
    }

    hide() {
        this.keyboard?.destroy();
        this.keyboard = undefined;
    }

    ngOnDestroy(): void {
        this.hide();
    }
}