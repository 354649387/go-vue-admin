import Main from '../components/main/Main.vue'
import ArticleList from '../components/article/list.vue'
import ArticleAdd from '../components/article/add.vue'
import ArticleUpdate from '../components/article/update.vue'
import AdminList from '../components/admin/list.vue'
import AdminAdd from '../components/admin/add.vue'
import AdminEdit from '../components/admin/edit.vue'
import Welcome from '../components/welcome/welcome.vue'
import Login from '../components/login/login.vue'


const routes = [
	{path:'',component:Main,redirect:{name:'login'}},
	{path:'/main',name:'main',redirect:{name:'welcome'},component:Main,children:[
		{path:'welcome',name:'welcome',component:Welcome},
		{path:'articleList',name:'articleList',component:ArticleList},
		{path:'articleAdd',name:'articleAdd',component:ArticleAdd},
		{path:'articleUpdate',name:'articleUpdate',component:ArticleUpdate},
		{path:'adminList',name:'adminList',component:AdminList},
		{path:'adminAdd',name:'adminAdd',component:AdminAdd},
		{path:'adminEdit',name:'adminEdit',component:AdminEdit},
	]},
	{path:'/login',name:'login',component:Login}
]

export default routes