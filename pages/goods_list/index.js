/*
1 在分页面 商品动态渲染的时候 加上 超链接 和 对应的分类id
定义
*/


import request from "../../request/request";
Page({
  // 全局的接口参数
  Params:{
    // 查询关键字 "小米"
    query:"",
    // 分类id
    cid:-1,
    // 页码 第几页
    Pagenum:1,
    // 也容量 -> 每一页可以放几条数据
    pagesize:10
  },

  data:{
    // 要显示的商品列表
    goods:[],
    titles:[
      "综合",
      "销量",
      "价格"
    ],
    // 要显示的索引
    currentIndex:0
  },

  onLoad(options){
    this.Params.cid=options.cid;

    this.getList();
    
  },

  // 获取商品列表数据
  getList(){
    request({
      url:"goods/search",
      data: this.Params
    })
    .then(res=>{
      console.log(res);  
      // 旧的数组
  const { goods } = this.data;
      this.setData({
        // 当我们做分页 总数为数据 应该是不断 追加的！！
       goods: [...goods,...res.data.message.goods]
      })

     //计算总页数
     this.TotalPages=Math.ceil(res.data.message.total / this.Params.pagesize);
      console.log( this.TotalPages);
      
    })
  },

  // 滚动条 触底事件
  onReachBottom(){
        // 1 判断还有没有下一页数据
        if (this.Params.pagesize >= this.TotalPages){
          // 没有下一页数据
          console.log("没有下一夜数据");
          
        }else {
          //有下一页数据
          this.Params.Pagenum++;
          // 发送请求获取下一页的数据
          this.getList();
        }
  },
  // 下拉刷新
  onPullonPullDownRefresh(){
    this.Params.Pagenum=1;
    this.setData({
      goods:[]
    })
    this.getList();
  },
   // 接收子组件传递过来的说数据 索引
   titleChange(e){
    const {index} =e.detail
    this.setData({
      currentIndex:index
    })
    
    
  }
})