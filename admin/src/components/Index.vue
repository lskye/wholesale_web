<template>
<el-container style="height: 100vh;">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['3','4']">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>账户管理</template>
        <el-menu-item-group>
          <el-menu-item index='userCreat' @click ='userCreat'>创建账户</el-menu-item>
          <el-menu-item index="userManage" @click = 'userManage'>管理账户</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index='2'>
        <template slot="title"><i class="el-icon-message"></i>基础信息管理</template>
         <el-menu-item-group>
          <el-menu-item index='enterpriseManage' @click ='enterpriseManage'>企业信息管理</el-menu-item>
          <el-menu-item index='productClassManage' @click ='productClassManage'>产品类别管理</el-menu-item>
          <el-menu-item index="productManage" @click = 'productManage'>产品信息管理</el-menu-item>
          <el-menu-item index='ArticlesClassManage' @click ='articlesClassManage'>文章分类管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index='3'>
        <template slot="title"><i class="el-icon-message"></i>信息发布</template>
         <el-menu-item-group>
          <el-menu-item index='seasonProducts' @click='seasonProducts'>时令产品发布</el-menu-item>
          <el-menu-item index='articlesCreate' @click='articlesCreate'>新建文章</el-menu-item>
          <el-menu-item index='productPrice' @click='productPrice'>价格行情发布</el-menu-item>
          <el-menu-item index="pesticideDetection" @click='pesticideDetection'>农残检测信息发布</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index='4'>
        <template slot="title"><i class="el-icon-message"></i>信息管理</template>
         <el-menu-item-group>
          <el-menu-item index='HomeImgManage' @click='homeImgManage'>首页展示图片管理</el-menu-item>
          <el-menu-item index='ArticlesManage' @click='articlesManage'>文章管理</el-menu-item>
          <el-menu-item index='ProductPriceManage' @click='productPriceManage'>价格行情管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <span>王小虎</span>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>
<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>

<script>
  export default {
    data() {
      return {
       
      }
    },
    methods:{
      userCreat(){
        this.$router.push({path:'/user/creat'})
      },
      userManage() {
        this.$router.push({path:'/user/Manage'})
      },

      enterpriseManage() {
        this.$router.push({path:'/enterprise/manage'})
      },
      homeImgManage() {
        this.$router.push({path:'/home/imgManage'})
      },

      productClassManage() {
        this.$router.push({path:'/product/classCreate'})
      },
      productManage() {
        this.$router.push({path:'/product/manage'})
      },
      pesticideDetection() {
        this.$router.push({path:'/pesticideDetection/create'})
      },
      productPrice() {
        this.$router.push({path:'/productPrice/create'})
      },  
      productPriceManage() {
        this.$router.push({path:'/productPrice/manage'})
      },
      seasonProducts() {
        this.$router.push({path:'/product/seasonProducts'})
      },

      articlesClassManage() {
        this.$router.push({path:'/articles/classMamage'})
      },
      articlesManage() {
        this.$router.push({path:'/articles/manage'})
      },
      articlesCreate() {
        this.$router.push({path:'/articles/create'})
      },
    }
  }
</script>