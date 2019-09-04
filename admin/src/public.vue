<script>
	export default{
		data(){
			return{}
		},
		methods:{
			sure(that,hint,fn) {
				that.$confirm('此操作将'+hint+', 是否继续?', '提示', {
		            confirmButtonText: '确定',
		            cancelButtonText: '取消',
		            type: 'warning'
		        }).then(() => {
		        	fn()
		            that.$message({
		                type: 'success',
		                message: '成功!'
		            });
		        }).catch(() => {
		            that.$message({
		                type: 'info',
		                message: '已取消'
		            });          
		        });
			},
			update(that,cont,title,fn) {
				that.$prompt(cont, title, {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		        }).then(({ value }) => {
		         	fn(value)
		        }).catch(() => {
			        that.$message({
			        	type: 'info',
			        	message: '取消输入'
			        });       
		        });
			},
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
			}
		}
	}
</script>