document.addEventListener('DOMContentLoaded', function() {
    initializeLocation();
    setupEventListeners();
    startLocationTracking();
    animateElements();
});

function initializeLocation() {
    // Set active navigation item
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    
    const locationNavItem = document.querySelector('.nav-item[href="location.html"]');
    if (locationNavItem) {
        locationNavItem.classList.add('active');
    }
    
    // Initialize location data
    initializeLocationData();
}

function initializeLocationData() {
    const locationData = [
        {
            id: 1,
            target: 'João',
            date: '2024-04-16',
            location: 'São Paulo, Brazil',
            confidence: 96,
            coordinates: { lat: -23.550520, lng: -46.633308 },
            device: 'mobile',
            vpn: false,
            tor: false
        },
        {
            id: 2,
            target: 'Maria',
            date: '2024-04-15',
            location: 'Rio de Janeiro, Brazil',
            confidence: 91,
            coordinates: { lat: -22.906847, lng: -43.172896 },
            device: 'desktop',
            vpn: true,
            tor: false
        },
        {
            id: 3,
            target: 'Antonio',
            date: '2024-04-14',
            location: 'Belo Horizonte, Brazil',
            confidence: 87,
            coordinates: { lat: -19.919054, lng: -43.937644 },
            device: 'mobile',
            vpn: false,
            tor: true
        },
        {
            id: 4,
            target: 'Sandra',
            date: '2024-04-13',
            location: 'São Paulo, Brazil',
            confidence: 93,
            coordinates: { lat: -23.550520, lng: -46.633308 },
            device: 'mobile',
            vpn: false,
            tor: false
        },
        {
            id: 5,
            target: 'Lucas',
            date: '2024-04-12',
            location: 'Brasília, Brazil',
            confidence: 76,
            coordinates: { lat: -15.794229, lng: -47.882166 },
            device: 'desktop',
            vpn: true,
            tor: false
        }
    ];
    
    // Store location data globally
    window.locationData = locationData;
    
    // Update location statistics
    updateLocationStatistics();
}

function updateLocationStatistics() {
    const totalLocations = window.locationData.length;
    const highConfidence = window.locationData.filter(loc => loc.confidence >= 90).length;
    const recentLocations = window.locationData.filter(loc => {
        const locDate = new Date(loc.date);
        const today = new Date();
        const diffTime = Math.abs(today - locDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 7;
    }).length;
    
    console.log(`Location Statistics: ${totalLocations} total, ${highConfidence} high confidence, ${recentLocations} recent`);
}

function setupEventListeners() {
    // Search input
    const searchInput = document.getElementById('locationSearch');
    if (searchInput) {
        searchInput.addEventListener('input', handleLocationSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performLocationSearch(searchInput.value);
            }
        });
    }
    
    // Time filter radio buttons
    const timeFilters = document.querySelectorAll('input[name="timeFilter"]');
    timeFilters.forEach(filter => {
        filter.addEventListener('change', handleTimeFilter);
    });
    
    // Confidence slider
    const confidenceSlider = document.querySelector('.confidence-slider');
    if (confidenceSlider) {
        confidenceSlider.addEventListener('input', handleConfidenceFilter);
    }
    
    // Detection toggle filters
    const toggleFilters = document.querySelectorAll('.toggle-input');
    toggleFilters.forEach(toggle => {
        toggle.addEventListener('change', handleDetectionFilter);
    });
    
    // Export button
    const exportBtn = document.querySelector('.export-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', handleExportData);
    }
    
    // History filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => handleHistoryFilter(e.target));
    });
    
    // PDF action buttons
    const pdfButtons = document.querySelectorAll('.pdf-btn');
    pdfButtons.forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            handlePdfGeneration(index);
        });
    });
    
    // Table row clicks
    const tableRows = document.querySelectorAll('.table-row');
    tableRows.forEach((row, index) => {
        row.addEventListener('click', () => handleLocationDetails(index));
    });
    
    // Map marker interactions
    const locationMarkers = document.querySelectorAll('.location-marker');
    locationMarkers.forEach(marker => {
        marker.addEventListener('click', handleMarkerClick);
    });
    
    // Navigation handlers
    setupNavigationHandlers();
}

function handleLocationSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    
    if (searchTerm.length > 2) {
        showSearchSuggestions(searchTerm);
    } else {
        hideSearchSuggestions();
    }
    
    // Filter table rows based on search
    filterTableBySearch(searchTerm);
}

function showSearchSuggestions(searchTerm) {
    const suggestions = [
        'IP: 192.168.1.1',
        'Device: iPhone 12 Pro',
        'Location: São Paulo',
        'Target: Sandra Pereira',
        'Date: 2024-04-16'
    ].filter(suggestion => 
        suggestion.toLowerCase().includes(searchTerm)
    );
    
    // Create or update suggestions dropdown
    let dropdown = document.querySelector('.search-suggestions');
    if (!dropdown) {
        dropdown = document.createElement('div');
        dropdown.className = 'search-suggestions';
        dropdown.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(30, 30, 30, 0.95);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            margin-top: 4px;
            max-height: 200px;
            overflow-y: auto;
            z-index: 1000;
            backdrop-filter: blur(10px);
        `;
        document.querySelector('.search-input-wrapper').appendChild(dropdown);
    }
    
    dropdown.innerHTML = suggestions.map(suggestion => `
        <div class="suggestion-item" style="
            padding: 12px 16px;
            cursor: pointer;
            transition: background 0.2s ease;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        " onmouseover="this.style.background='rgba(238, 69, 64, 0.1)'"
           onmouseout="this.style.background='transparent'"
           onclick="selectSuggestion('${suggestion}')">
            ${suggestion}
        </div>
    `).join('');
}

function hideSearchSuggestions() {
    const dropdown = document.querySelector('.search-suggestions');
    if (dropdown) {
        dropdown.remove();
    }
}

function selectSuggestion(suggestion) {
    const searchInput = document.getElementById('locationSearch');
    searchInput.value = suggestion;
    hideSearchSuggestions();
    performLocationSearch(suggestion);
}

function performLocationSearch(searchTerm) {
    showNotification(`Searching for: ${searchTerm}`, 'info');
    
    // Simulate search process
    setTimeout(() => {
        const results = window.locationData.filter(item => 
            item.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.location.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        showNotification(`Found ${results.length} results`, 'success');
        updateMapWithResults(results);
    }, 1000);
}

function filterTableBySearch(searchTerm) {
    const tableRows = document.querySelectorAll('.table-row');
    
    tableRows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const matches = text.includes(searchTerm);
        
        row.style.display = matches ? 'grid' : 'none';
        
        if (matches && searchTerm.length > 0) {
            row.style.background = 'rgba(238, 69, 64, 0.05)';
        } else {
            row.style.background = '';
        }
    });
}

function handleTimeFilter(event) {
    const timeFilter = event.target.value;
    showNotification(`Filter applied: ${timeFilter}`, 'info');
    
    // Apply time-based filtering logic
    const now = new Date();
    const cutoffDate = timeFilter === '24h' ? 
        new Date(now.getTime() - 24 * 60 * 60 * 1000) :
        new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    filterTableByDate(cutoffDate);
}

function filterTableByDate(cutoffDate) {
    const tableRows = document.querySelectorAll('.table-row');
    
    tableRows.forEach(row => {
        const dateCell = row.querySelector('.table-cell:nth-child(2)');
        const rowDate = new Date(dateCell.textContent);
        
        if (rowDate >= cutoffDate) {
            row.style.display = 'grid';
            row.style.opacity = '1';
        } else {
            row.style.display = 'none';
        }
    });
}

function handleConfidenceFilter(event) {
    const confidenceValue = event.target.value;
    showNotification(`Confidence filter: ${confidenceValue}%+`, 'info');
    
    filterTableByConfidence(confidenceValue);
}

function filterTableByConfidence(minConfidence) {
    const tableRows = document.querySelectorAll('.table-row');
    
    tableRows.forEach(row => {
        const confidenceBadge = row.querySelector('.confidence-badge');
        const confidence = parseInt(confidenceBadge.textContent);
        
        if (confidence >= minConfidence) {
            row.style.display = 'grid';
            row.style.opacity = '1';
        } else {
            row.style.opacity = '0.3';
        }
    });
}

function handleDetectionFilter(event) {
    const filterType = event.target.closest('.toggle-filter').textContent.trim();
    const isChecked = event.target.checked;
    
    showNotification(`${filterType} filter: ${isChecked ? 'ON' : 'OFF'}`, 'info');
    
    // Apply detection-based filtering
    applyDetectionFilters();
}

function applyDetectionFilters() {
    const torFilter = document.querySelector('.toggle-filter:nth-child(1) .toggle-input').checked;
    const vpnFilter = document.querySelector('.toggle-filter:nth-child(2) .toggle-input').checked;
    const mobileFilter = document.querySelector('.toggle-filter:nth-child(3) .toggle-input').checked;
    
    // Filter logic would be applied here based on the actual data
    console.log('Filters applied:', { torFilter, vpnFilter, mobileFilter });
}

function handleExportData() {
    showNotification('Preparing data export...', 'info');
    
    setTimeout(() => {
        const exportData = generateLocationReport();
        downloadFile(exportData, 'location_tracking_report.json', 'application/json');
        showNotification('Location data exported successfully', 'success');
    }, 2000);
}

function generateLocationReport() {
    const report = {
        generatedAt: new Date().toISOString(),
        totalLocations: window.locationData.length,
        highConfidenceCount: window.locationData.filter(loc => loc.confidence >= 90).length,
        locations: window.locationData.map(loc => ({
            ...loc,
            exportedAt: new Date().toISOString()
        })),
        summary: {
            averageConfidence: Math.round(
                window.locationData.reduce((sum, loc) => sum + loc.confidence, 0) / window.locationData.length
            ),
            dateRange: {
                from: Math.min(...window.locationData.map(loc => new Date(loc.date))),
                to: Math.max(...window.locationData.map(loc => new Date(loc.date)))
            }
        }
    };
    
    return JSON.stringify(report, null, 2);
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

function handleHistoryFilter(button) {
    // Remove active class from all buttons
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    const filter = button.getAttribute('data-filter');
    showNotification(`Applying filter: ${filter}`, 'info');
    
    applyHistoryFilter(filter);
}

function applyHistoryFilter(filter) {
    const tableRows = document.querySelectorAll('.table-row');
    
    tableRows.forEach(row => {
        let shouldShow = true;
        
        switch (filter) {
            case 'high-confidence':
                const confidence = parseInt(row.querySelector('.confidence-badge').textContent);
                shouldShow = confidence >= 90;
                break;
            case 'recent':
                const date = new Date(row.getAttribute('data-date'));
                const daysDiff = Math.floor((new Date() - date) / (1000 * 60 * 60 * 24));
                shouldShow = daysDiff <= 3;
                break;
            case 'all':
            default:
                shouldShow = true;
                break;
        }
        
        row.style.display = shouldShow ? 'grid' : 'none';
    });
}

function handlePdfGeneration(index) {
    const locationItem = window.locationData[index];
    showNotification(`Generating PDF for ${locationItem.target}`, 'info');
    
    setTimeout(() => {
        const pdfContent = generateLocationPDF(locationItem);
        downloadFile(pdfContent, `location_${locationItem.target.toLowerCase()}_${locationItem.date}.txt`, 'text/plain');
        showNotification('PDF generated successfully', 'success');
    }, 1500);
}

function generateLocationPDF(locationItem) {
    return `RED SHADOW LINK - SCARLET (RSL)
LOCATION TRACKING REPORT

=== TARGET INFORMATION ===
Target: ${locationItem.target}
Date: ${locationItem.date}
Location: ${locationItem.location}
Confidence: ${locationItem.confidence}%

=== TECHNICAL DETAILS ===
Device Type: ${locationItem.device}
VPN Detected: ${locationItem.vpn ? 'Yes' : 'No'}
TOR Usage: ${locationItem.tor ? 'Yes' : 'No'}

=== COORDINATES ===
Latitude: ${locationItem.coordinates.lat}
Longitude: ${locationItem.coordinates.lng}

=== ANALYSIS ===
This location data was collected through advanced tracking algorithms
with a confidence level of ${locationItem.confidence}%. The information
is suitable for investigative purposes under proper authorization.

=== SECURITY NOTICE ===
This report contains sensitive location data. Handle according to
privacy regulations and authorized investigation procedures.

Generated: ${new Date().toLocaleString('pt-BR')}
System: Red Shadow Link - Scarlet v2.0
Operator: RSL Demo System
`;
}

function handleLocationDetails(index) {
    const locationItem = window.locationData[index];
    showNotification(`Opening details for ${locationItem.target}`, 'info');
    
    // Create and show location details modal
    showLocationModal(locationItem);
}

function showLocationModal(locationItem) {
    const modal = document.createElement('div');
    modal.className = 'location-modal';
    modal.innerHTML = `
        <div class="modal-backdrop" onclick="closeLocationModal()"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>Location Details - ${locationItem.target}</h3>
                <button class="modal-close" onclick="closeLocationModal()">×</button>
            </div>
            <div class="modal-body">
                <div class="detail-grid">
                    <div class="detail-item">
                        <label>Target</label>
                        <value>${locationItem.target}</value>
                    </div>
                    <div class="detail-item">
                        <label>Date & Time</label>
                        <value>${locationItem.date}</value>
                    </div>
                    <div class="detail-item">
                        <label>Location</label>
                        <value>${locationItem.location}</value>
                    </div>
                    <div class="detail-item">
                        <label>Confidence</label>
                        <value>${locationItem.confidence}%</value>
                    </div>
                    <div class="detail-item">
                        <label>Device Type</label>
                        <value>${locationItem.device}</value>
                    </div>
                    <div class="detail-item">
                        <label>VPN Status</label>
                        <value>${locationItem.vpn ? 'Detected' : 'Not Detected'}</value>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease;
    `;
    
    document.body.appendChild(modal);
    
    // Add styles to modal elements
    const backdrop = modal.querySelector('.modal-backdrop');
    backdrop.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
    `;
    
    const content = modal.querySelector('.modal-content');
    content.style.cssText = `
        background: rgba(30, 30, 30, 0.95);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 16px;
        padding: 24px;
        max-width: 500px;
        width: 90%;
        position: relative;
        backdrop-filter: blur(20px);
    `;
    
    window.closeLocationModal = function() {
        modal.remove();
        delete window.closeLocationModal;
    };
}

function handleMarkerClick(event) {
    const marker = event.currentTarget;
    const location = marker.getAttribute('data-location');
    
    showNotification(`Focusing on ${location}`, 'info');
    
    // Animate marker
    marker.style.transform = 'translate(-50%, -50%) scale(1.2)';
    setTimeout(() => {
        marker.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 200);
    
    // Update map focus
    updateMapFocus(location);
}

function updateMapFocus(location) {
    // Simulate map focus update
    const mapContainer = document.querySelector('.map-container');
    mapContainer.style.boxShadow = '0 0 30px rgba(238, 69, 64, 0.3)';
    
    setTimeout(() => {
        mapContainer.style.boxShadow = '';
    }, 2000);
}

function updateMapWithResults(results) {
    // Update map to show filtered results
    const markers = document.querySelectorAll('.location-marker');
    
    markers.forEach(marker => {
        const location = marker.getAttribute('data-location');
        const hasResult = results.some(result => 
            result.location.toLowerCase().includes(location.toLowerCase())
        );
        
        if (hasResult) {
            marker.style.opacity = '1';
            marker.style.transform = 'translate(-50%, -50%) scale(1.1)';
        } else {
            marker.style.opacity = '0.3';
            marker.style.transform = 'translate(-50%, -50%) scale(0.8)';
        }
    });
}

function setupNavigationHandlers() {
    // Navigation menu items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const href = item.getAttribute('href');
            if (href && href !== '#' && href !== 'location.html') {
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

function startLocationTracking() {
    // Simulate real-time location updates
    setInterval(() => {
        updateLocationData();
        updateMapMarkers();
    }, 15000); // Update every 15 seconds
}

function updateLocationData() {
    // Simulate new location data
    if (window.locationData && window.locationData.length > 0) {
        const randomIndex = Math.floor(Math.random() * window.locationData.length);
        const location = window.locationData[randomIndex];
        
        // Slightly update confidence
        location.confidence = Math.min(99, location.confidence + Math.floor(Math.random() * 3) - 1);
        
        console.log(`Updated location data for ${location.target}: ${location.confidence}% confidence`);
    }
}

function updateMapMarkers() {
    // Animate map markers to show activity
    const activeMarkers = document.querySelectorAll('.location-marker.active');
    activeMarkers.forEach(marker => {
        const pulse = marker.querySelector('.marker-pulse');
        if (pulse) {
            pulse.style.animation = 'none';
            setTimeout(() => {
                pulse.style.animation = 'pulse 2s infinite';
            }, 100);
        }
    });
}

function animateElements() {
    // Animate search section
    const searchSection = document.querySelector('.search-section');
    searchSection.style.opacity = '0';
    searchSection.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        searchSection.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        searchSection.style.opacity = '1';
        searchSection.style.transform = 'translateY(0)';
    }, 200);
    
    // Animate map section
    const mapSection = document.querySelector('.map-section');
    mapSection.style.opacity = '0';
    mapSection.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        mapSection.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        mapSection.style.opacity = '1';
        mapSection.style.transform = 'translateY(0)';
    }, 400);
    
    // Animate history section
    const historySection = document.querySelector('.history-section');
    historySection.style.opacity = '0';
    historySection.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        historySection.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        historySection.style.opacity = '1';
        historySection.style.transform = 'translateY(0)';
    }, 600);
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
        info: '📍',
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
