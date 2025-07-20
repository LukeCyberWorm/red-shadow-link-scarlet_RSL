# RSL - Red Shadow Link Scarlet
## Sistema de Investigação Avançada (Versão Demo)

### Descrição
Esta é uma versão de demonstração do sistema Red Shadow Link - Scarlet (RSL), um sistema avançado de investigação digital que combina reconhecimento facial, geolocalização e análise de dados em uma interface unificada.

### ⚠️ IMPORTANTE - VERSÃO DEMO
Esta é uma versão de **demonstração** criada apenas para fins de apresentação e testing. Todas as funcionalidades são **simuladas** e não representam um sistema real de investigação. Os dados apresentados são fictícios e criados apenas para demonstração.

### 🚀 Como Executar

#### Método 1: Servidor Local (Recomendado)
1. Abra o terminal/prompt de comando na pasta do projeto
2. Execute um servidor local:
   
   **Python:**
   ```bash
   python -m http.server 8000
   ```
   
   **Node.js:**
   ```bash
   npx http-server -p 8000
   ```
   
   **PHP:**
   ```bash
   php -S localhost:8000
   ```

3. Abra o navegador e acesse: `http://localhost:8000`

#### Método 2: Extensão do VS Code
1. Instale a extensão "Live Server" no VS Code
2. Clique com o botão direito no arquivo `index.html`
3. Selecione "Open with Live Server"

### 🔐 Credenciais de Acesso
- **Usuário:** `admin`
- **Senha:** `demo123`

### 📋 Funcionalidades Disponíveis

#### ✅ Implementado (Demo)
- [x] **Tela de Login** - Interface de autenticação
- [x] **Dashboard Principal** - Visão geral do sistema
- [x] **Caso Investigativo** - Visualização detalhada de casos
- [x] **Reconhecimento Facial** - Interface de análise facial
- [x] **Navegação Lateral** - Menu de navegação completo
- [x] **Animações e Transições** - Interface responsiva e interativa
- [x] **Design Responsivo** - Adaptação para dispositivos móveis

#### 🔄 Funcionalidades Simuladas
- Upload de imagens (simula processamento)
- Captura por câmera (simula ativação)
- Reconhecimento facial (valores pré-programados)
- Geolocalização em tempo real (dados fictícios)
- Exportação de relatórios (simula download)
- Atualizações em tempo real (dados aleatórios)

#### 📱 Páginas Disponíveis
1. **index.html** - Tela de login
2. **dashboard.html** - Dashboard principal
3. **investigative-case.html** - Caso investigativo (Sandra Pereira)
4. **facial-recognition.html** - Sistema de reconhecimento facial

### 🎨 Tecnologias Utilizadas
- **HTML5** - Estrutura das páginas
- **CSS3** - Estilização e animações
- **JavaScript (Vanilla)** - Interatividade e simulações
- **Google Fonts** - Fonte Inter
- **SVG Icons** - Ícones customizados

### 📁 Estrutura do Projeto
```
red-shadow-link-scarlet_RSL/
├── index.html                    # Página de login
├── dashboard.html               # Dashboard principal
├── investigative-case.html      # Caso investigativo
├── facial-recognition.html      # Reconhecimento facial
├── assets/
│   ├── css/
│   │   ├── login.css           # Estilos da página de login
│   │   ├── dashboard.css       # Estilos do dashboard
│   │   ├── investigative-case.css  # Estilos do caso investigativo
│   │   └── facial-recognition.css  # Estilos do reconhecimento facial
│   ├── js/
│   │   ├── login.js           # Lógica do login
│   │   ├── dashboard.js       # Lógica do dashboard
│   │   ├── investigative-case.js  # Lógica do caso
│   │   └── facial-recognition.js  # Lógica do reconhecimento
│   └── images/                # Imagens (placeholder)
└── README.md                  # Este arquivo
```

### 🎯 Fluxo de Navegação
1. **Login** (`index.html`) → Credenciais: admin/demo123
2. **Dashboard** (`dashboard.html`) → Visão geral e casos ativos
3. **Caso Investigativo** → Detalhes do caso Sandra Pereira
4. **Reconhecimento Facial** → Interface de análise facial
5. **Menu Lateral** → Navegação entre todas as seções

### 💡 Recursos Interativos
- **Animações de carregamento** simulando processamento real
- **Atualizações em tempo real** com dados aleatórios
- **Feedback visual** para todas as ações do usuário
- **Estados de hover e focus** em todos os elementos interativos
- **Notificações** para ações concluídas
- **Transições suaves** entre páginas e estados

### 🎨 Paleta de Cores
- **Primária:** #ee4540 (Vermelho Scarlet)
- **Secundária:** #ff6b6b (Vermelho claro)
- **Fundo:** #0f0f0f (Preto)
- **Cards:** rgba(30, 30, 30, 0.9) (Cinza escuro transparente)
- **Texto:** #ffffff (Branco)
- **Texto secundário:** #888888 (Cinza)

### 📱 Responsividade
O sistema é totalmente responsivo e se adapta a:
- **Desktop** (1024px+)
- **Tablet** (768px - 1024px)
- **Mobile** (até 768px)

### ⚡ Performance
- Carregamento otimizado de recursos
- Animações com GPU acceleration
- Lazy loading de elementos não críticos
- Código JavaScript otimizado

### 🔮 Próximos Passos (Versão Completa)
Para uma versão completa do sistema, seriam necessários:

1. **Backend e API**
   - Autenticação real
   - Banco de dados
   - APIs de reconhecimento facial
   - Sistema de geolocalização

2. **Funcionalidades Adicionais**
   - Upload real de arquivos
   - Processamento de imagens
   - Relatórios em PDF/Excel
   - Sistema de notificações

3. **Segurança**
   - Criptografia de dados
   - Logs de auditoria
   - Controle de acesso por roles
   - Proteção contra ataques

### 📞 Suporte
Esta é uma versão de demonstração. Para dúvidas sobre o projeto:
- Verifique a documentação oficial anexada
- Analise a proposta comercial incluída
- Consulte os layouts fornecidos

### 📄 Licença
Este projeto é uma demonstração e propriedade da Scarlet Red Solutions.

---

**Desenvolvido por:** Scarlet Red Solutions  
**Versão:** Demo 1.0  
**Data:** Julho 2025
