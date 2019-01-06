<template>
	<el-card class="card">
		<!-- 面包屑 -->
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>权限管理</el-breadcrumb-item>
			<el-breadcrumb-item>权限列表</el-breadcrumb-item>
		</el-breadcrumb>

		<!-- 表格 -->
		<el-table :data="tableData" border height="550" style="width: 100%; margin-top: 20px;">
			<el-table-column prop="id" align="center" label="#" width="150">
			</el-table-column>
			<el-table-column prop="authName" align="center" label="权限名称">
			</el-table-column>
			<el-table-column prop="path" align="center" label="路径">
			</el-table-column>
			<el-table-column align="center" label="层级">
				<template slot-scope="scope">
					<span v-if="scope.row.level === '0'">一级</span>
					<span v-if="scope.row.level === '1'">二级</span>
					<span v-if="scope.row.level === '2'">三级</span>
				</template>
			</el-table-column>
		</el-table>
	</el-card>
</template>

<script>
	export default {
		data() {
			return {
				tableData: []
			};
		},
		created() {
			this.getTableData();
		},
		methods: {
			async getTableData() {
				const AUTH_TOKEN = localStorage.getItem('token');
				this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN;
				const res = await this.$http.get(`rights/list`);
				// console.log(res);
				this.tableData = res.data.data;
			}
		}
	}
</script>

<style>
	.card {
		width: 100%;
		margin: 20px;
	}
</style>
