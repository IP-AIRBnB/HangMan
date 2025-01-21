const wordE1 = document.getElementById('word');
const words = ['application', 'programming', 'interface', 'wizard'];
let selectedWord = words[Math.floor(Math.random() * words.length)];
const correctLetters = [];

function displayWord() {
    wordE1.innerHTML = selectedWord
        .split('')
        .map(letter => `<span class="letter">${correctLetters.includes(letter) ? letter : ''}</span>`)
        .join('');
}
displayWord();
