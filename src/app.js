import Vue from "vue";
import "./app.less";
const App = new Vue({
  created() {
    wx.cloud.init({
      env: "health-6gpqfjsl2379a6bf"
    });
  },
  onShow(options) {},
  render(h) {
    // this.$slots.default 是将要会渲染的页面
    return h("block", this.$slots.default);
  }
});

export default App;
