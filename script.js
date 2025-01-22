const wordE1 = document.getElementById('word');
const wrongLettersE1 = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const hintE1 = document.getElementById('hint'); // Add a reference to the hint element

const figureParts = document.querySelectorAll(".figure-part");

const wordHints = {
    'application': 'A program designed to perform a group of tasks.',
    'programming': 'The process of creating software using code.',
    'interface': 'A shared boundary across which two separate components interact.',
    'wizard': 'A user interface that automates complex tasks.'
    // Add more words and corresponding hints as necessary
};

const words = Object.keys(wordHints); // Get all the words from the wordHints object

let selectedWord = words[Math.floor(Math.random() * words.length)];
let selectedHint = wordHints[selectedWord]; // Get the corresponding hint for the selected word

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

    selectedWord = words[Math.floor(Math.random() * words.length)];
    selectedHint = wordHints[selectedWord]; // Get the new hint for the new word

    displayWord();
    updateWrongLetterE1();
    showHint(); // Display the new hint

    popup.style.display = 'none';
});

// Display the word and hint when the game starts
displayWord();
showHint();
