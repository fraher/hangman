class HangmanGame {
    constructor() {
        this.canvas = document.getElementById('hangman-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.wordDisplay = document.getElementById('word-display');
        this.categoryDisplay = document.getElementById('category');
        this.lettersContainer = document.getElementById('letters-container');
        this.gameStatus = document.getElementById('game-status');
        
        this.maxTries = 6;
        this.currentTries = 0;
        this.guessedLetters = new Set();
        this.gameEnded = false;
        
        // Bind the keyboard handler to this instance
        this.handleKeydown = this.handleKeydown.bind(this);
        this.setupKeyboardHandler();
        
        this.initializeGame();
    }
    
    setupKeyboardHandler() {
        // Remove any existing handler first
        document.removeEventListener('keydown', this.handleKeydown);
        // Add the new handler
        document.addEventListener('keydown', this.handleKeydown);
    }
    
    handleKeydown(e) {
        // Prevent any default behavior immediately for letter keys
        if (e.key.length === 1) {
            e.preventDefault();
        }
        
        if (this.gameEnded) return; // Don't handle keys if game is over
        
        // Only handle single characters
        if (e.key.length !== 1) return;
        
        const button = Array.from(this.lettersContainer.getElementsByClassName('letter-btn'))
            .find(btn => btn.textContent.toUpperCase() === e.key.toUpperCase());
            
        if (button && !button.disabled) {
            this.guessLetter(button.textContent);
        }
    }

    initializeGame() {
        // Reset game state
        this.currentTries = 0;
        this.guessedLetters.clear();
        this.gameEnded = false;
        
        // Get new random phrase
        const randomSelection = getRandomPhrase();
        this.currentPhrase = randomSelection.phrase;  // Keep original case
        this.currentCategory = randomSelection.category;
        
        // Initialize display
        this.updateWordDisplay();
        this.categoryDisplay.textContent = `Category: ${this.currentCategory}`;
        this.createLetterButtons();
        this.drawGallows();
        
        this.gameStatus.textContent = '';
    }

    createLetterButtons() {
        this.lettersContainer.innerHTML = '';
        
        // Create keyboard rows container
        const keyboardContainer = document.createElement('div');
        keyboardContainer.className = 'keyboard-container';
        
        // Letters section
        const lettersSection = document.createElement('div');
        lettersSection.className = 'keyboard-section';
        
        // Add A-Z letters in order
        for (let i = 65; i <= 90; i++) {
            this.createButton(String.fromCharCode(i), lettersSection);
        }
        keyboardContainer.appendChild(lettersSection);
        
        // Add a divider
        const divider = document.createElement('div');
        divider.className = 'keyboard-divider';
        keyboardContainer.appendChild(divider);
        
        // Other characters section
        const othersSection = document.createElement('div');
        othersSection.className = 'keyboard-section';
        
        // Add numbers
        for (let i = 0; i <= 9; i++) {
            this.createButton(String(i), othersSection);
        }
        
        // Add special characters
        ["'", "-", "&", ".", "!", "?"].forEach(char => {
            this.createButton(char, othersSection);
        });
        keyboardContainer.appendChild(othersSection);
        
        this.lettersContainer.appendChild(keyboardContainer);
    }
    
    createButton(letter, container) {
        const button = document.createElement('button');
        button.textContent = letter;
        button.className = 'letter-btn';
        button.addEventListener('click', () => this.guessLetter(letter));
        container.appendChild(button);
    }

    guessLetter(letter) {
        const upperChar = letter.toUpperCase();
        
        // If letter was already guessed, do nothing
        if (this.guessedLetters.has(upperChar)) return;
        this.guessedLetters.add(upperChar);
        
        // Find button for this letter
        const button = Array.from(this.lettersContainer.getElementsByClassName('letter-btn'))
            .find(btn => btn.textContent.toUpperCase() === upperChar);
        
        // Disable the button to prevent multiple clicks
        if (button) {
            button.disabled = true;
        }
        
        // Convert phrase to uppercase for comparison
        const upperPhrase = this.currentPhrase.toUpperCase();
        
        // Check if the letter appears anywhere in the phrase
        if (upperPhrase.includes(upperChar)) {
            if (button) button.classList.add('correct');
            this.updateWordDisplay();
            
            if (this.checkWin()) {
                this.endGame(true);
            }
        } else {
            if (button) button.classList.add('wrong');
            this.currentTries++;
            this.updateHangman();
            
            if (this.currentTries >= this.maxTries) {
                this.endGame(false);
            }
        }
    }

    updateWordDisplay() {
        // Split the phrase into words and handle each word separately
        const words = this.currentPhrase.split(' ');
        const wordElements = words.map(word => {
            const letters = word.split('').map(letter => {
                // Check if we've guessed this letter (case insensitive)
                const letterGuessed = this.guessedLetters.has(letter.toUpperCase());
                // If guessed, show the letter in uppercase, otherwise empty
                const content = letterGuessed ? letter.toUpperCase() : '';
                return `<span class="letter">${content}</span>`;
            });
            return `<div class="word">${letters.join('')}</div>`;
        });
        
        this.wordDisplay.innerHTML = wordElements.join('');
    }

    checkWin() {
        return this.currentPhrase
            .split('')
            .every(letter => letter === ' ' || this.guessedLetters.has(letter.toUpperCase()));
    }

    endGame(won) {
        this.gameEnded = true; // Mark game as ended
        const message = won ? 'Congratulations! You won!' : `Game Over! The phrase was: ${this.currentPhrase.toUpperCase()}`;
        
        // Create game over message and button container
        const gameOverContainer = document.createElement('div');
        gameOverContainer.className = 'game-over-container';
        
        // Create message paragraph
        const messageP = document.createElement('p');
        messageP.textContent = message;
        gameOverContainer.appendChild(messageP);
        
        // Set the message in the original location
        this.gameStatus.textContent = message;
        
        // Create restart buttons for both locations
        const createRestartButton = () => {
            const button = document.createElement('button');
            button.textContent = 'Play Again';
            button.className = 'play-again-btn';
            button.addEventListener('click', () => {
                this.gameEnded = false;
                this.initializeGame();
                // Remove the top game over container when restarting
                const existingContainer = document.querySelector('.game-over-container');
                if (existingContainer) {
                    existingContainer.remove();
                }
            });
            return button;
        };
        
        // Add button to both containers
        this.gameStatus.appendChild(createRestartButton());
        gameOverContainer.appendChild(createRestartButton());
        
        // Insert the game over container at the top of the game
        document.querySelector('#hangman-canvas').insertAdjacentElement('beforebegin', gameOverContainer);
        
        // Disable all letter buttons
        const buttons = this.lettersContainer.getElementsByClassName('letter-btn');
        for (const button of buttons) {
            button.disabled = true;
        }
    }

    drawGallows() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.strokeStyle = '#333';
        this.ctx.lineWidth = 2;
        
        // Base
        this.ctx.beginPath();
        this.ctx.moveTo(50, 250);
        this.ctx.lineTo(150, 250);
        this.ctx.stroke();
        
        // Vertical beam
        this.ctx.beginPath();
        this.ctx.moveTo(100, 250);
        this.ctx.lineTo(100, 50);
        this.ctx.stroke();
        
        // Horizontal beam
        this.ctx.beginPath();
        this.ctx.moveTo(100, 50);
        this.ctx.lineTo(200, 50);
        this.ctx.stroke();
        
        // Rope
        this.ctx.beginPath();
        this.ctx.moveTo(200, 50);
        this.ctx.lineTo(200, 80);
        this.ctx.stroke();
    }

    updateHangman() {
        switch (this.currentTries) {
            case 1: // Head
                this.ctx.beginPath();
                this.ctx.arc(200, 100, 20, 0, Math.PI * 2);
                this.ctx.stroke();
                break;
            case 2: // Body
                this.ctx.beginPath();
                this.ctx.moveTo(200, 120);
                this.ctx.lineTo(200, 180);
                this.ctx.stroke();
                break;
            case 3: // Left arm
                this.ctx.beginPath();
                this.ctx.moveTo(200, 140);
                this.ctx.lineTo(170, 160);
                this.ctx.stroke();
                break;
            case 4: // Right arm
                this.ctx.beginPath();
                this.ctx.moveTo(200, 140);
                this.ctx.lineTo(230, 160);
                this.ctx.stroke();
                break;
            case 5: // Left leg
                this.ctx.beginPath();
                this.ctx.moveTo(200, 180);
                this.ctx.lineTo(170, 210);
                this.ctx.stroke();
                break;
            case 6: // Right leg
                this.ctx.beginPath();
                this.ctx.moveTo(200, 180);
                this.ctx.lineTo(230, 210);
                this.ctx.stroke();
                break;
        }
    }
}

// Start the game when the page loads
window.addEventListener('load', () => {
    const game = new HangmanGame();
});
