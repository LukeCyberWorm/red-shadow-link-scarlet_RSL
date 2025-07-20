// Wix Velo Configuration for RSL System
// scarletredsolutions.com

// Database Collections (if using Wix Data)
/*
Collections needed:
1. Users - for authentication
2. Cases - for case management
3. FacialRecognition - for FR results
4. Locations - for location tracking
5. SystemLogs - for audit trail
*/

// Site Structure for Wix
const siteStructure = {
    pages: [
        {
            name: 'Home (Login)',
            url: '/',
            file: 'index.html',
            type: 'landing',
            seo: {
                title: 'RSL - Red Shadow Link Scarlet | Scarlet Red Solutions',
                description: 'Sistema de Análise Investigativa Forense com IA'
            }
        },
        {
            name: 'Dashboard',
            url: '/dashboard',
            file: 'dashboard.html',
            type: 'dynamic',
            protected: true
        },
        {
            name: 'Facial Recognition',
            url: '/facial-recognition',
            file: 'facial-recognition.html',
            type: 'dynamic',
            protected: true
        },
        {
            name: 'Cases',
            url: '/cases',
            file: 'cases.html',
            type: 'dynamic',
            protected: true
        },
        {
            name: 'Location',
            url: '/location',
            file: 'location.html',
            type: 'dynamic',
            protected: true
        }
    ]
};

// Wix Settings Recommendations
const wixSettings = {
    general: {
        siteName: 'Scarlet Red Solutions - RSL',
        description: 'Sistema de Análise Investigativa Forense',
        language: 'pt',
        timezone: 'America/Sao_Paulo'
    },
    seo: {
        enableSEO: true,
        enableSitemap: true,
        enableRobots: true,
        googleAnalytics: '', // Add your GA code
        googleSearchConsole: '' // Add your GSC code
    },
    performance: {
        enableCaching: true,
        compressImages: true,
        lazyLoading: true
    },
    security: {
        enableSSL: true,
        enableSecurity: true
    }
};

// Custom Code for Header (Analytics, etc.)
const headerCode = `
<!-- Google Analytics (Replace with your code) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>

<!-- Security Headers -->
<meta http-equiv="X-Content-Type-Options" content="nosniff">
<meta http-equiv="X-Frame-Options" content="DENY">
<meta http-equiv="X-XSS-Protection" content="1; mode=block">
`;

export { siteStructure, wixSettings, headerCode };
