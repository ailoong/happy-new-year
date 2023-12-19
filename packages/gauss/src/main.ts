import { createApp } from 'vue';
import VueDOMPurifyHTML from 'vue-dompurify-html';
import 'amfe-flexible';

import 'shared/styles/index.scss';
import App from './App.vue';

const app = createApp(App);

app.use(VueDOMPurifyHTML);
app.mount('#app');
