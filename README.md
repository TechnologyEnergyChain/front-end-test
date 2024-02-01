# Prueba Técnica - Desarrollador Front-end Gaba Energía
La siguiente es una prueba para evaluar a los candidatos a desarrollador **Front-end Gaba Energía**.

## INTRODUCCIÓN
En este repositorio se encuentran los requisitos de un ejercicio práctico diseñado para evaluar las habilidades técnicas del candidato en relación con las funciones clave y responsabilidades necesarias en el ámbito de Desarrollo de Gaba Energía.

#### Objetivos de la evaluación
El propósito principal de esta evaluación es analizar los siguientes aspectos clave:
  + Capacidad creativa para abordar los requisitos planteados.
  + Calidad del código producido, incluyendo la estructura y la aplicación de buenas prácticas.
  + Eficiencia de los algoritmos presentados.

## IMPORTANTE
1. Se solicita crear la aplicación con **[Angular](https://angular.io/)**.
1. Se requiere de una **cuenta de GitHub** para realizar este ejercicio.
1. **Antes de comenzar a programar:**
    * Realizar un `Fork` de este repositorio (https://github.com/TechnologyEnergyChain/front-end-test).
    * Clonar el fork a su máquina local.
    * Crear un `branch` en su cuenta de GitHub utilizando su nombre completo.
2. **Al concluir hay dos alternativas para entregar el proyecto:**
    * Hacer un Commit de su proyecto, remitir un Pull Request al branch que lleva su NOMBRE y notificar a dev-team@gabaenergia.com.
    * Generar un archivo comprimido (.zip o .rar) de su proyecto y remitirlo a dev-team@gabaenergia.com.

## EJERCICIO PRÁCTICO
**Objetivo:** Crear una "Wordle" mockeando los servicios necesarios de la API(openapi.yaml) incluido en el repositorio. "Wordle" es un juego de adivinanzas de palabras en línea en el que los jugadores intentan adivinar una palabra secreta de cinco letras en un número limitado de intentos.

Cada vez que haces un intento, tienes que escribir una palabra válida, y se te dirá cuáles de las letras introducidas están, cuáles no, y si están en el sitio donde les toca o no. Cuando hagas un intento verás los resultados de ese intento, y podrás volver a probar.

Por ejemplo, si la palabra fuera "SOLAR".

El usuario hace un primer intento con "AUREO".

El resultado, tal y cómo indica el openapi seria {result: "10101", attempsLeft: 5, isGameWon: false}

#### Requerimientos generales

La aplicación debe cumplir con los siguientes **requisitos funcionales:**

    - Definir 6 intentos para una palabra de 5 letras.
    - No se permite introducir por duplicado la misma palabra.

Además, como Extra Ball:

    - Modo claro y modo oscuro.
    - No se permiten palabras que no existen en la RAE (mock)

