import { createApp } from 'vue';
import VueDOMPurifyHTML from 'vue-dompurify-html';
import 'amfe-flexible';
import { router } from './routers';
import '@/shared/style/_font.scss';
import 'shared/styles/index.scss';
import App from './App.vue';

const app = createApp(App);

app.use(VueDOMPurifyHTML);
app.use(router);
app.mount('#app');
