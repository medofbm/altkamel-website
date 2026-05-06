import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.altkamel.app',
  appName: 'Altkamel net',
  webDir: '.output/public', // التعديل صار هنا
  server: {
    url: 'https://altkamel.ly/portal/login',
    cleartext: true,
    allowNavigation: [
      'altkamel.ly',
      'wa.me',
      'api.whatsapp.com',
      'chat.whatsapp.com'
    ]
  }
};

export default config;