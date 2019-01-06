<template>
	<el-card class="card">
		<!-- 面包屑 -->
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>权限管理</el-breadcrumb-item>
			<el-breadcrumb-item>角色列表</el-breadcrumb-item>
		</el-breadcrumb>

		<el-button type="primary" class="btn">添加角色</el-button>

		<!-- 表格 -->
		<el-table :data="tableData" style="width: 100%" height="530">
			<el-table-column type="expand">
				<template slot-scope="scope">
					<p v-if="scope.row.children.length === 0" align="center" style="color: red;">该角色未分配权限</p>
					<!-- 一级权限 -->
					<el-row v-for="(v1, i) in scope.row.children" :key="i">
						<el-col :span="4">
							<el-tag closable type="success" class="tag" @close="deleteRight(scope.row, v1)">
								{{v1.authName}}
							</el-tag>
							<i class="el-icon-arrow-right"></i>
						</el-col>
						<el-col :span="20">
							<!-- 二级权限 -->
							<el-row v-for="(v2, i) in v1.children" :key="i">
								<el-col :span="4">
									<el-tag closable type="info" class="tag" @close="deleteRight(scope.row, v2)">
										{{v2.authName}}
									</el-tag>
									<i class="el-icon-arrow-right"></i>
								</el-col>
								<el-col :span="20">
									<!-- 三级权限 -->
									<el-tag closable type="warning" class="tag" @close="deleteRight(scope.row, v3)" v-for="(v3, i) in v2.children"
									 :key="i">
										{{v3.authName}}
									</el-tag>
								</el-col>
							</el-row>
						</el-col>
					</el-row>
				</template>
			</el-table-column>
			<el-table-column label="#" type="index" width="180" align="center">
			</el-table-column>
			<el-table-column label="角色名称" prop="roleName" width="320">
			</el-table-column>
			<el-table-column label="角色描述" prop="roleDesc" width="320">
			</el-table-column>
			<el-table-column label="操作" width="320">
				<template slot-scope="scope">
					<el-button type="primary" icon="el-icon-edit" size="small" plain circle></el-button>
					<el-button type="danger" icon="el-icon-delete" size="small" plain circle></el-button>
					<el-button type="success" icon="el-icon-check" size="small" plain circle @click="getTreeData(scope.row)"></el-button>
				</template>
			</el-table-column>
		</el-table>

		<!-- 树形 -->
		<el-dialog title="分配权限" :visible.sync="dialogVisibleRole" width="50%">
			<el-tree ref="tree" :data="treeData" show-checkbox node-key="id" default-expand-all :default-checked-keys="defaultChecked"
			 :props="defaultProps">
			</el-tree>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisibleRole = false">取 消</el-button>
				<el-button type="primary" @click="roleRight()">确 定</el-button>
			</span>
		</el-dialog>
	</el-card>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [],
				tags: [],
				dialogVisibleRole: false,
				treeData: [],
				defaultChecked: [],
				defaultProps: {
					children: 'children',
					label: 'authName'
				},
				roleId: -1
			};
		},
		created() {
			this.getRolesData();
		},
		methods: {
			// 获取权限
			async getRolesData() {
				const AUTH_TOKEN = localStorage.getItem('token');
				this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN;
				const res = await this.$http.get('roles');
				// console.log(res);
				this.tableData = res.data.data;
			},
			// 删除权限
			async deleteRight(roleInfo, rightInfo) {
				const res = await this.$http.delete(`roles/${roleInfo.id}/rights/${rightInfo.id}`);
				// console.log(roleInfo.id, rightInfo.id);
				// console.log(res);
				const {
					meta: {
						msg,
						status
					}
				} = res.data;
				if (status === 200) {
					this.$message.success(msg);
					// this.getRolesData();
					roleInfo.children = res.data.data;
				} else {
					this.$message.warning(msg);
				}
			},
			// 获取树形结构数据
			async getTreeData(rights) {
				this.dialogVisibleRole = true;
				const res = await this.$http.get('rights/tree');
				// console.log(res);
				this.treeData = res.data.data;
				// console.log(rights);
				this.roleId = rights.id;
				const tempArr = [];
				rights.children.forEach((item1) => {
					item1.children.forEach((item2) => {
						item2.children.forEach((item3) => {
							// console.log(item3.id);
							tempArr.push(item3.id);
						});
					});
				});
				this.defaultChecked = tempArr;
			},
			// 角色授权
			async roleRight() {
				const roleId = this.roleId;
				const qx = this.$refs.tree.getCheckedKeys();
				const bx = this.$refs.tree.getHalfCheckedKeys();
				this.defaultChecked = [...qx, ...bx];
				// console.log(this.defaultChecked);
				const checked = this.defaultChecked;
				const res = await this.$http.post(`roles/${roleId}/rights`, {rids: checked.join(',')});
				// console.log(res);
				this.getRolesData();
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
		width: 100%;
		margin: 20px;
	}

	.btn {
		margin-top: 20px;
	}

	.tag {
		margin-bottom: 10px;
		margin-right: 5px;
	}
</style>
