<template>
  <view class="index">
    <swiper class="container">
      <swiper-item>
        <view class="picture">
          <image src="cloud://health-6gpqfjsl2379a6bf.6865-health-6gpqfjsl2379a6bf-1304824676/health.png"></image>
          <view class='name'>{{name}}</view>
          <view class='time'>{{time}}</view>
        </view>
      </swiper-item>
      <swiper-item @tap='goToModal'>
        <view class="picture">
          <image src="cloud://health-6gpqfjsl2379a6bf.6865-health-6gpqfjsl2379a6bf-1304824676/journey.png"></image>
          <view class='phone_travel'>{{real_phone}}</view>
          <view class='time_travel'>{{journey_time}}</view>
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
        <view class="btn">
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
import Taro from '@tarojs/taro'
import moment from "moment";
export default {
  name: "Index",
  data() {
    return {
      isModal: false,
      name:'',
      phone:'',
      real_phone:'',
      time: moment().format('YYYY-MM-DD HH:mm:ss'),
    };
  },
  computed:{
    journey_time(){
      var reg = new RegExp('-','g')
      return this.time.replace(reg,'.');
    }
  },
  methods:{
    bindDateChange(e){
      this.time = this.time?e.detail.value + ' ' + moment().format('HH:mm:ss'):this.time;
    },
    cancel(){
      this.isModal = false;
    },
    confirm(){
      this.isModal = false;
    },
    goToModal(){
      this.isModal = true;
      this.time =this.time?this.time.split(' ')[0] + ' ' + moment().format('hh:mm:ss'):this.time;
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
