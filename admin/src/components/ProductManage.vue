<template>
	<div id="createUser">
		<div class='wrap'>
			<div class="className">
				产品类别名称：
				<el-dropdown @command="selectClass">
				  <span class="el-dropdown-link">
				  	{{thisClass||'产品类别'}}
				    <i class="el-icon-arrow-down el-icon--right"></i>
				  </span>
				  <el-dropdown-menu slot="dropdown">
				    <el-dropdown-item v-for='data in classData' :command='data.name'>{{data.name}}</el-dropdown-item>
				  </el-dropdown-menu>
				</el-dropdown>
			</div>
			<div class="create_class">
				<el-input  placeholder="产品名称" v-model="product" clearable></el-input>
				<el-button @click='createproduct'>添加</el-button>
			</div>
			<el-table :data="tableData" style="width: 100%" :default-sort = "{prop: 'class', order: 'descending'}">
		    <el-table-column label="产品名称">
		      <template slot-scope="scope">
		        <i class="el-icon-icon"></i>
		        <span style="margin-left: 10px">{{ scope.row.name }}</span>
		      </template>
		    </el-table-column>
		     <el-table-column label="所属类别" sortable prop='class'>
		      <template slot-scope="scope">
		        <i class="el-icon-icon"></i>
		        <span style="margin-left: 10px">{{ scope.row.class }}</span>
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
				product:null,
				classData:[],
				tableData:[],
				thisClass:null,
				p:Public.methods
			}
		},
		methods:{
			selectClass(command) {
				this.thisClass = command
			},
			createproduct() {
				if(this.product == ' ' || this.thisClass == null) {
					alert('不允许为空')
					return
				}
				this.axios.post(this.api+'/product/createProduct',{
					params:{
						product:this.product,
						class:this.thisClass
					}
				})
				.then(res => {
					if(res.data.code) {
					 	this.tableData = res.data.msg
						 this.$notify({
				          	title: '创建成功',
				          	type: 'success',
				          	duration:2000
				        });
					}else{
						this.$notify({
				          	title: '产品名称重复',
				          	type: 'error',
				          	duration:2000
				        });
					}
				})
				.catch(err => {
					console.log(err)
				})
			},
			handleEdit(index,row) {
				this.p.update(this,row.name,'修改商品名称',(value) => {
					this.axios.post(this.api+'/product/updateProduct',{
		            	params:{
		            		oldName:row.name,
		            		newName:value
		            	}
		            })
		            .then(res => {
		            	if(res.data.code) {
		            		this.$message({
				                type: 'success',
				                message: '修改成功!'
				            });
		            		this.tableData = res.data.msg
		            	}else {
		            		this.$notify({
					          	title: '产品名称重复',
					          	type: 'error',
					          	duration:2000
				        	});
		            	}
		            })
				})
			},
			handleDelete(index,row) {
				this.p.sure(this,'删除',() => {
					this.axios.post(this.api+'/product/deleteProduct',{
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
				this.classData = res.data.msg
			})
			.catch(err => {
				console.log(err)
			})

			this.axios.post(this.api+'/product/getProduct',{
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
	.className{
		font-size: 14px;
		margin: 10px;
		color:#010101;
	}
	.wrap .create_class>div{
		margin:0 10px;
	}
	.wrap .create_class {
		display: flex;
		justify-content: center;
	}
	.el-dropdown-link {
	    cursor: pointer;
	    color: #409EFF;
	}
	.el-icon-arrow-down {
	    font-size: 12px;
	}
</style>