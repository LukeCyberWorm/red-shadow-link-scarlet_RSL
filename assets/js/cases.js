document.addEventListener('DOMContentLoaded', function() {
    initializeCases();
    setupEventListeners();
    animateCardEntrance();
});

function initializeCases() {
    // Set active navigation item
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    
    const casesNavItem = document.querySelector('.nav-item[href="cases.html"]');
    if (casesNavItem) {
        casesNavItem.classList.add('active');
    }
    
    // Initialize case data
    initializeCaseData();
}

function initializeCaseData() {
    const cases = [
        {
            id: 1,
            name: 'Sandra Pereira',
            email: 'sandra.pereira@email.com',
            cpf: '123.456.789-00',
            avatar: 'assets/images/sandra-avatar.jpg',
            status: 'active',
            lastActivity: new Date(),
            progress: 85
        },
        {
            id: 2,
            name: 'Antônio Souza',
            email: 'antonio.souza@email.com',
            cpf: '987.654.321-00',
            avatar: 'assets/images/antonio-avatar.jpg',
            status: 'pending',
            lastActivity: new Date(Date.now() - 24 * 60 * 60 * 1000),
            progress: 0
        },
        {
            id: 3,
            name: 'Mariana Oliveira',
            email: 'mariana.oliveira@email.com',
            cpf: '456.789.123-00',
            avatar: 'assets/images/mariana-avatar.jpg',
            status: 'completed',
            lastActivity: new Date(Date.now() - 48 * 60 * 60 * 1000),
            progress: 100
        },
        {
            id: 4,
            name: 'Jorge Santos',
            email: 'jorge.santos@email.com',
            cpf: '654.321.987-00',
            avatar: 'assets/images/jorge-avatar.jpg',
            status: 'completed',
            lastActivity: new Date(Date.now() - 72 * 60 * 60 * 1000),
            progress: 100
        }
    ];
    
    // Store case data globally
    window.casesData = cases;
    
    // Update case statistics
    updateCaseStatistics();
}

function updateCaseStatistics() {
    const totalCases = window.casesData.length;
    const activeCases = window.casesData.filter(case_ => case_.status === 'active').length;
    const completedCases = window.casesData.filter(case_ => case_.status === 'completed').length;
    
    console.log(`Cases Statistics: ${totalCases} total, ${activeCases} active, ${completedCases} completed`);
}

function setupEventListeners() {
    // New Case button in header
    const newCaseBtn = document.querySelector('.new-case-btn');
    if (newCaseBtn) {
        newCaseBtn.addEventListener('click', handleNewCase);
    }
    
    // Case card click handlers
    const caseCards = document.querySelectorAll('.case-card');
    caseCards.forEach((card, index) => {
        card.addEventListener('click', (e) => handleCaseCardClick(e, index));
    });
    
    // Action button handlers
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            handleActionButton(btn, index);
        });
    });
    
    // Navigation handlers
    setupNavigationHandlers();
}

function handleNewCase() {
    showNotification('Nova investigação será iniciada', 'info');
    
    // Simulate new case creation
    setTimeout(() => {
        showNotification('Sistema preparado para nova investigação', 'success');
    }, 1500);
}

function handleCaseCardClick(event, caseIndex) {
    if (event.target.classList.contains('action-btn')) {
        return; // Don't handle card click if action button was clicked
    }
    
    const caseData = window.casesData[caseIndex];
    
    if (caseData.status === 'active') {
        // Navigate to investigative case page
        showNotification(`Abrindo caso: ${caseData.name}`, 'info');
        setTimeout(() => {
            window.location.href = 'investigative-case.html';
        }, 800);
    } else if (caseData.status === 'pending') {
        showNotification(`Caso aguardando aprovação: ${caseData.name}`, 'warning');
    } else {
        showNotification(`Visualizando caso concluído: ${caseData.name}`, 'info');
    }
}

function handleActionButton(button, caseIndex) {
    const caseData = window.casesData[caseIndex];
    const action = button.classList.contains('new-case') ? 'new' :
                   button.classList.contains('start') ? 'start' : 'download';
    
    switch (action) {
        case 'new':
            handleNewCaseAction(caseData);
            break;
        case 'start':
            handleStartCaseAction(caseData, button);
            break;
        case 'download':
            handleDownloadCaseAction(caseData);
            break;
    }
}

function handleNewCaseAction(caseData) {
    showNotification(`Continuando investigação: ${caseData.name}`, 'info');
    
    // Simulate loading and navigate
    setTimeout(() => {
        window.location.href = 'investigative-case.html';
    }, 1200);
}

function handleStartCaseAction(caseData, button) {
    showNotification(`Iniciando investigação: ${caseData.name}`, 'success');
    
    // Change button state
    button.textContent = 'Iniciando...';
    button.style.opacity = '0.7';
    
    // Simulate case start process
    setTimeout(() => {
        button.textContent = 'Abrir';
        button.style.opacity = '1';
        button.classList.remove('start');
        button.classList.add('new-case');
        
        // Update case status
        caseData.status = 'active';
        caseData.lastActivity = new Date();
        
        // Update card appearance
        const caseCard = button.closest('.case-card');
        if (caseCard) {
            caseCard.classList.add('active');
        }
        
        showNotification('Investigação iniciada com sucesso', 'success');
    }, 2000);
}

function handleDownloadCaseAction(caseData) {
    showNotification(`Preparando download: ${caseData.name}`, 'info');
    
    // Simulate file preparation and download
    setTimeout(() => {
        const blob = new Blob([generateCaseReport(caseData)], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Relatorio_${caseData.name.replace(/\s+/g, '_')}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showNotification('Relatório baixado com sucesso', 'success');
    }, 1500);
}

function generateCaseReport(caseData) {
    return `RED SHADOW LINK - SCARLET (RSL)
RELATÓRIO DE INVESTIGAÇÃO

Nome: ${caseData.name}
Email: ${caseData.email}
CPF: ${caseData.cpf}
Status: ${caseData.status}
Última Atividade: ${caseData.lastActivity.toLocaleString('pt-BR')}
Progresso: ${caseData.progress}%

=== RESUMO DA INVESTIGAÇÃO ===
Este relatório contém informações coletadas durante o processo investigativo.
Para mais detalhes, acesse o sistema RSL com suas credenciais autorizadas.

Gerado em: ${new Date().toLocaleString('pt-BR')}
Sistema: Red Shadow Link - Scarlet v2.0
`;
}

function setupNavigationHandlers() {
    // Navigation menu items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const href = item.getAttribute('href');
            if (href && href !== '#' && href !== 'cases.html') {
                e.preventDefault();
                showNotification('Navegando...', 'info');
                setTimeout(() => {
                    window.location.href = href;
                }, 500);
            }
        });
    });
    
    // Menu button for mobile
    const menuBtn = document.querySelector('.menu-btn');
    if (menuBtn) {
        menuBtn.addEventListener('click', toggleSidebar);
    }
}

function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.classList.toggle('mobile-open');
    }
}

function animateCardEntrance() {
    const cards = document.querySelectorAll('.case-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150 + 200);
    });
    
    // Animate bottom section
    const bottomCards = document.querySelectorAll('.security-card, .dossier-card');
    bottomCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 800 + index * 200);
    });
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">
                ${getNotificationIcon(type)}
            </span>
            <span class="notification-message">${message}</span>
        </div>
        <div class="notification-progress"></div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        border: 1px solid ${getNotificationBorderColor(type)};
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        min-width: 300px;
        backdrop-filter: blur(10px);
        transform: translateX(100%);
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    `;
    
    const notificationContent = notification.querySelector('.notification-content');
    notificationContent.style.cssText = `
        display: flex;
        align-items: center;
        gap: 12px;
        font-weight: 500;
    `;
    
    const progressBar = notification.querySelector('.notification-progress');
    progressBar.style.cssText = `
        position: absolute;
        bottom: 0;
        left: 0;
        height: 3px;
        background: rgba(255, 255, 255, 0.3);
        width: 100%;
        transform-origin: left;
        transform: scaleX(1);
        transition: transform 3s linear;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Start progress animation
    setTimeout(() => {
        progressBar.style.transform = 'scaleX(0)';
    }, 200);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function getNotificationIcon(type) {
    const icons = {
        info: '📋',
        success: '✅',
        warning: '⚠️',
        error: '❌'
    };
    return icons[type] || icons.info;
}

function getNotificationColor(type) {
    const colors = {
        info: 'rgba(108, 92, 231, 0.9)',
        success: 'rgba(40, 167, 69, 0.9)',
        warning: 'rgba(255, 193, 7, 0.9)',
        error: 'rgba(220, 53, 69, 0.9)'
    };
    return colors[type] || colors.info;
}

function getNotificationBorderColor(type) {
    const colors = {
        info: 'rgba(108, 92, 231, 0.3)',
        success: 'rgba(40, 167, 69, 0.3)',
        warning: 'rgba(255, 193, 7, 0.3)',
        error: 'rgba(220, 53, 69, 0.3)'
    };
    return colors[type] || colors.info;
}

// Real-time updates simulation
function startRealTimeUpdates() {
    setInterval(() => {
        updateLastActivity();
    }, 30000); // Update every 30 seconds
}

function updateLastActivity() {
    const activeCases = window.casesData.filter(case_ => case_.status === 'active');
    if (activeCases.length > 0) {
        const randomCase = activeCases[Math.floor(Math.random() * activeCases.length)];
        randomCase.lastActivity = new Date();
        
        // Update progress randomly for active cases
        if (randomCase.progress < 95) {
            randomCase.progress += Math.floor(Math.random() * 5) + 1;
        }
    }
}

// Initialize real-time updates
setTimeout(startRealTimeUpdates, 5000);
