<template>
 <Header/>

 
 <Footer/>
</template>

<script>
// b1: import vào

import Header from './components/ComHeader.vue'

import Footer from './components/ComFooter.vue'
export default {
  name: 'App',
  components: {

    Header,
    Footer,
 
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  margin-top: 0;
  margin-left: 0;
  margin-right: 0;
  margin-bottom: 0;
}
</style>
