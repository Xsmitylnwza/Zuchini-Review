import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import App from './App.vue';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const pinia = createPinia();
const app = createApp(App);

app.use(Toast, {
    position: "bottom-right",
    timeout: 3000,
    closeOnClick: true,
    draggable: true,
});
app.use(router);
app.use(pinia);
app.mount('#app');
