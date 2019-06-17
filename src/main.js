import Vue from 'vue'
import App from './layouts/App.vue'
import index from './store/index'

Vue.config.productionTip = false;

export const EventBus = new Vue();

new Vue({
  store: index,
  render: h => h(App)
}).$mount('#app');
