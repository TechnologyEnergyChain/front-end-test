import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { WordeleGameComponent } from "./wordle-game.component";
import { WordleGameModule } from "./wordle-game.module";


@NgModule({
    imports: [
        WordleGameModule,
        RouterModule.forChild([
            {
                path: '',
                component: WordeleGameComponent
            }
        ])
    ]
})
export class WordleGameRoutingModule { }