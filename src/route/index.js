import Main from '../components/main/Main.vue'
import ArticleList from '../components/article/list.vue'
import AdminList from '../components/admin/list.vue'

const routes = [
	{path:'',component:Main},
	{path:'/main',component:Main,children:[
		{path:'articleList',name:'articleList',component:ArticleList},
		{path:'adminList',name:'adminList',component:AdminList}
	]},
]

export default routes