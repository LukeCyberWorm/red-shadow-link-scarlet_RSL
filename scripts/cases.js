document.addEventListener('DOMContentLoaded', function() {
    initializeCases();
});

function initializeCases() {
    // Add click handlers for case action buttons
    const startButtons = document.querySelectorAll('.start-btn');
    const downloadButtons = document.querySelectorAll('.download-btn');
    
    startButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const caseCard = this.closest('.case-card');
            const caseName = caseCard.querySelector('.suspect-details h3').textContent;
            startCase(caseName);
        });
    });
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const caseCard = this.closest('.case-card');
            const caseName = caseCard.querySelector('.suspect-details h3').textContent;
            downloadCase(caseName);
        });
    });
}

function openCase(caseId) {
    const caseData = getCaseData(caseId);
    displayCaseModal(caseData);
}

function getCaseData(caseId) {
    const cases = {
        sandra: {
            name: 'Sandra Pereira',
            email: 'sandra.pereira@example.com',
            cpf: '123.456.789-00',
            caseId: 'CASE-2024-04-23-SANDRA',
            gender: 'female',
            status: 'active',
            digitalFootprint: {
                ip: '102.168.1.100',
                mac: '00:14:2B:3C:4D:5E',
                imei: '987654321'
            },
            realTimeLocation: {
                city: 'Santos',
                region: 'São Vicente',
                coordinates: 'Parque Estadual de sereado Mar'
            },
            facialRecognition: {
                probability: '99,5%',
                lastSeen: 'São Vicente'
            },
            dossier: {
                date: '2024-04-23',
                description: 'Analysis of collected data, geolocation of IP 192.166.1.100 at the specified coordinates, facial recognition match showing a high probability of identity'
            },
            documents: [
                { type: 'PDF', name: 'contrato.pdf', date: '2024-20', source: 'prefeitura' },
                { type: 'DOC', name: 'declaração', date: '2024-21', source: 'jusbrasil' },
                { type: 'PPT', name: 'atividade.ppt', date: '2024-22', source: 'tribunalre' }
            ]
        },
        antonio: {
            name: 'Antônio Souza',
            email: 'antonio.souza@example.com',
            cpf: '987.654.321-00',
            caseId: 'CASE-2024-04-22-ANTONIO',
            gender: 'male',
            status: 'pending'
        },
        mariana: {
            name: 'Mariana Oliveira',
            email: 'mariana.oliveira@examip.com',
            cpf: '321.654.987-00',
            caseId: 'CASE-2024-04-21-MARIANA',
            gender: 'female',
            status: 'pending'
        },
        jorge: {
            name: 'Jorge Santos',
            email: 'jorge.santos@example.com',
            cpf: '789.123.456-00',
            caseId: 'CASE-2024-04-20-JORGE',
            gender: 'male',
            status: 'completed'
        }
    };
    
    return cases[caseId] || cases.sandra;
}

function displayCaseModal(caseData) {
    const modal = document.getElementById('caseModal');
    const modalTitle = document.getElementById('modalTitle');
    const caseDetailContent = document.getElementById('caseDetailContent');
    
    modalTitle.textContent = 'Investigative Case';
    
    let content = `
        <div class="case-profile">
            <div class="profile-avatar ${caseData.gender}"></div>
            <div class="profile-info">
                <h3>${caseData.name}</h3>
                <p class="email">${caseData.email}</p>
                <p class="cpf">CPF ${caseData.cpf}</p>
            </div>
        </div>
        
        <div class="case-details">
            <div class="detail-section">
                <h4>Digital Footprint</h4>
                <div class="detail-grid">
                    <div class="detail-item">
                        <span class="detail-label">IP Address</span>
                        <span class="detail-value">${caseData.digitalFootprint?.ip || '192.168.1.100'}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">MAC Address</span>
                        <span class="detail-value">${caseData.digitalFootprint?.mac || '00:14:2B:3C:4D:5E'}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">IMEI</span>
                        <span class="detail-value">${caseData.digitalFootprint?.imei || '987654321'}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Documents</span>
                        <span class="detail-value">3 documents</span>
                    </div>
                </div>
            </div>
            
            ${caseData.status === 'active' ? `
            <div class="detail-section real-time-section">
                <h4>Real-Time Location</h4>
                <div class="real-time-status">
                    <div class="status-indicator"></div>
                    <span>Tracking Active</span>
                </div>
                <div class="location-path">
                    <div class="path-item">
                        <div class="path-icon">📍</div>
                        <div class="path-details">
                            <div class="path-location">${caseData.realTimeLocation?.city || 'Santos'}</div>
                            <div class="path-time">Current Location</div>
                        </div>
                    </div>
                    <div class="path-item">
                        <div class="path-icon">🏙️</div>
                        <div class="path-details">
                            <div class="path-location">${caseData.realTimeLocation?.region || 'São Vicente'}</div>
                            <div class="path-time">Previous Location</div>
                        </div>
                    </div>
                    <div class="path-item">
                        <div class="path-icon">🌳</div>
                        <div class="path-details">
                            <div class="path-location">${caseData.realTimeLocation?.coordinates || 'Praia Grande'}</div>
                            <div class="path-time">Earlier Today</div>
                        </div>
                    </div>
                </div>
            </div>
            ` : `
            <div class="location-map">
                <div class="map-placeholder">🗺️</div>
                <div class="location-info">
                    <p>Localização não disponível</p>
                    <p>Case Status: ${caseData.status}</p>
                </div>
            </div>
            `}
        </div>
        
        ${caseData.facialRecognition ? `
        <div class="dossier-section">
            <div class="detail-section">
                <h4>Facial Recognition</h4>
                <div class="detail-grid">
                    <div class="detail-item">
                        <span class="detail-label">Probability</span>
                        <span class="detail-value">${caseData.facialRecognition.probability}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Last Seen</span>
                        <span class="detail-value">${caseData.facialRecognition.lastSeen}</span>
                    </div>
                </div>
                <div class="profile-avatar ${caseData.gender}" style="width: 80px; height: 80px; margin: 15px auto;"></div>
            </div>
        </div>
        ` : ''}
        
        ${caseData.documents ? `
        <div class="dossier-section">
            <div class="detail-section">
                <h4>Dossier</h4>
                <p class="description">${caseData.dossier?.description || 'Case documentation and analysis'}</p>
                <div class="dossier-files">
                    ${caseData.documents.map(doc => `
                        <div class="dossier-file" onclick="openDocument('${doc.name}')">
                            <div class="file-icon">${doc.type === 'PDF' ? '📄' : doc.type === 'DOC' ? '📝' : '📊'}</div>
                            <div class="file-name">${doc.name}</div>
                            <div class="file-date">${doc.date}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
        ` : ''}
        
        <div class="modal-actions">
            <button class="btn btn-outline">PDF</button>
            <button class="btn btn-outline">JSON</button>
            ${caseData.status === 'active' ? `
                <button class="btn btn-secondary">Open Profile</button>
                <button class="btn btn-primary">Add to Case</button>
            ` : `
                <button class="btn btn-primary">Download Report</button>
            `}
        </div>
    `;
    
    caseDetailContent.innerHTML = content;
    modal.style.display = 'flex';
}

function closeCaseModal() {
    const modal = document.getElementById('caseModal');
    modal.style.display = 'none';
}

function startCase(caseName) {
    // Simulate starting a case investigation
    showNotification(`Iniciando investigação para ${caseName}...`, 'info');
    
    setTimeout(() => {
        showNotification(`Investigação ativa para ${caseName}`, 'success');
    }, 2000);
}

function downloadCase(caseName) {
    // Simulate downloading case report
    showNotification(`Gerando relatório para ${caseName}...`, 'info');
    
    setTimeout(() => {
        // Create a mock download
        const link = document.createElement('a');
        link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(`Relatório do Caso: ${caseName}\nData: ${new Date().toLocaleDateString()}\nStatus: Concluído`);
        link.download = `relatorio_${caseName.toLowerCase().replace(/\s+/g, '_')}.txt`;
        link.click();
        
        showNotification(`Relatório baixado com sucesso`, 'success');
    }, 1500);
}

function openDocument(fileName) {
    showNotification(`Abrindo documento: ${fileName}`, 'info');
    
    // In a real application, this would open the actual document
    setTimeout(() => {
        showNotification(`Documento ${fileName} não disponível na demonstração`, 'warning');
    }, 1000);
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Click outside modal to close
document.getElementById('caseModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeCaseModal();
    }
});

// Add notification styles
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 2000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 350px;
        word-wrap: break-word;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification.info {
        background: rgba(59, 130, 246, 0.9);
        border: 1px solid rgba(59, 130, 246, 0.5);
    }
    
    .notification.success {
        background: rgba(34, 197, 94, 0.9);
        border: 1px solid rgba(34, 197, 94, 0.5);
    }
    
    .notification.warning {
        background: rgba(251, 191, 36, 0.9);
        border: 1px solid rgba(251, 191, 36, 0.5);
        color: #000;
    }
    
    .notification.error {
        background: rgba(239, 68, 68, 0.9);
        border: 1px solid rgba(239, 68, 68, 0.5);
    }
`;
document.head.appendChild(notificationStyles);
