// Terminal Emulator and Tools Management - Multi-Terminal Support
class RSLToolsSystem {
    constructor() {
        this.terminals = new Map();
        this.activeTerminal = 1;
        this.terminalCounter = 1;
        this.currentCategory = 'web';
        this.commandHistory = new Map();
        this.historyIndex = new Map();
        this.isFullscreen = false;
        
        // Initialize system
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
        } else {
            this.initializeComponents();
        }
    }

    initializeComponents() {
        // Initialize first terminal
        this.initializeTerminal(1);
        
        // Initialize sandbox controls
        this.initializeSandboxControls();
        
        // Initialize tab management
        this.initializeTabManagement();
        
        // Initialize tool categories
        this.initializeToolCategories();
        
        // Initialize quick commands
        this.initializeQuickCommands();
        
        // Initialize header actions
        this.initializeHeaderActions();
        
        // Initialize keyboard shortcuts
        this.initializeKeyboardShortcuts();
        
        // Show welcome message
        this.showWelcomeMessage(1);
    }

    initializeTerminal(terminalId) {
        const terminalInput = document.querySelector(`input[data-terminal="${terminalId}"]`);
        if (!terminalInput) return;

        // Initialize terminal data
        this.terminals.set(terminalId, {
            element: document.getElementById(`terminal-${terminalId}`),
            input: terminalInput,
            output: document.getElementById(`terminalOutput-${terminalId}`),
            history: [],
            historyIndex: -1
        });

        this.commandHistory.set(terminalId, []);
        this.historyIndex.set(terminalId, -1);

        // Terminal input handling
        terminalInput.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'Enter':
                    e.preventDefault();
                    this.processCommand(terminalId);
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    this.navigateHistory(terminalId, -1);
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    this.navigateHistory(terminalId, 1);
                    break;
                case 'Tab':
                    e.preventDefault();
                    this.autocomplete(terminalId);
                    break;
            }
        });

        // Terminal controls
        const terminalWindow = document.getElementById(`terminal-${terminalId}`);
        const terminalOptions = terminalWindow.querySelectorAll('.terminal-option');
        terminalOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                const action = e.currentTarget.dataset.action;
                this.handleTerminalAction(action, terminalId);
            });
        });

        // Focus terminal input by default if it's the active terminal
        if (terminalId === this.activeTerminal) {
            terminalInput.focus();
        }
    }

    initializeSandboxControls() {
        const addTerminalBtn = document.getElementById('addTerminal');
        const resetSandboxBtn = document.getElementById('resetSandbox');

        if (addTerminalBtn) {
            addTerminalBtn.addEventListener('click', () => this.createNewTerminal());
        }

        if (resetSandboxBtn) {
            resetSandboxBtn.addEventListener('click', () => this.resetSandbox());
        }
    }

    initializeTabManagement() {
        const addTabBtn = document.getElementById('addTabBtn');
        
        if (addTabBtn) {
            addTabBtn.addEventListener('click', () => this.createNewTerminal());
        }

        // Initialize existing tabs
        this.initializeTabEvents();
    }

    initializeTabEvents() {
        const tabs = document.querySelectorAll('.terminal-tab');
        tabs.forEach(tab => {
            const terminalId = parseInt(tab.dataset.terminal.split('-')[1]);
            
            tab.addEventListener('click', (e) => {
                if (!e.target.classList.contains('tab-close')) {
                    this.switchTerminal(terminalId);
                }
            });

            const closeBtn = tab.querySelector('.tab-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.closeTerminal(terminalId);
                });
            }
        });
    }

    createNewTerminal() {
        this.terminalCounter++;
        const terminalId = this.terminalCounter;

        // Create tab
        const tabList = document.getElementById('terminalTabs');
        const newTab = document.createElement('div');
        newTab.className = 'terminal-tab';
        newTab.dataset.terminal = `terminal-${terminalId}`;
        newTab.innerHTML = `
            <span class="tab-icon">$</span>
            <span class="tab-title">Terminal ${terminalId}</span>
            <button class="tab-close">×</button>
        `;
        tabList.appendChild(newTab);

        // Create terminal window
        const terminalContainer = document.querySelector('.terminal-container');
        const newTerminalWindow = document.createElement('div');
        newTerminalWindow.className = 'terminal-window';
        newTerminalWindow.id = `terminal-${terminalId}`;
        newTerminalWindow.innerHTML = `
            <div class="terminal-header">
                <div class="terminal-controls">
                    <div class="terminal-buttons">
                        <div class="terminal-btn close"></div>
                        <div class="terminal-btn minimize"></div>
                        <div class="terminal-btn maximize"></div>
                    </div>
                    <div class="terminal-title">root@rsl-kali-00${terminalId}:~</div>
                    <div class="terminal-options">
                        <button class="terminal-option" data-action="fullscreen">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
                            </svg>
                        </button>
                        <button class="terminal-option" data-action="split">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="12" y1="3" x2="12" y2="21"></line>
                            </svg>
                        </button>
                        <button class="terminal-option" data-action="copy">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="terminal-body">
                <div class="terminal-output" id="terminalOutput-${terminalId}">
                </div>
                <div class="terminal-input-line">
                    <span class="terminal-prompt">root@rsl-kali-00${terminalId}:~#</span>
                    <input type="text" class="terminal-input" data-terminal="${terminalId}" spellcheck="false" autocomplete="off">
                    <div class="terminal-cursor"></div>
                </div>
            </div>
        `;
        terminalContainer.appendChild(newTerminalWindow);

        // Initialize new terminal
        this.initializeTerminal(terminalId);
        
        // Switch to new terminal
        this.switchTerminal(terminalId);
        
        // Show welcome message
        this.showWelcomeMessage(terminalId);
        
        // Update tab events
        this.initializeTabEvents();

        // Add creation message to active terminal
        this.addTerminalLine('', `New terminal session created: Terminal ${terminalId}`, 'info', this.activeTerminal);
    }

    switchTerminal(terminalId) {
        // Remove active class from all tabs and terminals
        document.querySelectorAll('.terminal-tab').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.terminal-window').forEach(window => window.classList.remove('active'));

        // Add active class to selected tab and terminal
        const selectedTab = document.querySelector(`[data-terminal="terminal-${terminalId}"]`);
        const selectedTerminal = document.getElementById(`terminal-${terminalId}`);

        if (selectedTab && selectedTerminal) {
            selectedTab.classList.add('active');
            selectedTerminal.classList.add('active');
            this.activeTerminal = terminalId;

            // Focus input
            const input = selectedTerminal.querySelector('.terminal-input');
            if (input) {
                setTimeout(() => input.focus(), 100);
            }
        }
    }

    closeTerminal(terminalId) {
        if (this.terminals.size <= 1) {
            this.addTerminalLine('', 'Cannot close the last terminal session.', 'error', terminalId);
            return;
        }

        // Remove tab and terminal
        const tab = document.querySelector(`[data-terminal="terminal-${terminalId}"]`);
        const terminalWindow = document.getElementById(`terminal-${terminalId}`);

        if (tab) tab.remove();
        if (terminalWindow) terminalWindow.remove();

        // Clean up data
        this.terminals.delete(terminalId);
        this.commandHistory.delete(terminalId);
        this.historyIndex.delete(terminalId);

        // Switch to first available terminal if closing active terminal
        if (terminalId === this.activeTerminal) {
            const firstTerminalId = Array.from(this.terminals.keys())[0];
            this.switchTerminal(firstTerminalId);
        }
    }

    resetSandbox() {
        // Clear all terminals except the first one
        const terminalIds = Array.from(this.terminals.keys());
        terminalIds.forEach(id => {
            if (id !== 1) {
                this.closeTerminal(id);
            }
        });

        // Clear first terminal
        const firstOutput = document.getElementById('terminalOutput-1');
        if (firstOutput) {
            firstOutput.innerHTML = '';
        }

        // Reset counter
        this.terminalCounter = 1;
        
        // Switch to first terminal
        this.switchTerminal(1);
        
        // Show welcome message
        this.showWelcomeMessage(1);
        
        this.addTerminalLine('', 'Sandbox reset completed.', 'info', 1);
    }

    initializeToolCategories() {
        const categoryBtns = document.querySelectorAll('.category-btn');
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.currentTarget.dataset.category;
                this.switchCategory(category);
            });
        });

        // Initialize tool launch buttons
        this.initializeToolLaunchers();
    }

    initializeToolLaunchers() {
        const toolCards = document.querySelectorAll('.tool-card');
        toolCards.forEach(card => {
            const launchBtn = card.querySelector('.tool-launch-btn');
            if (launchBtn) {
                launchBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const toolName = card.dataset.tool;
                    this.launchTool(toolName);
                });
            }
            
            // Card click to show info
            card.addEventListener('click', () => {
                const toolName = card.dataset.tool;
                this.showToolInfo(toolName);
            });
        });
    }

    initializeQuickCommands() {
        const quickCmdBtns = document.querySelectorAll('.quick-cmd-btn');
        quickCmdBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const command = e.currentTarget.dataset.command;
                this.executeQuickCommand(command);
            });
        });
    }

    initializeHeaderActions() {
        const saveSessionBtn = document.querySelector('.save-session-btn');
        const clearTerminalBtn = document.querySelector('.clear-terminal-btn');

        if (saveSessionBtn) {
            saveSessionBtn.addEventListener('click', () => this.saveSession());
        }

        if (clearTerminalBtn) {
            clearTerminalBtn.addEventListener('click', () => this.clearTerminal());
        }
    }

    initializeKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl+` to focus terminal
            if (e.ctrlKey && e.key === '`') {
                e.preventDefault();
                this.terminalInput.focus();
            }
            
            // F11 for fullscreen terminal
            if (e.key === 'F11') {
                e.preventDefault();
                this.toggleFullscreen();
            }
            
            // Ctrl+L to clear terminal
            if (e.ctrlKey && e.key === 'l') {
                e.preventDefault();
                this.clearTerminal();
            }
        });
    }

    showWelcomeMessage(terminalId = this.activeTerminal) {
        const welcomeLines = [
            { type: 'info', text: 'Red Shadow Link - Scarlet (RSL) Security Tools Terminal v2.1.0' },
            { type: 'info', text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' },
            { type: 'normal', text: `Kali Linux Sandbox initialized - Terminal ${terminalId}` },
            { type: 'normal', text: 'Type "help" for available commands or use the tools panel.' },
            { type: 'warning', text: 'WARNING: This system is for authorized personnel only.' },
            { type: 'info', text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' },
            { type: 'normal', text: '' }
        ];

        welcomeLines.forEach((line, index) => {
            setTimeout(() => {
                this.addTerminalLine('', line.text, line.type, terminalId);
            }, index * 100);
        });
    }

    processCommand(terminalId = this.activeTerminal) {
        const terminal = this.terminals.get(terminalId);
        if (!terminal) return;

        const command = terminal.input.value.trim();
        if (!command) return;

        // Add command to history
        const history = this.commandHistory.get(terminalId);
        history.push(command);
        this.historyIndex.set(terminalId, history.length);

        // Display command in terminal
        this.addTerminalLine(`root@rsl-kali-00${terminalId}:~#`, command, 'normal', terminalId);

        // Clear input
        terminal.input.value = '';

        // Process command
        this.executeCommand(command, terminalId);

        // Scroll to bottom
        this.scrollToBottom(terminalId);
    }

    executeCommand(command, terminalId = this.activeTerminal) {
        const cmd = command.toLowerCase().split(' ')[0];
        const args = command.split(' ').slice(1);

        switch(cmd) {
            case 'help':
                this.showHelp(terminalId);
                break;
            case 'clear':
            case 'cls':
                this.clearTerminal(terminalId);
                break;
            case 'newterminal':
            case 'new':
                this.createNewTerminal();
                break;
            case 'terminal':
                if (args[0]) {
                    const targetId = parseInt(args[0]);
                    if (this.terminals.has(targetId)) {
                        this.switchTerminal(targetId);
                    } else {
                        this.addTerminalLine('', `Terminal ${targetId} not found.`, 'error', terminalId);
                    }
                } else {
                    this.listTerminals(terminalId);
                }
                break;
            case 'nmap':
                this.simulateNmap(args.join(' '), terminalId);
                break;
            case 'sqlmap':
                this.simulateSqlmap(args.join(' '), terminalId);
                break;
            case 'dirb':
            case 'gobuster':
                this.simulateDirectoryScanning(cmd, args.join(' '), terminalId);
                break;
            case 'nikto':
                this.simulateNikto(args.join(' '), terminalId);
                break;
            case 'metasploit':
            case 'msfconsole':
                this.simulateMetasploit(terminalId);
                break;
            case 'wireshark':
                this.launchTool('wireshark', terminalId);
                break;
            case 'burpsuite':
                this.launchTool('burpsuite', terminalId);
                break;
            case 'john':
                this.simulateJohn(args.join(' '), terminalId);
                break;
            case 'hydra':
                this.simulateHydra(args.join(' '), terminalId);
                break;
            case 'sherlock':
                this.simulateSherlock(args.join(' '), terminalId);
                break;
            case 'whoami':
                this.addTerminalLine('', 'root', 'normal', terminalId);
                break;
            case 'pwd':
                this.addTerminalLine('', '/root/rsl-tools', 'normal', terminalId);
                break;
            case 'ls':
            case 'dir':
                this.simulateLs(terminalId);
                break;
            case 'ps':
                this.simulatePs(terminalId);
                break;
            case 'netstat':
                this.simulateNetstat(terminalId);
                break;
            case 'ifconfig':
            case 'ip':
                this.simulateIfconfig(terminalId);
                break;
            case 'status':
                this.showSystemStatus(terminalId);
                break;
            case 'version':
                this.addTerminalLine('', 'RSL Security Tools Terminal v2.1.0', 'info', terminalId);
                break;
            case 'sandbox':
                this.showSandboxInfo(terminalId);
                break;
            default:
                this.addTerminalLine('', `Command not found: ${command}`, 'error', terminalId);
                this.addTerminalLine('', 'Type "help" for available commands.', 'normal', terminalId);
        }
    }

    showHelp(terminalId = this.activeTerminal) {
        const helpText = [
            '━━━━━━━━━━━━━━━━━━━━━ RSL TERMINAL COMMANDS ━━━━━━━━━━━━━━━━━━━━━',
            '',
            'SYSTEM COMMANDS:',
            '  help              - Show this help message',
            '  clear, cls        - Clear terminal screen',
            '  status            - Show system status',
            '  version           - Show version information',
            '  sandbox           - Show sandbox information',
            '',
            'TERMINAL MANAGEMENT:',
            '  newterminal, new  - Create new terminal session',
            '  terminal [id]     - Switch to terminal or list terminals',
            '',
            'NETWORK SCANNING:',
            '  nmap [target]     - Network port scanner',
            '  nikto [target]    - Web vulnerability scanner',
            '  dirb [target]     - Directory brute forcer',
            '  gobuster [target] - Directory/DNS brute forcer',
            '',
            'WEB APPLICATION:',
            '  sqlmap [target]   - SQL injection tool',
            '  burpsuite         - Launch Burp Suite',
            '',
            'PASSWORD ATTACKS:',
            '  john [file]       - John the Ripper password cracker',
            '  hydra [target]    - Network login cracker',
            '',
            'OSINT:',
            '  sherlock [user]   - Username search across platforms',
            '',
            'SYSTEM INFO:',
            '  whoami            - Current user',
            '  pwd               - Current directory',
            '  ls, dir           - List files',
            '  ps                - Running processes',
            '  netstat           - Network connections',
            '  ifconfig, ip      - Network interfaces',
            '',
            'SHORTCUTS:',
            '  Ctrl+` - Focus terminal    F11 - Fullscreen    Ctrl+L - Clear',
            '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
            ''
        ];

        helpText.forEach(line => {
            this.addTerminalLine('', line, line.startsWith('━') ? 'info' : 'normal', terminalId);
        });
    }

    listTerminals(terminalId = this.activeTerminal) {
        this.addTerminalLine('', '━━━━━━━━━━━━━━━ ACTIVE TERMINALS ━━━━━━━━━━━━━━━', 'info', terminalId);
        this.terminals.forEach((terminal, id) => {
            const status = id === this.activeTerminal ? '[ACTIVE]' : '';
            this.addTerminalLine('', `Terminal ${id} ${status}`, 'normal', terminalId);
        });
        this.addTerminalLine('', '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'info', terminalId);
    }

    showSandboxInfo(terminalId = this.activeTerminal) {
        const info = [
            '━━━━━━━━━━━━━━━ SANDBOX INFORMATION ━━━━━━━━━━━━━━━',
            '',
            '🐧 Environment: Kali Linux Docker Container',
            `📋 Container ID: rsl-kali-00${terminalId}`,
            `🔧 Active Terminals: ${this.terminals.size}`,
            `⚡ Current Terminal: ${terminalId}`,
            '🛡️ Security Tools: Loaded',
            '🌐 Network: Isolated',
            '',
            'Available Commands:',
            '  newterminal - Create new terminal session',
            '  terminal [id] - Switch between terminals',
            '  sandbox - Show this information',
            '',
            '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
            ''
        ];

        info.forEach(line => {
            this.addTerminalLine('', line, line.includes('🐧') || line.includes('📋') || line.includes('🔧') || line.includes('⚡') || line.includes('🛡️') || line.includes('🌐') ? 'info' : 'normal', terminalId);
        });
    }

    simulateNmap(target, terminalId = this.activeTerminal) {
        if (!target) {
            this.addTerminalLine('', 'Usage: nmap [target]', 'error', terminalId);
            return;
        }

        const lines = [
            `Starting Nmap 7.94 ( https://nmap.org ) at ${new Date().toLocaleString()}`,
            `Nmap scan report for ${target}`,
            'Host is up (0.0012s latency).',
            '',
            'PORT     STATE SERVICE',
            '22/tcp   open  ssh',
            '80/tcp   open  http',
            '443/tcp  open  https',
            '3306/tcp open  mysql',
            '8080/tcp open  http-proxy',
            '',
            'Nmap done: 1 IP address (1 host up) scanned in 2.34 seconds'
        ];

        this.simulateTyping(lines, terminalId);
    }

    simulateSqlmap(target) {
        if (!target) {
            this.addTerminalLine('', 'Usage: sqlmap -u [URL]', 'error');
            return;
        }

        const lines = [
            '        ___',
            '       __H__                                                          ',
            ' ___ ___[)]_____ ___ ___  {1.7.2#stable}                            ',
            '|_ -| . [)]     | .|  _| http://sqlmap.org                           ',
            '|___|_  [(]_|_|_|__,|  |                                             ',
            '      |_|V...       |_|   https://twitter.com/sqlmapproject         ',
            '',
            `[*] starting @ ${new Date().toLocaleTimeString()}`,
            '',
            `[*] testing connection to the target URL`,
            '[*] checking if the target is protected by some kind of WAF/IPS',
            '[*] testing if the parameter is dynamic',
            '[*] confirming that parameter is dynamic',
            '[*] heuristic (basic) test shows that parameter might be injectable',
            '[*] testing for SQL injection on parameter',
            '[*] testing \'MySQL >= 5.0 boolean-based blind - Parameter replace\'',
            '[INFO] parameter appears to be \'MySQL >= 5.0 boolean-based blind - Parameter replace\' injectable',
            '[WARNING] potential permission problems detected (\'Access denied\')'
        ];

        this.simulateTyping(lines);
    }

    simulateDirectoryScanning(tool, target) {
        if (!target) {
            this.addTerminalLine('', `Usage: ${tool} [target]`, 'error');
            return;
        }

        const lines = [
            `${tool.toUpperCase()} v3.0.1 by OJ Reeves (@TheColonial) & Christian Meeus (@_mohemiv_)`,
            '===============================================================',
            `[+] Target URL:     ${target}`,
            '[+] Mode:           dir',
            '[+] Status codes:   200,204,301,302,307,401,403',
            '[+] Timeout:        10s',
            '===============================================================',
            '2023/12/20 14:30:25 Starting scan',
            '===============================================================',
            '/admin                (Status: 302) [Size: 0]',
            '/api                  (Status: 200) [Size: 1024]',
            '/backup               (Status: 403) [Size: 285]',
            '/config               (Status: 401) [Size: 401]',
            '/dashboard            (Status: 200) [Size: 15332]',
            '/uploads              (Status: 200) [Size: 2048]',
            '===============================================================',
            '2023/12/20 14:30:45 Finished',
            '==============================================================='
        ];

        this.simulateTyping(lines);
    }

    simulateNikto(target) {
        if (!target) {
            this.addTerminalLine('', 'Usage: nikto -h [target]', 'error');
            return;
        }

        const lines = [
            '- Nikto v2.5.0',
            '--------------------------------------------------------------------',
            `+ Target IP:          ${target}`,
            `+ Target Hostname:    ${target}`,
            '+ Target Port:        80',
            '+ Start Time:         ' + new Date().toLocaleString(),
            '--------------------------------------------------------------------',
            '+ Server: Apache/2.4.41 (Ubuntu)',
            '+ /: The anti-clickjacking X-Frame-Options header is not present.',
            '+ /: The X-Content-Type-Options header is not set.',
            '+ /admin/: Directory indexing found.',
            '+ /config.php: Configuration file found.',
            '+ /backup/: Backup directory found.',
            '+ /test.php: Test file found.',
            '+ 26000 requests: 0 error(s) and 7 item(s) reported on remote host',
            '+ End Time:           ' + new Date(Date.now() + 30000).toLocaleString()
        ];

        this.simulateTyping(lines);
    }

    simulateJohn(file) {
        if (!file) {
            this.addTerminalLine('', 'Usage: john [password file]', 'error');
            return;
        }

        const lines = [
            'John the Ripper 1.9.0-jumbo-1 OMP [linux-gnu 64-bit x86_64 AVX2 AC]',
            'Copyright (c) 1996-2021 by Solar Designer and others',
            `Loaded 5 password hashes with 5 different salts (bcrypt [Blowfish 32/64 X3])`,
            'Cost 1 (iteration count) is 1024 for all loaded hashes',
            'Will run 8 OpenMP threads',
            'Proceeding with single, rules:Single',
            'Press \'q\' or Ctrl-C to abort, almost any other key for status',
            'admin123         (user1)',
            'password         (user2)',
            'qwerty123        (user3)',
            '3g 0:00:00:15 DONE 1/3 (2023-12-20 14:35) 0.1936g/s 2918p/s 14590c/s 14590C/s',
            'Use the "--show" option to display all of the cracked passwords reliably',
            'Session completed'
        ];

        this.simulateTyping(lines);
    }

    simulateHydra(target) {
        if (!target) {
            this.addTerminalLine('', 'Usage: hydra -l [user] -P [wordlist] [target] [service]', 'error');
            return;
        }

        const lines = [
            'Hydra v9.4 (c) 2022 by van Hauser/THC & David Maciejak - Please do not use in military or secret service organizations, or for illegal purposes.',
            '',
            'Hydra (https://github.com/vanhauser-thc/thc-hydra) starting',
            `[DATA] max 16 tasks, 1 server, 14344 login tries (l:1/p:14344), ~896 tries per task`,
            `[DATA] attacking ${target}:22/ssh/`,
            '[22][ssh] host: ' + target + '   login: admin   password: admin123',
            '[22][ssh] host: ' + target + '   login: root    password: toor',
            '1 of 1 target successfully completed, 2 valid passwords found',
            'Hydra (https://github.com/vanhauser-thc/thc-hydra) finished'
        ];

        this.simulateTyping(lines);
    }

    simulateSherlock(username) {
        if (!username) {
            this.addTerminalLine('', 'Usage: sherlock [username]', 'error');
            return;
        }

        const lines = [
            '                                                .""".',
            '                                               /      \\',
            '                                              /  .-.  _\\',
            '                                             |    /    )|',
            '                                              \\  \'--\' /',
            '                                               \'------\'',
            '                         SHERLOCK v2.1.0',
            '',
            `[*] Checking username ${username} on:`,
            '[+] 2Dimensions: https://2Dimensions.com/profile/user/'+username,
            '[+] 500px: https://500px.com/p/'+username,
            '[+] About.me: https://about.me/'+username,
            '[+] Academia.edu: https://independent.academia.edu/'+username,
            '[+] Facebook: https://www.facebook.com/'+username,
            '[+] GitHub: https://www.github.com/'+username,
            '[+] Instagram: https://www.instagram.com/'+username,
            '[+] Reddit: https://www.reddit.com/user/'+username,
            '[+] Twitter: https://www.twitter.com/'+username,
            '[+] YouTube: https://www.youtube.com/c/'+username,
            '',
            `[*] Search completed for ${username}`
        ];

        this.simulateTyping(lines);
    }

    simulateLs() {
        const files = [
            'drwxr-xr-x 2 root root 4096 Dec 20 14:30 tools',
            'drwxr-xr-x 2 root root 4096 Dec 20 14:30 wordlists',
            'drwxr-xr-x 2 root root 4096 Dec 20 14:30 exploits',
            '-rw-r--r-- 1 root root 1024 Dec 20 14:30 passwords.txt',
            '-rw-r--r-- 1 root root 2048 Dec 20 14:30 targets.txt',
            '-rwxr-xr-x 1 root root 8192 Dec 20 14:30 scanner.py',
            '-rw-r--r-- 1 root root  512 Dec 20 14:30 config.json'
        ];

        files.forEach(file => {
            this.addTerminalLine('', file, 'normal');
        });
    }

    simulatePs() {
        const processes = [
            'PID TTY          TIME CMD',
            '  1 ?        00:00:01 systemd',
            '123 ?        00:00:00 kthreadd',
            '234 ?        00:00:00 rcu_gp',
            '345 pts/0    00:00:00 bash',
            '456 ?        00:00:00 apache2',
            '567 ?        00:00:00 mysql',
            '678 pts/0    00:00:00 python3',
            '789 pts/0    00:00:00 ps'
        ];

        processes.forEach(proc => {
            this.addTerminalLine('', proc, 'normal');
        });
    }

    simulateNetstat() {
        const connections = [
            'Active Internet connections (w/o servers)',
            'Proto Recv-Q Send-Q Local Address           Foreign Address         State',
            'tcp        0      0 192.168.1.100:22       192.168.1.1:51234       ESTABLISHED',
            'tcp        0      0 192.168.1.100:80       192.168.1.50:45678      TIME_WAIT',
            'tcp        0      0 192.168.1.100:443      10.0.0.1:12345          ESTABLISHED',
            'tcp6       0      0 ::1:3306               ::1:56789               ESTABLISHED'
        ];

        connections.forEach(conn => {
            this.addTerminalLine('', conn, 'normal');
        });
    }

    simulateIfconfig() {
        const interfaces = [
            'eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500',
            '        inet 192.168.1.100  netmask 255.255.255.0  broadcast 192.168.1.255',
            '        inet6 fe80::a00:27ff:fe4e:66a1  prefixlen 64  scopeid 0x20<link>',
            '        ether 08:00:27:4e:66:a1  txqueuelen 1000  (Ethernet)',
            '        RX packets 1234  bytes 567890 (554.5 KiB)',
            '        TX packets 890  bytes 123456 (120.5 KiB)',
            '',
            'lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536',
            '        inet 127.0.0.1  netmask 255.0.0.0',
            '        inet6 ::1  prefixlen 128  scopeid 0x10<host>',
            '        loop  txqueuelen 1000  (Local Loopback)'
        ];

        interfaces.forEach(iface => {
            this.addTerminalLine('', iface, 'normal');
        });
    }

    showSystemStatus() {
        const status = [
            '━━━━━━━━━━━━━━━━━━━━━ RSL SYSTEM STATUS ━━━━━━━━━━━━━━━━━━━━━',
            '',
            '🟢 System Status: OPERATIONAL',
            '🟢 Terminal: ACTIVE',
            '🟢 Network: CONNECTED',
            '🟢 Security Tools: LOADED',
            '',
            'System Information:',
            `  Uptime: ${Math.floor(Math.random() * 24)}h ${Math.floor(Math.random() * 60)}m`,
            `  Memory Usage: ${Math.floor(Math.random() * 40 + 30)}%`,
            `  CPU Usage: ${Math.floor(Math.random() * 20 + 10)}%`,
            `  Storage: ${Math.floor(Math.random() * 30 + 60)}% free`,
            '',
            'Active Tools:',
            '  • Nmap Scanner',
            '  • Burp Suite Professional',
            '  • Metasploit Framework',
            '  • John the Ripper',
            '  • Wireshark',
            '',
            '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
            ''
        ];

        status.forEach(line => {
            this.addTerminalLine('', line, line.includes('🟢') ? 'info' : 'normal');
        });
    }

    simulateMetasploit() {
        const logo = [
            '                                   ____________',
            ' [%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%| $a,        |',
            ' [%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%| $S`?.      |',
            ' [%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%| $S`?    |',
            ' [%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%| $S.     |',
            ' [%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%| $S  `?  |',
            ' [%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%| $S     s|',
            ' [%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%| $S     .d',
            ' [%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%| $S      $',
            ' [%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%| $S      $',
            ' [%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%| $S      $',
            ' [%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%| $S.    .d',
            ' [%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%| $S??   |',
            ' [%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%| $S    |',
            ' [%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%|______.d',
            '',
            '       =[ metasploit v6.3.40-dev                          ]',
            '+ -- --=[ 2377 exploits - 1232 auxiliary - 413 post       ]',
            '+ -- --=[ 1388 payloads - 46 encoders - 11 nops            ]',
            '+ -- --=[ 9 evasion                                         ]',
            '',
            'msf6 > '
        ];

        logo.forEach((line, index) => {
            setTimeout(() => {
                this.addTerminalLine('', line, index === logo.length - 1 ? 'warning' : 'info');
            }, index * 50);
        });
    }

    simulateTyping(lines, delay = 100) {
        lines.forEach((line, index) => {
            setTimeout(() => {
                this.addTerminalLine('', line, 'normal');
                if (index === lines.length - 1) {
                    this.scrollToBottom();
                }
            }, index * delay);
        });
    }

    addTerminalLine(prompt, text, type = 'normal', terminalId = this.activeTerminal) {
        const terminal = this.terminals.get(terminalId);
        if (!terminal) return;

        const line = document.createElement('div');
        line.className = 'terminal-line';

        if (prompt) {
            const promptSpan = document.createElement('span');
            promptSpan.className = 'terminal-prompt';
            promptSpan.textContent = prompt;
            line.appendChild(promptSpan);
        }

        const textSpan = document.createElement('span');
        textSpan.className = `terminal-text${type !== 'normal' ? ` terminal-${type}` : ''}`;
        textSpan.textContent = text;
        line.appendChild(textSpan);

        terminal.output.appendChild(line);
        this.scrollToBottom(terminalId);
    }

    navigateHistory(direction) {
        if (this.commandHistory.length === 0) return;

        this.historyIndex += direction;
        this.historyIndex = Math.max(-1, Math.min(this.historyIndex, this.commandHistory.length - 1));

        if (this.historyIndex >= 0) {
            this.terminalInput.value = this.commandHistory[this.historyIndex];
        } else {
            this.terminalInput.value = '';
        }
    }

    autocomplete() {
        const input = this.terminalInput.value;
        const commands = ['help', 'clear', 'nmap', 'sqlmap', 'dirb', 'gobuster', 'nikto', 'john', 'hydra', 'sherlock', 'whoami', 'pwd', 'ls', 'ps', 'netstat', 'ifconfig', 'status', 'version'];
        
        const matches = commands.filter(cmd => cmd.startsWith(input));
        if (matches.length === 1) {
            this.terminalInput.value = matches[0];
        } else if (matches.length > 1) {
            this.addTerminalLine('', matches.join('  '), 'info');
        }
    }

    switchCategory(category) {
        // Update active category button
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-category="${category}"]`).classList.add('active');

        // Show/hide tool categories
        document.querySelectorAll('.tools-category').forEach(cat => {
            cat.style.display = cat.dataset.category === category ? 'flex' : 'none';
        });

        this.currentCategory = category;
    }

    launchTool(toolName) {
        this.addTerminalLine('root@rsl-kali:~#', `launch ${toolName}`, 'normal');
        
        switch(toolName) {
            case 'burpsuite':
                this.addTerminalLine('', 'Starting Burp Suite Professional...', 'info');
                this.addTerminalLine('', 'Burp Suite is launching in background.', 'normal');
                break;
            case 'wireshark':
                this.addTerminalLine('', 'Starting Wireshark...', 'info');
                this.addTerminalLine('', 'Network capture interface ready.', 'normal');
                break;
            case 'zaproxy':
                this.addTerminalLine('', 'Starting OWASP ZAP...', 'info');
                this.addTerminalLine('', 'ZAP Proxy listening on 127.0.0.1:8080', 'normal');
                break;
            case 'metasploit':
                this.simulateMetasploit();
                break;
            default:
                this.addTerminalLine('', `Launching ${toolName}...`, 'info');
                this.addTerminalLine('', `${toolName} started successfully.`, 'normal');
        }
    }

    showToolInfo(toolName) {
        const toolInfos = {
            'burpsuite': 'Burp Suite Professional - Advanced web application security testing platform',
            'wireshark': 'Wireshark - Network protocol analyzer and packet capture tool',
            'zaproxy': 'OWASP ZAP - Open source web application security scanner',
            'sqlmap': 'SQLMap - Automatic SQL injection and database takeover tool',
            'nmap': 'Nmap - Network discovery and security auditing utility',
            'masscan': 'MASSCAN - Fast TCP port scanner',
            'sherlock': 'Sherlock - Hunt down social media accounts by username',
            'theharvester': 'TheHarvester - E-mail, subdomain and people names harvester',
            'john': 'John the Ripper - Fast password cracker',
            'hydra': 'Hydra - Parallelized login cracker',
            'medusa': 'Medusa - Speedy, parallel, and modular login brute-forcer'
        };

        const info = toolInfos[toolName] || `${toolName} - Security analysis tool`;
        this.addTerminalLine('', `INFO: ${info}`, 'info');
    }

    executeQuickCommand(command) {
        this.terminalInput.value = command;
        this.processCommand();
    }

    handleTerminalAction(action) {
        switch(action) {
            case 'fullscreen':
                this.toggleFullscreen();
                break;
            case 'settings':
                this.showTerminalSettings();
                break;
            case 'copy':
                this.copyTerminalOutput();
                break;
        }
    }

    toggleFullscreen() {
        const toolsLayout = document.querySelector('.tools-layout');
        this.isFullscreen = !this.isFullscreen;
        
        if (this.isFullscreen) {
            toolsLayout.classList.add('terminal-fullscreen');
        } else {
            toolsLayout.classList.remove('terminal-fullscreen');
        }
    }

    showTerminalSettings() {
        this.addTerminalLine('', '━━━━━━━━━━━━━━━ TERMINAL SETTINGS ━━━━━━━━━━━━━━━', 'info');
        this.addTerminalLine('', 'Font: JetBrains Mono', 'normal');
        this.addTerminalLine('', 'Size: 14px', 'normal');
        this.addTerminalLine('', 'Theme: Kali Linux Dark', 'normal');
        this.addTerminalLine('', 'History: Enabled', 'normal');
        this.addTerminalLine('', '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'info');
    }

    copyTerminalOutput() {
        const output = this.terminalOutput.textContent;
        navigator.clipboard.writeText(output).then(() => {
            this.addTerminalLine('', 'Terminal output copied to clipboard.', 'info');
        });
    }

    saveSession() {
        const session = {
            timestamp: new Date().toISOString(),
            history: this.commandHistory,
            output: this.terminalOutput.innerHTML
        };
        
        const blob = new Blob([JSON.stringify(session, null, 2)], {
            type: 'application/json'
        });
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `rsl-session-${Date.now()}.json`;
        a.click();
        
        URL.revokeObjectURL(url);
        this.addTerminalLine('', 'Session saved successfully.', 'info');
    }

    clearTerminal() {
        this.terminalOutput.innerHTML = '';
        this.showWelcomeMessage();
    }

    scrollToBottom() {
        const terminalBody = document.querySelector('.terminal-body');
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }
}

// Initialize the RSL Tools System
const rslTools = new RSLToolsSystem();

// Export for global access
window.RSLTools = rslTools;
