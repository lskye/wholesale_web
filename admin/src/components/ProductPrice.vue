<template>
	<div class="wrap">
		<div class="time">
		    <span>发布日期：</span>
		    <el-date-picker v-model="time" align="right" type="date" placeholder="选择日期" 
		    				:picker-options="pickerOptions">
		    </el-date-picker>
		    <el-upload class='load' ref="upload" action="" :show-file-list="false" :auto-upload="false" :on-change='load'>
			    <el-button slot="trigger" icon="el-icon-upload" size="small" type="primary">
			      上传文件
			    </el-button>
			</el-upload>
		</div>
		<div class='selectClass'>
			<span :class='thisClass==0?"blueFont":""' @click='showAll'>全部</span>
		    <span :class='index+1==thisClass?"blueFont":""' :key='index' v-for='(data,index) in classData'
		    		@click='selectShow(index,data.name)'>{{data.name}}</span>
		</div>
		<el-table :data="productData" style="width: 100%"  ref="multipleTable">
		    <el-table-column label="产品名称">
		      <template slot-scope="scope">
		        <i class="el-icon-icon"></i>
		        <span style="margin-left: 10px">{{ scope.row.name }}</span>
		      </template>
		    </el-table-column>
		     <el-table-column label="所属类别">
		      <template slot-scope="scope">
		        <i class="el-icon-icon"></i>
		        <span style="margin-left: 10px">{{ scope.row.class }}</span>
		      </template>
		    </el-table-column>
		    <el-table-column label="最高价">
		      <template slot-scope="scope">
		        <el-input v-model='scope.row.maxPrice'></el-input>
		      </template>
		    </el-table-column>
		     <el-table-column label="最低价">
		      <template slot-scope="scope">
		        <el-input v-model='scope.row.minPrice'></el-input>
		      </template>
		    </el-table-column>
		   	<el-table-column label="上市量">
		      <template slot-scope="scope">
		         <el-input v-model='scope.row.quantity'></el-input>
		      </template>
		    </el-table-column>
		</el-table>
		<el-button class='save' @click='save'>保存</el-button>
	</div>
</template>

<script>
import XLSX from 'xlsx'
	export default{
		data(){
			return{
				pickerOptions: {
			        disabledDate(time) {
			            return time.getTime() > Date.now();
			        },
			        shortcuts: [{
			            text: '今天',
			            onClick(picker) {
			              picker.$emit('pick', new Date());
			            }
			        }, {
			            text: '昨天',
			            onClick(picker) {
			              const date = new Date();
			              date.setTime(date.getTime() - 3600 * 1000 * 24);
			              picker.$emit('pick', date);
			            }
			        }]
		        },
		        time: '',
		        classData:[],
		        allProductData:[],
		        productData:[],
		        thisClass:0,
			}
		},
		methods:{
			load(file,fileList){	//导入excel文件数据到对应输入框
				const that = this
				const fileReader = new FileReader();
		      	fileReader.onload = (ev) => {
			        try {
			            const data = ev.target.result;
			            const workbook = XLSX.read(data, {
			              type: 'binary'
			            });
			            //console.log(workbook)
			            let sheet = Object.keys(workbook.Sheets)[0];
			            const json = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);  //获得以第一列为键名的sheet数组对象
			            //console.log(json)
			            let product = this.$refs.multipleTable.data 		//获取表格输入框v-model
			            product.forEach((data,index) => {
			            	json.forEach((xls,id) =>{
			            		if(data.name == xls['品名']) {
			            			data.maxPrice = xls['最高价']
			            			data.minPrice = xls['最低价']
			            			data.quantity = xls['金额']
			            			//强制数据更新，需要先给对象添加对应属性，否则属性名为understand
			            			that.$set(data,data.maxPrice,xls['最高价'])		
			            			that.$set(data,data.minPrice,xls['最低价'])
			            			that.$set(data,data.quantity,xls['金额'])
			            		}
			            	})
			            })
			            console.log(product)
			        } catch (e) {
			            console.log(e)
			        }
		        };
		        fileReader.readAsBinaryString(file.raw);
			},
			showAll(){
				this.thisClass = 0
				this.productData = this.allProductData
			},
			selectShow(index,className) {
				this.thisClass = index+1
				this.productData = []
				this.allProductData.forEach(data => {
					if(data.class == className) {
						this.productData.push(data)
					}
				})
			},
			save(){
				if(!this.time) {
					this.$notify({
			          	title: '请选择时间',
			          	type: 'error',
			          	duration:2000
			        });
			        return
				}
				this.productData.forEach((data,index) => {	//循环所有商品并逐个保存
					let product = this.$refs.multipleTable.data[index]
					this.axios.post(this.api+'/productPrice/add',{
						params:{
							name:product.name,
							maxPrice:product.maxPrice,
							minPrice:product.minPrice,
							avgPrice:(Number(product.maxPrice)+Number(product.minPrice))/2,
							quantity:product.quantity,
							time:this.time
						}
					})
					.then(res => {
						if(res.data.code) {
							this.$notify({
					          	title: '保存成功',
					          	type: 'success',
					          	duration:2000
					        });
						}
					})
					.catch(err => {
						this.$notify({
				          	title: "错误",
				          	type: '存在空值',
				          	duration:2000
					    });
					})
		        })
			}
		},
		created(){
			this.axios.all([
				this.axios.post(this.api+'/product/getProduct',{
					params:{
						object:null
					}
				}),
				this.axios.post(this.api+'/product/getClass',{
					params:{
						object:null
					}
				})
			])
			.then(req => {
				this.productData = req[0].data.msg
				this.allProductData = req[0].data.msg
				this.classData = req[1].data.msg
			})
			.catch(err => {
				console.log(err)
			})
		}
	}
</script>

<style scoped>
	.time>span{
		font-size: 14px;
	}
	.load{
		display: inline-block;
		float: right;
	}
	.selectClass {
		display: flex;
		justify-content: space-between;
		font-size: 14px;
		margin: 30px 0;
	}
	.selectClass>span{
		margin: 0 8px;
		cursor: pointer;
	}
	.blueFont{
		color:rgb(64,158,255);
	}
	.save{
		float: right;
		margin-top: 20px;
	}
</style>