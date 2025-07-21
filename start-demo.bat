@echo off
echo.
echo ========================================
echo  RSL - Red Shadow Link Scarlet Demo
echo ========================================
echo.
echo Iniciando servidor local...
echo.

REM Tenta usar o servidor Node.js customizado primeiro
if exist server.js (
    echo Usando servidor Node.js customizado...
    echo Abra seu navegador em: http://localhost:8000
    echo.
    echo Pressione Ctrl+C para parar o servidor
    echo.
    node server.js
    goto :end
)

REM Verifica se o Python está instalado
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo Usando Python para servir os arquivos...
    echo Abra seu navegador em: http://localhost:8000
    echo.
    echo Pressione Ctrl+C para parar o servidor
    echo.
    python -m http.server 8000
) else (
    REM Verifica se o Node.js está instalado
    node --version >nul 2>&1
    if %errorlevel% == 0 (
        echo Usando Node.js para servir os arquivos...
        echo Instalando dependências...
        npm install -g http-server
        echo.
        echo Abra seu navegador em: http://localhost:8000
        echo.
        echo Pressione Ctrl+C para parar o servidor
        echo.
        npx http-server -p 8000
    ) else (
        echo.
        echo ❌ Nem Python nem Node.js foram encontrados!
        echo.
        echo Para executar este demo, você precisa instalar:
        echo - Python 3.x (https://python.org/downloads/)
        echo - OU Node.js (https://nodejs.org/download/)
        echo.
        echo Após a instalação, execute este arquivo novamente.
        echo.
        pause
    )
)

:end
