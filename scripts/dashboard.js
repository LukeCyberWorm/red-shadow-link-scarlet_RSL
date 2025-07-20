document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard
    updateStats();
    initializeRealTimeUpdates();
    
    // Add click handlers for nav items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
        });
    });

    // Add click handlers for case buttons
    const caseButtons = document.querySelectorAll('.btn-small');
    caseButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const row = this.closest('tr');
            const caseId = row.cells[0].textContent;
            showCaseDetails(caseId);
        });
    });
});

function updateStats() {
    // Simulate real-time stats updates
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const currentValue = parseInt(stat.textContent);
        animateNumber(stat, currentValue);
    });
}

function animateNumber(element, targetValue) {
    const startValue = 0;
    const duration = 2000;
    const startTime = Date.now();
    
    function update() {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentValue = Math.floor(startValue + (targetValue - startValue) * progress);
        element.textContent = currentValue.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

function initializeRealTimeUpdates() {
    // Simulate real-time updates
    setInterval(() => {
        updateSystemStatus();
        updateRecentActivity();
    }, 30000); // Update every 30 seconds
}

function updateSystemStatus() {
    const statusIndicators = document.querySelectorAll('.status-indicator');
    
    statusIndicators.forEach(indicator => {
        // Randomly simulate status changes
        if (Math.random() > 0.95) {
            indicator.classList.toggle('warning');
            
            setTimeout(() => {
                indicator.classList.remove('warning');
                indicator.classList.add('online');
            }, 5000);
        }
    });
}

function updateRecentActivity() {
    // Simulate new activity
    const tbody = document.querySelector('.cases-table tbody');
    const rows = tbody.querySelectorAll('tr');
    
    rows.forEach(row => {
        const timeCell = row.cells[3];
        const currentTime = timeCell.textContent;
        
        // Update time stamps
        if (currentTime.includes('hora')) {
            const hours = parseInt(currentTime) + 1;
            timeCell.textContent = `há ${hours} horas`;
        }
    });
}

function showCaseDetails(caseId) {
    // Show case details modal or navigate to case page
    const modal = createModal('Detalhes do Caso', `
        <div class="case-details">
            <h3>Caso: ${caseId}</h3>
            <div class="case-info">
                <p><strong>Status:</strong> Ativo</p>
                <p><strong>Investigador:</strong> Admin User</p>
                <p><strong>Criado em:</strong> 23/04/2024</p>
                <p><strong>Última atualização:</strong> há 2 horas</p>
            </div>
            <div class="case-actions">
                <button class="btn btn-primary">Ver Detalhes Completos</button>
                <button class="btn btn-secondary">Editar Caso</button>
            </div>
        </div>
    `);
    
    document.body.appendChild(modal);
}

function createModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h2>${title}</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-content">
                ${content}
            </div>
        </div>
    `;
    
    // Add event listeners
    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    return modal;
}

function logout() {
    if (confirm('Tem certeza que deseja sair?')) {
        // Clear any stored session data
        localStorage.clear();
        sessionStorage.clear();
        
        // Redirect to login page
        window.location.href = 'index.html';
    }
}

// Add modal styles dynamically
const modalStyles = document.createElement('style');
modalStyles.textContent = `
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease;
    }

    .modal {
        background: #1a1a1a;
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 12px;
        min-width: 500px;
        max-width: 90vw;
        max-height: 90vh;
        overflow-y: auto;
        animation: slideIn 0.3s ease;
    }

    .modal-header {
        padding: 20px 25px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .modal-header h2 {
        margin: 0;
        font-size: 18px;
    }

    .modal-close {
        background: none;
        border: none;
        color: #888;
        font-size: 24px;
        cursor: pointer;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: color 0.3s ease;
    }

    .modal-close:hover {
        color: #ff4444;
    }

    .modal-content {
        padding: 25px;
    }

    .case-details .case-info {
        margin: 20px 0;
    }

    .case-details .case-info p {
        margin-bottom: 10px;
        color: #ccc;
    }

    .case-actions {
        display: flex;
        gap: 15px;
        margin-top: 25px;
    }

    .btn-secondary {
        background: transparent;
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: #ccc;
    }

    .btn-secondary:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.3);
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(modalStyles);
