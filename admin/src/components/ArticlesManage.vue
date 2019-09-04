<template>
	<div class="wrap">
		<div class='selectClass'>
			<span :class='thisClass==0?"blueFont":""' @click='showAll'>全部</span>
		    <span :class='index+1==thisClass?"blueFont":""' :key='index' v-for='(data,index) in classData'
		    		@click='selectShow(index+1,data.name)'>{{data.name}}</span>
		</div>
		<el-table :data="articlesData" style="width: 100%" ref="multipleTable" :default-sort = "{prop: 'time'}">
	    	<el-table-column label="ID">
		      <template slot-scope="scope">
		        <i class="el-icon-icon"></i>
		        <span style="margin-left: 10px">{{ scope.row.id }}</span>
		      </template>
		    </el-table-column>
		    <el-table-column label="类别">
		      <template slot-scope="scope">
		        <i class="el-icon-icon"></i>
		        <span style="margin-left: 10px">{{ scope.row.class }}</span>
		      </template>
		    </el-table-column>
		    <el-table-column label="标题">
		      <template slot-scope="scope">
		        <i class="el-icon-icon"></i>
		        <span style="margin-left: 10px">{{ scope.row.title }}</span>
		      </template>
		    </el-table-column>
		    <el-table-column label="修改时间" sortable prop='time'>
		      <template slot-scope="scope">
		        <i class="el-icon-icon"></i>
		        <span style="margin-left: 10px">{{ scope.row.time.substr(0,10) }}</span>
		      </template>
		    </el-table-column>
		    <el-table-column align="right">
		      <template slot="header" slot-scope="scope">
		        <el-input  v-model="searchText" size="mini" placeholder="输入关键字搜索" @input='search'/>
		      </template>
		      <template slot-scope="scope">
		        <el-button size="mini" @click="editRow(scope.row)">编辑</el-button>
		        <el-button size="mini" type="danger" @click="deleteRow(scope.row)">删除</el-button>
		      </template>
		    </el-table-column>
		</el-table>
	</div>
</template>

<script>
import Public from '../public.vue'
	export default{
		data(){
			return{
				p:Public.methods,
		        classData:[],
		        allArticlesData:[],
		        articlesData:[],
		        thisClass:0,
		        searchText:'',
			}
		},
		methods:{
			showAll(){
				this.thisClass = 0
				this.articlesData = this.allArticlesData
			},
			selectShow(index,className) {
				this.thisClass = index
				this.articlesData = []
				this.allArticlesData.forEach(data => {
					if(data.class == className) {
						this.articlesData.push(data)
					}
				})
			},
			editRow(row) {
				this.$router.push({name:'articlesCreate',
					params:{
						id:row.id,
						class:row.class,
						title:row.title,
						content:row.content,
						topImg:row.top_img
					}
				})
			},
			deleteRow(data) {
				const imgReg = /<img.*?(?:>|\/>)/gi
				const srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i
				const arr = data.content.match(imgReg)
				let srcArr = []
				let imgStrArr = []
				if(arr) {
					for(let i = 0; i < arr.length; i++) {
						let src = arr[i].match(srcReg)
						if(src[1]) {
							srcArr.push((i+1)+'：'+src[1])
						}
					}

					for(let i = 0; i < srcArr.length; i++) {
						imgStrArr.push(srcArr[i].split('/')[4])
					}
				}

				this.p.sure(this,'删除当前行',() => {
					this.axios.post(this.api+'/articles/deleteArticles',{
						params:{
							id:data.id,
							imgs:imgStrArr
						}
					})
					.then(req => {
						this.allArticlesData = req.data.msg
						if(this.thisClass != 0) {	//重新进行类选择，保证文章删除后还在当前分类
							this.selectShow(this.thisClass,data.class)
						}else {
							this.showAll()
						}
					})
					.catch(err => {
						console.log(err)
					})
				})
			},
			handleImageAdded (file, Editor, cursorLocation, resetUploader) {	//图片上传	 
		        var formData = new FormData();
		        formData.append("file", file);
		 
			    this.axios({
			        url: this.api+'/upload',
			        method: "POST",
			        data: formData
			    })
		        .then(result => {
		          let url = result.data.url; // Get url from response
		          Editor.insertEmbed(cursorLocation, "image", url);
		          resetUploader();
		        })
		        .catch(err => {
		          console.log(err);
		        });
		    },
			query(arr, q) {
				return arr.filter(v => Object.values(v).some(v => new RegExp(q + '').test(v)))
			},
			search(){	//模糊搜索
				let search = this.searchText;
				let dataNews = this.allArticlesData		
				this.articlesData = this.query(dataNews,search)        
			}
		},
		created(){
			this.axios.all([
				this.axios.post(this.api+'/articles/searchArticles'),
				this.axios.post(this.api+'/articles/searchArticlesClass')
			])
			.then(req => {
				this.articlesData = req[0].data.msg
				this.allArticlesData = req[0].data.msg
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
	.editArticles{
		position: absolute;
		top: 0;
		width:100%;
		height: 100vh;
		z-index: 200;
	}
</style>