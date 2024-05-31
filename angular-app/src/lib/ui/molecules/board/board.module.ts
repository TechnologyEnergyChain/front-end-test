import {NgModule} from "@angular/core";
import {BoardComponent} from "@lib/ui/molecules/board/board.component";
import {GetAlphabetUseCase} from "@src/core/keyboard/domain/application/actions/GetAlphabetUseCase";
import {DictionaryServiceImpl} from "@src/core/keyboard/domain/application/services/DictionaryServiceImpl";

@NgModule({
  declarations:[
    BoardComponent
  ],
  providers: [
    GetAlphabetUseCase,
    DictionaryServiceImpl
  ],
  bootstrap:[]
})
