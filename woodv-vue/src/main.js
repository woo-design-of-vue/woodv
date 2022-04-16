import Vue from "vue";
import App from "./App.vue";
import woodv from "./woodv";
Vue.config.productionTip = false;
Vue.use(woodv);
new Vue({
    render: h => h(App),
}).$mount("#app");
