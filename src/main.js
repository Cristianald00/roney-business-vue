import './assets/main.css'

// App
import App from './App.vue'
import router from './router'
import { createApp } from 'vue'

// Packages
import { createPinia } from 'pinia'
import piniaPluginPersistedState from "pinia-plugin-persistedstate"

// Global Components
import InputComponent from './components/common/InputComponent.vue';
import IconButtonComponent from './components/common/IconButtonComponent.vue';
import DatePickerComponent from './components/common/DatePickerComponent.vue';
import SubmitButtonComponent from './components/common/SubmitButtonComponent.vue';
import DropdownAutoloadComponent from './components/common/DropdownAutoloadComponent.vue';

// Fontawesome
import { library } from '@fortawesome/fontawesome-svg-core' /* import the fontawesome core */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome' /* import font awesome icon component */
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

// -------------------------- --------------------------

// Set up font awesome
library.add(fas, fab)
const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon)

// Set up pinia
const pinia = createPinia();
pinia.use(piniaPluginPersistedState)

// Include Global Components
app.component('InputComponent', InputComponent);
app.component('IconButtonComponent', IconButtonComponent);
app.component('DatePickerComponent', DatePickerComponent);
app.component('SubmitButtonComponent', SubmitButtonComponent);
app.component('DropdownAutoloadComponent', DropdownAutoloadComponent);

app.use(pinia)
app.use(router)
app.mount('#app')
