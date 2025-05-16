const quotes = [
    "Idk why we picked this textbook",
    "Go fuck off, you're nowhere near as significant as me",
    "If there are any terrorists in this class, 151 Front Street W in Toronto is a great place to blow up",
    "I wouldn't show you porn either",
    "Don't go around telling your parents you have a physical connection with your teacher",
    "Inspired me to kidnap somebody and write a demand letter",
    "You dumbasses always think more is better",
    "WiFi is a big swimming pool and there are still people peeing in it",
    "I think I'm getting some kind of senile disease",
    "During class you can walk out any time. Hopefully in a dramatic fashion",
    "Let's say I go crazy, that actually happened a couple years ago",
    "We got a bunch of idiots, their full title is programmer",
    "This network should have been taken out and shot",
    "WiFi is completely useless",
    "I hate you all (Oops, did I say that?)",
    "Why the hell do we use this useless piece of shit",
    "Anyone still listen to radio? ...You do! Ha! Loser.",
    "Okay, I'm officially fucking old now"
];

const emojis = ["💀", "👨‍🏫", "😈", "👻", "🧛", "👽"];

let currentQuoteIndex = -1;
let previousQuoteIndex = -1;

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote-text');
const newQuoteBtn = document.getElementById('new-quote-btn');

function getRandomQuote() {
    // Ensure we don't repeat the same quote twice in a row
    do {
        currentQuoteIndex = Math.floor(Math.random() * quotes.length);
    } while (currentQuoteIndex === previousQuoteIndex && quotes.length > 1);
    
    previousQuoteIndex = currentQuoteIndex;
    return quotes[currentQuoteIndex];
}

function getRandomEmoji() {
    return emojis[Math.floor(Math.random() * emojis.length)];
}

function displayNewQuote() {
    // First, fade out the current quote
    quoteContainer.classList.remove('show');
    quoteContainer.classList.add('hide');
    
    setTimeout(() => {
        // Get new quote and update the display
        const newQuote = getRandomQuote();
        const randomEmoji = getRandomEmoji();
        
        quoteText.innerHTML = `"${newQuote}" <span class="text-gray-400">${randomEmoji}</span>`;
        
        // Then fade in the new quote
        quoteContainer.classList.remove('hide');
        quoteContainer.classList.add('show');
    }, 300);
}

// Initialize with first quote
window.addEventListener('load', () => {
    setTimeout(() => {
        displayNewQuote();
        createParticles();
    }, 200);
});

// Button click handler
newQuoteBtn.addEventListener('click', displayNewQuote);

// Automatically focus button on page load
window.onload = () => {
    newQuoteBtn.focus(); 
};

// Keyboard accessibility
newQuoteBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        displayNewQuote();
    }
});

// Create floating particles background
function createParticles() {
    const particleCount = 40;
    const container = document.body;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size between 1px and 3px
        const size = Math.random() * 2 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random animation
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
        
        container.appendChild(particle);
    }
    
    // Add animation for particles
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes float {
            0% {
                transform: translate(0, 0) rotate(0deg);
                opacity: 1;
            }
            50% {
                opacity: 0.5;
            }
            100% {
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(${Math.random() * 360}deg);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
}