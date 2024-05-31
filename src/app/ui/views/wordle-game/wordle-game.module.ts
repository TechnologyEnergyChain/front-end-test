import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ComponentModule } from "../../components/component.module";
import { WordeleGameComponent } from "./wordle-game.component";
import { GameService } from "../../../adapters/game/game.sevice";
import { RaeService } from "../../../adapters/rae/rae.service";

@NgModule({
    declarations: [
        WordeleGameComponent
    ],
    imports: [
        CommonModule,
        ComponentModule
    ],
    providers: [
        GameService,
        RaeService
    ],
    exports: [
        WordeleGameComponent
    ]
})
export class WordleGameModule { }