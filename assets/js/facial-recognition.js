document.addEventListener('DOMContentLoaded', function() {
    // Initialize facial recognition page
    initializeRecognitionPage();
    
    // Setup interactive elements
    setupInteractivity();
});

function initializeRecognitionPage() {
    // Animate result cards on load
    animateResultCards();
    
    // Setup demo data
    loadDemoResults();
}

function animateResultCards() {
    const cards = document.querySelectorAll('.result-card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
        }, index * 100);
    });
}

function setupInteractivity() {
    // File upload functionality
    const fileUpload = document.getElementById('fileUpload');
    const uploadBtn = document.querySelector('.upload-btn');
    
    if (fileUpload && uploadBtn) {
        fileUpload.addEventListener('change', handleFileUpload);
    }
    
    // Filter changes
    const filters = document.querySelectorAll('.filter-group select, .filter-group input');
    filters.forEach(filter => {
        filter.addEventListener('change', applyFilters);
    });
    
    // Process button
    const processBtn = document.querySelector('.process-btn');
    if (processBtn) {
        processBtn.addEventListener('click', processRecognition);
    }
    
    // Export buttons
    const exportBtns = document.querySelectorAll('.export-btn');
    exportBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const format = this.textContent;
            exportData(format);
        });
    });
}

function triggerFileUpload() {
    const fileInput = document.getElementById('fileUpload');
    if (fileInput) {
        fileInput.click();
    }
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        // Simulate upload process
        const uploadBtn = document.querySelector('.upload-btn');
        uploadBtn.innerHTML = `
            <div class="upload-progress">
                <div class="spinner"></div>
                Processing...
            </div>
        `;
        
        // Add spinner styles
        if (!document.getElementById('spinner-styles')) {
            const style = document.createElement('style');
            style.id = 'spinner-styles';
            style.textContent = `
                .upload-progress {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                    color: #ee4540;
                }
                .spinner {
                    width: 24px;
                    height: 24px;
                    border: 2px solid rgba(238, 69, 64, 0.3);
                    border-top: 2px solid #ee4540;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Simulate processing
        setTimeout(() => {
            uploadBtn.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none">
                    <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="2"/>
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                </svg>
                Image Processed
            `;
            uploadBtn.style.color = '#28a745';
            uploadBtn.style.borderColor = 'rgba(40, 167, 69, 0.3)';
            
            // Reset after 3 seconds
            setTimeout(() => {
                uploadBtn.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="none">
                        <path d="M14 2H6C4.89 2 4 2.9 4 4V20C4 21.11 4.89 22 6 22H18C19.11 22 20 21.11 20 20V8L14 2ZM18 20H6V4H13V9H18V20ZM8 12H16V14H8V12ZM8 16H13V18H8V16Z" stroke="currentColor" stroke-width="2"/>
                    </svg>
                    Upload Image
                `;
                uploadBtn.style.color = '#ee4540';
                uploadBtn.style.borderColor = 'rgba(238, 69, 64, 0.3)';
            }, 3000);
            
            // Trigger new results
            showNewResults();
        }, 2000);
    }
}

function startCamera() {
    const captureBtn = document.querySelector('.capture-btn');
    captureBtn.innerHTML = `
        <div class="camera-active">
            <div class="camera-dot"></div>
            Camera Active
        </div>
    `;
    
    // Add camera active styles
    if (!document.getElementById('camera-styles')) {
        const style = document.createElement('style');
        style.id = 'camera-styles';
        style.textContent = `
            .camera-active {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 8px;
                color: #ee4540;
            }
            .camera-dot {
                width: 12px;
                height: 12px;
                background: #ee4540;
                border-radius: 50%;
                animation: blink 1s infinite;
            }
            @keyframes blink {
                0%, 50% { opacity: 1; }
                51%, 100% { opacity: 0.3; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Simulate camera capture after 3 seconds
    setTimeout(() => {
        captureBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
                <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1Z" stroke="currentColor" stroke-width="2"/>
            </svg>
            Capture Camera
        `;
        
        // Show capture result
        showCaptureResult();
    }, 3000);
}

function applyFilters() {
    const matchScore = document.getElementById('matchScore').value;
    const timePeriod = document.getElementById('timePeriod').value;
    const location = document.getElementById('location').value;
    const caseId = document.getElementById('caseId').value;
    
    // Simulate filtering
    const resultCards = document.querySelectorAll('.result-card');
    resultCards.forEach(card => {
        card.style.opacity = '0.5';
    });
    
    setTimeout(() => {
        resultCards.forEach(card => {
            card.style.opacity = '1';
        });
        
        // Update results based on filters
        updateResultsDisplay(matchScore, timePeriod, location, caseId);
    }, 500);
}

function processRecognition() {
    const processBtn = document.querySelector('.process-btn');
    processBtn.textContent = 'Processing...';
    processBtn.disabled = true;
    
    // Simulate processing
    setTimeout(() => {
        processBtn.textContent = 'Processed!';
        processBtn.style.background = 'linear-gradient(135deg, #28a745, #34ce57)';
        
        setTimeout(() => {
            processBtn.textContent = 'Process';
            processBtn.style.background = 'linear-gradient(135deg, #ee4540, #ff6b6b)';
            processBtn.disabled = false;
        }, 2000);
        
        // Show processing results
        showProcessingResults();
    }, 3000);
}

function viewProfile(profileId) {
    // Highlight selected result
    document.querySelectorAll('.result-card').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    event.currentTarget.classList.add('highlighted');
    
    // Update profile card based on selection
    updateProfileCard(profileId);
    
    // Smooth scroll to profile card
    document.querySelector('.profile-card').scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
}

function updateProfileCard(profileId) {
    const profiles = {
        'maria-silva': {
            name: 'Maria Silva',
            id: '123.456.788-00',
            lastSeen: '9:25',
            location: 'São Paulo',
            confidence: '92 %'
        },
        'sandra-pereira': {
            name: 'Sandra Pereira',
            id: '123.456.789-00',
            lastSeen: '10:15',
            location: 'Santos',
            confidence: '99.5 %'
        },
        'joao-santos': {
            name: 'João Santos',
            id: '123.456.790-00',
            lastSeen: '8:45',
            location: 'Rio de Janeiro',
            confidence: '86 %'
        },
        'maria-silva-2': {
            name: 'Maria Silva',
            id: '123.456.788-00',
            lastSeen: '9:25',
            location: 'São Paulo',
            confidence: '85 %'
        }
    };
    
    const profile = profiles[profileId];
    if (profile) {
        document.querySelector('.profile-header h2').textContent = profile.name;
        document.querySelector('.case-id').textContent = profile.id;
        
        const detailItems = document.querySelectorAll('.detail-item .value');
        detailItems[0].textContent = profile.lastSeen;
        detailItems[1].textContent = profile.location;
        detailItems[2].textContent = profile.confidence;
    }
}

function openProfile() {
    const profileName = document.querySelector('.profile-header h2').textContent;
    
    // Simulate navigation to full profile
    const currentCard = document.querySelector('.profile-card');
    currentCard.style.transform = 'scale(0.95)';
    currentCard.style.opacity = '0.7';
    
    setTimeout(() => {
        // In a real app, this would navigate to the full profile page
        window.location.href = `investigative-case.html?case=CASE-2024-04-23-${profileName.replace(' ', '-').toUpperCase()}`;
    }, 300);
}

function addToCase() {
    const addBtn = event.target;
    addBtn.textContent = 'Adding...';
    addBtn.disabled = true;
    
    setTimeout(() => {
        addBtn.textContent = 'Added to Case!';
        addBtn.style.background = 'rgba(40, 167, 69, 0.2)';
        addBtn.style.borderColor = 'rgba(40, 167, 69, 0.3)';
        addBtn.style.color = '#28a745';
        
        setTimeout(() => {
            addBtn.textContent = 'Add to Case';
            addBtn.style.background = 'rgba(238, 69, 64, 0.1)';
            addBtn.style.borderColor = 'rgba(238, 69, 64, 0.3)';
            addBtn.style.color = '#ee4540';
            addBtn.disabled = false;
        }, 3000);
    }, 1500);
}

function exportData(format) {
    const btn = event.target;
    const originalText = btn.textContent;
    
    btn.textContent = `Exporting...`;
    btn.disabled = true;
    
    setTimeout(() => {
        btn.textContent = `Downloaded ${format}!`;
        btn.style.background = 'rgba(40, 167, 69, 0.2)';
        btn.style.borderColor = 'rgba(40, 167, 69, 0.3)';
        btn.style.color = '#28a745';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = 'rgba(238, 69, 64, 0.1)';
            btn.style.borderColor = 'rgba(238, 69, 64, 0.3)';
            btn.style.color = '#ee4540';
            btn.disabled = false;
        }, 2000);
    }, 1000);
}

function loadDemoResults() {
    // Simulate loading results from database
    setTimeout(() => {
        // Add shimmer effect to results
        const resultCards = document.querySelectorAll('.result-card');
        resultCards.forEach(card => {
            card.style.animation = 'shimmer 2s infinite';
        });
        
        // Add shimmer keyframes
        if (!document.getElementById('shimmer-styles')) {
            const style = document.createElement('style');
            style.id = 'shimmer-styles';
            style.textContent = `
                @keyframes shimmer {
                    0% { box-shadow: 0 0 0 rgba(238, 69, 64, 0); }
                    50% { box-shadow: 0 0 20px rgba(238, 69, 64, 0.1); }
                    100% { box-shadow: 0 0 0 rgba(238, 69, 64, 0); }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => {
            resultCards.forEach(card => {
                card.style.animation = '';
            });
        }, 4000);
    }, 1000);
}

function showNewResults() {
    // Add new result animation
    const resultsGrid = document.querySelector('.results-grid');
    const newCard = document.createElement('div');
    newCard.className = 'result-card new-result';
    newCard.innerHTML = `
        <div class="result-image">
            <div style="background: linear-gradient(135deg, #fdcb6e, #f39c12); width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; font-size: 24px;">NP</div>
        </div>
        <div class="result-score">0.94</div>
    `;
    
    newCard.style.opacity = '0';
    newCard.style.transform = 'scale(0.8)';
    
    resultsGrid.insertBefore(newCard, resultsGrid.firstChild);
    
    setTimeout(() => {
        newCard.style.transition = 'all 0.6s ease';
        newCard.style.opacity = '1';
        newCard.style.transform = 'scale(1)';
        newCard.classList.add('highlighted');
    }, 100);
}

function showCaptureResult() {
    // Similar to showNewResults but with camera capture indication
    showNewResults();
    
    // Show notification
    showNotification('Face captured successfully!', 'success');
}

function showProcessingResults() {
    // Update confidence scores
    const scores = document.querySelectorAll('.result-score');
    scores.forEach(score => {
        const currentScore = parseFloat(score.textContent);
        const newScore = Math.max(0.85, Math.min(0.99, currentScore + (Math.random() - 0.5) * 0.1));
        
        score.style.color = '#ee4540';
        score.textContent = newScore.toFixed(2);
        
        setTimeout(() => {
            score.style.color = 'white';
        }, 1000);
    });
}

function updateResultsDisplay(matchScore, timePeriod, location, caseId) {
    // Simulate filtering results based on criteria
    const resultCards = document.querySelectorAll('.result-card');
    
    resultCards.forEach(card => {
        const score = parseFloat(card.querySelector('.result-score').textContent);
        const threshold = parseInt(matchScore) / 100;
        
        if (score < threshold) {
            card.style.opacity = '0.3';
            card.style.transform = 'scale(0.95)';
        } else {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
        }
    });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'rgba(40, 167, 69, 0.9)' : 'rgba(238, 69, 64, 0.9)'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
