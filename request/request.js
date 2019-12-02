// 定义一个 记录同时发送请求的个数
let ajaxCount = 0


function axios({url, ...params}) {
    ajaxCount++;
    const baseURL="https://api.zbztb.cn/api/public/v1/";
    return new Promise((resolve,reject) =>{

        // 显示加载中
        wx.showLoading({
            title: "加载中",
            mask: true
        });
          
        wx.request({
            url:baseURL + url,
            ...params,
            success: (result) =>{
                resolve(result);
            },
            complete(){
                ajaxCount--;
                if (ajaxCount ===0){
                    //都回来了
                 
          // 不管请求是否成功 都会触发的回调函数
            wx.hideLoading();
                }
                
                  
            }
        });
    })
    
}


export default axios;