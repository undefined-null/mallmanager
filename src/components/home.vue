<template>
	<el-container class="container">
		<el-header class="header">
			<el-row>
				<el-col :span="4">
					<div class="grid-content bg-purple left">
						<img src="@/assets/logo.png" alt="">
					</div>
				</el-col>
				<el-col :span="18">
					<div class="grid-content bg-purple-light">
						<h2>电商后台管理系统</h2>
					</div>
				</el-col>
				<el-col :span="2">
					<div class="grid-content bg-purple exit">
						<a href="javascript:;" @click="exit()">退 出</a>
					</div>
				</el-col>
			</el-row>
		</el-header>
		<el-container>
			<el-aside class="aside" width="200px">
				<el-menu default-active="2" class="el-menu-vertical-demo" router unique-opened>
					<el-submenu :index="v1.order.toString()" v-for="(v1, i) in asideData" :key="i">
						<template slot="title">
							<i class="el-icon-location"></i>
							<span>{{v1.authName}}</span>
						</template>
						<el-menu-item :index="v2.path" v-for="(v2, i) in v1.children" :key="i"><i class="el-icon-location"></i>{{v2.authName}}</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-aside>
			<!-- <el-main class="main">Main</el-main> -->
			<router-view></router-view>
		</el-container>
	</el-container>
</template>

<script>
	export default {
		data() {
			return {
				asideData: []
			};
		},
		created() {
			this.getMenus();
		},
		methods: {
			// 退出
			exit() {
				localStorage.clear();
				this.$router.push('/login');
				this.$message.success('退出成功！');
			},
			// 动态菜单
			async getMenus() {
				const AUTH_TOKEN = localStorage.getItem('token');
				this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN;
				const res = await this.$http.get('menus');
				// console.log(res);
				this.asideData = res.data.data;
			}
		}
	}
</script>

<style>
	.container {
		height: 100%;
	}

	.header {
		background-color: #B3C0D1;
		line-height: 60px;
		text-align: center;
	}

	.header .left {
		text-align: left;
	}

	.header h2 {
		color: #fff;
	}

	.aside {}

	.main {
		background-color: pink;
	}
</style>
