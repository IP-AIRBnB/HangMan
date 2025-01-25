// Get references to DOM elements
const wordE1 = document.getElementById('word');
const wrongLettersE1 = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const topicSelectionE1 = document.getElementById('topic-selection');
const gameE1 = document.getElementById('game');
const currentTopicE1 = document.getElementById('current-topic');
const hintE1 = document.getElementById('hint');
const changeTopicBtn = document.getElementById('change-topic-button');

let selectedWord = '';
let selectedHint = '';
let selectedWordObj = {};
const correctLetters = [];
const wrongLetters = [];
let topicWords = [];
let maxWrongGuesses = 6; // Default to 6 wrong guesses

const figureParts = document.querySelectorAll(".figure-part");

// Topic selection
document.querySelectorAll('.topic-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const topic = btn.getAttribute('data-topic');
        loadTopic(topic);
    });
});

function loadTopic(topic) {
    fetch(`topics/${topic}.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load file');
            }
            return response.json();
        })
        .then(data => {
            topicWords = data;
            selectedWordObj = topicWords[Math.floor(Math.random() * topicWords.length)];
            selectedWordObj.topic = topic; // Store the topic for reloading
            selectedWord = selectedWordObj.word;
            selectedHint = selectedWordObj.hint;
            currentTopicE1.innerText = `Current Topic: ${topic.charAt(0).toUpperCase() + topic.slice(1)}`;
            displayWord();
            showHint();
            topicSelectionE1.style.display = 'none';
            gameE1.style.display = 'block';
        })
        .catch(() => {
            alert('Failed to load topic. Please try again.');
        });
}

function displayWord() {
    wordE1.innerHTML = `${selectedWord
        .split('')
        .map(
            letter => `
            <span class="letter">
            ${correctLetters.includes(letter) ? letter : ''}
            </span>
        `
        )
        .join('')}`;

    const innerWord = wordE1.innerText.replace(/\n/g, ''); // Get the displayed word without line breaks

    if (innerWord === selectedWord) {
        finalMessage.innerText = 'Congratulations! You won! 🎉';
        showPopup();
    }
}

function showHint() {
    hintE1.innerText = `Hint: ${selectedHint}`;
}

function updateWrongLetterE1() {
    wrongLettersE1.innerHTML = `${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''} ${wrongLetters.map(letter => `<span>${letter}</span>`)}`;
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;
        part.style.display = index < errors ? 'block' : 'none';
    });

    if (wrongLetters.length === figureParts.length) {
        finalMessage.innerText = 'Unfortunately, you lost. 😕';
        showPopup();
    }
}

function resetFigureParts() {
    figureParts.forEach(part => {
        part.style.display = 'none';
    });
}

function showNotification() {
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

function showPopup() {
    popup.style.display = 'flex'; // Show popup
}

function resetGame() {
    correctLetters.splice(0);
    wrongLetters.splice(0);
    resetFigureParts();
    wrongLettersE1.innerHTML = ''; // Clear wrong letters
    wordE1.innerHTML = ''; // Clear word display
    hintE1.innerText = ''; // Clear hint
    popup.style.display = 'none'; // Hide popup
}

//function for setting difficulty
function setDifficulty(selectedDifficulty) {
  if (selectedDifficulty === "easy") {
    maxWrongGuesses = 8; 
  } else if (selectedDifficulty === "medium") {
    maxWrongGuesses = 5;
  } else if (selectedDifficulty === "hard") {
    maxWrongGuesses = 3;
  }
  resetGame(); 
}

// Event listener for Change Topic button
changeTopicBtn.addEventListener('click', () => {
    resetGame();
    gameE1.style.display = 'none'; // Hide game screen
    topicSelectionE1.style.display = 'block'; // Show topic selection screen
});

// Event listener for Play Again button
playAgainBtn.addEventListener('click', () => {
    resetGame();
    if (selectedWordObj.topic) {
        loadTopic(selectedWordObj.topic);
    } else {
        alert('Failed to reload the topic. Please refresh the page.');
    }
});

// Event listener for keydown (guessing letters)
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

//Event Listeners for Difficulty Buttons
document.getElementById("easy-btn").addEventListener("click", () => {
  setDifficulty("easy");
});

document.getElementById("medium-btn").addEventListener("click", () => {
  setDifficulty("medium");
});

document.getElementById("hard-btn").addEventListener("click", () => {
  setDifficulty("hard");
});
