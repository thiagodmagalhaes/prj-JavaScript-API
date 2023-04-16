import { createApp } from 'vue'
import App from './App.vue'
import bootstrap from './bootstrap'


const app = createApp(App);
app.config.productionTip = false;
app.use(bootstrap);

app.mount('#app');

