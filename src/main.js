import { createApp } from 'vue'
import App from './App.vue'
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { RiEdit2Line, MdDeleteoutlineRound } from "oh-vue-icons/icons";
import Vue3Toastify from 'vue3-toastify';

addIcons(RiEdit2Line, MdDeleteoutlineRound);


const app = createApp(App);
app.use(Vue3Toastify, {
    autoClose: 3000,
});
app.component('v-icon', OhVueIcon);
app.mount('#app');
