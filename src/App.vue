<template>
  <div id="app">
    <router-view/>
	<show-board></show-board>
  </div>
</template>

<script>
import ShowBoard from './components/ShowBoard'
export default {
  name: 'App',
  components:{
	ShowBoard
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
  margin-top: 60px;
}
</style>
