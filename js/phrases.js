const phrases = {
    "Movies": [
        "The Shawshank Redemption", "The Godfather", "Pulp Fiction", "The Dark Knight", 
        "The Matrix", "Star Wars", "Jurassic Park", "The Lion King", "Avatar",
        "Back to the Future", "Indiana Jones", "Fight Club", "The Terminator"
    ],
    "TV Shows": [
        "Breaking Bad", "Game of Thrones", "Friends", "The Office", "Stranger Things",
        "The Walking Dead", "The Crown", "Westworld", "Black Mirror", "The Mandalorian"
    ],
    "Book Titles": [
        "To Kill a Mockingbird", "Pride and Prejudice", "The Great Gatsby",
        "The Hobbit", "The Catcher in the Rye", "Lord of the Flies"
    ],
    "Famous Quotes": [
        "To be or not to be", "I have a dream", "Life is like a box of chocolates",
        "May the force be with you", "Here's looking at you kid", "I'll be back"
    ]
};

function getRandomPhrase() {
    const categories = Object.keys(phrases);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const categoryPhrases = phrases[randomCategory];
    const randomPhrase = categoryPhrases[Math.floor(Math.random() * categoryPhrases.length)];
    
    return {
        category: randomCategory,
        phrase: randomPhrase
    };
}
