import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, Output, Renderer2, SimpleChanges, ViewChild } from "@angular/core";

export type WrodType = 'verygood' | 'good' | 'bad';

export interface WordItem {
    [key: number]: WrodType[]
}

export interface WordleModel {
    [key: number]: {
        [key: number]: string
    }
}

@Component({
    selector: 'app-worlde',
    templateUrl: './wordle.component.html',
    styleUrl: './wordle.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorldeComponent implements OnChanges {

    @Input() maxWords?: number;

    @Input() maxWordLength?: number;

    @Input() words?: WordItem;

    @Input() currentWordIndex: number = 0;

    @Output() onWrittenWord = new EventEmitter<string>();

    model: WordleModel = { [0]: { [0]: '' } };

    maxWordsArr: number[] = [0];

    maxWordLengthArr: number[] = [0];

    get isFinish(): boolean {
        return this.currentWordIndex == -1 || this.currentWordIndex == -2
    }

    get isWin(): boolean {
        return this.currentWordIndex == -1
    }

    private nextWordInputElement?: HTMLInputElement;

    constructor(private cd: ChangeDetectorRef) { }

    ngOnChanges(changes: SimpleChanges): void {

        if (changes['maxWords']) {
            this.maxWordsArr = Array.from({ length: changes['maxWords'].currentValue }, (_, index) => index);
        }

        if (changes['maxWordLength']) {
            this.maxWordLengthArr = Array.from({ length: changes['maxWordLength'].currentValue }, (_, index) => index);
        }

        if (changes['maxWordLength'] && changes['maxWords']) {
            this.createModel();
        }
        if (changes['words']) {
            this.nextWordInputElement?.focus();
        }
    }

    private createModel() {
        if (this.maxWordsArr) {
            this.maxWordsArr.forEach(v => {
                this.model[v] = {};
                if (this.maxWordLengthArr) {
                    this.maxWordLengthArr.forEach(vv => {
                        this.model[v][vv] = '';
                    });
                }
            });
        }
    }

    modelChange(event: string, inputRef: HTMLInputElement, i: number) {
        if (event != '') {
            const word = this.getWord(i);
            if (word) {
                this.onWrittenWord.emit(word);
                inputRef?.blur();
                const parent = (inputRef.parentElement as HTMLDivElement).parentElement as HTMLDivElement;
                const children = parent.children[i + 1]
                if (this.currentWordIndex >= 0) {
                    this.nextWordInputElement = children?.children[0] as HTMLInputElement;
                } else {
                    this.nextWordInputElement = undefined;
                }
            } else {
                (inputRef?.nextElementSibling as HTMLInputElement)?.focus();
            }
        }
    }

    private getWord(index: number) {
        if (this.model[index]) {
            const aux = Object.entries(this.model[index]).filter(v => v[1] != '');
            if (aux.length >= this.maxWordLength!) {
                return aux.map(e => e[1]).join('');
            }
        }
        return null;
    }

    isWordReadOnly(index: number) {
        return this.currentWordIndex != index;
    }

    isWordWriten(index: number) {
        return this.currentWordIndex > index;
    }

    wordInpuFocus(event: HTMLInputElement, wordIndex: number, index: number) {
        if (wordIndex != index) {
            event.focus();
        }
    }

    getTypeClass(indexWord: number, indexLetter: number) {
        let cssClass: string = '';
        if (this.words) {
            if (this.words[indexWord]?.length > 0) {
                cssClass = this.words[indexWord][indexLetter];
            }
        }
        return cssClass;
    }
}