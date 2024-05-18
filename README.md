# Prueba Técnica - Explicación

Esta aplicación está dividida en dos partes: front-end y back-end. La parte de front-end se encuentra en la carpeta `./gabawordle` y la parte de back-end en la carpeta `./api`.

**Nota**: El back-end no utiliza una base de datos; los datos se almacenan en memoria y la palabra por defecto es 'SOLAR' como se especifica en el apartado de `Definition of Done` mas abajo en este fichero.

## Instalación

Para ejecutar la aplicación, sigue estos pasos:

1. Instalar dependencias del back-end:

```sh
cd ./api
npm install
```

2. Instalar dependencias del front-end:

```sh
cd ./gabawordle
npm install
```

3. Instalar dependencias de la raíz:

```sh
npm install
```

## Ejecución

Para iniciar ambas partes de la aplicación, ejecuta el siguiente comando desde la carpeta raíz:

```sh
npm start
```

- La aplicación front-end estará disponible en el puerto 4200.
- El back-end estará disponible en el puerto 3000.

## Pruebas

Para ejecutar las pruebas de Cypress, usa el siguiente comando en la carpeta ./gabawordle:

```sh
npm run e2e
```
____________________________________________________ 



## Definition of done
Solo se han testeado los casos de prueba básicos que se describen en `Definition of Done`.

Si necesitas más detalles o tienes alguna pregunta, no dudes en contactarme.

# Prueba Técnica - Desarrollador Front-end Gaba Energía

La siguiente es una prueba para evaluar a los candidatos a desarrollador **Front-end Gaba Energía**.

## INTRODUCCIÓN

En este repositorio se encuentran los requisitos de un ejercicio práctico diseñado para evaluar las habilidades técnicas del candidato en relación con las funciones clave y responsabilidades necesarias en el ámbito de Desarrollo de Gaba Energía.

### Objetivos de la evaluación

El propósito principal de esta evaluación es analizar los siguientes aspectos clave:

- Capacidad creativa para abordar los requisitos planteados.
- Calidad del código producido, incluyendo la estructura y la aplicación de buenas prácticas.
- Eficiencia de los algoritmos presentados.

## IMPORTANTE

1. Se solicita crear la aplicación con **[Angular](https://angular.io/)**.
1. Se requiere de una **cuenta de GitHub** para realizar este ejercicio.
1. **Antes de comenzar a programar:**
   - Realizar un `Fork` de este repositorio (https://github.com/TechnologyEnergyChain/front-end-test).
   - Clonar el fork a su máquina local.
   - Crear un `branch` en su cuenta de GitHub utilizando su nombre completo.
1. **Al concluir hay dos alternativas para entregar el proyecto:**
   - Hacer un Commit de su proyecto, remitir un Pull Request al branch que lleva su NOMBRE y notificar a dev-team@gabaenergia.com.
   - Generar un archivo comprimido (.zip o .rar) de su proyecto y remitirlo a dev-team@gabaenergia.com.

## EJERCICIO PRÁCTICO

### Objetivo

El objetivo de la prueba será la creación de una "Wordle" que es un juego de adivinanzas de palabras en línea en el que los jugadores intentan adivinar una palabra secreta de cinco letras en un número limitado de intentos.

Cada vez que haces un intento, tienes que escribir una palabra válida, y se te dirá cuáles de las letras introducidas están, cuáles no, y si están en el sitio donde les toca o no. Cuando hagas un intento verás los resultados de ese intento, y podrás volver a probar.

Por ejemplo, si la palabra fuera "SOLAR".

El usuario hace un primer intento con "AUREO".

El resultado, tal y cómo indica el openapi seria {result: "10101", attempsLeft: 5, isGameWon: false}

### Apartado técnico

Como solemos trabajar con la metodología `contract-first`, se ha definido un contrato en OpenAPI que se puede encontrar en el fichero `wordle.yaml` para el mockeo de los repositorios http.

Ten en cuenta que el uso de una correcta arquitectura y buenas prácticas de programación es muy importante para nosotros. :books:

Si decides usar algún patrón de diseño o aplicar cualquier otra técnica, no olvides mencionarlo en la defensa de tu solución. :speaking_head:

### Definition of done

Para las pruebas se asumirá que la palabra secreta es "SOLAR".

#### Palabra incorrecta sin aciertos

- Empezar una partida nueva
- Introducir la palabra "MENTE"

✅ Debería devolver "00000" y decrementar el número de intentos en 1.

#### Palabra duplicada

- Empezar una partida nueva
- Introducir la palabra "MENTE"
- Volver a introducir la palabra "MENTE"

❌ Debería mostrar algún error, ya que la palabra se ha repetido.

#### Palabra con letras en lugar incorrecto

- Empezar una partida nueva
- Introducir la palabra "AUREO"

✅ Debería devolver "10101" y decrementar el número de intentos en 1.

#### Palabra con letras en lugar correcto (acierto parcial)

- Empezar una partida nueva
- Introducir la palabra "MOLAR"

✅ Debería devolver "02222" y decrementar el número de intentos en 1.

#### Palabra correcta

- Empezar una partida nueva
- Introducir la palabra "SOLAR"

✅ Debería devolver "22222", mostrar un mensaje de enhorabuena y no dejar continuar la partida.

## Requisitos

### Requisitos básicos

La aplicación debe cumplir con los siguientes **requisitos básicos:**

- [ ] Cada partida tendrá un máximo de 6 intentos.
- [ ] Cada palabra tendrá 5 letras.
- [ ] No se permite introducir por duplicado la misma palabra.

> [!TIP]
> Antes de pasar a los requisitos opcionales, asegúrese de tener el código de su solución como le gustaría. :eye_speech_bubble:

### Requisitos opcionales

Además, como requisitos **opcionales**:

- [ ] Implementar modo claro y modo oscuro.
- [ ] No se permiten palabras que no existen en la RAE (Integración con servicio externo mockeado).
- [ ] Añadir un teclado virtual en la pantalla principal.
