import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/login';
import Home from '@/components/home';

import { Message } from 'element-ui';

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
			component: Login
    },
		{
			path: '/',
			component: Home
		},
		{
			path: '/home',
			component: Home
		}
  ]
});

router.beforeEach((to, from, next) => {
	// console.log(to);
	if (to.path === '/login') {
		next();
	} else {
			if (!localStorage.getItem('token')) {
				router.push('/login');
				Message.warning('你还没有登录，请先登录！');
			} else {
				next();
			}
	}
});

export default router;
