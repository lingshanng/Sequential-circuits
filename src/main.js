import Vue from "vue";
import App from "./App.vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import { Network } from "vue-vis-network";
// import "vue-vis-network/dist/vueVisNetwork.css";
const opts = {
  icons: {
    iconfont: "mdi"
  }
};
Vue.use(Vuetify);
Vue.component("network", Network);
new Vue({
  vuetify: new Vuetify(opts),
  render: (h) => h(App)
}).$mount("#app");
