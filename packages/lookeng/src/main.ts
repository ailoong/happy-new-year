import { createApp } from 'vue';
import 'amfe-flexible';

import 'shared/styles/index.scss';
import '@/shared/style/_font.scss';
import App from './App.vue';

const app = createApp(App);

app.mount('#app');
