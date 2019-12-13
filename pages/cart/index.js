/*
1 获取用户的收货地址

*/

import regeneratorRuntime from '../../lib/runtime/runtime';
import {getSetting,chooseAddress,openSetting} from "../../utils/wxAsync";


Page({
  data:{
    // 用户的收货地址
    address:{},
    // 购物车数组
    carts:[],
    // 商品的总价格
    totalPrice:0,
    // 结算的数量
    nums:0,
    // 全选
    allChecked:false
  },

 
    onShow(){
      const carts= wx.getStorageSync("carts") || [];
   
      // address = {对象} || 空字符串
      const address = wx.getStorageSync("address") || {};
      this.setData({
      address,
      carts 
      })

      this.countAll(carts);
  },



  //点击按钮 获取收货地址
  async handleFinalGet(){

  // 1获取用户的授权状态
  const auth= (await getSetting()).authSetting["scope.address"]
  if(auth === false) {
    // auth === false

    await openSetting();
  }
  const res = await chooseAddress();
  // 把数据存到缓存中
  wx.setStorageSync("address",res);
  
 },
 // 计算总价格 - 计算购买的数量

 countAll(carts) {
  /*
   1 获取缓存中的购物车数组
   2 循环
     1 判断该商品的单价 * 要购买的数量
     2 每个商品的总价 叠加计算 ++ 
  
  */

  let totalPrice = 0;
  let nums= 0;
  // 只要有一个商品没选中 它的值就是false
  let allChecked=true;
  carts.forEach(v=>{
    if(v.isChecked){
      totalPrice += v.nums * v.goods_price
      nums+= v.nums;

    } else{
      // 未选中
      allChecked=false;
    }
  })
  
  this.setData({
    totalPrice,
    nums,
    allChecked
  })
 },
 // 单个商品的选中事件
 checkboxChange(e){
   /*
   1 如何知道用户点击的是那个 商品呢  (可以根据 id 或者索引来获取到该元素)
   
   */
 const {index} = e.currentTarget.dataset;
 let {carts} = this.data;
// 对选中状态 做取反
carts[index].isChecked=!carts[index].isChecked;

// 把数组 数设置回 data中 和 缓存中
this.setData ({
  carts
})
  wx.setStorageSync("carts",carts);

   // 重新计算一下总价格 
     this.countAll(carts);
 },

 // 数量的编辑
 handleNumUpdate(e){
 
  // nuit = +1 || -1
  // index 等于 要编辑的元素的索引 carts[index]
  const {unit,index} =e.currentTarget.dataset;
  // 获取到了 data 中的购物车数组
  let {carts}=this.data;

  // 判断 数量是否超出界限
  // 1 当数量大于等于库存 提示用户 unit也做判断
  if(unit ===1 && carts[index].nums >= carts[index].goods_number){
    wx.showToast({
      title:'库存不足了',
      icon:'none',
      mask:true
    });
    return
  }else if (carts[index].nums === 1 && unit === -1){
    // 提示用户 是否要删除商品
    wx.showModal({
      title: '警告',
      content: '您是否要删除该产品?',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => {
        if (result.confirm) {
       /*
       删除数组的一个元素而已
       */     
    carts.splice(index,1);

    
    this.setData({
      carts
    })
    wx.setStorageSync("carts",carts);
  
    this.countAll(carts);

        } else {
          console.log("取消");  
        }
      }
    });
  } else {
    carts[index].nums+=unit;

    this.setData({
      carts
    })
    wx.setStorageSync("carts",carts);
  
    this.countAll(carts);
   }
  },
  // 全选按钮
  handleItemAll(){
    // 1 获取自己的选中状态
    let{allChecked,carts}= this.data;
    allChecked=!allChecked;
   carts.forEach(v =>v.isChecked = allChecked);
   this.setData({
     carts
   })

   wx.setStorageSync("carts",carts);
   this.countAll(carts);
    
  },
  // 结算事件
  goAccount(){
    //1 获取收货地址
    //2 获取用户选中了的商品的数组的长度
     
   const {address,carts} = this.data;
   if(!address.userName){
     wx.showToast({
       title: '请选择您的收货地址',
       icon: 'none',
       mask: 'true'
     });  
   }else if(carts.filter(v =>v.isChecked).length === 0){
    wx.showToast({
      title: '请选中要结算的商品',
      icon: 'none',
      mask: 'true'
    }); 
    return 
   }
   // 通过了验证的
  //  console.log("跳转到结算页面了!");
  wx.navigateTo({
    url: '/pages/pay/index',
   
  });
    
   
  }
})