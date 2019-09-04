<template>
	<div class="smallCordMain">
	    <el-carousel :interval="5000" arrow="never" class='carousel' height='100%'>
	      <el-carousel-item v-for="(item,index) in getTopImg(data)" :key="index">
	        <el-image 
	        	:src="item.url" 
	        	fit="fill" 
	        	style='width:100%;height:100%;cursor:pointer' 
	        	@click='openArticle(item.id)'>
	        </el-image>
	      </el-carousel-item>
	    </el-carousel>
	    <div class="smallCordRight">
	      <div class="smallCordRightTop">
	        <p class="title" @click='openArticle(data[0].id)'>{{data[0].title}}</p>
	        <p class="content"  @click='openArticle(data[0].id)'>
	        	{{data[0].content.replace(/<\/?[^>]*>/g,"")}}
	        </p>
	      </div>
	      <div class="decollator"></div>
	      <p v-for="(item,index) in data.slice(1,6)" :key='index'  @click='openArticle(item.id)'>{{item.title}}</p>
	    </div>
	</div>
</template>

<script>
export default{
	props:['data'],
	data(){
		return{}
	},
	methods:{
		getTopImg(arr) {
	      let imgArr = []
	      for(let i = 0;i<arr.length;i++) {
	        if(arr[i].top_img != null) {
	          imgArr.push({url:arr[i].top_img,id:arr[i].id})
	        }
	        if(imgArr.length==3) {
	          return imgArr
	        }
	      }
	      return imgArr
	    },
	    openArticle(id){
	    	console.log(id)
	    	let rou = this.$router.resolve({name:'articlePage',params:{id:id}})
			window.open(rou.href,'_blank')
	    }
	}
}
</script>

<style scoped>
.smallCordMain {
  display: flex;
  justify-content: space-between;
  height: 230px;
  margin-top: 40px;
}
.smallCordMain .carousel{
  width: 44%;
  height: 100%;
}
.smallCordRight {
  width: 44%;
  height: 100%;
  margin-right: 30px;
}
.smallCordRight p{
  font-size: 13px;
  color:#555;
  padding-bottom:3px;
  line-height: 22px;
  overflow:hidden; 
  text-overflow:ellipsis;
  display:-webkit-box; 
  -webkit-box-orient:vertical;
  -webkit-line-clamp:1; 
  cursor: pointer;
}
.smallCordRight p:hover{
  color: #333;
}
.smallCordRightTop .title {
  font-size: 14px;
  font-weight:bold;
  color:#555;
  padding:0;
}
.smallCordRightTop .content {
  margin-top: 8px;
  font-size: 12px;
  color: #777;
  line-height: 20px;
  padding:0;
  overflow:hidden; 
  text-overflow:ellipsis;
  display:-webkit-box; 
  -webkit-box-orient:vertical;
  -webkit-line-clamp:2; 
}
.decollator {
  width: 100%;
  height: 1px;
  background-color:#ddd;
  margin:20px 0;
}	
</style>