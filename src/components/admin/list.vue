<template>
	<el-card class="box-card">
		<template #header>
			<div class="card-header">
				<span>管理员列表</span>
			</div>
		</template>

		<el-form ref="form" :model="form" label-width="180px" style="margin-bottom: 50px;">
			<div class="form-div" style="margin-left: 0px;">
				<el-input placeholder="请输入用户名" v-model="form.username" clearable size="small"></el-input>
			</div>
			<!-- <div class="form-div">
				<el-select v-model="form.category" clearable placeholder="请选择栏目" size="small">
					<el-option v-for="item in categorys" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</div>
			<div class="form-div">
				<el-select v-model="form.admin" clearable placeholder="请选择管理员" size="small">
					<el-option v-for="item in admins" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</div> -->
			<div class="form-div">
				<el-button type="primary" @click="onSubmit" size="small">搜索</el-button>
			</div>
		</el-form>

		<el-button type="primary" size="medium" @click="addAdmin()">新增</el-button>
		<el-table :data="tableData" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
			<el-table-column prop="username" label="姓名" width="180">
			</el-table-column>
			<el-table-column prop="password" label="密码" width="180">
			</el-table-column>
			<el-table-column label="操作">
				<template #default="scope">
					<el-button size="mini" @click="updateAdmin(scope.$index, scope.row)">编辑</el-button>
					<el-button size="mini" type="danger" @click="deleteAdmin(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
			:current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size='pageSize'
			layout="total, sizes, prev, pager, next, jumper" :total='total' style="margin-top: 50px;">
		</el-pagination>
	</el-card>

</template>

<script>
	export default {
		data() {
			return {
				tableData: [],
				total: '',
				pageSize: 10,
				//默认的页面数
				currentPage:1,
				categorys: [{
					value: '1',
					label: '游戏'
				}, {
					value: '2',
					label: '动作冒险'
				}, {
					value: '3',
					label: '角色扮演'
				}, {
					value: '4',
					label: '新闻资讯'
				}, {
					value: '5',
					label: '攻略'
				}],
				admins: [{
					value: '1',
					label: '小王1'
				}, {
					value: '2',
					label: '小王2'
				}, {
					value: '3',
					label: '小王3'
				}, {
					value: '4',
					label: '小王4'
				}, {
					value: '5',
					label: '小王5'
				}],
				form: {
					username: '',
					category: '',
					admin: '',
				}
			}
		},
		methods: {
			// //改变每页显示数量
			handleSizeChange(val) {
							
				this.$axios.get('/api/admin/list',{
					params:{
						page:this.currentPage,
						pageSize:val
					}
				}).then(re => {
					this.tableData = re.data.admins
					this.total = re.data.total
				})
				
			},
			//页面改变时数据重新获取
			handleCurrentChange(pageNum) {
				
				this.$axios.get('/api/admin/list',{
					params:{
						page:pageNum,
						pageSize:this.pageSize
					}
				}).then(re => {
					this.tableData = re.data.admins
					this.total = re.data.total
					this.currentPage = pageNum
				})
				
			},
			formatter(row) {
				return row.address;
			},
			onSubmit() {
				this.$axios.get('/api/search/admin',{
					params:{
						username:this.form.username,
					}
				}).then(re => {
					this.tableData = re.data.searchList
					this.total = re.data.total
				});
			},
			updateAdmin(index, row) {
				this.$router.push({
					name: 'adminEdit',
					query: {
						id: row.id
					}
				})
			},
			deleteAdmin(index, row) {
				this.$confirm('确定删除该管理员吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					// center: true
				}).then(() => {
							
					this.$axios.get('/api/admin/delete', {
							
							params:{
								id : row.id
							}
							
						})
						.then(res => {
							
							if (res.status == 200) {
							
								this.$message({
									type: 'success',
									message: '删除成功!'
								});
							
								this.getAdminList()
							
							}
							
						})
						.catch(() => {
							
							// ElMessage.error('删除失败')
							
						})
							
							
							
				}).catch(() => {
					this.$message({
						type: 'warning',
						message: '已取消删除'
					});
				});
			},
			addAdmin() {

				this.$router.push({
					name: 'adminAdd'
				})

			},
			getAdminList() {

				this.$axios.get('/api/admin/list',{
					params:{
						//传入页码和每页显示的数量
						page:this.currentPage,
						pageSize:this.pageSize
					}
				}).then(re => {
					this.tableData = re.data.adminList
					this.total = re.data.total
				})

			}
		},
		created() {
			this.getAdminList()
		}
	}
</script>

<style scoped="scoped">
	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.text {
		font-size: 14px;
	}

	.item {
		margin-bottom: 18px;
	}

	/* 	.box-card {
		width: 480px;
	} */
	.form-div {
		width: 200px;
		float: left;
		margin-left: 20px;
	}
</style>
