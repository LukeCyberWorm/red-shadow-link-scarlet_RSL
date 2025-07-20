// Wix Velo Configuration - RSL Sistema
export default {
  // Configurações do site
  site: {
    siteId: 'scarlet-red-solutions',
    metaSiteId: 'rsl-investigative-system',
    siteDisplayName: 'Red Shadow Link - Scarlet',
    locale: 'pt-BR',
    version: '1.0.0'
  },

  // Configurações de desenvolvimento
  dev: {
    port: 3000,
    host: 'localhost',
    https: true,
    cors: {
      allowCredentials: true,
      origin: [
        'https://scarletredsolutions.com',
        'https://www.scarletredsolutions.com',
        'https://editor.wix.com'
      ]
    }
  },

  // Configurações de produção
  prod: {
    domain: 'scarletredsolutions.com',
    cdn: true,
    compression: true,
    minify: {
      css: true,
      js: true,
      html: false
    }
  },

  // Roteamento customizado
  routes: [
    {
      path: '/',
      page: 'index',
      title: 'RSL Login | Sistema Investigativo',
      description: 'Acesso seguro ao sistema RSL'
    },
    {
      path: '/dashboard',
      page: 'dashboard',
      title: 'Dashboard RSL | Painel Principal',
      description: 'Painel principal do sistema investigativo',
      auth: true
    },
    {
      path: '/facial-recognition',
      page: 'facial-recognition',
      title: 'Reconhecimento Facial | RSL AI',
      description: 'Sistema de reconhecimento facial com IA',
      auth: true
    },
    {
      path: '/cases',
      page: 'cases', 
      title: 'Gestão de Casos | RSL',
      description: 'Gerenciamento de casos investigativos',
      auth: true
    },
    {
      path: '/location',
      page: 'location',
      title: 'Rastreamento | RSL Tracking',
      description: 'Sistema de rastreamento e localização',
      auth: true
    }
  ],

  // APIs backend
  functions: {
    '/api/auth/login': 'backend/http-functions.js:post_auth_login',
    '/api/dashboard/stats': 'backend/http-functions.js:get_dashboard_stats',
    '/api/facial/recognition': 'backend/http-functions.js:post_facial_recognition',
    '/api/cases/list': 'backend/http-functions.js:get_cases_list',
    '/api/location/tracking': 'backend/http-functions.js:get_location_tracking',
    '/api/investigation/save': 'backend/http-functions.js:post_save_investigation',
    '/api/reports/generate': 'backend/http-functions.js:post_generate_report',
    '/api/system/health': 'backend/http-functions.js:get_system_health'
  },

  // Database
  database: {
    collections: 'database/collections.json',
    permissions: 'database/permissions.json',
    hooks: 'backend/data-hooks.js'
  },

  // Configurações de SEO
  seo: {
    sitemap: {
      enabled: true,
      path: '/sitemap.xml',
      changefreq: 'weekly',
      priority: 0.8
    },
    robots: {
      enabled: true,
      path: '/robots.txt'
    },
    meta: {
      title: 'RSL - Red Shadow Link Scarlet | Scarlet Red Solutions',
      description: 'Sistema avançado de análise investigativa com IA, reconhecimento facial e rastreamento de localização',
      keywords: 'investigação, forense, IA, reconhecimento facial, rastreamento, OSINT',
      author: 'Scarlet Red Solutions',
      ogType: 'website',
      ogImage: '/assets/images/rsl-og-image.jpg'
    }
  },

  // Assets e recursos
  assets: {
    styles: {
      main: 'public/assets/styles/',
      fonts: [
        'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap'
      ]
    },
    scripts: {
      main: 'public/assets/scripts/'
    },
    images: {
      optimize: true,
      formats: ['webp', 'jpeg', 'png'],
      quality: 85
    }
  },

  // Configurações de segurança
  security: {
    headers: {
      'X-Frame-Options': 'SAMEORIGIN',
      'X-Content-Type-Options': 'nosniff',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
    },
    csrf: {
      enabled: true,
      tokenName: 'rsl_csrf_token'
    },
    rateLimit: {
      enabled: true,
      windowMs: 15 * 60 * 1000, // 15 minutos
      max: 100 // limite de 100 requests por janela por IP
    }
  },

  // Analytics e monitoramento
  analytics: {
    googleAnalytics: {
      enabled: false, // Será ativado após deploy
      trackingId: 'GA_MEASUREMENT_ID'
    },
    wixAnalytics: {
      enabled: true,
      events: [
        'rsl_login',
        'rsl_facial_recognition',
        'rsl_case_view',
        'rsl_location_track',
        'rsl_report_generate'
      ]
    }
  },

  // Build e deploy
  build: {
    target: 'es2018',
    sourcemap: true,
    externals: [
      'wix-data',
      'wix-users', 
      'wix-storage',
      'wix-location',
      'wix-fetch'
    ]
  },

  // Configurações específicas do RSL
  rsl: {
    version: '1.0.0',
    environment: 'production',
    features: {
      facial_recognition: true,
      location_tracking: true,
      case_management: true,
      report_generation: true,
      user_authentication: true
    },
    demo: {
      enabled: true,
      credentials: {
        username: 'admin',
        password: 'demo123'
      }
    },
    api: {
      baseUrl: 'https://scarletredsolutions.com/api',
      timeout: 10000,
      retries: 3
    }
  }
};
