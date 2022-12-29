import { createApp } from 'vue';
import 'amfe-flexible';
import { router } from './routers';

import 'shared/styles/index.scss';
import App from './App.vue';

const app = createApp(App);

app.use(router);
app.mount('#app');
