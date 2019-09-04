<template>
	<div class="wrap">
		<h3>{{this.$route.params.title==undefined?'新建':'编辑'}}文章</h3>
		<div class="mainWrap">
			<span>所属分类</span>
			<el-select v-model="value" clearable placeholder="请选择">
			    <el-option
			      v-for="item in articlesClass"
			      :key="item.name"
			      :label="item.name"
			      :value="item.name">
			    </el-option>
  			</el-select>
  			<div class="titlebox">
  				<span>标题</span>
  				<el-input v-model='title' class='title'>{{title}}</el-input>
  			</div>
  			<span style="display:block; margin-bottom:6px;">首页展示图片</span>
  			<el-upload
				class="avatar-uploader"
				:action="this.api+'/upload'"
				:show-file-list="false"
			   :on-success="handleAvatarSuccess">
				<img v-if="newUrl" :src="newUrl" class="avatar">
				<i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
  			<div class="titlebox">
  				<span>文章</span>
  				<vue-editor v-model="content" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
  			</div>
  			<el-button type="primary" @click='save' v-if='!this.$route.params.title'>保存</el-button>
  			<el-button type="primary" @click='update' v-else='!this.$route.params.title'>修改</el-button>
		</div>
	</div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import Public from '../public.vue'
export default {
	components: {
    	VueEditor
  	},
  	props: ['name'],
	data() {
	  return {
	  	p:Public.methods,
	  	title:null,
	    articlesClass:[],
	    value: null,
	    content:null,
	    newUrl:null,
	    oldUrl:null,
	  }
	},
	methods:{
		handleAvatarSuccess(res, file) {
			this.newUrl = res.url;
			if(this.newUrl != null){
				this.axios.post(this.api+'/deleteImg',{
		          params:{
		            oldImageUrl:this.oldUrl
		          }
		        })
		        .then(res => {
		        	this.oldUrl = this.newUrl.substr(30)
		        })
			}
      	},
		handleImageAdded (file, Editor, cursorLocation, resetUploader) {	//图片上传
	        var formData = new FormData();
	        formData.append("file", file);
	 
		    this.axios({
		        url: this.api+'/upload',
		        method: "POST",
		        data: formData
		    })
	        .then(result => {
	          let url = result.data.url; // Get url from response
	          Editor.insertEmbed(cursorLocation, "image", url);
	          resetUploader();
	        })
	        .catch(err => {
	          console.log(err);
	        });
	    },
		save() {
			this.axios.post(this.api+'/articles/addArticles',{
				params:{
					class:this.value,
					title:this.title,
					content:this.content,
					topImg:this.newUrl,
					time:this.p.formateTime(new Date(),false)
				}
			})
			.then(res => {
				if(res.data.code) {
					this.$message({
			          message: '保存成功',
			          type: 'success'
			        });
				} else {
					this.$message.error('保存失败')
				}
			})
			.catch(err => {
				console.log(err)
			})
		},
		update() {		
			this.axios.post(this.api+'/articles/updateArticles',{
				params:{
					id:this.$route.params.id,
					class:this.value,
					title:this.title,
					content:this.content,
					topImg:this.newUrl,
					time:this.p.formateTime(new Date(),false)
				}
			})
			.then(res => {
				this.$router.push({path:'/articles/manage'})
			})
			.catch(err => {})
		}
	},
	created() {
		this.axios.post(this.api+'/articles/searchArticlesClass')
		.then(res => {
			this.articlesClass = res.data.msg
		})
		.catch(err => {
			console.log(err)
		})
	},
	mounted() {
		if(this.$route.params) {
			const data = this.$route.params
			this.value = data.class
			this.title = data.title
			this.content = data.content
			this.newUrl = data.topImg
		}
	}
}
</script>

<style scoped>
	.mainWrap{
		margin:20px 0 0 40px;
	}
	.mainWrap span{
		font-size: 16px;
		color:#777;
		margin-right: 8px;
	}
	.mainWrap .titlebox{
		margin: 10px 0 20px;
	}
	.mainWrap .titlebox .title {
		width: 70%;
	}
</style>