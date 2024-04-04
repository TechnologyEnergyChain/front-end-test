import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { KEYBOARD_KEYS } from '@infrastructure/data/constants/keyBoard';

@Component({
    selector: 'app-keyboard',
    standalone: true,
    imports: [MatButtonModule],
    templateUrl: './keyboard.component.html',
    styleUrl: './keyboard.component.scss',
})
export class KeyboardComponent {
    keys: string[] = KEYBOARD_KEYS;
    @Output() keyClick = new EventEmitter<string>();

    onClick(key: string) {
        this.keyClick.emit(key);
    }
}
