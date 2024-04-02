import './design-library/src/styles/global.scss';
import './design-library/src/styles/fonts.scss';
import './design-library/src/styles/tw.css';
import 'normalize.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
const app = createApp(App);

app.use(createPinia());
app.use(router);
app.mount('#app');
