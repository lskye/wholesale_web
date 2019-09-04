<template>
	<div class="wrap">
		<img src="../../public/image/index/IMG_0087.jpg" style='width:100%;height:200px;' >
		<div style="width:90%;margin:0 auto">
			<div class="top">
				<p>关于我们</p>
				<p>ABOUT US</p>
				<div>
					<i class="el-icon-caret-right"></i>
					当前位置：
					<span @click='()=>{this.$router.push({path:"/"})}'>主页</span>|
					<span>{{this.class}}</span>
				</div>
			</div>
			<div class='main'>
				<div class="left">
					<ul class="left_list">
						<li v-for='data in articlesClass' @click='cutPage(data)'>{{data}}</li>
					</ul>
				</div>
				<div class="about" v-if='this.class=="关于我们"'>
					{{about.profile}}
					<!--这里不添加map组件会导致contact类中map组件不显示,故添加并隐藏  -->
					<div id="container" style="display:none"></div> 
				</div>
				<div class="contact" v-else>
					<div>
						<p class="name">{{about.name}}</p>
						<p class="size">{{about.site}}</p>
						<p class="phone">Phone: {{about.phone}}</p>
						<p class="email">email: {{about.email}}</p>
					</div>
					<div id="container"></div> 
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data(){
		return{
			about:[],
			articlesClass:['关于我们','联系我们'],
			class:'关于我们'
		}
	},
	methods:{
		initialize() {
			this.axios.post(this.api+'/enterprise/search')
		 	.then(res => {
		 		this.about = res.data.msg[0]
			})
		},
		cutPage(className){
			this.class = className
			this.initialize()
		},
		getmap(){
			let mapObj = new AMap.Map('container', {//'map-location'是对应页面盒子的id
		        resizeEnable: true, //自适应大小
		        zoom: 12//初始视窗
    		});
    		const marker = new AMap.Marker({
			    position: new AMap.LngLat(120.107373,36.015555),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
			    title: '黄河路批发市场'
			});
			mapObj.add(marker);
			let geolocation=null
			mapObj.plugin('AMap.Geolocation', function() {
				geolocation = new AMap.Geolocation({
			        timeout: 10000,
			        GeoLocationFirst: false,
			        maximumAge: 0 //定位结果缓存0毫秒，默认：0
			    });
			    mapObj.addControl(geolocation)
			    geolocation.getCurrentPosition()
			})
			AMap.event.addListener(geolocation, 'complete', function(data) {
		        data.position.getLng() //定位成功返回的经度
		        data.position.getLat() //定位成功返回的纬度
		       // console.log(data)
		    }); //返回定位信息
		    AMap.event.addListener(geolocation, 'error', function(data) {
		        if (data.info == 'FAILED') {
		            alert('获取您当前位置失败！')
		        }
		    });
		}
	},
	created(){
		this.initialize()
	},
	mounted(){
		this.getmap()
	}
}
</script>
<style scoped>
	p{
		font-family: system-ui;
	}
	.wrap{
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
	.main{
		display: flex;
		justify-content:space-between;
	}
	.left{
		width:20%;
		margin-top: 30px;
	}
	.left_list{
		width: 70%;
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
	.about{
		width:80%;
		margin-top:30px;
		color:#555;
		font-size: 15px;
		line-height: 26px;
	}
	.contact{
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		width:80%;
		margin-top:30px;
		color:#555;
		font-size: 15px;
		line-height: 26px;
	}
	.contact p{
		margin:0 auto;
		text-align: center;
		line-height: 30px;
		font-size: 13px;
	}
	.contact .name{
		margin-bottom:20px;
		font-size: 20px;
		font-family: '等线';
		font-weight: bold;
	}
	#container {
		width:100%; 
		height:400px; 
		margin-top: 60px;
	}  
</style>