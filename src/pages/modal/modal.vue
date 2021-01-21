<template>
  <view>
    <button @tap="yunAdd">云函数调用</button>
    <button @tap="getOpenId">获取用户OpenID</button>
    <button @tap="getDataBase">数据库api</button>
    <button @tap="getYunData">云函数获取数据</button>
  </view>
</template>
<script>
import Vue from "vue";
import Taro from "@tarojs/taro";
export default {
  name: "Modal",
  data() {
    return {};
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    yunAdd() {
      //调用add云函数
      wx.cloud.callFunction({
        name: "add",
        data: {
          a: 1,
          b: 2
        },
        success(res) {
          console.log("云函数调用", res);
        },
        fail(error) {
          console.log(error);
        }
      });
    },
    getOpenId() {
      //调用getOpenId云函数
      wx.cloud.callFunction({
        name: "getOpenId",
        success(res) {
          console.log("获取OpenId", res);
        },
        fail(error) {
          console.log(error);
        }
      });
    },
    getDataBase() {
      //获取云数据库信息
      wx.cloud
        .database()
        .collection("users")
        .get({
          success(res) {
            console.log("获取云数据库", res);
          },
          fail(error) {
            console.log(error);
          }
        });
    },
    getYunData() {
      //使用云函数获取云数据库数据
      wx.cloud.callFunction({
        name: "getData",
        success(res) {
          console.log("使用云函数获取云数据库数据", res);
        },
        fail(error) {
          console.log(error);
        }
      });
    }
  }
};
</script>
