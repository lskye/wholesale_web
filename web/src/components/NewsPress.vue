<template>
	<div class="wrap">
		<img src="../../public/image/index/IMG_0087.jpg" style='width:100%;height:200px;' >
		<div class="top">
			<p>新闻资讯</p>
			<p>NEWS CENTER</p>
			<div>
				<i class="el-icon-caret-right"></i>
				当前位置：
				<span @click='()=>{this.$router.push({path:"/"})}'>主页</span>|
				<span>{{this.class}}</span>
			</div>
		</div>
		<div class="news_nav">
			<ul class="left_list">
				<li v-for='data in articlesClass' @click='cutPage(data.name)'>{{data.name}}</li>
			</ul>
		</div>
		<div class="news">
			<com-news :news='this.news' :pageNum='this.pageNum'></com-news>
		</div>
		<div style="width:100%;">
			<el-pagination
			  style='display:flex;justify-content:center;margin-top:60px;'
			  background
			  layout="prev, pager, next"
			  :total="pageNum"
			  :hide-on-single-page='true'
			  @current-change='current'>
			</el-pagination>
		</div>
	</div>
</template>
<script>
import news from '../mod/News.vue'
export default {
	components:{
		'com-news':news
	},
	data(){
		return{
			news:[],
			pageNum:0,
			articlesClass:[],
			class:'市场快讯'
		}
	},
	methods:{
		initialize() {
			this.axios.all([
				this.axios.post(this.api+'/articles/searchArticles',{params:{class:this.class,first:1,num:12}}),
				this.axios.post(this.api+'/articles/searchArticles',{params:{class:this.class,first:1,num:9e9}})
			])
			.then(res => {
				this.news = res[0].data.msg
				this.pageNum = (res[1].data.msg.length)-(res[1].data.msg.length)%10
			})
		},
		cutPage(className){
			this.class = className
			this.initialize()
		},
		current(page) {
			let first = page == 1?1:(page-1)*12
			this.axios.post(this.api+'/articles/searchArticles',{params:{class:this.class,first:first,num:12}})
		 	.then(res => {
		 		this.news = res.data.msg
			 })
		}
	},
	created(){
		if(this.$route.params.class != undefined) {
			this.class = this.$route.params.class
		}
		this.axios.post(this.api+'/articles/searchArticlesClass')
		.then(res => {
			this.articlesClass = res.data.msg
		})
		this.initialize()
	}
}
</script>
<style scoped>
	p{
		font-family: system-ui;
	}
	.wrap{
		min-height:calc(100vh - 194px);
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin:0 auto;
	}
	.top{
		width:100%;
		margin-top: 30px;
	}
	.top p:nth-child(1){
		font-size: 30px;
		color: #333;
		font-weight: bold;
	}
	.top p:nth-child(2){
		margin: 4px 0;
		font-size: 16px;
		font-weight: bold;
		color:rgb(0,154,85);
	}
	.top div{
		font-size: 14px;
		color: #666;
	}
	.top div>i{
		color:rgb(0,154,85);
	}
	.top div>span{
		margin: 0 8px;
	}
	.top div>span:nth-child(2) {
		cursor: pointer;
	}
	.top div>span:nth-child(2):hover{
		color: #444;
	}
	.news_nav{
		width:20%;
	}
	.left_list{
		width: 70%;
		margin-top: 30px;
		list-style-type: none;
		border-radius: 5px;
		overflow: hidden;
	}
	.left_list li{
		height: 80px;
		background: #eee;
		border-bottom: 2px solid #ddd;
		text-align: center;
		line-height: 80px;
		font-size: 15px;
		cursor: pointer;
		transition: .6s;
	}
	.left_list li:hover{
		background: #bbb;
		color: #fff;
	}
	.news{
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		width:80%;
		margin-top:30px;
	}
	
</style>