<template>
	<div class='wrap'>
		<div class="main">
			<ul>
				<li v-for='(data,index) in navList' :key='index' class='nav' @click="routingHop(data.path)">{{data.name}}</li>
				<li class="nav" @click="()=>{this.$router.push({path:'/admin/'})}">登陆</li>
			</ul>
			<div class="decollator"></div>
			<div class="copyright">
				<p>Copyright  © 2019-2029 qdhuanghelu.com</p>
				<p>地址/Add 青岛黄河西路299号黄河路农产品批发市场</p>
				<p>联系电话 0532-86107777</p> 
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data() {
			return{
				navList:[
					{path:'/',name:'首页'},
					{path:'/newsPress',name:'市场快讯'},
					{path:'/productPrice',name:'价格行情'},
					{path:'/detection',name:'食品检测'},
					{path:'/about',name:"关于我们"}
				]
			}
		},
		methods:{
			routingHop(r) {
				this.$router.push({path:r})
			}
		}	
	}
</script>

<style scoped>
	.wrap{
		float: left;
		width:100%;
		height:100px;
		margin-top: 20px;
		background: rgb(0,153,67);
	}
	.main{
		display: flex;
		align-items: center;
		flex-wrap:wrap;
		width:90%;
		margin:0 auto;
	}
	.main ul {
		width:100%;
		margin:20px 0;
		clear:both;
	}
	.nav{
		float:left;
		list-style-type: none;
		font-size: 12px;
		color: #fff;
		margin-left: 30px;
		cursor:pointer;
	}
	.nav:hover{
		color: #ddd;
	}
	.decollator{
		display: block;
		clear:both;
		width:100%;
		height: 1px;
		background: rgb(153,155,56);
	}
	.copyright {
		display: flex;
		margin-top: 20px;
		color: #fff;
		font-size: 10px;
	}
	.copyright p{
		margin-left: 30px;
	}
</style>