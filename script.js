// DOM Elements
const uploadArea = document.getElementById('uploadArea');
const photoUpload = document.getElementById('photoUpload');
const customMessage = document.getElementById('customMessage');
const addMessageBtn = document.getElementById('addMessageBtn');
const messagePreview = document.getElementById('messagePreview');
const promiseTitle = document.getElementById('promiseTitle');
const promiseDescription = document.getElementById('promiseDescription');
const addPromiseBtn = document.getElementById('addPromiseBtn');
const yesBtn = document.getElementById('yesBtn');
const maybeBtn = document.getElementById('maybeBtn');
const forgivenessMessage = document.getElementById('forgivenessMessage');
const currentDate = document.getElementById('currentDate');

// Debug: Check if elements exist
console.log("Script loaded!");
console.log("Yes button:", yesBtn);
console.log("Maybe button:", maybeBtn);
console.log("Forgiveness message:", forgivenessMessage);

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { 
            transform: translateX(100%); 
            opacity: 0; 
        }
        to { 
            transform: translateX(0); 
            opacity: 1; 
        }
    }
    
    @keyframes slideOut {
        from { 
            transform: translateX(0); 
            opacity: 1; 
        }
        to { 
            transform: translateX(100%); 
            opacity: 0; 
        }
    }
    
    @keyframes confettiFall {
        0% { transform: translateY(0) rotate(0deg); }
        100% { transform: translateY(100vh) rotate(360deg); }
    }
    
    .notification {
        position: fixed !important;
        top: 20px !important;
        right: 20px !important;
        padding: 15px 25px !important;
        border-radius: 10px !important;
        color: white !important;
        font-weight: bold !important;
        z-index: 10000 !important;
        animation: slideIn 0.3s ease-out !important;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2) !important;
        font-size: 16px !important;
    }
    
    .hidden {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
    }
    
    @keyframes floatUp {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0.3;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Set current date
if (currentDate) {
    currentDate.textContent = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Photo Upload Functionality
if (uploadArea) {
    uploadArea.addEventListener('click', () => {
        photoUpload.click();
    });
}

if (photoUpload) {
    photoUpload.addEventListener('change', (e) => {
        const files = e.target.files;
        const gallery = document.querySelector('.gallery');
        
        if (gallery) {
            Array.from(files).forEach(file => {
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    
                    reader.onload = (event) => {
                        const img = document.createElement('img');
                        img.src = event.target.result;
                        img.alt = 'Memory photo';
                        img.style.cssText = `
                            width: 250px;
                            height: 250px;
                            object-fit: contain;
                            background: linear-gradient(135deg, #ff6b6b, #ff8fab);
                            border-radius: 15px;
                            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
                            transition: transform 0.3s;
                            flex-shrink: 0;
                        `;
                        
                        gallery.appendChild(img);
                        
                        // Add click event for modal
                        img.addEventListener('click', function() {
                            const modal = document.createElement('div');
                            modal.style.cssText = `
                                position: fixed;
                                top: 0;
                                left: 0;
                                width: 100%;
                                height: 100%;
                                background: rgba(0,0,0,0.9);
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                z-index: 2000;
                                cursor: pointer;
                            `;
                            
                            const modalImg = document.createElement('img');
                            modalImg.src = this.src;
                            modalImg.style.cssText = `
                                max-width: 90%;
                                max-height: 90%;
                                border-radius: 10px;
                            `;
                            
                            modal.appendChild(modalImg);
                            document.body.appendChild(modal);
                            
                            modal.addEventListener('click', () => {
                                document.body.removeChild(modal);
                            });
                        });
                    };
                    
                    reader.readAsDataURL(file);
                }
            });
            
            // Reset input to allow uploading same file again
            photoUpload.value = '';
        }
    });
}

// Add Custom Message
if (addMessageBtn && customMessage) {
    addMessageBtn.addEventListener('click', () => {
        const message = customMessage.value.trim();
        
        if (message) {
            const messagesContainer = document.querySelector('.messages-container');
            if (messagesContainer) {
                const messageCard = document.createElement('div');
                messageCard.className = 'message-card';
                messageCard.innerHTML = `
                    <div class="message-icon">
                        <i class="fas fa-pen-fancy"></i>
                    </div>
                    <h3>My Personal Note</h3>
                    <p>${message}</p>
                `;
                
                messagesContainer.appendChild(messageCard);
                
                // Clear textarea
                customMessage.value = '';
                
                // Show preview
                if (messagePreview) {
                    messagePreview.innerHTML = `<p style="color: green; margin-top: 10px;">✓ Message added successfully!</p>`;
                    setTimeout(() => {
                        messagePreview.innerHTML = '';
                    }, 3000);
                }
                
                showNotification('Message added successfully!', 'success');
            }
        }
    });
}

// Add Custom Promise
if (addPromiseBtn && promiseTitle && promiseDescription) {
    addPromiseBtn.addEventListener('click', () => {
        const title = promiseTitle.value.trim();
        const description = promiseDescription.value.trim();
        
        if (title && description) {
            const promisesContainer = document.querySelector('.promises-container');
            if (promisesContainer) {
                const promises = promisesContainer.querySelectorAll('.promise');
                const promiseCount = promises.length + 1;
                
                const promiseDiv = document.createElement('div');
                promiseDiv.className = 'promise';
                promiseDiv.innerHTML = `
                    <div class="promise-number">${promiseCount}</div>
                    <h3>${title}</h3>
                    <p>${description}</p>
                `;
                
                promisesContainer.appendChild(promiseDiv);
                
                // Clear inputs
                promiseTitle.value = '';
                promiseDescription.value = '';
                
                showNotification('Promise added!', 'success');
            }
        }
    });
}

// FORGIVENESS BUTTONS - FIXED VERSION
if (yesBtn) {
    console.log("Adding click event to Yes button");
    yesBtn.addEventListener('click', function() {
        console.log("Yes button clicked!");
        
        // Show notification first
        showNotification('❤️ Thank you babu! Love you soo much! ❤️', 'success');
        
        // Then show the forgiveness message
        if (forgivenessMessage) {
            console.log("Showing forgiveness message");
            forgivenessMessage.innerHTML = `
                <h3>Thank you babu🩷</h3>
                <p>Tumne mujhe maaf kar diya! Mai bhot khush hu aur tumhe bhot pyaar krta hu! 🥰</p>
                <p>Aaj se mai tumhara nanna munna baccha ban gaya! 💕</p>
            `;
            
            // Remove hidden class and show
            forgivenessMessage.classList.remove('hidden');
            forgivenessMessage.style.display = 'block';
            forgivenessMessage.style.visibility = 'visible';
            forgivenessMessage.style.opacity = '1';
            
            // Show confetti
            showConfetti();
            
            // Change the "Yes" button
            this.innerHTML = 'Main hamesha tumhara rahunga! ❤️';
            this.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
            this.disabled = true;
            
            // Hide the "Maybe" button
            if (maybeBtn) {
                maybeBtn.style.display = 'none';
            }
        } else {
            console.log("Forgiveness message element not found!");
        }
    });
} else {
    console.log("Yes button not found in DOM!");
}

if (maybeBtn) {
    console.log("Adding click event to Maybe button");
    maybeBtn.addEventListener('click', function() {
        console.log("Maybe button clicked!");
        
        showNotification("Koi baat nhi 😔, main tumhara intezar karunga.", 'info');
        
        // Change button text and color
        this.innerHTML = 'Thoda aur time chahiye... 😔';
        this.style.background = '#ffa502';
        this.style.color = 'white';
        this.style.border = 'none';
        
        // Show another message after 2 seconds
        setTimeout(() => {
            showNotification("Tum jitna time lo, main intezar karunga... ❤️", 'info');
        }, 2000);
    });
} else {
    console.log("Maybe button not found in DOM!");
}

// Notification System
function showNotification(message, type) {
    console.log("Showing notification:", message);
    
    // Remove any existing notification first
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        document.body.removeChild(existingNotification);
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Confetti Effect
function showConfetti() {
    console.log("Showing confetti!");
    const confettiCount = 100;
    const confettiContainer = document.querySelector('.floating-hearts');
    
    if (!confettiContainer) {
        console.log("Confetti container not found!");
        return;
    }
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.innerHTML = '❤️';
        confetti.style.cssText = `
            position: fixed;
            font-size: ${20 + Math.random() * 20}px;
            left: ${Math.random() * 100}%;
            top: -50px;
            opacity: 0.8;
            animation: confettiFall ${3 + Math.random() * 3}s linear forwards;
            z-index: 1000;
            pointer-events: none;
        `;
        
        confettiContainer.appendChild(confetti);
        
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 5000);
    }
}

// Load saved data from localStorage and initialize
window.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded!");
    
    // Add smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add click events to existing gallery images for modal
    const galleryImages = document.querySelectorAll('.gallery img');
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2000;
                cursor: pointer;
            `;
            
            const modalImg = document.createElement('img');
            modalImg.src = this.src;
            modalImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                border-radius: 10px;
            `;
            
            modal.appendChild(modalImg);
            document.body.appendChild(modal);
            
            modal.addEventListener('click', () => {
                document.body.removeChild(modal);
            });
        });
    });
    
    // Add more floating hearts
    createFloatingHearts();
});

// Create floating hearts
function createFloatingHearts() {
    const heartsContainer = document.querySelector('.floating-hearts');
    if (!heartsContainer) return;
    
    const heartCount = 15;
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.cssText = `
            position: absolute;
            font-size: ${15 + Math.random() * 25}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${0.1 + Math.random() * 0.2};
            animation: floatUp ${15 + Math.random() * 15}s linear infinite;
            animation-delay: ${Math.random() * 10}s;
            z-index: -1;
            pointer-events: none;
        `;
        
        heartsContainer.appendChild(heart);
    }
}

// Make sure forgiveness message is hidden initially
window.addEventListener('load', () => {
    console.log("Page fully loaded!");
    if (forgivenessMessage) {
        forgivenessMessage.style.display = 'none';
        forgivenessMessage.classList.add('hidden');
        console.log("Forgiveness message hidden on load");
    }
});