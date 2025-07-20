# Hangman Game

A classic Hangman game implementation with a modern twist, featuring a responsive keyboard interface and canvas-based hangman visualization. This project was generated with the assistance of Claude Sonnet 3.5, an AI language model.

## Features

- Interactive on-screen keyboard with both letter and number/special character sections
- Physical keyboard support for easy input
- Canvas-based hangman visualization
- Multiple categories of phrases
- Responsive word display with individual letter slots
- Win/lose state handling
- Instant feedback on correct/incorrect guesses
- Play again functionality

## Technical Implementation

The game is built using vanilla JavaScript, HTML5, and CSS3, with the following key components:

### Technologies Used
- HTML5 Canvas for drawing the hangman
- Vanilla JavaScript for game logic
- CSS3 for styling and layout
- JSON for phrase storage

### Project Structure
```
hangman/
├── index.html          # Main game page
├── css/
│   └── style.css      # Game styling
└── js/
    ├── game.js        # Core game logic
    ├── phrases.js     # Phrase selection logic
    └── phrases.json   # Phrase database
```

## How to Play

1. Open `index.html` in a web browser
2. A random phrase will be selected and displayed as empty letter slots
3. Guess letters by either:
   - Clicking the on-screen keyboard buttons
   - Using your physical keyboard
4. Each incorrect guess adds a part to the hangman
5. You have 6 chances before the game ends
6. Win by guessing the complete phrase or lose when the hangman is complete
7. Click "Play Again" to start a new game

## Development Process

This game was developed through an iterative process with Claude Sonnet 3.5, focusing on:

1. Core game mechanics implementation
2. User interface design and responsiveness
3. Keyboard input handling (both virtual and physical)
4. Canvas drawing for the hangman visualization
5. Game state management
6. Win/lose condition handling

## Features and Technical Details

### Game Logic
- Object-oriented design using JavaScript classes
- Event-driven architecture for user interactions
- Case-insensitive letter matching
- Efficient state management using Sets for guessed letters

### User Interface
- Dual-section keyboard layout (letters and numbers/special characters)
- Visual feedback for correct/incorrect guesses
- Dynamic word display with individual letter slots
- Canvas-based hangman drawing
- Responsive status messages

### Input Handling
- Support for both click and keyboard events
- Prevent duplicate letter guesses
- Disabled buttons for used letters
- Event delegation for efficient event handling

## Future Improvements

Potential areas for enhancement:
- Add difficulty levels
- Implement scoring system
- Add sound effects
- Include animation effects
- Add more phrase categories
- Support for mobile touch events
- Local storage for game statistics

## Credits

- Game logic and implementation: Generated with Claude Sonnet 3.5
- Project structure and organization: AI-assisted development
- Phrase database: Custom curated content

## License

This project is open source and available under the MIT License.
