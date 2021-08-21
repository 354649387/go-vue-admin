<template>
	<el-card class="box-card">
		<template #header>
			<div class="card-header">
				<span>文章列表</span>
			</div>
		</template>

		<Search @search="search" v-bind:showConfig="showConfig"></Search>

		<el-button type="primary" size="medium" @click="addArticle()">新增</el-button>
		<el-table :data="tableData" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">

			<el-table-column prop="id" label="Id" sortable width="180">
			</el-table-column>

			<el-table-column prop="title" label="标题" width="180">
			</el-table-column>

			<el-table-column prop="cid" label="cid" width="180">
			</el-table-column>

			<el-table-column prop="aid" label="aid" width="180">
			</el-table-column>

			<el-table-column prop="status" label="status" width="180">
			</el-table-column>

			<el-table-column label="操作">
				<template #default="scope">
					<el-button size="mini" @click="updateArticle(scope.$index, scope.row)">编辑</el-button>
					<el-button size="mini" type="danger" @click="deleteArticle(scope.$index, scope.row)">删除</el-button>
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
	import Search from '../common/search.vue'
	export default {
		name: "ArticleList",
		components: {
			Search,
		},
		data() {
			return {
				tableData: [],
				total: '',
				pageSize: 10,
				//默认的页面数
				currentPage: 1,
				//搜索条件显示配置
				showConfig: {
					//标题搜索框
					title: true,
					//用户名搜索框
					name: false,
					//栏目选择框
					category: true,
					//管理员选择框
					admin: true,
				}
			}
		},
		methods: {
			//改变每页显示数量
			handleSizeChange(val) {

				//点击改变每页显示数量，传递也没显示的数值和当前页码数
				this.$axios.get('/api/article/list', {
					params: {
						page: this.currentPage,
						pageSize: val
					}
				}).then(re => {
					this.tableData = re.data.articleList
					this.total = re.data.total
					this.pageSize = val
				})

			},
			//页面改变时数据重新获取
			handleCurrentChange(pageNum) {

				this.$axios.get('/api/article/list', {
					params: {
						page: pageNum,
						pageSize: this.pageSize
					}
				}).then(re => {
					this.tableData = re.data.articleList
					this.total = re.data.total
					this.currentPage = pageNum
				})

			},
			formatter(row) {
				return row.address;
			},
			updateArticle(index, row) {
				
				this.$router.push({
					name: 'articleUpdate',
					query: {
						id: row.id,
					}
				})
			},
			//删除文章
			deleteArticle(index,row) {
				
				this.$confirm('确定删除该文章吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					// center: true
				}).then(() => {
			
					this.$axios.get('/api/article/delete', {
			
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
			
								this.getArticle()
			
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
			addArticle() {

				this.$router.push({
					name: 'articleAdd'
				})

			},
			getArticle() {

				this.$axios.get("/api/article/list").then(re => {
					console.log(re.data.articleList)
					this.tableData = re.data.articleList
					this.total = re.data.total
				});

			},
			search(val) {

	

				this.$axios.get("/api/search/article", {
					params: {
						title: val.title,
						cid: val.cid,
						aid: val.aid
					}
				}).then(re => {
		
					this.tableData = re.data.searchList
					this.total = re.data.total
				});

			}
		},
		created() {
			this.getArticle()
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
</style>
