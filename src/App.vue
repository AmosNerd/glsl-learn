<template>
  <div id="app">
<chart-drag></chart-drag>

  </div>
</template>

<script>
import ChartDrag from "./components/chart-drag.vue"

export default {
  name: 'app',
  components: {
    ChartDrag
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
  body{
    margin: 0;
  }
  canvas:{
    width: 100%;
    height: 100%;
  }
</style>
