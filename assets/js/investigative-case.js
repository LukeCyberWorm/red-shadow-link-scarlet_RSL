document.addEventListener('DOMContentLoaded', function() {
    // Initialize investigative case page
    initializeCasePage();
    
    // Setup interactive elements
    setupInteractivity();
    
    // Load case data from URL parameters
    loadCaseData();
});

function initializeCasePage() {
    // Animate cards on load
    animateCards();
    
    // Setup real-time location updates
    simulateLocationUpdates();
    
    // Setup facial recognition updates
    updateRecognitionData();
}

function animateCards() {
    const cards = document.querySelectorAll('.info-card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function simulateLocationUpdates() {
    const mapMarker = document.querySelector('.map-marker');
    
    if (mapMarker) {
        // Add random slight movements to simulate real-time tracking
        setInterval(() => {
            const randomX = Math.random() * 4 - 2; // -2 to 2px
            const randomY = Math.random() * 4 - 2; // -2 to 2px
            
            mapMarker.style.transform = `translate(-50%, -50%) translate(${randomX}px, ${randomY}px)`;
            
            // Reset after animation
            setTimeout(() => {
                mapMarker.style.transform = 'translate(-50%, -50%)';
            }, 500);
        }, 10000); // Every 10 seconds
    }
}

function updateRecognitionData() {
    const probabilityValue = document.querySelector('.probability .value');
    
    if (probabilityValue) {
        // Simulate slight probability variations
        setInterval(() => {
            const baseProb = 99.5;
            const variation = (Math.random() - 0.5) * 0.2; // ±0.1%
            const newProb = Math.max(99.0, Math.min(99.9, baseProb + variation));
            
            probabilityValue.textContent = newProb.toFixed(1) + '%';
            
            // Change color based on probability
            if (newProb >= 99.0) {
                probabilityValue.style.color = '#28a745'; // Green
            } else if (newProb >= 95.0) {
                probabilityValue.style.color = '#ffc107'; // Yellow
            } else {
                probabilityValue.style.color = '#dc3545'; // Red
            }
        }, 15000); // Every 15 seconds
    }
}

function setupInteractivity() {
    // Download button functionality
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            this.textContent = 'Downloading...';
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                this.textContent = 'Downloaded!';
                this.style.background = 'rgba(40, 167, 69, 0.2)';
                this.style.borderColor = 'rgba(40, 167, 69, 0.3)';
                this.style.color = '#28a745';
                
                setTimeout(() => {
                    this.textContent = 'Download';
                    this.style.background = 'rgba(238, 69, 64, 0.1)';
                    this.style.borderColor = 'rgba(238, 69, 64, 0.3)';
                    this.style.color = '#ee4540';
                }, 2000);
            }, 1500);
        });
    }
    
    // Info card hover effects
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderColor = 'rgba(238, 69, 64, 0.5)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        });
    });
    
    // Search functionality
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            alert('Função de busca será implementada na versão completa');
        });
    }
    
    // Navigation items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                alert('Esta funcionalidade será implementada na versão completa');
            }
        });
    });
}

function loadCaseData() {
    // Get case ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const caseId = urlParams.get('case');
    
    if (caseId) {
        // In a real app, this would load data from an API
        console.log('Loading case:', caseId);
        
        // Simulate loading different cases
        if (caseId === 'CASE-2024-04-15-MARIA') {
            updateCaseData({
                name: 'Maria Silva',
                email: 'maria.silva@example.com',
                cpf: '123.456.788-00',
                probability: '92,0%',
                location: 'Rio de Janeiro'
            });
        }
    }
}

function updateCaseData(data) {
    // Update profile information
    const nameElement = document.querySelector('.profile-info h2');
    const emailElement = document.querySelector('.profile-info .email');
    const cpfElement = document.querySelector('.profile-info .cpf');
    const probabilityElement = document.querySelector('.probability .value');
    
    if (nameElement) nameElement.textContent = data.name;
    if (emailElement) emailElement.textContent = data.email;
    if (cpfElement) cpfElement.textContent = `CPF ${data.cpf}`;
    if (probabilityElement) probabilityElement.textContent = data.probability;
    
    // Update location info
    const locationName = document.querySelector('.location-name');
    if (locationName && data.location) {
        locationName.textContent = data.location;
    }
    
    // Update page title
    document.title = `RSL - Investigative Case | ${data.name}`;
}

// Real-time data simulation
function simulateRealTimeData() {
    // Simulate IP address changes
    const ipElement = document.querySelector('.info-icon.ip + span');
    if (ipElement) {
        setInterval(() => {
            const ips = ['192.168.1.100', '192.168.1.101', '192.168.1.102'];
            const currentIp = ipElement.textContent;
            let newIp;
            do {
                newIp = ips[Math.floor(Math.random() * ips.length)];
            } while (newIp === currentIp);
            
            ipElement.style.color = '#ee4540';
            ipElement.textContent = newIp;
            
            setTimeout(() => {
                ipElement.style.color = '#ccc';
            }, 1000);
        }, 30000); // Every 30 seconds
    }
    
    // Simulate document count updates
    const docsElement = document.querySelector('.info-icon.docs + span');
    if (docsElement) {
        setInterval(() => {
            const currentCount = parseInt(docsElement.textContent);
            const newCount = Math.max(1, currentCount + Math.floor(Math.random() * 3) - 1);
            
            if (newCount !== currentCount) {
                docsElement.style.color = '#ee4540';
                docsElement.textContent = `${newCount} documents`;
                
                setTimeout(() => {
                    docsElement.style.color = '#ccc';
                }, 1000);
            }
        }, 45000); // Every 45 seconds
    }
}

// Start real-time simulation after page load
setTimeout(simulateRealTimeData, 5000);

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl+D for download
    if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        const downloadBtn = document.querySelector('.download-btn');
        if (downloadBtn) downloadBtn.click();
    }
    
    // Ctrl+B for back to dashboard
    if (e.ctrlKey && e.key === 'b') {
        e.preventDefault();
        window.location.href = 'dashboard.html';
    }
});

// Add visual feedback for data updates
function highlightDataUpdate(element) {
    const originalBg = element.style.backgroundColor;
    element.style.backgroundColor = 'rgba(238, 69, 64, 0.2)';
    element.style.transition = 'background-color 0.3s ease';
    
    setTimeout(() => {
        element.style.backgroundColor = originalBg;
    }, 1000);
}
