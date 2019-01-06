import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/login';
import Home from '@/components/home';
import Users from '@/components/users';
import Rights from '@/components/rights';
import Roles from '@/components/roles';

import {
	Message
} from 'element-ui';

Vue.use(Router)

const router = new Router({
	routes: [{
			path: '/login',
			component: Login
		},
		{
			path: '/',
			component: Home
		},
		{
			path: '/home',
			component: Home,
			children: [
				{
					path: '/users',
					component: Users
				},
				{
					path: '/rights',
					component: Rights
				},
				{
					path: '/roles',
					component: Roles
				}
			]
		}
	]
});

// 路由守卫
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
