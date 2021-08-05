import Main from '../components/main/Main.vue'
import ArticleList from '../components/article/list.vue'
import ArticleEdit from '../components/article/edit.vue'
import AdminList from '../components/admin/list.vue'
import AdminEdit from '../components/admin/edit.vue'

const routes = [
	{path:'',component:Main},
	{path:'/main',component:Main,children:[
		{path:'articleList',name:'articleList',component:ArticleList},
		{path:'articleEdit',name:'articleEdit',component:ArticleEdit},
		{path:'adminList',name:'adminList',component:AdminList},
		{path:'adminEdit',name:'adminEdit',component:AdminEdit},
	]},
]

export default routes