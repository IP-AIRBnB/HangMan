const wordE1 = document.getElementById('word');
const wrongLettersE1 = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const hintE1 = document.getElementById('hint'); // Reference to the hint element

const figureParts = document.querySelectorAll(".figure-part");

// Updated wordList with word and hint
const wordList = [
    { word: 'application', hint: 'A software designed to perform a specific task.' },
    { word: 'programming', hint: 'The process of writing computer code.' },
    { word: 'interface', hint: 'A point where two systems meet and interact.' },
    { word: 'wizard', hint: 'A person skilled in magic or a computing expert.' },
    { word: 'variable', hint: 'A named container for storing data.' },
    { word: 'function', hint: 'A block of code designed to perform a task.' },
    { word: 'array', hint: 'A data structure used to store multiple values.' },
    { word: 'object', hint: 'A collection of properties and methods.' },
    { word: 'boolean', hint: 'A data type with two possible values: true or false.' },
    { word: 'method', hint: 'A function that is a property of an object.' },
    { word: 'loop', hint: 'A programming structure that repeats a block of code.' },
    { word: 'event', hint: 'An action that is handled by a function in JavaScript.' },
    { word: 'promise', hint: 'A way to handle asynchronous operations in JavaScript.' },
    { word: 'debug', hint: 'The process of identifying and fixing issues in code.' },
    { word: 'parameter', hint: 'A variable used in a function to accept input.' },
    { word: 'constructor', hint: 'A special function used to create and initialize an object.' },
    { word: 'class', hint: 'A blueprint for creating objects with specific properties and methods.' },
    { word: 'DOM', hint: 'A programming interface for web documents.' },
    { word: 'async', hint: 'A keyword used to define functions that return a promise.' },
    { word: 'await', hint: 'A keyword used to pause the execution of an async function until a promise resolves.' }
];

// Select a random word from wordList
let selectedWordObj = wordList[Math.floor(Math.random() * wordList.length)];
let selectedWord = selectedWordObj.word;
let selectedHint = selectedWordObj.hint;

const correctLetters = [];
const wrongLetters = [];

// Show hidden word
function displayWord() {
    wordE1.innerHTML = `
    ${selectedWord
    .split('')
    .map(
        letter =>`
        <span class="letter">
        ${correctLetters.includes(letter) ? letter : ''}
        </span>
        `
    )
    .join('')}
    `;

    const innerWord = wordE1.innerText.replace(/\n/g, '');

    if(innerWord === selectedWord){
        finalMessage.innerText = 'Congratulations! You won! 😃';
        popup.style.display = 'flex';
    }
}

// Update the wrong letters
function updateWrongLetterE1() {
    // Display wrong letters
    wrongLettersE1.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    // Display parts
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;

        if (index < errors) {
            part.style.display = 'block';
        }
        else {
            part.style.display = 'none';
        }
    });

    // Check if lost
    if (wrongLetters.length === figureParts.length) {
        finalMessage.innerText = 'Unfortunately you lost. 😕';
        popup.style.display = 'flex';
    }
}

// Show notification
function showNotification() {
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

// Keydown letter press
window.addEventListener('keydown', e => {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;

        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);

                displayWord();
            } else {
                showNotification();
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);

                updateWrongLetterE1();
            } else {
                showNotification();
            }
        }
    }
});

// Show hint for the current word
function showHint() {
    hintE1.innerText = `Hint: ${selectedHint}`;
}

// Restart game and play again
playAgainBtn.addEventListener('click', () => {
    // Empty arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);

    // Select a new word and hint
    selectedWordObj = wordList[Math.floor(Math.random() * wordList.length)];
    selectedWord = selectedWordObj.word;
    selectedHint = selectedWordObj.hint;

    displayWord();
    updateWrongLetterE1();
    showHint(); // Display the new hint

    popup.style.display = 'none';
});

// Display the word and hint when the game starts
displayWord();
showHint();
