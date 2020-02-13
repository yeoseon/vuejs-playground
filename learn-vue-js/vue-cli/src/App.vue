<template>
  <div>
    <!-- <app-header v-bind:프롭스 속성 이름="상위 컴포넌트의 데이터 이름"></app-header> -->
    <app-header v-bind:propsdata="str"
                v-on:renew="renewStr"></app-header>
  </div>
</template>
<script>
import AppHeader from './components/AppHeader.vue'; //.vue를 붙여주면 vscode의 바로가기를 사용할 수 있다.  

// var AppHeader = { //원래는 이 형태로 변수로 선언하여 사용했으나, AppHeader를 파일로 관리하여 import를 이용했다.  
//   template: '<header><h1>header</h1></header>'
// }

// new Vue({
//   data: {
//     //원래는 이렇게 했지만, 이렇게 vue-cli를 이용하는 경우, 해당 data를 재사용하겠다는 의지이다.
//     // 따라서 여기서는 분별을 위해 아래와 같이 선언한다. 
//   }
// })

export default {
  data: function() {
    return {
      str: 'Header'
    }
  },
  components: {
    'app-header': AppHeader
  },
  methods: {
    renewStr: function() {
      this.str = 'hi'
    }
  }
}
</script>

<style>

</style>