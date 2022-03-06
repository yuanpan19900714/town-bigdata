import Vue from 'vue';
import App from './App.vue';
import ScaleBox from "@/components/ScaleBox";

import ElementUI from 'element-ui';
import echarts from 'echarts';
import qs from 'qs';
import axios from "axios";

import Global from '../public/static/config/global'
import 'element-ui/lib/theme-chalk/index.css';

// import "lib-flexible";

Vue.config.productionTip = false;
Vue.component('scale-box', ScaleBox);
Vue.use(ElementUI);
Vue.prototype.$echarts = echarts;
Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;
Vue.prototype.GLOBAL = Global;

new Vue({
    render: h => h(App),
}).$mount('#app');