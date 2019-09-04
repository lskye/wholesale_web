<template>
	<div class="wrap">
		<el-upload
		  :action="this.api+'/upload'"
		  list-type="picture-card"
		  :on-preview="handlePictureCardPreview"
		  :on-remove="handleRemove"
		  :on-success='handleSuccess'
		  :file-list='imgs'
		  >
		  <i class="el-icon-plus"></i>
		</el-upload>
		<el-dialog :visible.sync="dialogVisible">
		  <img width="100%" :src="dialogImageUrl" alt="">
		</el-dialog>
	</div>
</template>

<script>
  export default {
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        imgs:[]
      };
    },
    methods: {
      handleRemove(file) {
      	let filename = file.response?file.response.url.substr(30):file.url.substr(30)
      	let imgurl = file.response?file.response.url:file.url

        this.axios.post(this.api+'/enterprise/deleteImg',{
      		params:{
      			img:imgurl,
      			filename:filename
      		}
      	})
      	.then(req => {
      		if(req.data.code != 1) {
      			this.$message.error('删除失败');
      		}
      	})
      	.catch(err => {})
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleSuccess(id,file) {
      	this.axios.post(this.api+'/enterprise/loadImg',{
      		params:{
      			img:file.response.url
      		}
      	})
      	.then(req => {
      		if(req.data.code) {
      			this.$message({
		          message: '保存成功',
		          type: 'success'
		        });
      		} else {
      			this.$message.error('失败');
      		}
      	})
      	.catch(err => {})
      }
    },
    created() {
    	this.axios.post(this.api+'/enterprise/getHomeImg')
    	.then(res => {
    		for(let i = 0; i<res.data.msg.length; i++) {
    			this.imgs.push({url:res.data.msg[i].image})
    		}
    	})
    	.catch(res => {})
    }
  }
</script>