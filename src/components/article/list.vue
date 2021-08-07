<template>
	<el-card class="box-card">
		<template #header>
			<div class="card-header">
				<span>文章列表</span>
			</div>
		</template>

		<el-form ref="form" :model="form" label-width="180px" style="margin-bottom: 50px;">
			<div class="form-div" style="margin-left: 0px;">
				<el-input placeholder="请输入标题" v-model="form.title" clearable size="small"></el-input>
			</div>
			<div class="form-div">
				<el-select v-model="form.category" clearable placeholder="请选择栏目" size="small">
					<el-option v-for="item in form.categorys" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</div>
			<div class="form-div">
				<el-select v-model="form.admin" clearable placeholder="请选择管理员" size="small">
					<el-option v-for="item in form.admins" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</div>
			<div class="form-div">
				<el-button type="primary" @click="onSubmit" size="small">搜索</el-button>
			</div>
		</el-form>

		<el-button type="primary" size="medium" @click="addArticle()">新增</el-button>
		<el-table :data="tableData" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
			<el-table-column prop="date" label="日期" sortable width="180">
			</el-table-column>
			<el-table-column prop="name" label="姓名" width="180">
			</el-table-column>
			<el-table-column prop="address" label="地址" :formatter="formatter">
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
	export default {
		data() {
			return {
				tableData: [{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				}, {
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄'
				}],
				form: {
					title: '',
					categorys: [{
						value: '选项1',
						label: '黄金糕'
					}, {
						value: '选项2',
						label: '双皮奶'
					}, {
						value: '选项3',
						label: '蚵仔煎'
					}, {
						value: '选项4',
						label: '龙须面'
					}, {
						value: '选项5',
						label: '北京烤鸭'
					}],
					category: '',
					admins: [{
						value: '选项1',
						label: '小王1'
					}, {
						value: '选项2',
						label: '小王2'
					}, {
						value: '选项3',
						label: '小王3'
					}, {
						value: '选项4',
						label: '小王4'
					}, {
						value: '选项5',
						label: '小王5'
					}],
					admin: ''
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
		},
		created() {

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
