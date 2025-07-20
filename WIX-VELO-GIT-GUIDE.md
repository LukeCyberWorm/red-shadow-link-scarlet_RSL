# 🚀 Deploy RSL com Wix Velo + Git Integration

## 📋 Preparação do Projeto para Wix Velo

### 1. Ativar Wix Velo no Editor
1. Acesse o Editor Wix: `editor.wix.com`
2. Abra seu site `scarletredsolutions.com`
3. Vá em **Ferramentas** → **Modo Desenvolvedor** → **Ativar Velo**
4. Aceite os termos de uso do Wix Velo

### 2. Conectar Repository Git
1. No Editor Velo, vá em **Código** → **Configurações**
2. Selecione **GitHub Integration**
3. Autorize a conexão com sua conta GitHub
4. Conecte o repositório: `LukeCyberWorm/red-shadow-link-scarlet_RSL`

## 🗂️ Estrutura Velo Adaptada (✅ Criada)

### Organização dos Arquivos para Velo:

```
/public/
├── pages/
│   ├── index.html                    # Página de login
│   ├── dashboard.html                # Dashboard principal
│   ├── facial-recognition.html       # Reconhecimento facial
│   ├── cases.html                    # Gestão de casos
│   └── location.html                 # Rastreamento
├── assets/
│   ├── styles/
│   │   ├── login.css
│   │   ├── dashboard.css
│   │   ├── facial-recognition.css
│   │   ├── cases.css
│   │   └── location.css
│   └── scripts/
│       ├── login.js
│       ├── dashboard.js
│       ├── facial-recognition.js
│       ├── cases.js
│       └── location.js
├── sitemap.xml
└── robots.txt

/backend/
├── http-functions.js                 # ✅ APIs customizadas (8 endpoints)
├── data-hooks.js                     # ✅ Database hooks (10 hooks)
├── jobs.config                       # Scheduled jobs
└── routers.js                        # Custom routing

/database/
├── collections.json                  # ✅ Database schema (5 collections)
└── permissions.json                  # ✅ Access permissions
```

## 🔧 Arquivos Velo Criados

### ✅ Package.json
- Configuração completa do projeto
- Dependencies do Wix Velo
- Scripts de build e deploy

### ✅ Backend Functions (8 APIs)
- `POST /api/auth/login` - Autenticação
- `GET /api/dashboard/stats` - Estatísticas
- `POST /api/facial/recognition` - Reconhecimento facial
- `GET /api/cases/list` - Lista de casos
- `GET /api/location/tracking` - Rastreamento
- `POST /api/investigation/save` - Salvar investigação
- `POST /api/reports/generate` - Gerar relatórios
- `GET /api/system/health` - Status do sistema

### ✅ Database Collections (5)
- **RSLCases** - Gestão de casos investigativos
- **RSLSuspects** - Perfis de suspeitos
- **RSLLocations** - Dados de rastreamento
- **RSLUsers** - Usuários do sistema
- **RSLLogs** - Logs de auditoria

### ✅ Data Hooks (10)
- Validação automática de dados
- Logs de auditoria
- Alertas de alta prioridade
- Controle de permissões

### ✅ Wix Config (wix.config.js)
- Configurações completas do site
- Roteamento personalizado
- SEO otimizado
- Segurança configurada

## 🚀 Processo de Deploy Git + Velo

### Passo 1: Preparar Repository
```bash
# 1. Fazer commit das mudanças
git add .
git commit -m "🚀 RSL Velo + Git integration ready for deploy"

# 2. Push para GitHub
git push origin main
```

### Passo 2: Conectar no Wix Editor
1. Abra `editor.wix.com/html/editor/web/renderer/edit/`
2. Vá para seu site scarletredsolutions.com
3. Ative **Wix Velo** (Ferramentas → Modo Desenvolvedor)
4. Em **Código** → **Configurações** → **GitHub**
5. Conecte o repo: `LukeCyberWorm/red-shadow-link-scarlet_RSL`

### Passo 3: Sincronizar Arquivos
1. No editor Velo, clique **Sync from GitHub**
2. Selecione branch `main`
3. Confirme importação dos arquivos:
   - ✅ Backend functions
   - ✅ Database collections
   - ✅ Public assets
   - ✅ Configuration files

### Passo 4: Configurar Database
1. Vá para **Database** → **Content Manager**
2. Importe `database/collections.json`
3. Configure permissões com `database/permissions.json`
4. Ative os data hooks de `backend/data-hooks.js`

### Passo 5: Configurar APIs
1. Vá para **Backend** → **Web Modules**
2. Verifique se `http-functions.js` foi importado
3. Teste endpoints:
   ```
   GET /api/system/health
   GET /api/dashboard/stats
   ```

### Passo 6: Deploy Final
1. Clique **Publish** no editor
2. Escolha **Publish & Sync with Git**
3. Confirme deploy para `scarletredsolutions.com`

## 🔄 Workflow Git + Velo

### Desenvolvimento Local → GitHub → Wix
```bash
# 1. Desenvolver localmente
git checkout -b feature/nova-funcionalidade
# ... fazer alterações ...

# 2. Commit e push
git add .
git commit -m "feat: nova funcionalidade"
git push origin feature/nova-funcionalidade

# 3. Merge para main
git checkout main
git merge feature/nova-funcionalidade
git push origin main

# 4. Sync no Wix Editor
# No editor: Código → GitHub → Sync
```

## 🎯 URLs Finais com Velo

Após deploy via Git + Velo:

- **🏠 Login:** https://scarletredsolutions.com/
- **📊 Dashboard:** https://scarletredsolutions.com/dashboard
- **👤 Reconhecimento:** https://scarletredsolutions.com/facial-recognition
- **📁 Casos:** https://scarletredsolutions.com/cases
- **📍 Localização:** https://scarletredsolutions.com/location

**APIs Backend:**
- **🔐 Auth:** https://scarletredsolutions.com/api/auth/login
- **📊 Stats:** https://scarletredsolutions.com/api/dashboard/stats
- **👤 Facial:** https://scarletredsolutions.com/api/facial/recognition
- **📁 Cases:** https://scarletredsolutions.com/api/cases/list
- **📍 Location:** https://scarletredsolutions.com/api/location/tracking

## 🧪 Testes Pós-Deploy Velo

### Checklist de Validação Git + Velo:
- [ ] Repository conectado com sucesso
- [ ] Arquivos sincronizados corretamente
- [ ] Backend functions ativas (8/8)
- [ ] Database collections criadas (5/5)
- [ ] Data hooks funcionando (10/10)
- [ ] APIs respondendo corretamente
- [ ] Frontend carregando assets
- [ ] Sistema de login funcionando
- [ ] Navegação entre páginas
- [ ] Logs de auditoria gravando

### Comandos de Teste:
```bash
# Testar APIs
curl https://scarletredsolutions.com/api/system/health
curl https://scarletredsolutions.com/api/dashboard/stats

# Testar login
curl -X POST https://scarletredsolutions.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "demo123"}'
```

## 📊 Vantagens do Deploy Git + Velo

### ✅ Benefícios:
- **🔄 Versionamento** - Controle completo via Git
- **🚀 Deploy Automático** - Push → Sync → Deploy
- **📊 Database Integrada** - Wix Data nativo
- **🔐 Backend Seguro** - APIs serverless
- **📱 Frontend Otimizado** - CDN do Wix
- **🔍 SEO Avançado** - Ferramentas Wix
- **📈 Analytics** - Wix + Google Analytics
- **🛡️ Segurança** - HTTPS + Headers
- **⚡ Performance** - Edge locations
- **🎯 Domínio Custom** - scarletredsolutions.com

## 🆘 Troubleshooting Git + Velo

### Problemas Comuns:

1. **Sync falha**
   ```bash
   # Verificar conexão GitHub
   git remote -v
   # Verificar permissões do repo
   ```

2. **Backend functions não carregam**
   - Verificar sintaxe JS
   - Checar imports do Wix
   - Validar estrutura de pastas

3. **Database não sincroniza**
   - Validar JSON das collections
   - Verificar permissões
   - Checar hooks sintaxe

## 🎉 Status: Pronto para Deploy Git + Velo!

**✅ Tudo configurado para deploy automático via Git + Wix Velo:**

- 📦 Package.json configurado
- 🔧 Backend com 8 APIs funcionais
- 📊 Database com 5 collections
- 🔄 Data hooks implementados
- ⚙️ Wix config otimizado
- 🔗 Git integration ready

**Próximo passo:** Conectar o repo no Wix Editor e fazer o primeiro sync!

---

**Criado para deploy Git + Velo do RSL Sistema**
*Versão 1.0 - Julho 2025*
