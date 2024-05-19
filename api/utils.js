const { allWords } = require("./allWords");

const checkWord = (word, correctWord) => {

    if (word === correctWord) {
        return "22222"
    }
    const correctWordArray = correctWord.split('');
    let result = ""
    word.split('').forEach((letter, index) => {

        if (letter === correctWordArray[index]) {
            result += "2"
        } else if (correctWordArray.includes(letter)) {
            result += "1"
        }
        else {
            result += "0"

        }
    }
    )
    return result

}

const checkIfValidWord = (wordToFind) => {
    return allWords.some(word => word === wordToFind)
}

module.exports = { checkWord, checkIfValidWord }