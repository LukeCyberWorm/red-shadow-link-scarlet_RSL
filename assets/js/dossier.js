document.addEventListener('DOMContentLoaded', function() {
    initializeDossier();
    setupEventListeners();
    loadDossierData();
    animateElements();
});

function initializeDossier() {
    // Set active navigation item
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    
    const dossierNavItem = document.querySelector('.nav-item[href="dossier.html"]');
    if (dossierNavItem) {
        dossierNavItem.classList.add('active');
    }
    
    // Initialize dossier data
    initializeDossierData();
}

function initializeDossierData() {
    const dossierCases = [
        {
            id: 'CASE-2024-04-23-SANDRA',
            name: 'Sandra Pereira',
            email: 'sandra.pereira@example.com',
            cpf: '123.456.789-00',
            date: '2024-04-23',
            location: 'São Vicente, SP',
            device: 'Apple iPhone 12',
            confidence: 99.5,
            ip: '192.168.1.100',
            facialMatch: 99.5,
            lastSeen: '2 hours ago',
            securityLevel: 'High Confidence',
            documents: [
                { type: 'PDF', name: 'contrato.pdf', date: '2024-20', source: 'prefeitura...' },
                { type: 'DOC', name: 'declaração...', date: '2024-21', source: 'jusbrasil...' },
                { type: 'PPT', name: 'atividade.ppt', date: '2024-22', source: 'tribunal.re...' }
            ]
        },
        {
            id: 'CASE-2024-04-22-MARIA',
            name: 'Maria Silva',
            email: 'maria.silva@example.com',
            cpf: '987.654.321-00',
            date: '2024-04-22',
            location: 'Rio de Janeiro, RJ',
            device: 'Samsung Galaxy S21',
            confidence: 94.2,
            ip: '192.168.1.101',
            facialMatch: 94.2,
            lastSeen: '1 day ago',
            securityLevel: 'High Confidence',
            documents: [
                { type: 'PDF', name: 'documento.pdf', date: '2024-19', source: 'tribunal...' },
                { type: 'DOC', name: 'relatório.doc', date: '2024-20', source: 'governo...' }
            ]
        },
        {
            id: 'CASE-2024-04-21-ANTONIO',
            name: 'Antônio Souza',
            email: 'antonio.souza@example.com',
            cpf: '456.789.123-00',
            date: '2024-04-21',
            location: 'Belo Horizonte, MG',
            device: 'iPhone 13 Pro',
            confidence: 87.8,
            ip: '192.168.1.102',
            facialMatch: 87.8,
            lastSeen: '3 days ago',
            securityLevel: 'Medium Confidence',
            documents: [
                { type: 'PDF', name: 'contrato_work.pdf', date: '2024-18', source: 'empresa...' },
                { type: 'PPT', name: 'apresentacao.ppt', date: '2024-19', source: 'cliente...' }
            ]
        }
    ];
    
    // Store dossier data globally
    window.dossierCases = dossierCases;
    
    // Load default case (Sandra)
    loadCaseData('CASE-2024-04-23-SANDRA');
}

function setupEventListeners() {
    // Case selector dropdown
    const caseSelector = document.getElementById('caseSelector');
    if (caseSelector) {
        caseSelector.addEventListener('change', handleCaseChange);
    }
    
    // Export button
    const exportBtn = document.querySelector('.export-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', handleExportDossier);
    }
    
    // Print button
    const printBtn = document.querySelector('.print-btn');
    if (printBtn) {
        printBtn.addEventListener('click', handlePrintDossier);
    }
    
    // Profile buttons
    const openProfileBtn = document.querySelector('.profile-btn.primary');
    if (openProfileBtn) {
        openProfileBtn.addEventListener('click', handleOpenProfile);
    }
    
    const addBtn = document.querySelector('.profile-btn.secondary');
    if (addBtn) {
        addBtn.addEventListener('click', handleAddToSystem);
    }
    
    // Document table rows
    const documentRows = document.querySelectorAll('.table-row');
    documentRows.forEach((row, index) => {
        row.addEventListener('click', () => handleDocumentClick(index));
    });
    
    // Profile photo click
    const profilePhoto = document.querySelector('.profile-photo');
    if (profilePhoto) {
        profilePhoto.addEventListener('click', handleProfilePhotoClick);
    }
    
    // Navigation handlers
    setupNavigationHandlers();
}

function handleCaseChange(event) {
    const selectedCase = event.target.value;
    showNotification(`Loading case: ${selectedCase}`, 'info');
    
    setTimeout(() => {
        loadCaseData(selectedCase);
        showNotification('Case loaded successfully', 'success');
    }, 800);
}

function loadCaseData(caseId) {
    const caseData = window.dossierCases.find(case_ => case_.id === caseId);
    
    if (!caseData) {
        showNotification('Case not found', 'error');
        return;
    }
    
    // Update Technical Dossier
    updateTechnicalDossier(caseData);
    
    // Update General Analysis
    updateGeneralAnalysis(caseData);
    
    // Update Documents
    updateDocumentsTable(caseData.documents);
    
    // Update Profile
    updateProfile(caseData);
    
    // Update Additional Info
    updateAdditionalInfo(caseData);
    
    // Store current case data
    window.currentCase = caseData;
}

function updateTechnicalDossier(caseData) {
    const infoRows = document.querySelectorAll('.dossier-info .info-row');
    
    if (infoRows.length >= 4) {
        infoRows[0].querySelector('.info-value').textContent = caseData.date;
        infoRows[1].querySelector('.info-value').textContent = caseData.name;
        infoRows[2].querySelector('.info-value').textContent = caseData.email;
        infoRows[3].querySelector('.info-value').textContent = caseData.cpf;
    }
}

function updateGeneralAnalysis(caseData) {
    const analysisItems = document.querySelectorAll('.analysis-item .analysis-text');
    
    if (analysisItems.length >= 3) {
        analysisItems[0].textContent = `Geolocalização of IP ${caseData.ip} in, SP`;
        analysisItems[1].textContent = `Dispositivo vinculado: ${caseData.device}`;
        analysisItems[2].textContent = `Facial match: ${caseData.facialMatch}% accuracy`;
    }
}

function updateDocumentsTable(documents) {
    const tableBody = document.querySelector('.documents-table .table-body');
    
    tableBody.innerHTML = documents.map((doc, index) => `
        <div class="table-row" data-doc-index="${index}">
            <div class="table-cell">
                <div class="file-type ${doc.type.toLowerCase()}">${doc.type}</div>
            </div>
            <div class="table-cell">${doc.name}</div>
            <div class="table-cell">${doc.date}</div>
            <div class="table-cell">${doc.source}</div>
        </div>
    `).join('');
    
    // Re-attach event listeners for new rows
    const newRows = tableBody.querySelectorAll('.table-row');
    newRows.forEach((row, index) => {
        row.addEventListener('click', () => handleDocumentClick(index));
    });
}

function updateProfile(caseData) {
    // Update profile header
    const profileHeader = document.querySelector('.profile-header h2');
    const profileEmail = document.querySelector('.profile-email');
    
    if (profileHeader) profileHeader.textContent = caseData.name;
    if (profileEmail) profileEmail.textContent = caseData.email;
    
    // Update profile photo
    const profileImage = document.getElementById('profileImage');
    if (profileImage) {
        profileImage.src = `assets/images/${caseData.name.toLowerCase().replace(' ', '-')}-avatar.jpg`;
        profileImage.alt = caseData.name;
        
        // Fallback if image doesn't exist
        profileImage.onerror = function() {
            this.src = 'assets/images/default-avatar.jpg';
        };
    }
    
    // Update status
    const statusValue = document.querySelector('.status-value');
    const statusLocation = document.querySelector('.status-location');
    
    if (statusValue) statusValue.textContent = `${caseData.confidence} %`;
    if (statusLocation) statusLocation.textContent = caseData.location.split(',')[0];
}

function updateAdditionalInfo(caseData) {
    const infoCards = document.querySelectorAll('.info-card .info-text');
    
    if (infoCards.length >= 3) {
        // Last Location
        const locationCard = infoCards[0];
        locationCard.querySelector('p').textContent = caseData.location;
        locationCard.querySelector('.info-time').textContent = caseData.lastSeen;
        
        // Device
        const deviceCard = infoCards[1];
        deviceCard.querySelector('p').textContent = caseData.device;
        
        // Security Level
        const securityCard = infoCards[2];
        securityCard.querySelector('p').textContent = caseData.securityLevel;
        securityCard.querySelector('.info-time').textContent = `${caseData.confidence}% match`;
    }
}

function handleExportDossier() {
    showNotification('Preparing dossier export...', 'info');
    
    setTimeout(() => {
        const exportData = generateDossierExport();
        downloadFile(exportData, `dossier_${window.currentCase.id}.json`, 'application/json');
        showNotification('Dossier exported successfully', 'success');
    }, 2000);
}

function generateDossierExport() {
    const dossier = {
        caseId: window.currentCase.id,
        generatedAt: new Date().toISOString(),
        technicalDossier: {
            date: window.currentCase.date,
            target: window.currentCase.name,
            email: window.currentCase.email,
            cpf: window.currentCase.cpf
        },
        generalAnalysis: {
            ipLocation: `Geolocalização of IP ${window.currentCase.ip} in, SP`,
            deviceInfo: `Dispositivo vinculado: ${window.currentCase.device}`,
            facialMatch: `Facial match: ${window.currentCase.facialMatch}% accuracy`
        },
        associatedDocuments: window.currentCase.documents,
        subjectProfile: {
            name: window.currentCase.name,
            email: window.currentCase.email,
            lastLocation: window.currentCase.location,
            device: window.currentCase.device,
            securityLevel: window.currentCase.securityLevel,
            confidence: window.currentCase.confidence
        },
        metadata: {
            exportedBy: 'RSL Demo System',
            systemVersion: 'Red Shadow Link - Scarlet v2.0',
            confidenceLevel: window.currentCase.confidence
        }
    };
    
    return JSON.stringify(dossier, null, 2);
}

function handlePrintDossier() {
    showNotification('Preparing for print...', 'info');
    
    setTimeout(() => {
        window.print();
        showNotification('Print dialog opened', 'success');
    }, 1000);
}

function handleOpenProfile() {
    if (!window.currentCase) return;
    
    showNotification(`Opening full profile: ${window.currentCase.name}`, 'info');
    
    setTimeout(() => {
        // Navigate to investigative case page
        window.location.href = 'investigative-case.html';
    }, 1200);
}

function handleAddToSystem() {
    if (!window.currentCase) return;
    
    showNotification(`Adding ${window.currentCase.name} to monitoring system`, 'info');
    
    setTimeout(() => {
        showNotification('Subject added to active monitoring', 'success');
        
        // Update button state
        const addBtn = document.querySelector('.profile-btn.secondary');
        if (addBtn) {
            addBtn.textContent = 'Added ✓';
            addBtn.style.background = 'rgba(40, 167, 69, 0.1)';
            addBtn.style.borderColor = 'rgba(40, 167, 69, 0.3)';
            addBtn.style.color = '#28a745';
            addBtn.disabled = true;
        }
    }, 1500);
}

function handleDocumentClick(index) {
    if (!window.currentCase || !window.currentCase.documents[index]) return;
    
    const document = window.currentCase.documents[index];
    showNotification(`Opening document: ${document.name}`, 'info');
    
    setTimeout(() => {
        // Simulate document download
        const docContent = generateDocumentContent(document);
        downloadFile(docContent, document.name, 'text/plain');
        showNotification('Document downloaded', 'success');
    }, 1000);
}

function generateDocumentContent(document) {
    return `RED SHADOW LINK - SCARLET (RSL)
DOCUMENT: ${document.name}

=== DOCUMENT INFORMATION ===
Type: ${document.type}
Name: ${document.name}
Date: ${document.date}
Source: ${document.source}

=== CASE ASSOCIATION ===
Case ID: ${window.currentCase.id}
Subject: ${window.currentCase.name}
Generated: ${new Date().toLocaleString('pt-BR')}

=== CONTENT ===
This document is associated with the investigation case and contains
relevant information for the ongoing analysis. Access to this document
is restricted to authorized personnel only.

=== SECURITY NOTICE ===
This document is part of an active investigation. Distribution or
reproduction without proper authorization is prohibited.

System: Red Shadow Link - Scarlet v2.0
Classification: ${window.currentCase.securityLevel}
`;
}

function handleProfilePhotoClick() {
    if (!window.currentCase) return;
    
    showNotification('Opening photo analysis', 'info');
    
    setTimeout(() => {
        // Navigate to facial recognition page
        window.location.href = 'facial-recognition.html';
    }, 800);
}

function loadDossierData() {
    // Simulate loading data with progress
    showNotification('Loading dossier data...', 'info');
    
    setTimeout(() => {
        showNotification('Dossier data loaded successfully', 'success');
    }, 1500);
}

function setupNavigationHandlers() {
    // Navigation menu items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const href = item.getAttribute('href');
            if (href && href !== '#' && href !== 'dossier.html') {
                e.preventDefault();
                showNotification('Navigating...', 'info');
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

function animateElements() {
    // Animate left column cards
    const leftCards = document.querySelectorAll('.left-column .section-card');
    leftCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150 + 200);
    });
    
    // Animate right column
    const rightElements = document.querySelectorAll('.right-column > *');
    rightElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateX(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        }, index * 200 + 400);
    });
    
    // Animate info cards
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateX(0)';
        }, index * 150 + 800);
    });
}

function downloadFile(content, filename, contentType) {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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

// Auto-refresh dossier data periodically
setInterval(() => {
    if (window.currentCase) {
        // Simulate minor updates to confidence levels
        const confidenceVariation = (Math.random() - 0.5) * 0.2;
        window.currentCase.confidence = Math.max(80, Math.min(99.9, 
            window.currentCase.confidence + confidenceVariation
        ));
        
        // Update display
        const statusValue = document.querySelector('.status-value');
        if (statusValue) {
            statusValue.textContent = `${window.currentCase.confidence.toFixed(1)} %`;
        }
        
        const securityInfo = document.querySelector('.info-card:nth-child(3) .info-time');
        if (securityInfo) {
            securityInfo.textContent = `${window.currentCase.confidence.toFixed(1)}% match`;
        }
    }
}, 30000); // Update every 30 seconds
