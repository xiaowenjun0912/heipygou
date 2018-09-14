<template>
 
 <div>
   <!-- 顶部的搜索区域 -->
   <myheader></myheader>
   <!-- 内容区域 -->
      <div class="left">
        <scroll-view scroll-y scroll-with-animation >
            <div class="item" @click="selected(index)" :class="{active:index==selectIndex}" v-for="(item,index) in cateList" :key="item.cat_id">
              {{item.cat_name}}
            </div>
        </scroll-view>
      </div>
      <div class="right">
            <scroll-view scroll-y scroll-with-animation @scroll="">
              <!-- 广告位 -->
              <img class="ad-img" src="/static/images/icon/titleImage.png" alt="">
             
              <div class="section" v-for="(item, index) in cateList[selectIndex].children" :key="index">
                   <h4>/{{item.cat_name}}/</h4>
              <ul class="itemul">
                <li class="itemli" v-for="(it, i) in item.children" :key="i">
                  <a href="#">
                    <!-- 循环src 要加冒号 -->
                    <img class="pic" :src="'https://autumnfish.cn/wx/'+it.cat_icon" alt="">
                    <p class="text">{{it.cat_name}}</p>
                  </a>
                </li>
              </ul>
              </div>
            </scroll-view>
      </div>
   </div>

</template>


<script>
  // import myheader from '@components/header';
  import myheader from '../../components/header';

  import tool from '../../utils/index';

export default {
  // 数据
  data:function(){
    return {
      // 左边的数据
        cateList:[],
        // 选中的索引
        selectIndex:0,
    }
  },
   // 注册组件
    components:{
      myheader
    },
    // 获取数据
    onLoad() {
      tool.thenAjax({
        url:'api/public/v1/categories'
      }).then(res=>{
        console.log(res);
        this.cateList = res.data.message;
      })
    },
    methods:{
      selected(index){
        // console.log(index);
        this.selectIndex = index;
      }
    },
  }
  </script>


<style lang="less">
page{
  height: 100%;
  display: flex;
}
page > view{
  height: 100%;
  display: flex;
}
  .left{
    width:200rpx;
    height: 100%;
    scroll-view{
      height: 100%;
      .item{
          height: 100rpx;
          text-align: center;
          line-height: 100rpx;
          font-size:26rpx;
          background-color: #f1f1f1;
          border-bottom: 1px solid gray;
          &.active{
            color: #EB4450;
            background-color: #fff;
            position: relative;
            &::before{
              // 双伪元素必须给content
              content:'';
              position: absolute;
              width:8rpx;
              height:60rpx;
              left: 0;
              top: 20rpx;
              background-color: #EB4450;

            }
          }
      }
    } 
  }
  .right {
    width: 550rpx;
    height: 100%;
    padding: 20rpx 16rpx;
    scroll-view{
      height: 100%;
      .ad-img{
        width: 100%;
        height: 180rpx;
        margin: 0 auto;
        display: block;
      }
      .section{
        text-align: center;
      }
    
    }
  }
   .itemul{
          display:flex;
          flex-wrap: wrap; 
        }
    .itemli{
           width: 33.33%;
            a{
              width:100%;
              display:block;
              // text-align: center;
            .pic{
              width: 95rpx;
              height: 60rpx;
              display: block;
              margin:0 auto;
            }
            .text{
              font-size: 24rpx;
            }
            }
          }
</style>
