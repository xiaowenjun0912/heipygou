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
    <span class="iconfont icon-shanchu" @click="clear"></span>
  </div>
  <ul class="items">
    <li v-show="goods.length==0" @longpress="delOne(index)" @click="searchItem(item)" class="item" v-for="(item, index) in history" :key="index" >
      {{item}}
    </li>
  </ul>
</div>
<!-- 结果展示 -->
    <div class="result-box" v-show="goods.length!=0">
      <!-- 综合 切换按钮 -->
        <div class="filter">
            <div @click="changeFilter(0)" class="item" :class="{active:filterIndex==0}">综合</div>
            <div @click="changeFilter(1)" class="item" :class="{active:filterIndex==1}">销量</div>
            <div @click="changeFilter(2)" class="item" :class="{active:filterIndex==2}">价格
              <div class="arrow-box">
                <span class="iconfont icon-jiantoushang" :class="{active:orderPrice==true}"></span>
                <span class="iconfont icon-jiantouxia" :class="{active:orderPrice==false}"></span>
              </div>
            </div>
        </div>
        <!-- 列表 -->
        <ul class="itemList">
   
          <li class="itemLi" v-for="(item, index) in orderArr" :key="index">
            <div class="left">
              <img :src="item.goods_small_logo" alt="">
            </div>
            <div class="right">
              <div class="title">{{item.goods_name}}</div>
              <div class="price">¥<span class="money">{{item.goods_price}}</span>.00</div>
            </div>
          </li>
        </ul>
    </div>

 </div>

</template>


<script>
  import tool from '../../utils/index';
export default {
  data:function(){
    return {
      search:[],
      // 缓存数据
      history:[],
      // 商品数据
      goods:[],
      // 商品的样式
      filterIndex:0,
      // 数据的原始值
      defaultGoods:[],
      // 价格的排序的方式 正序还是倒序
      // true 正序 false 倒序
      orderPrice:true,
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
    // 抽取的查询数据的函数
    getData(){
            wx.showLoading({
        title: '加载中',
        mask: true,
      });
        // 回车确认之后就有了页面(需要请求加载数据)
      tool.thenAjax({
        url:`api/public/v1/goods/search?query=${this.search}`
      })
      .then(res=>{
        console.log(res);
        this.defaultGoods =res.data.message.goods.concat([]);
        this.goods = res.data.message.goods;
        wx.hideLoading();
      })
    },
    // 回车确认
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
      // 超过10个就删除
      if(this.history.length>10){
        // 删除第一个
        this.history.shift();
      }
      // 存数据
      wx.setStorage({
        key: 'history',
        data: this.history
      });
         this.getData();
    },
    cancel(){
      this.search = '';
      // console.log('取消');
      // 清空搜索中的数据
      this.goods=[];
      this.defaultGoods=[];
    },
    // 我的删除
    clear(){
      // 提示框
      wx.showModal({
        title: '友情提示',
        content: '是否清空',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#f0f',
        confirmText: '确定',
        confirmColor: '#0094ff',
        success: res => {
          if(res.confirm){
            console.log('用户点击确定');
              // 数据
            this.history=[];
            // 缓存清除
            wx.setStorage({
              key: 'history',
              data: this.history
              });
          } else if(res.cancel){
            console.log('用户点击取消');
          }
        }
      });
    },
    // 长按删除一个
    delOne(index){
      // console.log(index);
      wx.showModal({
        title: '提示',
        content: '干掉他',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#3CC51F',
        success: res => {
          if(res.confirm){
            console.log('用户点击确认')
            this.history.splice(index,1);
             // 存数据
            wx.setStorage({
              key: 'history',
              data: this.history
            });
          }else if(res.cancel){
            console.log('用户点击取消');
          }
        }
      });
    },
    // 点击切换综合的
    changeFilter(index){
      // 排序的依据
      this.filterIndex = index;
      if(this.filterIndex==0){
          this.orderPrice='NaN';
      } 
      if(this.filterIndex==1){
          this.orderPrice='NaN';
      }
        if(this.filterIndex==2){
               this.orderPrice = !this.orderPrice;
        }
    },
    // 点击历史记录去搜素
    searchItem(item){
        this.search =item;
        this.getData();
    }
  },
  // 计算属性
  computed:{
    orderArr(){
      //根据filterIndex进行排序即可
      // 如果fileterIndex==0 无需排序 直接默认即可
      if(this.filterIndex==0){
        // 直接返回
        // return this.goods
            // 返回原始值
            return this.defaultGoods;
      }
      // 如果是按照销量排序
      else if(this.filterIndex==1){
        // 因为没有销量 按照goods_id排序
        this.goods.sort((a,b)=>{
          // console.log(a);
          // console.log(b);
          return a.goods_id -b.goods_id;
        });
        return this.goods;
      }else if(this.filterIndex==2){
                    // 如果是价格的排
        // 按照价格排序
        this.goods.sort((a,b)=>{
          // console.log(a);
          // console.log(b);
          if(this.orderPrice==true){
            return a.goods_price-b.goods_price;
          }else{
            return b.goods_price-a.goods_price;
          }
        });
        return this.goods;
      }
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
        // .iconfont{
        //   &.acitve{
        //   color: red;
        // }
        // }
      }
    }

    // 搜索页面dff
    .result-box{
      .filter{
        height: 100rpx;
        border-bottom: 1rpx solid #ccc;
        display: flex;
        align-items: center;
        .item{
          flex: 1;
          font-size: 28rpx;
          text-align: center;
          // 综合
           &.active{
                color:red;
              }
        }
        .item:last-child{
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 10rpx;
          .arrow-box{
            .iconfont{
              margin-left: 10rpx;
              font-size: 28rpx;
              font-weight: 700;
              display: block;
              color: black;
              &.active{
                color:hotpink;
                text-shadow: 0 0 20rpx hotpink;
              }
             
            }
          }
        }
      }
    }
    // 列表区域
    .itemList{
      padding: 20rpx 20rpx;
      box-sizing: border-box;
      .itemLi{
        display: flex;
        height: 260rpx;
        border-bottom: 1rpx solid #ddd;
        padding: 30rpx 0;
        .left{
          image{
            width: 200rpx;
            height: 200rpx;
            display: block;
            margin-right: 30rpx;
          }
        }
        .right{
          position: relative;
          .title{
            font-size: 32rpx;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp:2;
          }
          .price{
            color: #eb4450;
            font-size: 22rpx;
            position: absolute;
            right: 30rpx;
            bottom: 20rpx;
            .money{
              font-size: 36rpx;
            }
          }
        }
      }
    }
</style>
