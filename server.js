const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const port = 8000;

const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html';
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - Arquivo não encontrado</h1>', 'utf-8');
            } else {
                res.writeHead(500);
                res.end(`Erro interno: ${error.code}`, 'utf-8');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(port, () => {
    console.log('========================================');
    console.log(' RSL - Red Shadow Link Scarlet Demo');
    console.log('========================================');
    console.log('');
    console.log(`🚀 Servidor rodando em: http://localhost:${port}`);
    console.log('');
    console.log('📝 Credenciais de acesso:');
    console.log('   Usuário: admin');
    console.log('   Senha: demo123');
    console.log('');
    console.log('⚡ Pressione Ctrl+C para parar o servidor');
    console.log('');
    
    // Tentar abrir o navegador automaticamente
    try {
        const url = `http://localhost:${port}`;
        console.log('🌐 Abrindo navegador...');
        
        // Windows
        execSync(`start ${url}`, { stdio: 'ignore' });
    } catch (error) {
        console.log('💡 Abra seu navegador manualmente em: http://localhost:8000');
    }
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log(`❌ Porta ${port} já está em uso. Tente fechar outros servidores ou use outra porta.`);
    } else {
        console.log('❌ Erro no servidor:', err);
    }
});
