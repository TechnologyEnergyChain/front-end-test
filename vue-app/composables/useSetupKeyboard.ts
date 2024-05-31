import {inject} from "vue";
import {usePlocState} from "./usePlocState";
import {VALID_CHARACTERS, WORD_LENGTH} from "@core/guess/domain/entities/GuessWord";
import _ from 'lodash'
import {Guess} from "@core/guess/domain/entities/GuessModel";
import {Game} from "@core/game/domain/entities/GameModel";

export function useSetupKeyboard() {

    const guessStore = inject('guessPloc')
    const gameStore = inject('gamePloc')

    const gameState = usePlocState(gameStore)
    const guessState = usePlocState(guessStore)

    window.addEventListener('keydown', async (evt) => {
        console.log(evt.key)
        if (evt.ctrlKey || evt.altKey || evt.metaKey) {
            return
        }

        const key = evt.key
        if (key === 'Backspace') {
            guessPloc.updateWord = (guessState.value?.word ?? '').slice(0, -1)
            return
        }
        if (key === 'Enter') {
            try {
                const word = guessState.value.word
                await guessStore.submit()
                const newState = _.cloneDeep(gameState.value)
                newState.guesses.push({...gameState.value, word})
                newState.attempts = newState.attempts - 1
                await gameStore.update(new Game({...newState}))
                return

            } catch (e) {
                // TODO: Show alert to user
                throw e
            }

        }
        if (VALID_CHARACTERS.test(key)) {
            if (WORD_LENGTH <= (guessState.value?.word?.length ?? 0)) {
                return;
            }
            guessStore.updateWord = (guessState.value.word ?? '').concat(key)
        } else {
            evt.preventDefault()
        }
    })


}
