<template>
	<div id="createUser">
		<div class='wrap'>
			<el-input class='user' placeholder="请输入账号" v-model="user" clearable></el-input>
			<el-input placeholder="请输入密码" v-model="pass" clearable show-password></el-input>
			<el-button @click='createUser'>创建</el-button>
		</div>
	</div>
</template>

<script>
	export default{
		data() {
			return{
				user:null,
				pass:null
			}
		},
		methods:{
			createUser() {
				if(this.user == null || this.pass == null) {
					alert('账号或密码不允许为空')
					return
				}
				this.axios.post(this.api+'/user/create',{
					params:{
						user:this.user,
						pass:window.btoa(this.pass)
					}
				})
				.then(res => {
					 this.$notify({
			          title: '创建成功',
			          type: 'success',
			          duration:2000
			        });
				})
				.catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style scoped>
	.wrap {
		min-width:580px;
		margin: 0 auto;
	}
	.wrap>div{
		margin:10px 0;
	}
</style>