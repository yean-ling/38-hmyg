// pages/login/index.js
Page({

  data: {
      titles:[
        "综合",
        "销量",
        "价格"
      ],
      // 要显示的索引
      currentIndex:0
  },
   // 接收子组件传递过来的说数据 索引
   titleChange(e){
     const {index} =e.detail
     this.setData({
       currentIndex:index
     })
     
     
   }
  
})