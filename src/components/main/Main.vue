<template>
	<el-container style="height: 100vh;" id="container">

		<el-header style="background-color:#545c64">
			<div id="container_logo">
				<el-image :src="url" :fit="fill"></el-image>
			</div>
			<div id="container_admin">
				<span style="margin-right: 10px;">mila</span>
				<el-dropdown>
					<span style="font-size: 25px;color: antiquewhite;"><i class="el-icon-user-solid"></i></span>
					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item>查看</el-dropdown-item>
							<el-dropdown-item>退出</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</div>
		</el-header>

		<el-container>
			<el-aside width="200px" style="background-color: rgb(84, 92, 100)">
				<!-- 自动打开列表1和3，例如：:default-openeds="['1','3']" -->
				<el-menu :default-openeds="[]" background-color="#545c64" text-color="#fff">
					<el-submenu index="1">
						<template #title><i class="el-icon-message"></i>管理员</template>
						<el-menu-item index="1-1">
							<router-link to="/main/adminList">管理员列表</router-link>
						</el-menu-item>
						<el-menu-item index="1-2">待定</el-menu-item>
					</el-submenu>
					<el-submenu index="2">
						<template #title><i class="el-icon-menu"></i>文章管理</template>
						<el-menu-item index="2-1">
							<router-link to="/main/articleList">文章列表</router-link>
						</el-menu-item>
						<el-menu-item index="2-2">待定</el-menu-item>
					</el-submenu>

					<el-submenu index="3">
						<template #title><i class="el-icon-setting"></i>设置</template>
						<el-menu-item index="3-1">待定</el-menu-item>
						<el-menu-item index="3-2">待定</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-aside>

			<el-main>
				<router-view></router-view>
				<el-card shadow="hover" style="position: relative;bottom: -250px;">
					<span class="bottom-word" v-for="item in bottomWord" :key="item.author">{{item.content}}</span>
				</el-card>
			</el-main>
		</el-container>

	</el-container>
</template>

<script>
	import logo from "@/assets/logo.png";
	export default {
		data() {
			const item = {
				date: '2016-05-02',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1518 弄'
			};
			return {
				bottomWord: [],
				tableData: Array(10).fill(item),
				url: logo,
			}
		},
		methods:{
			
			getBottomWord(){
				
				//天行数据接口
				this.$axios.get('http://api.tianapi.com/txapi/qingshi/index?key=f49ebd707cdbe796efb34b52f595922f').then(response => {

					this.bottomWord = response.data.newslist
				});
				
			}
			
		},
		created() {
			
			this.getBottomWord()

		}
	};
</script>

<style scoped="scoped">
	.el-header {
		background-color: #B3C0D1;
		color: #333;
		line-height: 60px;
	}

	.el-aside {
		color: #333;
	}

	#container a {
		text-decoration: none;
		color: #ffd04b;
	}

	.el-menu {
		border-right: none;
	}

	#container_logo {
		float: left;
		width: 200px;
		height: 60px;
		margin-left: -20px;
	}

	#container_admin {
		float: right;
		color: #fff;
	}
</style>
