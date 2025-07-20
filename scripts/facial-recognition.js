document.addEventListener('DOMContentLoaded', function() {
    initializeFacialRecognition();
});

function initializeFacialRecognition() {
    const fileInput = document.getElementById('fileInput');
    const imageUploadArea = document.getElementById('imageUploadArea');
    const processBtn = document.getElementById('processBtn');
    const matchScore = document.getElementById('matchScore');
    const matchScoreValue = document.getElementById('matchScoreValue');
    
    // File input handler
    fileInput.addEventListener('change', handleFileSelect);
    
    // Drag and drop handlers
    imageUploadArea.addEventListener('click', () => fileInput.click());
    imageUploadArea.addEventListener('dragover', handleDragOver);
    imageUploadArea.addEventListener('dragleave', handleDragLeave);
    imageUploadArea.addEventListener('drop', handleDrop);
    
    // Match score slider
    matchScore.addEventListener('input', function() {
        matchScoreValue.textContent = `≥ ${this.value}`;
    });
    
    // Process button
    processBtn.addEventListener('click', processImage);
    
    // Match card clicks
    document.addEventListener('click', function(e) {
        if (e.target.closest('.match-card')) {
            const matchCard = e.target.closest('.match-card');
            showCaseDetails(matchCard);
        }
    });
}

function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
        handleImageFile(file);
    }
}

function handleDragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add('dragover');
}

function handleDragLeave(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');
}

function handleDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        const file = files[0];
        if (file.type.startsWith('image/')) {
            handleImageFile(file);
        }
    }
}

function handleImageFile(file) {
    const reader = new FileReader();
    const imageUploadArea = document.getElementById('imageUploadArea');
    const processBtn = document.getElementById('processBtn');
    
    reader.onload = function(e) {
        imageUploadArea.innerHTML = `
            <img src="${e.target.result}" alt="Uploaded image" class="uploaded-image">
            <div class="image-overlay">
                <button class="change-image-btn" onclick="changeImage()">Alterar Imagem</button>
            </div>
        `;
        
        processBtn.disabled = false;
    };
    
    reader.readAsDataURL(file);
}

function changeImage() {
    const imageUploadArea = document.getElementById('imageUploadArea');
    const processBtn = document.getElementById('processBtn');
    
    imageUploadArea.innerHTML = `
        <div class="upload-placeholder">
            <div class="upload-icon">📷</div>
            <h3>Upload ou Capture uma Imagem</h3>
            <p>Arraste uma imagem aqui ou clique para selecionar</p>
            <p class="file-info">Suporta JPG, PNG, WebP (max 10MB)</p>
        </div>
        <input type="file" id="fileInput" accept="image/*" style="display: none;">
    `;
    
    processBtn.disabled = true;
    
    // Re-attach event listeners
    const fileInput = document.getElementById('fileInput');
    fileInput.addEventListener('change', handleFileSelect);
    imageUploadArea.addEventListener('click', () => fileInput.click());
}

function processImage() {
    const imageUploadArea = document.getElementById('imageUploadArea');
    const resultsSection = document.getElementById('resultsSection');
    
    // Show processing overlay
    showProcessingOverlay(imageUploadArea);
    
    // Simulate processing time
    setTimeout(() => {
        hideProcessingOverlay(imageUploadArea);
        resultsSection.style.display = 'block';
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }, 3000);
}

function showProcessingOverlay(container) {
    const overlay = document.createElement('div');
    overlay.className = 'processing-overlay';
    overlay.innerHTML = `
        <div class="processing-content">
            <div class="processing-spinner"></div>
            <div class="processing-text">
                <h4>Processando Reconhecimento Facial...</h4>
                <p>Analisando características faciais</p>
                <p>Comparando com base de dados</p>
            </div>
        </div>
    `;
    
    container.appendChild(overlay);
}

function hideProcessingOverlay(container) {
    const overlay = container.querySelector('.processing-overlay');
    if (overlay) {
        overlay.remove();
    }
}

function showCaseDetails(matchCard) {
    const confidence = matchCard.dataset.confidence;
    const resultsSection = document.getElementById('resultsSection');
    const caseDetailsSection = document.getElementById('caseDetailsSection');
    
    // Update case details with match data
    const confidenceElements = caseDetailsSection.querySelectorAll('.value');
    confidenceElements[2].textContent = `${Math.round(confidence * 100)} %`;
    
    // Hide results and show case details
    resultsSection.style.display = 'none';
    caseDetailsSection.style.display = 'block';
    caseDetailsSection.scrollIntoView({ behavior: 'smooth' });
}

function goBack() {
    const resultsSection = document.getElementById('resultsSection');
    const caseDetailsSection = document.getElementById('caseDetailsSection');
    
    caseDetailsSection.style.display = 'none';
    resultsSection.style.display = 'block';
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

function toggleCamera() {
    const cameraBtn = document.getElementById('cameraBtn');
    const imageUploadArea = document.getElementById('imageUploadArea');
    
    if (cameraBtn.textContent === 'Capture Camera') {
        startCamera();
        cameraBtn.textContent = 'Stop Camera';
    } else {
        stopCamera();
        cameraBtn.textContent = 'Capture Camera';
    }
}

function startCamera() {
    const imageUploadArea = document.getElementById('imageUploadArea');
    
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
            imageUploadArea.innerHTML = `
                <div class="camera-preview">
                    <video class="camera-video" autoplay></video>
                    <button class="capture-btn" onclick="capturePhoto()">Capturar Foto</button>
                </div>
            `;
            
            const video = imageUploadArea.querySelector('.camera-video');
            video.srcObject = stream;
            
            // Store stream reference for later cleanup
            window.cameraStream = stream;
        })
        .catch(function(error) {
            console.error('Error accessing camera:', error);
            alert('Erro ao acessar câmera. Verifique as permissões.');
        });
}

function stopCamera() {
    if (window.cameraStream) {
        window.cameraStream.getTracks().forEach(track => track.stop());
        window.cameraStream = null;
    }
    
    // Reset upload area
    changeImage();
}

function capturePhoto() {
    const video = document.querySelector('.camera-video');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);
    
    const imageDataUrl = canvas.toDataURL('image/png');
    
    // Stop camera and show captured image
    stopCamera();
    
    const imageUploadArea = document.getElementById('imageUploadArea');
    const processBtn = document.getElementById('processBtn');
    
    imageUploadArea.innerHTML = `
        <img src="${imageDataUrl}" alt="Captured image" class="uploaded-image">
        <div class="image-overlay">
            <button class="change-image-btn" onclick="changeImage()">Alterar Imagem</button>
        </div>
    `;
    
    processBtn.disabled = false;
    
    // Update camera button
    const cameraBtn = document.getElementById('cameraBtn');
    cameraBtn.textContent = 'Capture Camera';
}

function uploadImage() {
    document.getElementById('fileInput').click();
}

// Add image overlay styles
const imageOverlayStyles = document.createElement('style');
imageOverlayStyles.textContent = `
    .image-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
        border-radius: 10px;
    }

    .image-upload-area:hover .image-overlay {
        opacity: 1;
    }

    .change-image-btn {
        background: #ff4444;
        border: none;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 500;
        transition: background 0.3s ease;
    }

    .change-image-btn:hover {
        background: #ff6666;
    }

    .processing-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    .processing-text h4 {
        margin-top: 20px;
        margin-bottom: 10px;
        color: #ffffff;
        font-size: 18px;
    }

    .processing-text p {
        margin-bottom: 5px;
        color: #cccccc;
        font-size: 14px;
    }
`;
document.head.appendChild(imageOverlayStyles);
