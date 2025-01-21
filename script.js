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

window.addEventListener('keydown', e => {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key.toLowerCase();
        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLetters();
            }
        }
    }
});

const figureParts = document.querySelectorAll('.figure-part');

function updateFigure() {
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;
        part.style.display = index < errors ? 'block' : 'none';
    });
}

function checkEndGame() {
    const innerWord = wordE1.innerText.replace(/\n/g, '');
    if (innerWord === selectedWord) {
        finalMessage.innerText = 'Congratulations! You won! 🎉';
        popup.style.display = 'flex';
    } else if (wrongLetters.length === figureParts.length) {
        finalMessage.innerText = `Unfortunately, you lost. 😢 The word was "${selectedWord}".`;
        popup.style.display = 'flex';
    }
}