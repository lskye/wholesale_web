<template>
  <div id="app">
    <com-nav></com-nav>
    <router-view></router-view>
    <com-foot></com-foot>
  </div>
</template>

<script>
import Nav from './components/Nav'
import Foot from './components/Foot'
export default {
  name: 'app',
  components: {
    'com-nav':Nav,
    'com-foot':Foot
  }
}
</script>

<style>
*{
  padding: 0;
  margin: 0;
  font-family: arial,"Hiragino Sans GB","Microsoft Yahei",sans-serif;
}
#app{
  width: 90%;
  margin: 0 auto;
}
</style>
