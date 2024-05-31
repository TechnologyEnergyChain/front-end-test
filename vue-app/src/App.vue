<script setup lang="ts">
import {DependencyProvider} from "@core/common/dependencies/DependencyProvider";
import {onBeforeMount, provide} from "vue";
import {ApiClientImpl} from "../common/ApiClientImpl";
import Board from "@/components/Board.vue";

const provider = new DependencyProvider()
provider.provideGamePloc(new ApiClientImpl())
provider.provideGuessPloc(new ApiClientImpl(), new ApiClientImpl('http://localhost:3000/rae'))

const gamePloc = provider.get("GamePloc")
const guessPloc = provider.get("GuessPloc")

provide('gamePloc', gamePloc)
provide('guessPloc', guessPloc)

onBeforeMount(async ()=>{
  await gamePloc.start()
  await gamePloc.getGame()
})

</script>

<template>
  <main>
    <Board/>
  </main>
</template>

<style scoped>

</style>
