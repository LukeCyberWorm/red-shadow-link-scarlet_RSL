document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard
    initializeDashboard();
    
    // Add interactive elements
    setupInteractivity();
});

function initializeDashboard() {
    // Animate stats on load
    animateStats();
    
    // Setup real-time updates simulation
    simulateRealTimeUpdates();
}

function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-content h3');
    
    statNumbers.forEach(stat => {
        const finalValue = parseInt(stat.textContent);
        const duration = 2000; // 2 seconds
        const increment = finalValue / (duration / 50);
        let current = 0;
        
        stat.textContent = '0';
        
        const counter = setInterval(() => {
            current += increment;
            if (current >= finalValue) {
                stat.textContent = finalValue;
                clearInterval(counter);
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 50);
    });
}

function simulateRealTimeUpdates() {
    // Simulate new activity every 30 seconds
    setInterval(() => {
        addNewActivity();
    }, 30000);
    
    // Update time stamps every minute
    setInterval(() => {
        updateTimeStamps();
    }, 60000);
}

function addNewActivity() {
    const activities = [
        {
            icon: 'facial-recognition',
            text: '<strong>Reconhecimento facial</strong> realizado com 97,8% de precisão',
            time: 'Agora'
        },
        {
            icon: 'location',
            text: '<strong>Movimentação detectada</strong> na região central',
            time: 'Agora'
        },
        {
            icon: 'case',
            text: '<strong>Documento analisado</strong> - Padrões identificados',
            time: 'Agora'
        }
    ];
    
    const randomActivity = activities[Math.floor(Math.random() * activities.length)];
    const activityList = document.querySelector('.activity-list');
    
    if (activityList) {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        activityItem.style.opacity = '0';
        activityItem.style.transform = 'translateY(-10px)';
        
        activityItem.innerHTML = `
            <div class="activity-icon ${randomActivity.icon}"></div>
            <div class="activity-content">
                <p>${randomActivity.text}</p>
                <span class="activity-time">${randomActivity.time}</span>
            </div>
        `;
        
        activityList.insertBefore(activityItem, activityList.firstChild);
        
        // Animate in
        setTimeout(() => {
            activityItem.style.transition = 'all 0.3s ease';
            activityItem.style.opacity = '1';
            activityItem.style.transform = 'translateY(0)';
        }, 100);
        
        // Remove oldest if more than 5
        const activities = activityList.querySelectorAll('.activity-item');
        if (activities.length > 5) {
            const oldest = activities[activities.length - 1];
            oldest.style.transition = 'all 0.3s ease';
            oldest.style.opacity = '0';
            oldest.style.transform = 'translateY(10px)';
            setTimeout(() => {
                oldest.remove();
            }, 300);
        }
    }
}

function updateTimeStamps() {
    const timeElements = document.querySelectorAll('.activity-time');
    timeElements.forEach(element => {
        if (element.textContent === 'Agora') {
            element.textContent = '1 minuto atrás';
        } else if (element.textContent === '1 minuto atrás') {
            element.textContent = '2 minutos atrás';
        } else if (element.textContent === '2 minutos atrás') {
            element.textContent = '3 minutos atrás';
        }
    });
}

function setupInteractivity() {
    // Add hover effects to stat cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-2px) scale(1)';
        });
    });
    
    // Add click handlers for navigation items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                // Remove active from all items
                navItems.forEach(nav => nav.classList.remove('active'));
                // Add active to clicked item
                this.classList.add('active');
            }
        });
    });
}

function viewCase(caseId) {
    // Show loading animation
    const caseItem = event.currentTarget;
    caseItem.style.transform = 'scale(0.98)';
    caseItem.style.opacity = '0.7';
    
    setTimeout(() => {
        // In a real app, this would navigate to the case details
        // For demo, we'll navigate to investigative case page
        window.location.href = `investigative-case.html?case=${caseId}`;
    }, 300);
}

function logout() {
    // Show confirmation
    if (confirm('Tem certeza que deseja sair do sistema?')) {
        // Animate logout
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '0';
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 500);
    }
}

// Search functionality
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        const searchBtn = document.querySelector('.search-btn');
        if (searchBtn) {
            searchBtn.click();
            // In a real app, this would open a search modal
            alert('Funcionalidade de busca será implementada na versão completa');
        }
    }
});

// Add some demo data updates
function updateDashboardData() {
    // Simulate data changes
    const statsData = [
        { cases: 23, faces: 156, locations: 89, alerts: 12 },
        { cases: 24, faces: 158, locations: 91, alerts: 11 },
        { cases: 22, faces: 160, locations: 87, alerts: 13 }
    ];
    
    const randomData = statsData[Math.floor(Math.random() * statsData.length)];
    
    // Update stats if different
    const currentStats = {
        cases: parseInt(document.querySelector('.stat-card:nth-child(1) h3').textContent),
        faces: parseInt(document.querySelector('.stat-card:nth-child(2) h3').textContent),
        locations: parseInt(document.querySelector('.stat-card:nth-child(3) h3').textContent),
        alerts: parseInt(document.querySelector('.stat-card:nth-child(4) h3').textContent)
    };
    
    Object.keys(randomData).forEach((key, index) => {
        const statElement = document.querySelector(`.stat-card:nth-child(${index + 1}) h3`);
        if (randomData[key] !== currentStats[key]) {
            statElement.style.color = '#ee4540';
            statElement.textContent = randomData[key];
            setTimeout(() => {
                statElement.style.color = '#ffffff';
            }, 1000);
        }
    });
}

// Update data every 5 minutes
setInterval(updateDashboardData, 300000);
