<template>
  <div>
    <!-- 搜索栏 -->
   <myheader></myheader>
    <!-- 轮播图  容器标签 可以随便写 小程序独有的功能标签 不能乱写
        indicator-dots小圆点
        autoplay 自动切换
        circular 头尾相连
     -->
    <swiper indicator-dots autoplay circular>
      <swiper-item v-for="(item, index) in swiperList" :key="item.name">
        <image mode="aspectFill" :src="item.image_src"></image>
      </swiper-item>
    </swiper>
    <!-- 分类区域
        普通的标签 可以写 html的 微信的也支持
        功能类的标签 只能写 微信的
     -->
    <ul class="cate-box">
      <li class="item" v-for="(item, index) in cateList" :key="item.name">
        <img class="img" :src="item.image_src" alt="">
        <text class="wenzi">{{item.name}}</text>
      </li>
    </ul>
    <!-- 楼层 -->
    <div class="section" v-for="(item, index) in floorList" :key="index">
      <div class="title">
        <text class="text">{{item.floor_title.name}}</text>
        <img class="image" :src="item.floor_title.image_src" alt="">
      </div>
      <div class="content">
        <a class="nav" href="#" v-for="(it, i) in item.product_list" :key="i">
          <img class="image" :src="it.image_src" alt="">
        </a>
      </div>
    </div>
    <!-- 我是有底线 -->
    <div class="footer">
      <text class="iconfont icon-xiao"></text><text>我是有底线的</text>
    </div>

<!-- //回到顶部 -->
    <div @click="toTop" v-show="isShow" class="to-top">
      <span class="iconfont icon-jiantoushang"></span>
      <text>顶部</text>
    </div>

  </div>
</template>

<script>
// 导入模块
import tool from "../../utils/index";
// console.log(tool);
  import myheader from '../../components/header';


export default {
    // 数据
    data:function(){
      return {
        // 轮播图数据
        swiperList:[],
        // 分类数据
        cateList:[],
        // 楼层数据
        floorList:[],
        // 去顶部是否显示
        isShow:false,
      }
    },
    // 生命周期函数
    onLoadxxx() {
      // 获取轮播图的数据
      tool.thenAjax({
        url:'api/public/v1/home/swiperdata'
      }).then(res=>{
        // console.log(res);
        this.swiperList = res.data.message;
        // 返回一个thenAjax
        return tool.thenAjax({
          url:'api/public/v1/home/catitems'
        })
      })
      // 分类
      .then(res=>{
        // console.log(res);
        this.cateList = res.data.message;
        // 返回 楼层数据
        return tool.thenAjax({
          url:'api/public/v1/home/floordata'
        })
      })
      .then(res=>{
        console.log(res);
        this.floorList = res.data.message;
      })
    },
    // 监听滚动
    onPageScroll(event){
      console.log(event);
      if(event.scrollTop>132){
        this.isShow = true;
      }else{
        this.isShow = false;
      }
    },
    methods:{
      toTop(){
        wx.pageScrollTo({
          scrollTop: 0,
          duration: 300
        });
      }
    },
    // 注册组件
    components:{
      myheader
    },
 
}
</script>

<style lang='less'>
page{
  padding-top: 100rpx;
}
.header {
  padding: 20rpx 16rpx;
  position: fixed;
  top:0;
  left:0;
  z-index: 5;
  width: 100%;
  box-sizing: border-box;
  background-color: #ff2d4a;
  icon {
    position: absolute;
    top: 34rpx;
    left: 50%;
    transform: translateX(-200%);
    z-index: 998;
  }
  input {
    height: 60rpx;
    border-radius: 10rpx;
    background-color: white;
    width: 100%;
    color: #bbb;
    text-align: center;
    font-size: 24rpx;
  }
}
// 轮播图
swiper {
  height: 384rpx;
  swiper-item {
    image {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
}
// 分类选项
.cate-box {
  padding-top: 24rpx;
  padding-bottom: 30rpx;
  display: flex;
  .item {
    flex: 1;
    .img {
      width: 100rpx;
      height: 100rpx;
      display: block;
      margin: 0 auto;
    }
    .wenzi{
        margin-left: 50rpx;
        font-size: 33rpx;
      }
  }
}
//楼层
.section{
  .title{
    position: relative;
    text{
      position: absolute;
      color:#FF7B94;
      font-weight: 700;
      font-size: 45rpx;
      left: 20rpx;
      top: 13rpx;
    }
    .image{
      height: 85rpx;
      width: 100%;
    }
  }
  .content{
    padding: 20rpx 16rpx;
    height: 440rpx;
    .nav{
      display: block;
      float:left;
      width: 33.333%;
      height: 100%;
      padding: 5rpx;
      box-sizing: border-box;
    }
      .image{
        display: block;
        width:100%;
        height: 100%;
      }
      // 只要不是第一个nav
      .nav:not(:first-child){
          height: 50%;
      }
  }
}
.footer{
    background-color: #f4f4f4;
    color: #999;
    font-size: 44rpx;
    text-align: center;
    height: 140rpx;
    line-height: 140rpx;
}
.to-top{
  position: fixed;
  right: 20rpx;
  bottom: 185rpx;
  z-index: 5;
  width: 100rpx;
  height: 100rpx;
  // line-height: 100rpx;
  border: 1px solid red;
    color: red;
  border-radius: 50%;
  text-align: center;
  span{
    font-size: 43rpx;
    display: block;
  }
  text{
    color: red;
    display: block;
    font-size:24rpx; 
  }
}

</style>
