<template>
  <div id="app">
    <el-menu
      :router="true"
      :default-active="this.$route.path"
      class="header"
      mode="horizontal"
      @select="handleSelect"
      background-color="#24292e"
      text-color="#ffffff"
      active-text-color="#bebfc1">
      <h1 id="title">{{ title }}</h1>
      <el-menu-item class = "left" index="/">{{ index }}</el-menu-item>
      <el-menu-item index="/user" style='float:right' v-if="this.$store.state.username">{{ this.$store.state.username }}</el-menu-item>
      <div v-else>
        <el-menu-item class = "right" index="/signin" style='float:right'>{{ signin }}</el-menu-item>
        <el-menu-item class = "right" index="/signup" style='float:right'>{{ signup }}</el-menu-item>
      </div>
    </el-menu>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      title: '610 博客',
      index: '主页',
      signin: '登录',
      signup: '注册'
    }
  }
}
</script>

<style>
body {
  margin: 0;
}
.left {
  font-size: 14px;
  font-weight: bolder;
}
.right {
  height: 60px;
  line-height: 1.5;
  font-size: 14px;
  padding: 18px;
  font-weight: bolder;
}
#title {
  line-height: 1.2;
  height: 40px;
  float: left;
  font-size: 30px;
  margin-block-start: 10px;
  margin-block-end: 10px;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  color: #ffffff;
  width: 200px;;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
