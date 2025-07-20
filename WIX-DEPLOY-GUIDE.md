# 🚀 Deploy RSL no Wix - scarletredsolutions.com

## 📋 Checklist Pré-Deploy

### ✅ Arquivos Preparados:
- [x] Meta tags SEO otimizadas
- [x] Títulos únicos para cada página
- [x] Links canônicos configurados
- [x] Favicon preparado
- [x] Sitemap.xml criado
- [x] Robots.txt configurado
- [x] Estrutura de arquivos organizada

## 🎯 Processo de Deploy no Wix

### Opção 1: Wix Editor (Recomendado para Demo)

1. **Acesse o Wix Editor**
   - Login em wix.com
   - Vá para seu site scarletredsolutions.com
   - Clique em "Editar Site"

2. **Upload dos Arquivos**
   ```
   Configurações → Desenvolvedor → Arquivos de Código
   ```
   - Upload de todos os arquivos .html, .css, .js
   - Mantenha a estrutura de pastas

3. **Configuração de Páginas**
   - Crie páginas correspondentes no Wix
   - Conecte cada página ao respectivo arquivo HTML

### Opção 2: Wix Velo (Funcionalidades Avançadas)

1. **Ativar Modo Desenvolvedor**
   - No Editor: Ferramentas → Modo Desenvolvedor → Ativar

2. **Estrutura de Projeto Velo**
   ```
   /public/
   ├── index.html
   ├── dashboard.html
   ├── facial-recognition.html
   ├── cases.html
   ├── location.html
   └── assets/
       ├── styles/
       └── scripts/
   ```

3. **Backend Functions (Opcional)**
   ```javascript
   // backend/http-functions.js
   import { ok, notFound, serverError } from 'wix-http-functions';
   
   export function get_rsl_demo(request) {
     return ok({
       "headers": { "Content-Type": "application/json" },
       "body": { "message": "RSL Demo System Active" }
     });
   }
   ```

## 🛠 Configurações Específicas do Wix

### 1. Configurações de Site
```
Configurações → Geral:
- Nome do Site: "Scarlet Red Solutions - RSL"
- Descrição: "Sistema de Análise Investigativa Forense"
- Idioma: Português (Brasil)
- Fuso Horário: (UTC-03:00) Brasília
```

### 2. SEO e Marketing
```
Marketing → SEO:
- Título Principal: "RSL - Red Shadow Link Scarlet | Scarlet Red Solutions"
- Meta Descrição: "Sistema avançado de análise investigativa com IA, reconhecimento facial e geolocalização"
- Palavras-chave: "investigação forense, IA, reconhecimento facial, OSINT"
```

### 3. Configurações de Domínio
```
Configurações → Domínios:
- Domínio Principal: scarletredsolutions.com
- Redirecionamento: www.scarletredsolutions.com → scarletredsolutions.com
- SSL: Ativado (força HTTPS)
```

### 4. Analytics e Tracking
```html
<!-- Adicionar no Header do Site -->
<script>
// Google Analytics 4
gtag('config', 'GA_MEASUREMENT_ID', {
  page_title: 'RSL Sistema Investigativo',
  page_location: window.location.href
});

// Wix Analytics
_wixAnalytics.push({
  event: 'rsl_demo_view',
  eventCategory: 'engagement',
  eventAction: 'page_view'
});
</script>
```

## 📱 URLs Finais Configuradas

Após deploy, as URLs serão:

- **Login**: `https://scarletredsolutions.com/`
- **Dashboard**: `https://scarletredsolutions.com/dashboard`
- **Facial Recognition**: `https://scarletredsolutions.com/facial-recognition`
- **Cases**: `https://scarletredsolutions.com/cases`
- **Location**: `https://scarletredsolutions.com/location`

## 🔧 Configurações Avançadas

### Redirecionamentos
```
Configurações → SEO → Redirecionamentos:
/login → / (301)
/home → / (301)
/reconhecimento-facial → /facial-recognition (301)
/casos → /cases (301)
/localizacao → /location (301)
```

### Headers Personalizados
```
Configurações → Avançado → Cabeçalhos Personalizados:
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
```

## 🎯 Otimizações de Performance

### 1. Compressão de Arquivos
- CSS minificado automaticamente pelo Wix
- JavaScript minificado automaticamente
- Imagens otimizadas (WebP quando disponível)

### 2. Caching
```
Cache-Control: public, max-age=31536000 (para assets)
Cache-Control: public, max-age=3600 (para HTML)
```

### 3. CDN
- Wix CDN ativado automaticamente
- Assets servidos da edge location mais próxima

## 🧪 Testes Pós-Deploy

### Checklist de Validação:
- [ ] Login funciona (admin/demo123)
- [ ] Navegação entre páginas
- [ ] Responsividade mobile
- [ ] Velocidade < 3s
- [ ] SSL ativo
- [ ] Meta tags corretas
- [ ] Sitemap acessível
- [ ] Analytics funcionando

### Ferramentas de Teste:
- **Google PageSpeed Insights**
- **GTmetrix**
- **Wix SEO Wiz**
- **Google Search Console**

## 📊 Monitoramento

### 1. Google Analytics
- Configurar metas para login
- Acompanhar navegação entre páginas
- Monitorar tempo de sessão

### 2. Wix Analytics
- Visitas únicas
- Taxa de rejeição
- Dispositivos mais usados

### 3. Search Console
- Indexação das páginas
- Palavras-chave encontradas
- Erros de crawling

## 🆘 Troubleshooting

### Problemas Comuns:

1. **Páginas não carregam**
   - Verificar estrutura de arquivos
   - Conferir links relativos
   - Validar HTML

2. **CSS não aplica**
   - Verificar paths dos arquivos
   - Confirmar upload correto
   - Limpar cache do navegador

3. **JavaScript não funciona**
   - Verificar console de erros
   - Confirmar compatibilidade
   - Testar em diferentes navegadores

## 📞 Suporte

Para dúvidas sobre o deploy:
- **Email**: Lucas.Oliveira@scarletredsolutions.com
- **Documentação Wix**: help.wix.com
- **Suporte Técnico**: Via painel Wix

---

**Criado para o deploy do RSL Sistema no scarletredsolutions.com**
*Versão 1.0 - Julho 2025*
