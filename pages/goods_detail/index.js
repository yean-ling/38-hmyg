/*
1 发送请求获取数据 页面渲染

*/


import request from "../../request/request";


Page({
  data:{
      goodsInfo:{}
  },
  onLoad:function(options){
     this.getDetail(options.goods_id);       
           
  },

  // 获取商品的详情数据
  getDetail(goods_id) {
    request({
      url:"goods/detail",
      data:{
        goods_id
      }
    }).then(res=>{
      console.log(res);
        this.setData({
          goodsInfo:res.data.message
        })
      
    })
  },

  // 点击轮播图 放大预览
  handlePreviewImg(e){
        // console.log(e.currentTarget.dataset.src);
    // 当前被点击的大图片路径
    const current = e.currentTarget.dataset.src;
    // 要预览的整个图片列表
    const urls=this.data.goodsInfo.pics.map(v=>v.pics_big);
    // 开始预览
    wx.previewImage({
      current,
      urls
    });
  }
})