import Vue from 'vue'
import Router from 'vue-router'
import Index from './components/Index'
import NewsPress from './components/NewsPress'
import ProductPrice from './components/ProductPrice'
import ArticlePage from './components/ArticlePage'
import Detection from './components/Detection'
import About from './components/About'
Vue.use(Router)
export default new Router({
	mode: 'history',
	routes:[
		{
			path:'/',
			name:'index',
			component:Index
		},
		{
			path:'/newsPress',
			name:'newsPress',
			component:NewsPress
		},
		{
			path:'/productPrice',
			name:'productPrice',
			component:ProductPrice
		},
		{
			path:'/article/:id',
			name:'articlePage',
			component:ArticlePage
		},
		{
			path:'/detection',
			name:'detection',
			component:Detection
		},
		{
			path:'/about',
			name:'about',
			component:About
		}
	]
})