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
					<div class="grid-content bg-purple">
						<a href="javascript:;">退出</a>
					</div>
				</el-col>
			</el-row>
		</el-header>
		<el-container>
			<el-aside class="aside" width="200px">
				<el-menu default-active="2" class="el-menu-vertical-demo" unique-opened>
					<el-submenu index="1">
						<template slot="title">
							<i class="el-icon-location"></i>
							<span>用户管理</span>
						</template>
						<el-menu-item index="1-1"><i class="el-icon-location"></i>用户列表</el-menu-item>
					</el-submenu>
					<el-submenu index="2">
						<template slot="title">
							<i class="el-icon-location"></i>
							<span>权限管理</span>
						</template>
						<el-menu-item index="2-1"><i class="el-icon-location"></i>角色列表</el-menu-item>
						<el-menu-item index="2-1"><i class="el-icon-location"></i>权限列表</el-menu-item>
					</el-submenu>
					<el-submenu index="3">
						<template slot="title">
							<i class="el-icon-location"></i>
							<span>商品管理</span>
						</template>
						<el-menu-item index="3-1"><i class="el-icon-location"></i>商品列表</el-menu-item>
						<el-menu-item index="3-1"><i class="el-icon-location"></i>分类参数</el-menu-item>
						<el-menu-item index="3-1"><i class="el-icon-location"></i>商品分类</el-menu-item>
					</el-submenu>
					<el-submenu index="4">
						<template slot="title">
							<i class="el-icon-location"></i>
							<span>订单管理</span>
						</template>
						<el-menu-item index="4-1"><i class="el-icon-location"></i>订单列表</el-menu-item>
					</el-submenu>
					<el-submenu index="5">
						<template slot="title">
							<i class="el-icon-location"></i>
							<span>数据统计</span>
						</template>
						<el-menu-item index="5-1"><i class="el-icon-location"></i>数据报表</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-aside>
			<el-main class="main">Main</el-main>
		</el-container>
	</el-container>
</template>

<script>
	export default {
		data() {
			return {

			};
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
