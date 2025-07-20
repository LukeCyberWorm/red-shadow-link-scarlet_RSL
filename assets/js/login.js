document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginBtn = loginForm.querySelector('.login-btn');
    const btnText = loginBtn.querySelector('.btn-text');
    const btnLoading = loginBtn.querySelector('.btn-loading');

    // Auto-fill demo credentials for easier testing
    usernameInput.value = 'admin';
    passwordInput.value = 'demo123';

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (!username || !password) {
            showError('Por favor, preencha todos os campos');
            return;
        }

        // Show loading state
        btnText.style.opacity = '0';
        btnLoading.style.display = 'block';
        loginBtn.disabled = true;

        // Simulate authentication delay
        setTimeout(() => {
            if (username === 'admin' && password === 'demo123') {
                // Success animation
                btnLoading.style.display = 'none';
                btnText.innerHTML = 'Acesso autorizado!';
                btnText.style.opacity = '1';
                loginBtn.style.background = 'linear-gradient(135deg, #28a745, #34ce57)';
                
                // Redirect to dashboard after success animation
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1000);
            } else {
                // Error state
                btnLoading.style.display = 'none';
                btnText.innerHTML = 'Credenciais inválidas';
                btnText.style.opacity = '1';
                loginBtn.style.background = 'linear-gradient(135deg, #dc3545, #e74c3c)';
                loginBtn.disabled = false;
                
                // Reset button after error
                setTimeout(() => {
                    btnText.innerHTML = 'Acessar Sistema';
                    loginBtn.style.background = 'linear-gradient(135deg, #ee4540, #ff6b6b)';
                    showError('Usuário ou senha incorretos');
                }, 1500);
            }
        }, 2000);
    });

    function showError(message) {
        // Remove existing error
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Create error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            background: rgba(220, 53, 69, 0.1);
            border: 1px solid rgba(220, 53, 69, 0.3);
            color: #ff6b6b;
            padding: 12px 16px;
            border-radius: 8px;
            font-size: 14px;
            margin-top: 16px;
            animation: slideIn 0.3s ease;
        `;

        loginForm.appendChild(errorDiv);

        // Remove error after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);
    }

    // Add CSS for slide-in animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);

    // Add enter key support for password field
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            loginForm.dispatchEvent(new Event('submit'));
        }
    });
});
