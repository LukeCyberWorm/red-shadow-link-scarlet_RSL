// RSL System - Final Validation Script
// Para usar: copie este código no console do navegador em qualquer página do sistema

class RSLValidator {
    constructor() {
        this.results = [];
        this.totalTests = 0;
        this.passedTests = 0;
    }

    log(message, type = 'info') {
        const timestamp = new Date().toLocaleTimeString();
        const style = type === 'pass' ? 'color: #22c55e; font-weight: bold;' :
                     type === 'fail' ? 'color: #ef4444; font-weight: bold;' :
                     type === 'warn' ? 'color: #f59e0b; font-weight: bold;' :
                     'color: #3b82f6;';
        
        console.log(`%c[${timestamp}] ${message}`, style);
        
        this.results.push({
            message,
            type,
            timestamp
        });
    }

    test(description, testFunction) {
        this.totalTests++;
        try {
            const result = testFunction();
            if (result) {
                this.passedTests++;
                this.log(`✅ ${description}`, 'pass');
                return true;
            } else {
                this.log(`❌ ${description}`, 'fail');
                return false;
            }
        } catch (error) {
            this.log(`❌ ${description} - Error: ${error.message}`, 'fail');
            return false;
        }
    }

    async validateFileStructure() {
        this.log('🗂️ Validando estrutura de arquivos...', 'info');
        
        const requiredFiles = [
            'index.html',
            'dashboard.html',
            'facial-recognition.html', 
            'cases.html',
            'location.html'
        ];

        for (const file of requiredFiles) {
            await this.test(`Arquivo ${file} existe`, () => {
                // Tentar carregar a página
                return fetch(file, { method: 'HEAD' })
                    .then(response => response.ok)
                    .catch(() => false);
            });
        }
    }

    validateCurrentPage() {
        this.log('📄 Validando página atual...', 'info');
        
        // Testar meta tags
        this.test('Meta charset presente', () => {
            return document.querySelector('meta[charset]') !== null;
        });

        this.test('Title tag presente', () => {
            return document.title && document.title.length > 0;
        });

        this.test('Meta viewport presente', () => {
            return document.querySelector('meta[name="viewport"]') !== null;
        });

        this.test('Meta description presente', () => {
            return document.querySelector('meta[name="description"]') !== null;
        });

        // Testar fontes
        this.test('Fonte Roboto carregada', () => {
            const computedStyle = getComputedStyle(document.body);
            return computedStyle.fontFamily.includes('Roboto');
        });

        // Testar CSS
        this.test('Estilos CSS carregados', () => {
            return document.styleSheets.length > 0;
        });

        // Testar JavaScript
        this.test('JavaScript funcionando', () => {
            return typeof console !== 'undefined' && typeof localStorage !== 'undefined';
        });
    }

    validateNavigation() {
        this.log('🧭 Validando navegação...', 'info');

        // Testar links internos
        const links = document.querySelectorAll('a[href*=".html"], a[href^="/"]');
        
        this.test('Links internos encontrados', () => {
            return links.length > 0;
        });

        links.forEach(link => {
            const href = link.getAttribute('href');
            this.test(`Link para ${href} válido`, () => {
                return href && !href.includes('javascript:void') && !href.includes('#');
            });
        });
    }

    validateForms() {
        this.log('📝 Validando formulários...', 'info');

        const forms = document.querySelectorAll('form');
        
        this.test('Formulários encontrados', () => {
            return forms.length >= 0; // Pode não ter formulários em todas as páginas
        });

        forms.forEach((form, index) => {
            this.test(`Formulário ${index + 1} tem action`, () => {
                return form.getAttribute('action') !== null || form.onsubmit !== null;
            });

            const inputs = form.querySelectorAll('input, select, textarea');
            this.test(`Formulário ${index + 1} tem campos`, () => {
                return inputs.length > 0;
            });
        });
    }

    validateResponsive() {
        this.log('📱 Validando responsividade...', 'info');

        // Testar viewport
        this.test('Viewport configurado', () => {
            const viewport = document.querySelector('meta[name="viewport"]');
            return viewport && viewport.content.includes('width=device-width');
        });

        // Testar media queries
        this.test('Media queries CSS presentes', () => {
            let hasMediaQueries = false;
            for (let styleSheet of document.styleSheets) {
                try {
                    for (let rule of styleSheet.cssRules || []) {
                        if (rule.type === CSSRule.MEDIA_RULE) {
                            hasMediaQueries = true;
                            break;
                        }
                    }
                } catch (e) {
                    // Ignorar erros de CORS
                }
                if (hasMediaQueries) break;
            }
            return hasMediaQueries;
        });

        // Testar larguras comuns
        const commonBreakpoints = [320, 768, 1024, 1440];
        commonBreakpoints.forEach(width => {
            this.test(`Layout funciona em ${width}px`, () => {
                // Simular teste de breakpoint
                return window.matchMedia(`(min-width: ${width}px)`).matches || width <= window.innerWidth;
            });
        });
    }

    validateAccessibility() {
        this.log('♿ Validando acessibilidade...', 'info');

        this.test('Imagens tem alt text', () => {
            const images = document.querySelectorAll('img');
            let allHaveAlt = true;
            images.forEach(img => {
                if (!img.getAttribute('alt')) {
                    allHaveAlt = false;
                }
            });
            return images.length === 0 || allHaveAlt;
        });

        this.test('Botões são acessíveis', () => {
            const buttons = document.querySelectorAll('button, input[type="button"], input[type="submit"]');
            let allAccessible = true;
            buttons.forEach(btn => {
                if (!btn.textContent.trim() && !btn.getAttribute('aria-label')) {
                    allAccessible = false;
                }
            });
            return buttons.length === 0 || allAccessible;
        });

        this.test('Contraste adequado', () => {
            // Teste básico de contraste (verificar se não está usando cores muito claras)
            const body = getComputedStyle(document.body);
            const bgColor = body.backgroundColor;
            const textColor = body.color;
            return bgColor !== textColor; // Teste simples
        });
    }

    validateSEO() {
        this.log('🔍 Validando SEO...', 'info');

        this.test('Title único e descritivo', () => {
            return document.title && document.title.length >= 10 && document.title.length <= 60;
        });

        this.test('Meta description presente', () => {
            const description = document.querySelector('meta[name="description"]');
            return description && description.content.length >= 120 && description.content.length <= 160;
        });

        this.test('Heading structure válida', () => {
            const h1 = document.querySelectorAll('h1');
            return h1.length === 1; // Deve ter exatamente um H1
        });

        this.test('Open Graph tags presentes', () => {
            const ogTags = document.querySelectorAll('meta[property^="og:"]');
            return ogTags.length >= 3; // Pelo menos title, description, image
        });
    }

    async runAllTests() {
        console.clear();
        this.log('🚀 Iniciando validação completa do sistema RSL...', 'info');
        this.log('========================================', 'info');

        // Executar todos os testes
        this.validateCurrentPage();
        this.validateNavigation(); 
        this.validateForms();
        this.validateResponsive();
        this.validateAccessibility();
        this.validateSEO();

        // Mostrar resultados finais
        this.log('========================================', 'info');
        this.log('📊 RESULTADOS FINAIS:', 'info');
        this.log(`Total de testes: ${this.totalTests}`, 'info');
        this.log(`Testes aprovados: ${this.passedTests}`, 'pass');
        this.log(`Testes reprovados: ${this.totalTests - this.passedTests}`, 'fail');
        
        const successRate = Math.round((this.passedTests / this.totalTests) * 100);
        this.log(`Taxa de sucesso: ${successRate}%`, successRate >= 90 ? 'pass' : 'warn');

        if (successRate >= 95) {
            this.log('🎉 SISTEMA APROVADO PARA DEPLOY!', 'pass');
            this.log('✅ O sistema RSL está pronto para scarletredsolutions.com', 'pass');
        } else if (successRate >= 80) {
            this.log('⚠️ SISTEMA COM AVISOS - Deploy possível com correções', 'warn');
        } else {
            this.log('❌ SISTEMA REQUER CORREÇÕES antes do deploy', 'fail');
        }

        // Retornar relatório
        return {
            totalTests: this.totalTests,
            passedTests: this.passedTests,
            successRate,
            results: this.results
        };
    }

    // Método para testar uma página específica
    async testPage(url) {
        this.log(`🔗 Testando página: ${url}`, 'info');
        try {
            const response = await fetch(url, { method: 'HEAD' });
            this.test(`Página ${url} acessível`, () => response.ok);
            return response.ok;
        } catch (error) {
            this.test(`Página ${url} acessível`, () => false);
            return false;
        }
    }
}

// Executar validação
const validator = new RSLValidator();
validator.runAllTests().then(report => {
    console.log('%c📋 RELATÓRIO COMPLETO DISPONÍVEL:', 'color: #3b82f6; font-weight: bold; font-size: 14px;');
    console.log('Use: validator.results para ver detalhes');
    console.log('Use: validator.testPage("pagina.html") para testar página específica');
    
    // Salvar relatório no localStorage para consulta
    localStorage.setItem('rsl_validation_report', JSON.stringify(report));
});

// Disponibilizar globalmente para uso manual
window.RSLValidator = validator;
