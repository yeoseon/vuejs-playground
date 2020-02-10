import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// var App = {
//   template: '<div>app</div>'
// }

new Vue({
  render: h => h(App),

  //위의 render와 같은 역할
  // components: {
  //   'app': App
  // }

}).$mount('#app')

// 위의 코드와 동일한 역할을 한다.  
// new Vue({
//   el: '#app',
//   render: h => h(App),
// })