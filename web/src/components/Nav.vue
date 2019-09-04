<template>
	<div class="wrap">
		<div class="nav">
			<img src="../../public/image/index/logo.png" class='logo'>
			<ul class='navList'>
				<router-link v-for='(data,index) in navList' :key = 'index' :to='data.path' exact>{{data.name}}</router-link>
			</ul>
		</div>
	</div>
</template>

<script>
export default{
	data(){
		return{
			navList:[
				{path:'/',name:'首页'},
				{path:'/newsPress',name:'市场快讯'},
				{path:'/productPrice',name:'价格行情'},
				{path:'/detection',name:'食品检测'},
				{path:'/about',name:"关于我们"}
			],
			now:0
		}
	},
	methods:{
		routingHop(r,id) {
			this.$router.push({path:r})
			this.now = id
		}
	}	
}
</script>

<style scoped>
*{
	padding: 0;
	margin:0;
}
a{
	color:#000;
}
.wrap {
	width: 100%;
	min-width:960px;
	margin-bottom: 20px;
}
.nav{
	width: 100%;
	height: 42px;
	background-color: #fff;
	padding-top: 6px;
	border-top: 6px solid #019946;
}
.logo{
	float: left;
	width: 42px;
	height: 42px;
	margin-left: 30px;
}
.navList{
	height: 100%;
	color: #000;
	list-style-type: none;
	display: flex;
	justify-content: flex-end;
	align-items: center;
}

.navList a{
	margin: 0 3%;
	text-decoration: none;
	cursor: pointer;
}

.navList a:hover{
	color:#019946;
}

.router-link-active{
	color:#019946;
}
</style>