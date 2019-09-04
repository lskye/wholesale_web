<template>
  <div class="wrap">
    <el-carousel height='400px'>
      <el-carousel-item v-for="(item,index) in CarouselList" :key="index">
        <img :src="item.image" height="400px" width="100%">
      </el-carousel-item>
    </el-carousel>
    <div class="body">
      <div class="enterprise">
        <div class="cordTop">
          <span class='bigText'>COMPANY</span>
          <span class="bigText">PROFILE</span>
          <span style="margin:0 10px">/</span>
          <span>企业简介</span>
          <span class="more" @click="() =>{this.$router.push({path:'/about'})}">MORE</span>
        </div>
        <div class="main">
           <img :src='enterprise.image' class='enterpriseImg'>
          <div class="text">
            <p class="title">{{enterprise.name}}</p>
            <p class="cont">{{enterprise.profile}}</p>
          </div>
        </div>
      </div>
      <div class="product">
        <div class="cordTop">
          <span class='bigText'>SEASON</span>
          <span class="bigText">PRODUCTS</span>
          <span style="margin:0 10px">/</span>
          <span>时令产品</span>
        </div>
        <div class="season" v-for='data in products'>
          <div>
            <img :src='data.image' class='productImg'></img>
            <p class="title">{{data.title}}</p>
            <p class="cont">{{data.content}}</p>
          </div>
        </div>
      </div>
      <div class="smallCordWrap">
        <div class="smallCord">
          <div class="smallCordTop">
            <span>饮食日常</span>
            <span class="more" @click="routingHop('饮食日常')">MORE</span>
            <span class='bigText'>DIETARY KNOWLEDGE</span>
          </div>
          <com-small-cord :data='this.dietryKnowledge'></com-small-cord>
        </div>
        <div class="smallCord">
          <div class="smallCordTop">
            <span>新闻资讯</span>
            <span class="more" @click="routingHop('新闻资讯')">MORE</span>
            <span class='bigText'>NEWS INFORMATION</span>
          </div>
          <com-small-cord :data='this.newsInformation'></com-small-cord>
        </div>
      </div>
     <div class="phone">
       <div>
          <p>联系电话</p>
          <p>CONTACT PHONE</p>
       </div>
       <p>0532-86107777</p>
     </div>
    </div>
  </div>
</template>

<script>
import smallCord from '../mod/IndexSmallCord.vue'
export default {
  components:{
    'com-small-cord':smallCord
  },
  data() {
    return{
      CarouselList:[],
      enterprise:{},
      products:[],
      dietryKnowledge:[{class:'',id:'',top_img:'',title:'',content:'',}],
      newsInformation:[{class:'',id:'',top_img:'',title:'',content:'',}],
    }
  },
  methods:{
    routingHop(Class){
      this.$router.push({name:'newsPress',params:{class:Class}})
    }
  },
  created() {
    this.axios.all([
      this.axios.post(this.api+'/enterprise/getHomeImg'),
      this.axios.post(this.api+'/enterprise/search'),
      this.axios.post(this.api+'/product/searchSeason'),
      this.axios.post(this.api+'/articles/searchArticles',{params:{class:'饮食日常',first:1,num:6}}),
      this.axios.post(this.api+'/articles/searchArticles',{params:{class:'新闻资讯',first:1,num:6}})
    ])
    .then(res => {
        this.CarouselList = res[0].data.msg
        this.enterprise = res[1].data.msg[0]
        this.products = res[2].data.msg.slice(0,8)
        this.dietryKnowledge = res[3].data.msg
        this.newsInformation = res[4].data.msg
    })
    .catch(err => {

    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrap{
  width: 100%;
  min-width:960px;
}
.el-carousel__item{
  width:100%;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.body{
  width:90%;
  margin:0 auto;
}
.cordTop{
  width: 100%;
  color:#555;
  font-weight: 600;
  margin-bottom: 20px;
}
.cordTop .bigText{
  color: #019946;
  font-size: 18px;
  font-weight: 600;
}
.cordTop .bigText:nth-child(1) {
  display: block;
}
.more {
  font-weight: 100;
  font-size: 14px;
  border-bottom:1px solid #555;
  padding-bottom: 2px;
  float: right;
  cursor: pointer
}
.enterprise {
  width: 100%;
  margin-top: 30px;
}
.main{
  display: flex;
  justify-content: space-between;
  height: 270px;
}
.enterpriseImg {
  width: 40%;
  height: 100%;
}
.main .text{
  width: 60%;
  position: relative;
  border:40px solid #fff;
  border-top: none;
  border-bottom: none;
  box-sizing: border-box;
}
.main .title{
  color: #019946;
  font-size: 20px;
  margin-bottom: 10px;
}
.main .cont{
  color:#333;
  line-height: 24px;
  font-size: 15px;
  overflow:hidden; 
  text-overflow:ellipsis;
  display:-webkit-box; 
  -webkit-box-orient:vertical;
  -webkit-line-clamp:10; 
}
.product {
  width: 100%;
  display: flex;
  flex-wrap:wrap;
  justify-content: space-between;
  margin-top: 20px;
}
.product .season {
  overflow: hidden;
  width: 24%;
  height: 395px;
  background: #eee;
  margin-bottom: 20px;
  border-radius: 5px;
  transition: .6s;
  cursor: pointer;
}
.product .season:hover{
  box-shadow: 2px 2px 10px #888;
}
.product .season::after:hover{
  opacity: 1;
}
.product .season div{
  height: 100%;
}
.product .season .productImg {
  width: 100%;
  height: 70%;
}
.product .season p{
  border: 10px solid #eee;
  border-top: none;
  border-bottom: none;
  box-sizing: border-box;
}
.product .season .title {
  color:#444;
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
}
.product .season .cont {
  font-size: 10px;
  color: #aaa;
  line-height: 18px;
  overflow:hidden; 
  text-overflow:ellipsis;
  display:-webkit-box; 
  -webkit-box-orient:vertical;
  -webkit-line-clamp:2; 
}
.smallCordWrap {
  display: flex;
  justify-content: space-between;
}
.smallCord{
  width: 47%;
  margin-top: 20px;
}
.smallCord .smallCordTop {
  width: 100%;
}
.smallCord .smallCordTop span:nth-child(1) {
  color:#444;
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
}
.smallCord .smallCordTop span:nth-child(3) {
  display: block;
  font-size: 12px;
  color:#aaa;
  margin-top: 2px;
}
/*.smallCordMain {
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
}*/
.phone{
  display: flex;
  align-items: center;
  margin-top: 20px;
}
.phone div{
  float:left;
  color:#444;
  font-size: 16px;
  font-weight: bold;
}
.phone div p:nth-child(2) {
  font-size: 10px;
  color: #aaa;
  font-weight:100;
  margin-top: 2px;
}
.phone>p {
  float: left;
  margin-left: 10%;
  font-size: 24px;
  font-weight: bold;
  color: #444
}
</style>
