import { registerRootComponent } from 'expo';

import App from './App';

// registerRootComponent chama AppRegistry.registerComponent('main', () => App).
// Ele também garante que, ao carregar o app no Expo Go ou em uma build nativa,
// o ambiente seja configurado corretamente.
registerRootComponent(App);
