const quotes = [
    "Idk why we picked this textbook",
    "Go fuck off, you're nowhere near as significant as me",
    "If there are any terrorists in this class, 151 Front Street W is a great place to blow up",
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
let usedQuotes = new Set(); // Track used quotes to ensure better distribution

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote-text');
const newQuoteBtn = document.getElementById('new-quote-btn');
const disclaimerModal = document.getElementById('disclaimer-modal');
const mainContent = document.getElementById('main-content');
const footer = document.getElementById('footer');
const acceptDisclaimerBtn = document.getElementById('accept-disclaimer');

// Handle disclaimer acceptance
acceptDisclaimerBtn.addEventListener('click', () => {
    disclaimerModal.style.display = 'none';
    mainContent.classList.remove('hidden');
    footer.classList.remove('hidden');
    displayNewQuote();
    createParticles();
});

function getRandomQuote() {
    // If we've used all quotes, reset the used quotes set
    if (usedQuotes.size === quotes.length) {
        usedQuotes.clear();
    }
    
    // Get available quotes (those not in usedQuotes)
    const availableQuotes = quotes.filter((_, index) => !usedQuotes.has(index));
    
    // Select a random quote from available quotes
    const randomIndex = Math.floor(Math.random() * availableQuotes.length);
    const selectedQuoteIndex = quotes.indexOf(availableQuotes[randomIndex]);
    
    // Add the selected quote to used quotes
    usedQuotes.add(selectedQuoteIndex);
    
    return quotes[selectedQuoteIndex];
}

function getRandomEmoji() {
    return emojis[Math.floor(Math.random() * emojis.length)];
}

// Share functionality
const shareBtn = document.getElementById('share-btn');
let currentQuote = '';

async function generateQuoteImage() {
    // Create canvas with higher resolution
    const scale = 2; // Scale factor for retina displays
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size with higher resolution
    canvas.width = 800 * scale;
    canvas.height = 400 * scale;
    
    // Scale context to match the higher resolution
    ctx.scale(scale, scale);
    
    // Enable text antialiasing
    ctx.imageSmoothingEnabled = true;
    ctx.textRendering = 'geometricPrecision';
    
    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width / scale, canvas.height / scale);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(1, '#16213e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width / scale, canvas.height / scale);
    
    // Add particles effect with improved rendering
    for (let i = 0; i < 30; i++) {
        const x = Math.random() * (canvas.width / scale);
        const y = Math.random() * (canvas.height / scale);
        const size = Math.random() * 2 + 1;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Configure text with improved rendering
    ctx.textAlign = 'center';
    ctx.fillStyle = 'white';
    
    // Add title with improved font
    ctx.font = 'bold 32px Inter, system-ui, -apple-system, sans-serif';
    ctx.fillText('Professor Quote Machine', (canvas.width / scale) / 2, 60);
    
    // Add quote with improved font and line height
    ctx.font = '24px Inter, system-ui, -apple-system, sans-serif';
    const maxWidth = (canvas.width / scale) - 100;
    const words = currentQuote.split(' ');
    let line = '';
    let y = 150;
    const lineHeight = 40;
    
    for (let word of words) {
        const testLine = line + word + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && line !== '') {
            ctx.fillText(line, (canvas.width / scale) / 2, y);
            line = word + ' ';
            y += lineHeight;
        } else {
            line = testLine;
        }
    }
    ctx.fillText(line, (canvas.width / scale) / 2, y);
    
    // Add warning text with improved font
    ctx.font = '16px Inter, system-ui, -apple-system, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    const warningText = '⚠️ These quotes are made up - Not real quotes from anyone';
    ctx.fillText(warningText, (canvas.width / scale) / 2, y + 60);
    
    // Add website URL with improved font
    ctx.font = '14px Inter, system-ui, -apple-system, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.fillText('professor-quote-machine.com', (canvas.width / scale) / 2, (canvas.height / scale) - 30);
    
    // Return high-quality PNG
    return canvas.toDataURL('image/png', 1.0);
}

async function shareQuote() {
    try {
        const imageData = await generateQuoteImage();
        
        // Convert base64 to blob
        const response = await fetch(imageData);
        const blob = await response.blob();
        
        // Create file from blob
        const file = new File([blob], 'professor-quote.png', { type: 'image/png' });
        
        if (navigator.share) {
            await navigator.share({
                title: 'Professor Quote Machine',
                text: 'Check out this professor quote!',
                files: [file]
            });
        } else {
            // Fallback: Download the image
            const link = document.createElement('a');
            link.href = imageData;
            link.download = 'professor-quote.png';
            link.click();
        }
    } catch (err) {
        if (err.name !== 'AbortError') {
            console.error('Error sharing:', err);
        }
    }
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

// Remove the window.onload event since we now handle initialization in the disclaimer acceptance
window.onload = () => {
    newQuoteBtn.focus();
};

function displayNewQuote() {
    // First, fade out the current quote
    quoteContainer.classList.remove('show');
    quoteContainer.classList.add('hide');
    
    setTimeout(() => {
        // Get new quote and update the display
        const newQuote = getRandomQuote();
        currentQuote = newQuote; // Store current quote for sharing
        const randomEmoji = getRandomEmoji();
        
        quoteText.innerHTML = `"${newQuote}" <span class="text-gray-400">${randomEmoji}</span>`;
        
        // Then fade in the new quote
        quoteContainer.classList.remove('hide');
        quoteContainer.classList.add('show');
    }, 300);
}

// Add click handler for share button
shareBtn.addEventListener('click', shareQuote);

// Add keyboard accessibility for share button
shareBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        shareQuote();
    }
});