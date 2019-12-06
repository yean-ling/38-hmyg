/*
1 获取用户的收货地址

*/

import regeneratorRuntime from '../../lib/runtime/runtime';
import {getSetting,chooseAddress,openSetting} from "../../utils/wxAsync";


Page({
  handleChooseAddress(){
    wx.chooseAddress({
      success: (result)=>{
        console.log("成功");
        console.log(result);
        
      },
      fail:(err) =>{
        console.log("失败");
        console.log(err);
        
        
      }
    })
  },
 // 获取用户的授权的状态
 handleGetAuth(){
   wx.getSetting({
     success:(result)=>{
       console.log(result);
       
     },
     fail:()=>{ },
     complete:() =>{ }
   });
 },
 // js的方式打开设置页面
 handleOpenSetting(){
   wx.openSetting({
     success: (result) => {
       
     },
     fail: () => { },
     complete: () => { }
   });
     
 },
  async handleFinalGet(){

  // 1获取用户的授权状态
  const auth= (await getSetting()).authSetting["scope.address"]
  if(auth === false) {
    // auth === false

    await openSetting();
  }
   await chooseAddress();
 
  
  
 }
})