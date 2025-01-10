import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Import your router
import './assets/main.css';
import { createPinia } from 'pinia';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.mount('#app'); // Mounts the app to the #app div in index.html