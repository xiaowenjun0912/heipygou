<template>
 
 <div>
<!-- //di顶部的搜索框 -->
<div class="search-box">
  <icon type="search" size="20" class="search">

  </icon>
  <input type="text" v-model="search" class="input" @confirm="submit" placeholder="请输入">
  <input type="button" class="button" @click="cancel" name="" value="取消" id="">
</div>

<!-- // 历史记录 -->
<div class="history-box">
  <div class="control">
    <span>历史记录</span>
    <span class="iconfont icon-shanchu" @click="myDelete"></span>
  </div>
  <ul class="items">
    <li class="item" v-for="(item, index) in history" :key="index" >
      {{item}}
    </li>
  </ul>
</div>


 </div>

</template>


<script>
  
export default {
  data:function(){
    return {
      search:[],
      // 缓存数据
      history:[],
    }
  },
  onLoad(){
    wx.getStorage({
      key: 'history',
      success: res => {
        console.log(res);
        this.history = res.data;
      },
      fail:res=>{
        console.log(res+'失败了');
      }
    });
  },
  // 方法
  methods:{
    submit(event){
      // console.log(event);
      // console.log(this.search);
      // 去重
      let index = this.history.indexOf(this.search);
      if(index!=-1){
        this.history.splice(index,1);
      }
      // 获取数据
      this.history.push(this.search);
      this.search = '';
      // 存数据
      wx.setStorage({
        key: 'history',
        data: this.history
      });
    },
    cancel(){
      this.search = '';
      // console.log('取消');
    },
    // 我的删除
    myDelete(){
      // 数据
      this.history=[];
      // 缓存清除
      wx.setStorage({
        key: 'history',
        data: this.history
      });
    }
  }
  }
  </script>


<style lang="less">
page{
  padding-top: 0;
}
.search-box{
  position: relative;
  width: 750rpx;
  height: 120rpx;
  background-color: #eee;
  display: flex;
  padding: 0 20rpx;
  align-items: center;
  .search{
      position: absolute;
      top:40rpx;
      left: 95rpx;
      z-index: 5;
  }
  .input{
    flex:1;
    width: 560rpx;
    // margin-top: 25rpx;
    margin-right: 20rpx;
    // margin-left: 160rpx;
    font-size: 26rpx;
    background-color: white;
    height: 60rpx;
    color: #808080;
    padding-left: 120rpx;

  }
  .button{
    width: 160rpx;
    border:1px solid #BFBFBF;
    font-size: 30rpx;
    height: 60rpx;
    line-height: 60rpx;
  }
}
.history-box{
  padding: 10rpx 20rpx;
  .control{
    span{
      margin-top: 10rpx;
      float: left;
    }
    .iconfont{
      float: right;
    }
 
  }
}
   .items{
      margin-top: 10rpx;
      width: 750rpx;
      display: flex;
      flex-wrap: wrap;
      .item{
        height: 87rpx;
        line-height: -30rpx;
        padding: 20rpx;
        margin-top: 10rpx;
        background-color: gray;
        font-size: 34rpx;
        margin-right: 10rpx;
      }
    }
</style>
