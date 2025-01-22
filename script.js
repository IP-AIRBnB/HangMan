const wordE1 = document.getElementById('word');
const wrongLettersE1 = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const changeTopicBtn = document.getElementById('change-topic-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const currentTopicE1 = document.getElementById('current-topic');
const hintE1 = document.getElementById('hint');

const figureParts = document.querySelectorAll(".figure-part");

let selectedWordObj;
let selectedWord;
let selectedHint;
let topicWords;
let correctLetters = [];
let wrongLetters = [];

// Dynamically load the topic file
function loadTopic(topic) {
    switch(topic) {
        case 'javascript':
            topicWords = javascriptTopic;
            break;
        case 'sports':
            topicWords = sportsTopic;
            break;
        case 'geography':
            topicWords = geographyTopic;
            break;
    }

    // Select a random word from the chosen topic
    selectedWordObj = topicWords[Math.floor(Math.random() * topicWords.length)];
    selectedWord = selectedWordObj.word;
    selectedHint = selectedWordObj.hint;

    currentTopicE1.innerText = `Current Topic: ${topic.charAt(0).toUpperCase() + topic.slice(1)}`;
    displayWord();
    showHint();
}

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

    if(innerWord === selectedWord) {
        finalMessage.innerText = 'Congratulations! You won! 😃';
        popup.style.display = 'flex';
    }
}

// Update the wrong letters
function updateWrongLetterE1() {
    wrongLettersE1.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;

        if (index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });

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

// Show hint
function showHint() {
    hintE1.innerText = `Hint: ${selectedHint}`;
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

// Restart game and play again
playAgainBtn.addEventListener('click', () => {
    correctLetters = [];
    wrongLetters = [];
    loadTopic('javascript'); // Reset to JavaScript as default topic
    popup.style.display = 'none';
});

// Change topic
changeTopicBtn.addEventListener('click', () => {
    const newTopic = prompt('Enter a topic: javascript, sports, geography');
    if (newTopic && ['javascript', 'sports', 'geography'].includes(newTopic)) {
        loadTopic(newTopic);
        popup.style.display = 'none';
    } else {
        alert('Invalid topic! Please choose from javascript, sports, or geography.');
    }
});

// Initialize game with a default topic
loadTopic('javascript');
