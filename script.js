const wordE1 = document.getElementById('word');
const words = ['application', 'programming', 'interface', 'wizard'];
let selectedWord = words[Math.floor(Math.random() * words.length)];
const correctLetters = [];
const wrongLetters = [];
const wrongLettersE1 = document.getElementById('wrong-letters');

function updateWrongLetters() {
    wrongLettersE1.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`).join('')}
    `;
}

function displayWord() {
    wordE1.innerHTML = selectedWord
        .split('')
        .map(letter => `<span class="letter">${correctLetters.includes(letter) ? letter : ''}</span>`)
        .join('');
}
displayWord();
