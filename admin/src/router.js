import Vue from 'vue'
import Router from 'vue-router'
import Index from './components/Index'

import Login from './components/Login'
//用户
import userCreat from './components/userCreat'
import userManage from './components/userManage'

//企业
import EnterpriseManage from './components/EnterpriseManage'
import HomeImgManage from './components/HomeImgManage' 

//产品
import ProductClass from './components/ProductClass'
import ProductManage from './components/ProductManage'
import PesticideDetection from './components/PesticideDetection'
import ProductPrice from './components/ProductPrice'
import ProductPriceManage from './components/ProductPriceManage'
import SeasonProducts from './components/SeasonProducts' 

//文章
import ArticlesClassManage from './components/ArticlesClassManage'
import ArticlesCreate from './components/ArticlesCreate'
import ArticlesManage from './components/ArticlesManage'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_ENV === 'serve' ? '' : '/admin/',
	routes:[
		{
			path:'/',
			name:'login',
			component:Login
		},
		{
			path:'/user/creat',
			name:'index',
			component:Index,
			children:[
				{
					path:'/user/creat',
					name:'userCreat',
					component:userCreat
				},
				{
					path:'/user/manage',
					name:'userManage',
					component:userManage
				},

				{
					path:'/enterprise/manage',
					name:'enterpriseManage',
					component:EnterpriseManage
				},
				{
					path:'/home/imgManage',
					name:'homeImgManage',
					component:HomeImgManage
				},

				{
					path:'/product/classCreate',
					name:'ProductClassCreate',
					component:ProductClass
				},
				{
					path:"/product/manage",
					name:'ProductManage',
					component:ProductManage
				},
				{
					path:"/pesticideDetection/create",
					name:'PesticideDetection',
					component:PesticideDetection
				},
				{
					path:'/productPrice/create',
					name:'productPrice',
					component:ProductPrice
				},
				{
					path:'/productPrice/manage',
					name:'productPriceManage',
					component:ProductPriceManage
				},
				{
					path:'/product/seasonProducts',
					name:'aeasonProducts',
					component:SeasonProducts
				},
				

				{
					path:'/articles/classMamage',
					name:'articlesClassManage',
					component:ArticlesClassManage
				},
				{
					path:'/articles/create',
					name:'articlesCreate',
					component:ArticlesCreate
				},
				{
					path:'/articles/manage',
					name:'articlesManage',
					component:ArticlesManage
				}
			]
		}
	]
})