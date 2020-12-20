<template>
  <div id="signin">
    <h1>{{ title }}</h1>
    <div class="block">
    <label for="username">用户名
      <el-input v-model="userName" placeholder="用户名" class='inputClass'></el-input>
    </label>
    </div>
    <br>
    <div class="block">
    <label for="password">密码
      <el-input v-model="password" placeholder="密码" class='inputClass' type='password'></el-input>
    </label>
    </div>
    <br>
    <div>
      <el-button @click="signupButton()">注册</el-button>
      <el-button type="primary" @click="signinButton()">登录</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'signin',
  data () {
    return {
      title: '登录',
      userName: '',
      password: ''
    }
  },
  methods: {
    signupButton: function () {
      this.$router.push('/signup')
    },
    signinButton: function () {
      var that = this
      this.$axios.request({
        method: 'post',
        url: 'http://localhost:8081/user/login',
        responseType: 'json',
        data: JSON.stringify({
          Username: this.userName,
          Password: this.password
        })
      }).then(function (response) {
        console.log(response.data)
        if (!response.data.error) {
          that.$store.commit('saveToken', {
            username: that.userName,
            token: response.data.ok
          })
          that.$router.push('/')
        } else {
          alert(response.data.error)
        }
      })
    }
  }
}
</script>

<style scoped>
h1 {
  font-weight: border;
}
.inputClass {
  height: 20px;
  width: 300px;
  margin-left: 10px;
  margin-bottom: 20px;
}
.block {
  width: 380px;
  display: block;
  margin: 5px auto;
}
label {
  display: inline-block;
  width: 100%;
  text-align: right;
}
#signin{
  background-image:url("../assets/background.jpg");
  background-attachment: fixed;
  width:100%;
  height:100%;
  position: fixed;
  background-size:100% 100%;
}
</style>
