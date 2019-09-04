<template>
	<div class="wrap">
		<div class="time">
		    <span>发布日期：</span>
		    <el-date-picker v-model="time" align="right" type="date" placeholder="选择日期" 
		    				:picker-options="pickerOptions" @change='getPrice'>
		    </el-date-picker>
		</div>
		<div class='selectClass'>
			<span :class='thisClass==0?"blueFont":""' @click='showAll'>全部</span>
		    <span :class='index+1==thisClass?"blueFont":""' :key='index' v-for='(data,index) in classData'
		    		@click='selectShow(index,data.name)'>{{data.name}}</span>
		</div>
		<el-table :data="productData" style="width: 100%"  ref="multipleTable" border>
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
		      	<span style="margin-left: 10px">{{ scope.row.maxPrice }}</span>
		      </template>
		    </el-table-column>
		    <el-table-column label="最低价">
		      <template slot-scope="scope">
		      	<span style="margin-left: 10px">{{ scope.row.minPrice}}</span>
		      </template>
		    </el-table-column>
		     <el-table-column label="平均价">
		      <template slot-scope="scope">
		      	<span style="margin-left: 10px">{{ scope.row.avgPrice}}</span>
		      </template>
		    </el-table-column>
		   	<el-table-column label="上市量">
		      <template slot-scope="scope">
		      	<span style="margin-left: 10px">{{ scope.row.quantity }}</span>
		      </template>
		    </el-table-column>
		</el-table>
	</div>
</template>

<script>
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
			formateTime(timestamp,time) {
			    let d = new Date(timestamp);
			    let date=null
			    if(time) {
			    	date = (d.getFullYear()) + "-" +
			            (d.getMonth() + 1) + "-" +
			            (d.getDate()) + " " +
			            (d.getHours()) + ":" +
			            (d.getMinutes()) + ":" +
			            (d.getSeconds());
			    } else {
			    	date = (d.getFullYear()) + "-" +
			            (d.getMonth() + 1) + "-" +
			            (d.getDate())
			    }			    
			    return date;
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
			getPrice(){
				this.axios.post(this.api+'/productPrice/getProductPrice',{
					params:{
						time:this.formateTime(this.time,false)
					}
				})
				.then(req => {
					this.productData = req.data.msg
					this.allProductData = req.data.msg
				})
				.catch(err => {
					console.log(err)
				})
			},
		},
		created(){
			this.time = this.formateTime(new Date(),false)
			this.axios.all([
				this.axios.post(this.api+'/productPrice/getProductPrice',{params:{time:this.time}}),
				this.axios.post(this.api+'/product/getClass')
			])
			.then(req => {
				this.productData = req[0].data.msg
				this.allProductData = req[0].data.msg
				this.classData = req[1].data.msg
				console.log(req)
			})
			.catch(err => {
				console.log(err)
			})
		}
	}
</script>

<style scoped>
	.wrap{
		width: 80%;
		min-height:calc(100vh - 194px);
		margin: 0 auto;
	}
	.time>span{
		font-size: 14px;
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

</style>