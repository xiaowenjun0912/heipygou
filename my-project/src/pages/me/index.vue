<template>
<div>
  <!-- 顶部盒子 -->
 <div class="header-box">
   <div class="me-header">
      <!-- 点击图片 登陆 -->
      <button class="icon" open-type="getUserInfo" @getuserinfo="userInfo">
            <img :src="icon" class="icon" @click="login"  alt="">
      </button>
      <span class="iconfont icon-shezhi"></span>
      <span class="iconfont icon-xiaoxi"></span>
      <p class="p">{{info}}</p>
   </div>
   </div>
   <!-- 底部内容 -->
   <div class="info-box">
     <!-- 顶部 -->
     <div class="item-list">
       <div class="item">
         <p class="num">0</p>
         <p class="title">收藏的店铺</p>
       </div>
        <div class="item">
         <p class="num">0</p>
         <p class="title">收藏的商品</p>
       </div>
        <div class="item">
         <p class="num">0</p>
         <p class="title">关注的商品</p>
       </div>
         <div class="item">
          <p class="num">0</p>
          <p class="title">我的足迹</p>
        </div>
     </div>
           <!-- 订单 -->
   <div class="order">
     <div class="title">我的订单</div>
     <div class="options">
       <div class="item">
         <span class="iconfont icon-daifukuan"></span>
         <p class="opt-name">待付款</p>
       </div>
       <div class="item">
         <span class="iconfont icon-daishouhuo"></span>
         <p class="opt-name">待退货货</p>
       </div>
         <div class="item">
         <span class="iconfont icon-tuikuan"></span>
         <p class="opt-name">退款/退货</p>
       </div>
         <div class="item">
         <span class="iconfont icon-dingdan"></span>
         <p class="opt-name">全局订单</p>
       </div>
     </div>
   </div>
   
     <!-- 获取用户地址 -->
       <div class="address" @click="getAddress">
        <span class="manage">收货地址管理</span>
        <span class="iconfont icon-jiantouyou"></span>
      </div>
      <div @click="callKF" class="opt">
        <span class="manage">联系客服</span>
        <span>400-100-10086</span>
      </div>
      <!-- 扫码 -->
      <div @click="scanCode" class="opt">
        <span class="manage">意见反馈</span>
        <span class="iconfont icon-jiantouyou"></span>
      </div>
      <div class="opt">
        <span class="manage">关于我们</span>
        <span class="iconfont icon-jiantouyou"></span>
      </div>
   </div>
</div>
</template>


<script>
  
export default {
        data:function(){
          return {
            icon:"/static/icon.png",
            info:'登陆/注册'
          };
        },
        methods:{
          // 登陆的逻辑
          login(){
              wx.login({
                success: res => {
                  // console.log(res);
                  // 获取用户信息
                  wx.getUserInfo({
                    withCredentials: 'false',
                    lang: 'zh_CN',
                    success: res => {
                      console.log(res);
                    }
                  });
                }
              });
          },
          // 获取用户信息
          userInfo(res){
            console.log(res);
            if(res.mp.detail.errMsg != 'getUserInfo:ok'){
              // 没有授权
              wx.showModal({
                title: '提示',
                content: '要授权哦',
                cancelText: '取消',
                cancelColor: '#000000',
                confirmText: '确定',
                confirmColor: '#3CC51F',
                success: res => {
                  if(res.confirm){}
                }
              });
            }else{
              // 授权成功
              this.icon=res.mp.detail.userInfo.avatarUrl;
              this.info=res.mp.detail.userInfo.nickName;
            }
          },
          // 获取用户收货地址
          getAddress(){
            wx.chooseAddress({
              success: res => {
                console.log(res)
              }
            });
          },
          //拨打电话
          callKF(){
            wx.makePhoneCall({
              phoneNumber: '18506664525',
              
            });
          },
          scanCode(){
            wx.scanCode({
              // onlyFromCamera: false,
              // scanType: ['qrCode','barCode','datamatrix','pdf417'],
              success: res => {
                console.log(res);
              }
            });
          }
        }
  }
  </script>


<style lang="less">
page{
  padding: 0;
}
// 顶部的盒子
.header-box{
   height:420rpx;
   background-color: #EB4450;
   display: flex;
   justify-content: center;
   align-items: center;
   .me-header{
     position: relative;
   }
  .icon{
    height: 140rpx;
    width: 140rpx;
    border-radius: 50%;
    border: 4rpx solid white;
    padding: 0;
    image{
      width: 100%;
      height: 100%;
      display: block;
    }
  }
  .iconfont{
    position: absolute;
    color: white;
    top: 60rpx;
    &.icon-shezhi{
      left: -80px;
    }
    &.icon-xiaoxi{
      right: -80rpx;
    }
  }
  .p{
    display: block;
    text-align: center;
    margin-top: 20rpx;
    color: white;
    font-size:28rpx;
  }
}
// 底部
.info-box{
  padding: 0 16rpx;
  background-color: #ccc;
  // 顶部
  > .item-list{
    transform: translateY(-30rpx);
    height: 120rpx;
    background-color: white;
    display: flex;
    align-items: center;
    .item{
      flex:1;
      color: #666666;
      text-align: center;
      font-size:24rpx;
      .num{
        margin-bottom: 15rpx;
      }
    }
  }
}
  // 订单
  .order {
    background-color: white;
    .title {
      height: 90rpx;
      border-bottom: 1rpx solid #dddddd;
      line-height: 90rpx;
      padding-left: 30rpx;
    }
    .options {
      display: flex;
      align-items: center;
      height: 166rpx;
      .item {
        flex: 1;
        text-align: center;
        .iconfont {
          color: #eb4450;
          font-size: 60rpx;
          font-weight: 700;
        }
        .opt-name {
          font-size: 28rpx;
        }
      }
    }
  }
  // 收货地址管理
    .address {
    margin: 20rpx 0;
    height: 88rpx;
    background-color: white;
    padding: 0 32rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .manage {
      font-size: 32rpx;
    }
    .iconfont {
      color: #ccc;
    }
  }
    // 下面一列选项
  .opt {
    height: 88rpx;
    background-color: white;
    padding: 0 32rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1rpx solid #ddd;
    .manage {
      font-size: 32rpx;
    }
    .iconfont {
      color: #ccc;
    }
  }
</style>
