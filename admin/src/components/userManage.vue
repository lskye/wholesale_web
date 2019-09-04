<template>
	<div id="createUser">
		<div class='wrap'>
			<el-table :data="tableData" style="width: 100%">
		    <el-table-column label="账号" width="180">
		      <template slot-scope="scope">
		        <i class="el-icon-user"></i>
		        <span style="margin-left: 10px">{{ scope.row.user }}</span>
		      </template>
		    </el-table-column>
		   <el-table-column label="密码" width="180">
		      <template slot-scope="scope">
		        <i class="el-icon-time"></i>
		        <span style="margin-left: 10px">{{ scope.row.pass }}</span>
		      </template>
		    </el-table-column>
		    <el-table-column label="操作">
		      <template slot-scope="scope">
		        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
		        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
		      </template>
		    </el-table-column>
		  </el-table>
		</div>
	</div>
</template>

<script>
import Public from '../public.vue'
	export default{
		data() {
			return{
				tableData:[],
				p:Public.methods
			}
		},
		methods:{
			handleEdit(index, row) {
		  		this.p.update(this,'账号'+row.user,'修改密码',(value) =>{
		  			this.axios.post(this.api+'/user/update',{
		            	params:{
		            		user:row.user,
		            		pass:window.btoa(value)
		            	}
		            })
		            .then(res => {
		            	this.tableData.forEach(data => {
		            		if(data.user == row.user) {
		            			data.pass = res.data.msg[0].pass
		            		}
		            	})
		            })
		            .catch(err => {
		            	console.log(err)
		            })
		  		})
      		},
      		handleDelete(index,row) {
      			this.p.sure(this,'删除',() => {
      				this.axios.post(this.api+'/user/delete',{
		            	params:{
		            		user:row.user,
		            	}
		            })
		            .then(res => {
		            	this.tableData = res.data.msg
		            })
		            .catch(err => {
		            	console.log(err)
		            })
      			})
      		}
		},
		created() {
			this.axios.post(this.api+'/user/getuser',{
				params:{
					name:'name',
					pass:'pass'
				}
			})
			.then(res => {
				this.tableData = res.data.msg			
			})
			.catch(err => {
				console.log(err)
			})
		}
	}
</script>

<style scoped>
	.wrap {
		min-width:580px;
		margin: 0 auto;
	}
</style>