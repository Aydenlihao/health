<template>
  <view class="index">
    <swiper class="container">
      <swiper-item>
        <view class="picture">
          <image :src="health"></image>
          <view class='name'>{{name}}</view>
          <view class='time'>{{time}}</view>
        </view>
      </swiper-item>
      <swiper-item>
        <view class="picture">
          <image :src="journey"></image>
          <view class='phone_travel'>{{real_phone}}</view>
          <view class='time_travel'>{{time}}</view>
        </view>
      </swiper-item>
    </swiper>
    <view class='pop' v-if='isModal'>
      <view class='modal'>
        <input
          placeholder="请输入姓名"
          v-model="name">
        </input>
        <input
          placeholder="请输入手机号"
          v-model="phone" type="number">
        </input>
        <picker mode="date" v-model='time' @change="bindDateChange">
        <view class="picker">
          当前选择: {{time}}
        </view>
        </picker>
        <view>
         <button @tap="cancel">取消</button>
         <button @tap='confirm'>确定</button>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import Vue from 'vue'
import "./index.less";
import health from "../../asset/health.png";
import journey from "../../asset/journey.png";
import Taro from '@tarojs/taro'
export default {
  name: "Index",
  data() {
    return {
      health: health,
      journey: journey,
      isModal: false,
      name:'',
      phone:'',
      real_phone:'',
      time:'2019-08-07 00:04:25'
    };
  },
  methods:{
    bindDateChange(e){
      this.time = e.detail.value+' 00:04:25';
    },
    cancel(){
      this.isModal = false;
    },
    confirm(){
      this.isModal = false;
    }
  },
  watch:{
    name: function(newQuestion) {
      this.name = newQuestion
    },
    phone: function(newQuestion) {
      this.phone = newQuestion
      this.real_phone = newQuestion.slice(0,3)+'****'+newQuestion.slice(newQuestion.length-4,newQuestion.length);
    },
    time:function (params) {
      console.log(params);
    }
  },
  onLoad() {
    Taro.showModal({
      title: '信息设置',
      content: '请设置用户信息',
      success: (res) =>{
        if (res.confirm) {
           this.isModal = true;
        } else if (res.cancel) {
           this.isModal = false;
        }
      }
    })
  }
};
</script>
