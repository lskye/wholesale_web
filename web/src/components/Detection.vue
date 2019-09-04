<template>
	<div class="wrap">
		<div class="time">
		    <span>发布日期：</span>
		    <el-date-picker v-model="time" align="right" type="date" placeholder="选择日期" 
		    				:picker-options="pickerOptions" @change='getPrice'>
		    </el-date-picker>
		</div>
		<el-table :data="productData" style="width: 100%"  ref="multipleTable" border>
		    <el-table-column label="产品名称">
		      <template slot-scope="scope">
		        <i class="el-icon-icon"></i>
		        <span style="margin-left: 10px">{{ scope.row.name }}</span>
		      </template>
		    </el-table-column>
		    <el-table-column label="产地">
		      <template slot-scope="scope">
		      	<span style="margin-left: 10px">{{ scope.row.origin }}</span>
		      </template>
		    </el-table-column>
		    <el-table-column label="农药残留">
		      <template slot-scope="scope">
		      	<span style="margin-left: 10px">{{ scope.row.pesticide}}</span>
		      </template>
		    </el-table-column>
		     <el-table-column label="是否合格">
		      <template slot-scope="scope">
		      	<span style="margin-left: 10px">{{ scope.row.result}}</span>
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
		        productData:[],
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
			getPrice(){
				this.axios.post(this.api+'/product/pesticideDetectionSearch',{
					params:{
						time:this.formateTime(this.time,false)
					}
				})
				.then(req => {
					this.productData = req.data.msg
				})
				.catch(err => {
					console.log(err)
				})
			},
		},
		created(){
			this.time = this.formateTime(new Date(),false)
			this.axios.post(this.api+'/product/pesticideDetectionSearch',{params:{time:this.time}})
			.then(req => {
				this.productData = req.data.msg
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