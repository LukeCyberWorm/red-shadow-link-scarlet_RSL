# Instruções para Deploy no Wix - scarletredsolutions.com

## 📋 Pré-requisitos
- Conta Wix ativa
- Domínio scarletredsolutions.com conectado
- Plano que suporte upload de arquivos personalizados

## 🚀 Passos para Deploy

### 1. Preparação dos Arquivos
- ✅ Arquivos HTML, CSS e JS otimizados
- ✅ Meta tags SEO adicionadas
- ✅ Links relativos configurados
- ✅ Favicon preparado

### 2. Upload via Wix Editor
1. Acesse seu painel Wix
2. Vá em "Configurações" > "Gerenciar arquivos"
3. Faça upload de todos os arquivos mantendo a estrutura:

```
/
├── index.html
├── dashboard.html
├── facial-recognition.html
├── cases.html
├── location.html
├── favicon.ico
├── styles/
│   ├── login.css
│   ├── dashboard.css
│   ├── facial-recognition.css
│   ├── cases.css
│   └── location.css
└── scripts/
    ├── login.js
    ├── dashboard.js
    ├── facial-recognition.js
    ├── cases.js
    └── location.js
```

### 3. Configuração do Wix
1. **Página Principal**: Configure index.html como página inicial
2. **Redirecionamentos**: Configure URLs amigáveis:
   - `/` → `index.html`
   - `/dashboard` → `dashboard.html`
   - `/facial-recognition` → `facial-recognition.html`
   - `/cases` → `cases.html`
   - `/location` → `location.html`

### 4. Configurações SEO
1. **Título do Site**: "RSL - Red Shadow Link Scarlet | Scarlet Red Solutions"
2. **Descrição**: "Sistema de Análise Investigativa Forense com IA"
3. **Palavras-chave**: "investigação, forense, análise, IA, reconhecimento facial"
4. **Favicon**: Upload do favicon.ico

### 5. Configurações de Performance
1. Ative compressão GZIP
2. Configure cache para arquivos estáticos
3. Otimize imagens (se houver)

## 🌐 URLs do Sistema

Após o deploy, o sistema estará disponível em:

- **Login**: https://scarletredsolutions.com/
- **Dashboard**: https://scarletredsolutions.com/dashboard
- **Reconhecimento Facial**: https://scarletredsolutions.com/facial-recognition
- **Casos**: https://scarletredsolutions.com/cases
- **Localização**: https://scarletredsolutions.com/location

## 🔧 Configurações Avançadas (Se disponível no plano)

### Headers de Segurança
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
```

### Redirecionamento HTTPS
```
Redirect HTTP to HTTPS: Enabled
```

### Compressão
```
Enable GZIP compression for:
- text/html
- text/css
- application/javascript
```

## 📱 Verificação Pós-Deploy

Após o deploy, verifique:
- [ ] Login funcionando (admin/demo123)
- [ ] Navegação entre páginas
- [ ] Responsividade mobile
- [ ] Velocidade de carregamento
- [ ] Funcionalidades JavaScript

## 🆘 Suporte

Para suporte técnico:
- **Email**: Lucas.Oliveira@scarletredsolutions.com
- **Sistema**: Versão de demonstração v1.0

## 📈 Analytics (Recomendado)

Considere adicionar:
- Google Analytics
- Wix Analytics
- Monitoramento de performance

---
*Documento criado para deploy do RSL no scarletredsolutions.com*
