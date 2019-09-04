<template>
	<div id="createUser">
		<div class='wrap'>
			<div class="create_class">
				<el-input  placeholder="产品类别名称" v-model="productClass" clearable></el-input>
				<el-button @click='createProductClass'>添加</el-button>
			</div>
			<el-table :data="tableData" style="width: 100%">
		    <el-table-column label="类型名称" width="400px">
		      <template slot-scope="scope">
		        <i class="el-icon-icon"></i>
		        <span style="margin-left: 10px">{{ scope.row.name }}</span>
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
				productClass:null,
				tableData:[],
				p:Public.methods
			}
		},
		methods:{
			createProductClass() {
				if(this.productClass == null) {
					alert('不允许为空')
					return
				}
				this.axios.post(this.api+'/product/createClass',{
					params:{
						productClass:this.productClass,
					}
				})
				.then(res => {
					 this.tableData = res.data.msg
					 this.$notify({
			          title: '创建成功',
			          type: 'success',
			          duration:2000
			        });
				})
				.catch(err => {
					console.log(err)
				})
			},
			handleEdit(index,row) {
				this.p.update(this,row.name,'修改品类名称',(value) => {
					this.axios.post(this.api+'/product/updateClass',{
		            	params:{
		            		oldName:row.name,
		            		newName:value
		            	}
		            })
		            .then(res => {
		            	this.$notify({
				          title: '修改成功',
				          type: 'success',
				          duration:2000
				        });
		            	this.tableData = res.data.msg
		            })
		            .catch(err => {
		            	console.log(err)
		            })
				})
			},
			handleDelete(index,row) {
      			this.p.sure(this,'删除',() => {
      				this.axios.post(this.api+'/product/deleteClass',{
		            	params:{
		            		name:row.name,
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
			this.axios.post(this.api+'/product/getClass',{
				params:{
					object:'null'
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
	.wrap .create_class>div{
		margin:0 10px;
	}
	.wrap .create_class {
		display: flex;
		justify-content: center;
	}
</style>