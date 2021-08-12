<template>
	<el-card class="box-card">
		<template #header>
			<div class="card-header">
				<span>文章列表</span>
			</div>
		</template>

		<Search v-bind:showConfig="showConfig"></Search>

		<el-button type="primary" size="medium" @click="addArticle()">新增</el-button>
		<el-table :data="tableData" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
			<el-table-column prop="id" label="Id" sortable width="180">
			</el-table-column>
			<el-table-column prop="title" label="标题" width="180">
			</el-table-column>
			<el-table-column label="操作">
				<template #default="scope">
					<el-button size="mini" @click="updateArticle(scope.$index, scope.row)">编辑</el-button>
					<el-button size="mini" type="danger" @click="deleteArticle(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination background layout="prev, pager, next" :total="1000" style="margin-top: 50px;">
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
				//搜索条件显示配置
				showConfig: {
					titleShow: true,
					categoryShow: true,
					adminShow: true
				}
			}
		},
		methods: {
			formatter(row) {
				return row.address;
			},
			onSubmit() {
				console.log('submit!');
			},
			updateArticle(index, row) {
				this.$router.push({
					name: 'articleEdit',
					params: {
						id: row.id
					}
				})
			},
			deleteArticle(index, row) {
				console.log(index, row);
			},
			addArticle() {

				this.$router.push({
					name: 'articleEdit'
				})

			},
			getArticle() {

				this.$axios.get("/api/article/list").then(re => {
					this.tableData = re.data.articleList
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
