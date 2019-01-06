import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import Http from '@/plugins/http';
import moment from 'moment';
import '@/assets/base.css'

Vue.use(ElementUI);
Vue.use(Http);

Vue.config.productionTip = false;

Vue.filter('fmtDate', val => {
	return moment(val).format('YYYY-MM-DD');
});

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
