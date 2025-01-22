# Internet Programming Assignment - Hangman Game

## Overview
This project is a browser-based implementation of the classic Hangman game. It allows players to choose from various topics and guess the letters of a hidden word based on hints provided. The game was developed using HTML, CSS, and JavaScript.

## Features
- **Topic Selection**: Users can select one of six topics to play:
  - JavaScript
  - Sports
  - Geography
  - Landmarks
  - Famous Movies
  - Space Exploration

- **Interactive Gameplay**: The player guesses letters one at a time, with correct guesses revealing the word and incorrect guesses progressing the hangman figure.

- **Hints**: Each word comes with a hint to assist the player.

- **Game Over Logic**: The game provides feedback for both wins and losses, with an option to replay or change topics.

## File Structure
```
project-directory/
|-- index.html          # The main HTML file
|-- styles.css          # The CSS file for styling
|-- script.js           # The main JavaScript file for game logic
|-- topics/             # Folder containing JSON files for each topic
    |-- java-script.json
    |-- sports.json
    |-- geography.json
    |-- landmarks.json
    |-- famous-movies.json
    |-- space-exploration.json
```

## Setup
To run this project locally:
1. Clone the repository or download the source code.
2. Ensure all files are in the correct structure as listed above.
3. Open `index.html` in any modern web browser to start the game.

## How to Play
1. Choose a topic from the available options.
2. Guess the letters of the hidden word by typing them on your keyboard.
3. Correct guesses reveal the letters in the word; incorrect guesses progress the hangman figure.
4. You win if you complete the word before the figure is fully drawn. You lose if the figure is fully drawn before guessing the word.

## Topics and Words
Each topic is stored in a JSON file inside the `topics/` directory. These files contain a list of word-hint pairs. You can add new words to any topic or create new topics by following the same JSON structure.

### Example JSON Structure:
```json
[
    {
        "word": "exampleword",
        "hint": "This is an example hint."
    },
    {
        "word": "anotherword",
        "hint": "This is another example hint."
    }
]
```

## Customization
1. **Adding New Topics**:
   - Create a new JSON file in the `topics/` folder.
   - Use the JSON structure shown above.
   - Add a button in the `index.html` file for the new topic.

2. **Styling**:
   - Modify `styles.css` to change the appearance of the game.

3. **Game Logic**:
   - Update `script.js` to enhance gameplay or add features.

## Future Enhancements
- Add difficulty levels by introducing different word lengths or limiting the number of hints.
- Include a leaderboard to track high scores.
- Add multiplayer functionality.

## License
This project is for educational purposes as part of an Internet Programming assignment and is free to use and modify.

## Acknowledgments
- Thanks to the course instructors for the project guidelines.
- Inspired by classic Hangman games played on paper.

---
Enjoy playing and improving your knowledge with the Hangman Game!

