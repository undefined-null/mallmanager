<template>
	<el-card class="card">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>用户管理</el-breadcrumb-item>
			<el-breadcrumb-item>用户列表</el-breadcrumb-item>
		</el-breadcrumb>
		<div style="margin-top: 20px;">
			<el-input placeholder="请输入用户名" v-model="searchVal" class="input-with-select">
				<el-button slot="append" icon="el-icon-search" @click="searchUser()"></el-button>
			</el-input>
			<el-button type="primary" plain @click="showAddUser()">添加用户</el-button>
		</div>
		<el-table :data="tableData" style="width: 100%" height="300">
			<el-table-column fixed prop="id" label="#" width="120">
			</el-table-column>
			<el-table-column prop="username" label="姓名" width="120">
			</el-table-column>
			<el-table-column prop="email" label="邮箱" width="180">
			</el-table-column>
			<el-table-column prop="mobile" label="电话" width="150">
			</el-table-column>
			<el-table-column label="创建日期" width="200">
				<template slot-scope="scope">{{scope.row.create_time | fmtDate}}</template>
			</el-table-column>
			<el-table-column prop="mg_state" label="用户状态" width="120">
				<template slot-scope="scope">
					<el-switch v-model="scope.row.mg_state" @change="changeStatus(scope.row.id, scope.row.mg_state)" active-color="#13ce66"
					 inactive-color="#ff4949"></el-switch>
				</template>
			</el-table-column>
			<el-table-column prop="zip" label="操作" width="180">
				<template slot-scope="scope">
					<el-row>
						<el-button type="primary" icon="el-icon-edit" size="small" plain circle @click="getUserInfo(scope.row.id)"></el-button>
						<el-button type="danger" icon="el-icon-delete" size="small" plain circle @click="deleteUser(scope.row.id)"></el-button>
						<el-button type="success" icon="el-icon-check" size="small" plain circle @click="getRoles(scope.row.id)"></el-button>
					</el-row>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum"
		 :page-sizes="pageSizes" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
		</el-pagination>

		<!-- 添加用户 -->
		<el-dialog title="添加用户" :visible.sync="dialogVisibleAdd" width="50%">
			<el-form label-width="80px" :model="form">
				<el-form-item label="用户名">
					<el-input v-model="form.username"></el-input>
				</el-form-item>
				<el-form-item label="密码">
					<el-input v-model="form.password"></el-input>
				</el-form-item>
				<el-form-item label="邮箱">
					<el-input v-model="form.email"></el-input>
				</el-form-item>
				<el-form-item label="电话">
					<el-input v-model="form.mobile"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisibleAdd = false">取 消</el-button>
				<el-button type="primary" @click="addUser()">确 定</el-button>
			</span>
		</el-dialog>

		<!-- 编辑用户 -->
		<el-dialog title="编辑用户" :visible.sync="dialogVisibleEdit" width="50%">
			<el-form label-width="80px" :model="form">
				<el-form-item label="用户名">
					<el-input v-model="form.username" disabled></el-input>
				</el-form-item>
				<el-form-item label="邮箱">
					<el-input v-model="form.email"></el-input>
				</el-form-item>
				<el-form-item label="电话">
					<el-input v-model="form.mobile"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisibleEdit = false">取 消</el-button>
				<el-button type="primary" @click="editUser()">确 定</el-button>
			</span>
		</el-dialog>

		<!-- 分配角色 -->
		<el-dialog title="分配角色" :visible.sync="dialogVisibleRole" width="50%">
			<el-form label-position="right" label-width="80px">
				<el-form-item label="用户名">
					<span>{{username}}</span>
				</el-form-item>
				<el-form-item label="角色">
					<el-select v-model="userRole" clearable placeholder="请选择">
						<el-option v-for="item in roles" :key="item.id" :label="item.roleName" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisibleRole = false">取 消</el-button>
				<el-button type="primary" @click="setRole()">确 定</el-button>
			</span>
		</el-dialog>
	</el-card>
</template>

<script>
	export default {
		data() {
			return {
				searchVal: '',
				tableData: [],
				query: '',
				pagenum: 1,
				pagesize: 2,
				total: 0,
				pageSizes: [2, 4, 6, 8],
				dialogVisibleAdd: false,
				dialogVisibleEdit: false,
				dialogVisibleRole: false,
				form: {
					id: '',
					username: '',
					password: '',
					email: '',
					mobile: ''
				},
				userRole: '',
				roles: [],
				username: '',
				currentId: -1
			};
		},
		created() {
			this.getUsers();
		},
		methods: {
			// 获取用户数据
			async getUsers() {
				const AUTH_TOKEN = localStorage.getItem('token');
				this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN;
				const res = await this.$http.get(`users?query=${this.searchVal}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`);
				// console.log(res);
				const {
					users,
					total
				} = res.data.data;
				// console.log(users);
				this.tableData = users;
				this.total = total;
			},
			// 根据每页条数获取数据
			handleSizeChange(val) {
				this.pagesize = val;
				this.getUsers();
			},
			// 根据页码获取数据
			handleCurrentChange(val) {
				this.pagenum = val;
				this.getUsers();
			},
			// 搜索用户
			searchUser() {
				this.pagenum = 1;
				this.getUsers();
			},
			// 渲染添加用户
			showAddUser() {
				this.dialogVisibleAdd = true;
				this.form = {};
			},
			// 添加用户
			async addUser() {
				const res = await this.$http.post('users', this.form);
				// console.log(res);
				const {
					meta: {
						msg,
						status
					}
				} = res.data;
				if (status === 201) {
					this.dialogVisibleAdd = false;
					this.$message.success(msg);
					this.getUsers();
				} else {
					this.$message.warning(msg);
				}
			},
			// 删除用户
			deleteUser(id) {
				this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					const res = await this.$http.delete(`users/${id}`);
					// console.log(res);
					const {
						msg,
						status
					} = res.data.meta;
					if (status === 200) {
						this.pagenum = 1;
						this.getUsers();
						this.$message.success(msg);
					}
				}).catch(() => {
					this.$message.info('已取消删除');
				});
			},
			// 查询用户信息
			async getUserInfo(id) {
				this.dialogVisibleEdit = true;
				const res = await this.$http.get('users/' + id);
				// console.log(res);
				const {
					meta: {
						msg,
						status
					},
					data: {
						username,
						email,
						mobile
					}
				} = res.data;
				if (status === 200) {
					this.form.username = username;
					this.form.email = email;
					this.form.mobile = mobile;
					this.form.id = id;
				} else {
					this.$message.warning(mag);
				}
			},
			// 编辑用户
			async editUser() {
				const id = this.form.id;
				const email = this.form.email;
				const mobile = this.form.mobile;
				const res = await this.$http.put(`users/${id}`, {
					email,
					mobile
				});
				console.log(res);
				const {
					msg,
					status
				} = res.data.meta;
				if (status === 200) {
					this.dialogVisibleEdit = false;
					this.getUsers();
					this.$message.success(msg);
				}
			},
			// 改变状态
			async changeStatus(id, userStatus) {
				// console.log(id);
				const res = await this.$http.put(`users/${id}/state/${userStatus}`);
				// console.log(res);
				const {
					meta: {
						msg,
						status
					}
				} = res.data;
				if (status === 200) {
					this.$message.success(msg);
				} else {
					this.$message.warning(msg);
				}
			},
			// 获取角色
			async getRoles(id) {
				this.dialogVisibleRole = true;
				const res = await this.$http.get('roles');
				// console.log(res);
				this.roles = res.data.data;
				const res2 = await this.$http.get(`users/${id}`);
				// console.log(res2);
				this.currentId = id;
				this.username = res2.data.data.username;
				this.userRole = res2.data.data.rid;
			},
			// 分配角色
			async setRole() {
				const id = this.currentId;
				const rid = this.userRole;
				const res = await this.$http.put(`users/${id}/role`, {rid});
				// console.log(res);
				const {
					meta: {
						msg,
						status
					}
				} = res.data;
				if (status === 200) {
					this.$message.success(msg);
				} else {
					this.$message.warning(msg);
				}
				this.dialogVisibleRole = false;
			}
		}
	}
</script>

<style>
	.card {
		margin: 20px;
		width: 100%;
	}

	.input-with-select {
		width: 350px;
	}
</style>
