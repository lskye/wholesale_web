<template>
	<div class="wrap">
		<div class="new" v-for='data in news'>
			<div class="show_img">
				<div class="time_cord">
					<p>{{data.time.substr(8,2)}}</p>
					<p>{{data.time.substr(0,7)}}</p>
				</div>
				<img :src="data.top_img" v-if='data.top_img'>
				<div v-else class="img_err">
					<i class='el-icon-picture-outline'></i>
				</div>
			</div>
			<div class="text" @click='openArticle(data.id)'>
				<p class="title">{{data.title}}</p>
				<p class="content">{{data.content.replace(/<\/?[^>]*>/g,"")}}</p>
			</div>				
		</div>
	</div>
</template>

<script>
export default{
	props:{
		news:Array,
		pageNum:Number,
	},
	data(){
		return{
			
		}
	},
	methods:{
		openArticle(id){
			//在新窗口打开页面
			let rou = this.$router.resolve({name:'articlePage',params:{id:id}})
			window.open(rou.href,'_blank')
		}
	}
}
</script>

<style scoped>
.new{
	width:300px;
	height: 320px;
	border:1px solid #ccc;
	margin: 0 0 20px;
	border-radius: 5px;
	overflow: hidden;
	transition: .4s
}
.new:hover{
	box-shadow: 2px 2px 10px #ccc;
}
.new .show_img{
	width:100%;
	height: 60%;
}
.new .show_img img{
	width: 100%;
	height: 100%;
}
.new .show_img .img_err{
	display: flex;
	align-items: center;
	background: #ddd;
	width:100%;
	height: 100%;
}
.new .show_img .img_err i{
	margin: 0 auto;
}
.time_cord{
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	position: absolute;
	margin-top:142px;
	width:70px;
	height: 50px;
	background: rgb(138,174,54);
	border-radius: 0 10px 0 0;
	z-index:999;
}
.time_cord p:nth-child(1){
	color:#fff;
	font-size: 16px;
	margin: 5px 10px 0;
}
.time_cord p:nth-child(2){
	color:#fff;
	font-size: 12px;
	margin-bottom:5px; 
}
.new .text{
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	width:80%;
	margin:0 auto;
	font-family: '微软雅黑';
	cursor: pointer;
}
.new .text .title{
	width:100%;
	font-size: 16px;
	font-weight: bold;
	color:#000;
	margin: 10px 0;
	overflow:hidden; 
	text-overflow:ellipsis;
	display:-webkit-box; 
	-webkit-box-orient:vertical;
    -webkit-line-clamp:1; 
}
.new .text .content{
	font-size: 11px;
	color:#777;
	line-height:24px;
	margin-bottom: 10px;
	overflow:hidden; 
	text-overflow:ellipsis;
	display:-webkit-box; 
	-webkit-box-orient:vertical;
    -webkit-line-clamp:3; 
}
.new .text .content:hover{
	color: #555
}
</style>