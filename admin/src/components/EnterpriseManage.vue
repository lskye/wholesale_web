<template>
	<div class="wrap">
		<el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="展示图片">
        <el-upload
          class="avatar-uploader"
          :action="this.api+'/upload'"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          >
          <img v-if="newUrl" :src="newUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
		  <el-form-item label="企业名称">
		    <el-input v-model="form.name"></el-input>
		  </el-form-item>
		  <el-form-item label="企业电话">
		    <el-input v-model="form.phone"></el-input>
		  </el-form-item>
		  <el-form-item label="企业地址">
		    <el-input v-model="form.site"></el-input>
		  </el-form-item>
		  <el-form-item label="企业邮箱">
		    <el-input v-model="form.email"></el-input>
		  </el-form-item>
		  <el-form-item label="企业介绍">
		    <el-input type="textarea" v-model="form.profile"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="onSubmit">保存</el-button>
		  </el-form-item>
		</el-form>
	</div>
</template>

<script>
import Public from '../public.vue'
  export default {
    data() {
      return {
        p:Public.methods,
        newUrl: null,
        oldUrl:null,
        form: {
          name: '',
          phone:'',
          site:'',
          email:'',
          profile:''
        }
      }
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.newUrl = res.url
        if(this.newUrl != null) {
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
      onSubmit() {
        this.p.sure(this,'保存',() => {
          this.axios.post(this.api+'/enterprise/manage',{
            params:{
              name:this.form.name,
              phone:this.form.phone,
              site:this.form.site,
              email:this.form.email,
              profile:this.form.profile,
              img:this.newUrl
            }
          })
          .then(req => {
            this.form = req.data.msg[0]
          })
          .catch(err => {})
        })
      }
    },
    created() {
    	this.axios.post(this.api+'/enterprise/search')
    	.then(req => {
    		this.form = req.data.msg[0]
        this.newUrl = this.form.image
    	})
    	.catch(err => {})
    }
  }
</script>

<style scoped>
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
</style>