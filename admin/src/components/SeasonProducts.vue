<template>
	<div class="wrap">
		<div class="upload">
			<el-upload
				class="avatar-uploader"
				:action="this.api+'/upload'"
				:show-file-list="false"
			    :on-success="handleAvatarSuccess">
				<img v-if="newUrl" :src="newUrl" class="avatar">
				<i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
	        <div class="input">
	        	标题：
	        	<el-input v-model="title"></el-input>
	        	内容：
		        <el-input type="textarea" v-model="content"></el-input>
		        <el-button type="primary" @click="onSubmit">保存</el-button>
	        </div>
		</div>
		<el-table :data="seasonProduct" style="width: 100%"  ref="multipleTable">
			<el-table-column label="展示图片">
		      <template slot-scope="scope">	      	
		        <img :src='scope.row.image' style='height:3rem'>
		      </template>
		    </el-table-column>
		    <el-table-column label="标题">
		      <template slot-scope="scope">
		        <i class="el-icon-icon"></i>
		        <span style="margin-left: 10px">{{ scope.row.title }}</span>
		      </template>
		    </el-table-column>
		     <el-table-column label="内容">
		      <template slot-scope="scope">
		        <i class="el-icon-icon"></i>
		        <span style="margin-left: 10px">{{ scope.row.content }}</span>
		      </template>
		    </el-table-column>
		    <el-table-column label="操作">
		      <template slot-scope="scope">
		        <el-button type="danger" size='small' @click='deleteSeason(scope.row)'>删除</el-button>
		      </template>
		    </el-table-column>
		</el-table>
      </div>
	</div>
</template>

<script>
import Public from '../public.vue'
  export default {
    data() {
      return {
      	p:Public.methods,
      	seasonProduct:[],
	    newUrl:null,
	    oldUrl:null,
        title:'',
        content:'',
      }
    },
    methods: {
      handleAvatarSuccess(res, file) {
      	this.newUrl = res.url;
        if(this.newUrl != null) {
        	this.axios.post(this.api+'/deleteImg',{
	          params:{
	            oldImageUrl:this.oldUrl
	          }
	        })
	        .then(res => {
	        	this.oldUrl = this.newUrl.substr(30);
	        })
	        .catch(err => {console.log(err)})
        }
      },
      getSeasonProduct() {
      	this.axios.post(this.api+'/product/searchSeason')
      	.then(res => {
      		this.seasonProduct = res.data.msg
      	})
      	.catch(err => {

      	})
      },
      onSubmit() {
      	this.axios.post(this.api+'/product/addSeason',{
      		params:{
      			image:this.newUrl,
      			title:this.title,
      			content:this.content
      		}
      	})
      	.then(res => {
      		this.oldUrl = null
      		this.getSeasonProduct()
      		that.$message({
                type: 'success',
                message: '保存成功!'
            });
      	})
      	.catch(err => {

      	})
      },
      deleteSeason(item) {
      	this.p.sure(this,'删除当前产品',() => {
      		let filename = item.image.substr(30)	//截取图片url,对应服务端uploads图片名称
      		console.log(filename)
	      	this.axios.post(this.api+'/product/deleteSeason',{
	      		params:{
	      			name:filename,
	      			id:item.id
	      		}
	      	})
	      	.then(res => {
	      		this.getSeasonProduct()
	      	})
	      	.catch(err => {})
      	})
      	
      }
    },
    created(){
    	this.getSeasonProduct()
    }
  }
</script>

<style>
.upload {
	display: flex;
	justify-content: space-between;
}
.avatar-uploader {
	display: inline-block;
}
.avatar-uploader .el-upload {
	border: 1px dashed #d9d9d9;
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
}
.avatar-uploader .el-upload:hover {
	border-color: #409EFF;
}
.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 178px;
	height: 178px;
	line-height: 178px;
	text-align: center;
}
.avatar {
	width: 178px;
	height: 178px;
	display: block;
}
.input{
	width: 70%;
}
.input button{
	margin-top: 6px;
}
</style>