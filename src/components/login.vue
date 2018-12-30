<template>
	<div class="login_wrap">
		<el-form class="form" :label-position="labelPosition" label-width="80px" :model="formData">
			<h2>用户登录</h2>
			<el-form-item label="用户名">
				<el-input v-model="formData.username"></el-input>
			</el-form-item>
			<el-form-item label="密码">
				<el-input type="password" v-model="formData.password"></el-input>
			</el-form-item>
			<el-button class="btn_login" type="primary" @click="login()">登录</el-button>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				labelPosition: 'top',
				formData: {
					username: '',
					password: ''
				}
			};
		},
		methods: {
			async login() {
				// this.$http.post('login', this.formData)
				// .then(res => {
					// console.log(res);
				// });
				const res = await this.$http.post('login', this.formData);
				// console.log(res);
				const {data:{data, meta:{msg, status}}} = res;
				if (status === 200) {
					// console.log(data);
					localStorage.setItem('token', data.token);
					return this.$router.push('/');
				}
				this.$message.warning(msg);
			}
		}
	}
</script>

<style>
	.login_wrap {
		height: 100%;
		background-color: #324152;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.form {
		width: 550px;
		background-color: #fff;
		padding: 40px;
		border-radius: 8px;
	}
	
	.btn_login {
		width: 100%;
		margin-top: 20px;
	}
</style>
