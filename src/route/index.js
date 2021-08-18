import Main from '../components/main/Main.vue'
import ArticleList from '../components/article/list.vue'
import ArticleAdd from '../components/article/add.vue'
import AdminList from '../components/admin/list.vue'
import AdminEdit from '../components/admin/edit.vue'
import Welcome from '../components/welcome/welcome.vue'

const routes = [
	{path:'',component:Main,redirect:{name:'welcome'}},
	{path:'/main',component:Main,children:[
		{path:'welcome',name:'welcome',component:Welcome},
		{path:'articleList',name:'articleList',component:ArticleList},
		{path:'articleAdd',name:'articleAdd',component:ArticleAdd},
		{path:'adminList',name:'adminList',component:AdminList},
		{path:'adminEdit',name:'adminEdit',component:AdminEdit},
	]},
]

export default routes