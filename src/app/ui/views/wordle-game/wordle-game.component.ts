import { HttpErrorResponse } from "@angular/common/http";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { NEVER, catchError, filter, firstValueFrom, switchMap } from "rxjs";
import { GameService } from "../../../adapters/game/game.sevice";
import { RaeService } from "../../../adapters/rae/rae.service";
import { WordItem, WrodType } from "../../components/wordle/wordle.component";

@Component({
    selector: 'app-worlde-game',
    templateUrl: './wordle-game.component.html',
    styleUrl: './wordle-game.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordeleGameComponent implements OnInit {

    title = 'Wordle Game';

    words: WordItem = {};

    maxWords: number = 6;

    maxWordLength: number = 5;

    currentWordIndex: number = 0;

    private gameId?: string;

    constructor(private gameService: GameService, private raeService: RaeService) { }

    ngOnInit(): void {
        const $source = this.gameService.startGame();
        firstValueFrom($source).then(res => {
            this.gameId = res.gameId;
        });
    }

    writtenWord(word: string) {
        if (this.gameId != null) {
            const $makeGuesSource = this.gameService.makeGuess(this.gameId, word)
            this.raeService.existWord(word)
                .pipe(
                    filter(r => {
                        const exist = !!r.exist;
                        if (!exist) {
                            this.title = 'La palabra no existe en la RAE';
                        }
                        return exist;
                    }),
                    switchMap(() => $makeGuesSource),
                    catchError((err: HttpErrorResponse) => {
                        this.title = err.error;
                        return NEVER;
                    }))
                .subscribe(res => {
                    this.currentWordIndex++;
                    if (res.isGameWon) {
                        this.currentWordIndex = -1;
                        this.title = 'Has ganado';
                    } else {
                        let type = this.mapData(res.result!);
                        this.words[this.currentWordIndex - 1] = type;
                        this.words = { ...this.words };

                        if (res.attemptsLeft == 0) {
                            this.currentWordIndex = -2;
                            this.title = 'Has perdido';
                        }
                    }
                });
        } else {
            this.title = 'No se ha iniciado el juego';
        }
    }

    private mapData(result: string) {
        return result!.split('').map(type => {
            let cssClass!: WrodType;
            if (+type == 1) {
                cssClass = 'good';
            } else if (+type == 2) {
                cssClass = 'verygood'
            } else if (+type == 0) {
                cssClass = 'bad';
            }
            return cssClass;
        });
    }

}