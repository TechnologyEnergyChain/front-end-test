import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatCardModule } from '@angular/material/card';
import { OnlyLettersDirective } from "./only-letters/only-letters.directive";
import { WorldeComponent } from "./wordle/wordle.component";
import { KeyboardComponent } from "./keyboard/keyboard.component";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from "@angular/material/button";

@NgModule({
    declarations: [
        OnlyLettersDirective,
        WorldeComponent,
        KeyboardComponent
    ],
    imports: [
        CommonModule,
        MatCardModule,
        FormsModule,
        DragDropModule,
        MatIconModule,
        MatButtonModule
    ],
    exports: [
        WorldeComponent,
        KeyboardComponent,
        CommonModule,
        MatCardModule,
        FormsModule,
        DragDropModule,
        MatIconModule,
        OnlyLettersDirective,
        MatButtonModule
    ],
})
export class ComponentModule { }