document.addEventListener('DOMContentLoaded', function() {
    initializeLocation();
});

function initializeLocation() {
    // Initialize time filter buttons
    const timeButtons = document.querySelectorAll('.time-btn');
    timeButtons.forEach(button => {
        button.addEventListener('click', function() {
            timeButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            updateLocationData(this.dataset.period);
        });
    });

    // Initialize map control buttons
    const mapButtons = document.querySelectorAll('.map-btn');
    mapButtons.forEach(button => {
        button.addEventListener('click', function() {
            mapButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            toggleMapView(this.textContent);
        });
    });

    // Initialize confidence toggle
    const confidenceOptions = document.querySelectorAll('.toggle-option');
    confidenceOptions.forEach(option => {
        option.addEventListener('click', function() {
            confidenceOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            updateConfidenceFilter(this.dataset.confidence);
        });
    });

    // Initialize search functionality
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Initialize filter toggles
    const filterToggles = document.querySelectorAll('.toggle-container input[type="checkbox"]');
    filterToggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            updateFilters();
        });
    });

    // Initialize PDF buttons
    const pdfButtons = document.querySelectorAll('.pdf-btn');
    pdfButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const row = this.closest('tr');
            const target = row.cells[0].textContent;
            const location = row.cells[2].textContent;
            generateLocationReport(target, location);
        });
    });

    // Initialize real-time updates
    startLocationTracking();
}

function updateLocationData(period) {
    showLocationNotification(`Atualizando dados para ${period === '24h' ? 'últimas 24 horas' : 'últimos 7 dias'}...`);
    
    // Simulate data update
    setTimeout(() => {
        if (period === '7d') {
            addHistoricalData();
        }
        showLocationNotification('Dados atualizados com sucesso', 'success');
    }, 1500);
}

function addHistoricalData() {
    const tbody = document.querySelector('.history-table tbody');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>Ana</td>
        <td>2024-04-14</td>
        <td>Belo Horizonte, MG</td>
        <td><span class="confidence-badge medium">87 %</span></td>
        <td><button class="btn-small pdf-btn">PDF</button></td>
    `;
    
    // Add event listener to new PDF button
    newRow.querySelector('.pdf-btn').addEventListener('click', function(e) {
        e.stopPropagation();
        const row = this.closest('tr');
        const target = row.cells[0].textContent;
        const location = row.cells[2].textContent;
        generateLocationReport(target, location);
    });
    
    tbody.appendChild(newRow);
}

function toggleMapView(viewType) {
    const mapBackground = document.querySelector('.map-background');
    
    if (viewType === 'Satellite') {
        mapBackground.style.background = 'linear-gradient(135deg, #2a4a2a 0%, #1a3a1a 50%, #0a2a0a 100%)';
        showLocationNotification('Mudando para visão de satélite...');
    } else {
        mapBackground.style.background = 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)';
        showLocationNotification('Mudando para visão do mapa...');
    }
    
    // Simulate view change
    setTimeout(() => {
        showLocationNotification(`Visualização alterada para ${viewType}`, 'success');
    }, 1000);
}

function updateConfidenceFilter(confidence) {
    const badges = document.querySelectorAll('.confidence-badge');
    
    badges.forEach(badge => {
        const row = badge.closest('tr');
        
        if (confidence === 'high') {
            // Show only high confidence items
            if (badge.classList.contains('high')) {
                row.style.display = 'table-row';
            } else {
                row.style.display = 'none';
            }
        } else {
            // Show all items
            row.style.display = 'table-row';
        }
    });
    
    showLocationNotification(`Filtro de confiança atualizado para: ${confidence}`, 'info');
}

function performSearch() {
    const searchInput = document.querySelector('.search-input');
    const query = searchInput.value.trim();
    
    if (!query) {
        showLocationNotification('Digite algo para pesquisar', 'warning');
        return;
    }
    
    showLocationNotification(`Pesquisando por: ${query}...`);
    
    // Simulate search
    setTimeout(() => {
        if (query.toLowerCase().includes('ip') || query.includes('.')) {
            showLocationNotification(`Encontrados 2 resultados para IP: ${query}`, 'success');
            highlightSearchResults();
        } else {
            showLocationNotification(`Nenhum resultado encontrado para: ${query}`, 'warning');
        }
    }, 1500);
}

function highlightSearchResults() {
    const rows = document.querySelectorAll('.history-table tbody tr');
    rows.forEach((row, index) => {
        if (index < 2) {
            row.style.background = 'rgba(255, 68, 68, 0.1)';
            setTimeout(() => {
                row.style.background = '';
            }, 3000);
        }
    });
}

function updateFilters() {
    const torOrigin = document.getElementById('torOrigin').checked;
    const vpnDetected = document.getElementById('vpnDetected').checked;
    const mobileDevice = document.getElementById('mobileDevice').checked;
    
    let filterMessage = 'Filtros ativos: ';
    const activeFilters = [];
    
    if (torOrigin) activeFilters.push('TOR Origin');
    if (vpnDetected) activeFilters.push('VPN Detected');
    if (mobileDevice) activeFilters.push('Mobile Device');
    
    if (activeFilters.length > 0) {
        filterMessage += activeFilters.join(', ');
        showLocationNotification(filterMessage, 'info');
        
        // Simulate filtering effect
        const mapMarkers = document.querySelectorAll('.location-marker');
        mapMarkers.forEach(marker => {
            if (vpnDetected) {
                marker.style.filter = 'hue-rotate(120deg)';
            } else if (torOrigin) {
                marker.style.filter = 'hue-rotate(240deg)';
            } else {
                marker.style.filter = 'none';
            }
        });
    } else {
        showLocationNotification('Todos os filtros removidos', 'info');
        const mapMarkers = document.querySelectorAll('.location-marker');
        mapMarkers.forEach(marker => {
            marker.style.filter = 'none';
        });
    }
}

function generateLocationReport(target, location) {
    showLocationNotification(`Gerando relatório de localização para ${target}...`);
    
    setTimeout(() => {
        // Create mock PDF content
        const reportContent = `
Relatório de Localização - RSL Sistema
=====================================

Alvo: ${target}
Localização: ${location}
Data do Relatório: ${new Date().toLocaleDateString('pt-BR')}
Hora: ${new Date().toLocaleTimeString('pt-BR')}

DETALHES DA LOCALIZAÇÃO:
- Coordenadas: Não disponível na demonstração
- Precisão: Alta (baseada em IP)
- Método de Detecção: Análise de IP e triangulação
- Confiabilidade: 96%

HISTÓRICO DE MOVIMENTO:
- Última posição conhecida: ${location}
- Movimento detectado: Sim
- Padrão de comportamento: Regular

OBSERVAÇÕES:
Este é um relatório de demonstração do sistema RSL.
Em um ambiente real, conteria dados detalhados de geolocalização.

Relatório gerado pelo Sistema RSL - Red Shadow Link Scarlet
        `;
        
        // Create and download file
        const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `relatorio_localizacao_${target.toLowerCase()}_${new Date().toISOString().split('T')[0]}.txt`;
        link.click();
        
        showLocationNotification(`Relatório de ${target} gerado com sucesso`, 'success');
    }, 1000);
}

function startLocationTracking() {
    // Simulate real-time location updates
    setInterval(() => {
        updateMarkerPositions();
        updateLocationHistory();
    }, 15000); // Update every 15 seconds
}

function updateMarkerPositions() {
    const markers = document.querySelectorAll('.marker-dot');
    
    markers.forEach(marker => {
        // Add a subtle animation to show "live" tracking
        marker.style.animation = 'none';
        setTimeout(() => {
            marker.style.animation = 'pulse 2s infinite';
        }, 100);
    });
}

function updateLocationHistory() {
    // Randomly update one of the timestamps
    const timeElements = document.querySelectorAll('.history-table tbody td:nth-child(2)');
    
    if (timeElements.length > 0 && Math.random() > 0.7) {
        const randomElement = timeElements[Math.floor(Math.random() * timeElements.length)];
        const currentDate = randomElement.textContent;
        
        // Update to current date occasionally to show real-time updates
        if (Math.random() > 0.5) {
            const today = new Date().toISOString().split('T')[0];
            randomElement.textContent = today;
            
            // Highlight the updated row
            const row = randomElement.closest('tr');
            row.style.background = 'rgba(34, 197, 94, 0.1)';
            setTimeout(() => {
                row.style.background = '';
            }, 2000);
        }
    }
}

function showLocationNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.location-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `location-notification ${type}`;
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
    }, type === 'info' ? 2000 : 3000);
}

// Add location notification styles
const locationNotificationStyles = document.createElement('style');
locationNotificationStyles.textContent = `
    .location-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 18px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 2000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
        font-size: 14px;
    }
    
    .location-notification.show {
        transform: translateX(0);
    }
    
    .location-notification.info {
        background: rgba(59, 130, 246, 0.9);
        border: 1px solid rgba(59, 130, 246, 0.5);
    }
    
    .location-notification.success {
        background: rgba(34, 197, 94, 0.9);
        border: 1px solid rgba(34, 197, 94, 0.5);
    }
    
    .location-notification.warning {
        background: rgba(251, 191, 36, 0.9);
        border: 1px solid rgba(251, 191, 36, 0.5);
        color: #000;
    }
`;
document.head.appendChild(locationNotificationStyles);
