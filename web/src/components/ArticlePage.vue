<template>
	<div class="wrap">
		<div class="head">
			<p class="title">{{msg.title}}</p>
			<span class="time">发布日期：{{msg.time}}</span>
		</div>
		<div class="main" v-html='msg.content'>
		</div>
	</div>
</template>

<script>
export default {
	data(){
		return{
			msg:{}
		}
	},
	created(){
		this.axios.post(this.api+'/articles/searchArticles',{params:{
			id:this.$route.params.id
		}})
		.then(res => {
			this.msg = res.data.msg[0]
		})
	},
	updated(){	//设置图片尺寸
		let img = document.querySelectorAll(".main img")
		for (let i = 0; i < img.length; i++) {
		    const element = img[i];
		    console.log(element)
		    element.style.maxWidth = "100%"
		}
	}
}
</script>

<style scoped>
	.wrap{
		width:80%;
		min-height:calc(100vh - 194px);
		margin: 0 auto;
	}
	.head{
		padding: 20px;
		border:2px solid #eee;
	}
	.head .title{
		font-size:24px;
		font-weight: bold;
		color:#333;
	}
	.head .time {
		display: inline-block;
		font-size:14px;
		color :#888;
		margin-top: 10px; 
	}
	.main{
		width: 100%;
		height:100%;
		margin-top: 20px;
		color: #333;
		font-size:15px;
		line-height: 24px;
	}
</style>
