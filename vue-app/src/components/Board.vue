<script setup lang="ts">
import {GameBoard} from "@core/game/domain/entities/GameBoard";
import {usePlocState} from "../../composables/usePlocState";
import {useSetupKeyboard} from "../../composables/useSetupKeyboard";
import {inject} from "vue";

useSetupKeyboard()

const COLUMNS = new Array(GameBoard.COLUMNS).fill(null)
const ROWS = new Array(GameBoard.ROWS).fill(null)

const gameState = usePlocState(inject('gamePloc'))
const guessState = usePlocState(inject('guessPloc'))

const getCurrentLetter = (row, column) => {
  return gameState.value.guesses?.[row]?.word.split('')?.[column]
}
</script>

<template>
  <ul class="board">
    <template v-for="(_, row) in ROWS" :key="row">
      <li v-for="(_, column) in COLUMNS" :key="`${row}${column}`">
<!--        {{row}} - {{ column}}-->
        {{getCurrentLetter(row, column)}}
      </li>
    </template>
      {{guessState.word}}
  </ul>

</template>

<style scoped>
ul {
  display: grid;
  grid-template-columns: repeat(5, 1fr);

  list-style: none;
  width: min-content;
  gap: var(--s-16px) var(--s-4px);

  margin: auto;
  padding: 0;
}

li {
  width: 48px;
  height: 48px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  border: calc(calc(2 / 16) * 1rem) solid white;

}

</style>