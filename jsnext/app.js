import '../style/reset.scss';
import '../style/common.scss';
import Vue from 'vue/dist/vue.common.js';
import VueRouter from 'vue-router';
import routes from './routes.js';

function start(el) {
    Vue.use(VueRouter);
    new Vue({
        el,
        router: new VueRouter({routes})
    });
}

start('#app');
