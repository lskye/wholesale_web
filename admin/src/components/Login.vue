<template>
	<div class="wrap">
		<el-card class='login'>
			<span>用户名</span>
			<el-input v-model='form.user'></el-input>
			<span>密码</span>
			<el-input type='password' v-model='form.password'></el-input>
			<el-button type='primary' class='log' @click='log'>登陆</el-button>		
		</el-card>
	</div>
</template>

<script>
export default{
	data(){
		return{
			form:{
				user:'',
				password:''
			}
		}
	},
	methods:{
		log() {
			if(this.form.user == null || this.form.password == null) {
				alert('账号或密码不允许为空')
				return
			}
			this.axios.post(this.api+'/user/login',{
				params:{
					user:this.form.user,
					pass:window.btoa(this.form.password)
				}
			})
			.then(res => {
				if(res.data.code == 1) {
					this.$router.push({path:'/user/creat'})
					this.$notify({
			          title: '登陆成功',
			          type: 'success',
			          duration:2000
			        });
				}else {
					this.$notify({
						title:'登陆失败,'+res.data.msg,
						type:'error'
					})
				}
			})
			.catch(err => {
				console.log(err)
			})
		}
	}
}
</script>

<style scoped>
	.login{
		width: 25vw;
		margin:10vw auto;
	}
	.login span{
		display: block;
		margin:10px 0;
	}
	.log{
		margin-top:10px;
	}
	.log span{
		margin:0;
	}
</style>