export default {
  config: {
    locales: [
      // 'ar',
      // 'fr',
      // 'cs',
      // 'de',
      // 'dk',
      // 'es',
      // 'he',
      // 'id',
      // 'it',
      // 'ja',
      // 'ko',
      // 'ms',
      // 'nl',
      // 'no',
      // 'pl',
      // 'pt-BR',
      // 'pt',
      // 'ru',
      // 'sk',
      // 'sv',
      // 'th',
      // 'tr',
      // 'uk',
      // 'vi',
      // 'zh-Hans',
      // 'zh',
    ],
    theme: {
      light: {
        colors: {
          primary100: '#e0f2f1',
          primary200: '#b2dfdb',
          primary500: '#00897b',
          primary600: '#00796b',
          primary700: '#00695c',
          danger700: '#b72b1a'
        },
      },
      dark: {
        colors: {
          primary100: '#e0f2f1',
          primary200: '#b2dfdb',
          primary500: '#00897b',
          primary600: '#00796b',
          primary700: '#00695c',
          danger700: '#b72b1a'
        },
      },
    },
    translations: {
      en: {
        "Auth.form.welcome.title": "Welcome to FluxForge",
        "Auth.form.welcome.subtitle": "Login to your admin account",
        "app.components.LeftMenu.navbrand.title": "FluxForge Dashboard",
        "app.components.LeftMenu.navbrand.workplace": "Admin Panel",
      },
    },
  },
  bootstrap(app: any) {
    console.log(app);
  },
};
