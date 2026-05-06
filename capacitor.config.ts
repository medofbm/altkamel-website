import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.altkamel.app',
  appName: 'التكامل نت',
  webDir: '.output/public',
  server: {
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