const express = require('express');
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
var cors = require('cors')
const { randomUUID } = require('crypto');
const { checkWord, checkIfValidWord } = require('./utils');

const app = express();
app.use(cors())
const port = 3000;

const swaggerDocument = yaml.load(fs.readFileSync(path.join(__dirname, 'openapi.yaml'), 'utf8'));

const CORRECT_WORD = 'SOLAR'
const MAX_ATTEMPTS = 6
const MAX_WORD_LENGTH = 5
let attemptsLeft = MAX_ATTEMPTS
let currentGameId = null

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.post('/game', (req, res) => {
    const difficulty = req.body.difficulty || 'easy';
    const gameId = randomUUID()
    currentGameId = gameId
    attemptsLeft = MAX_ATTEMPTS
    res.status(201).json({ gameId });
});

app.post('/game/:gameId/guess', (req, res) => {
    const { gameId } = req.params;
    if (gameId !== currentGameId) {
        return res.status(404).json({ msg: 'No se encontró el juego' });
    }
    const { guessWord } = req.query;
    if (guessWord.length !== MAX_WORD_LENGTH) {
        return res.status(400).json({ msg: 'La palabra de adivinanza debe tener 5 letras' });
    }
    if (!checkIfValidWord(guessWord)) {
        return res.status(404).json({ msg: 'La palabra no es valida' });
    }
    const result = checkWord(guessWord, CORRECT_WORD);
    attemptsLeft--

    res.status(200).json({
        result: result,
        attemptsLeft,
        isGameWon: result === '22222',
    });
});

app.get('/game/:gameId', (req, res) => {
    const { gameId } = req.params;
    res.status(200).json({
        gameId,
        status: '0',
        attemptsLeft: 5,
        wordToGuess: 'world',
        guesses: [],
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
