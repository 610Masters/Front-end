<template>
  <div id="signup">
    <h1>{{ title }}</h1>
    <div class="block">
    <label for="username">用户名
      <el-input v-model="userName" placeholder="用户名(6~18位英文字母、数字或下划线，必须以英文字母开头)" class='inputClass' @blur='userNameCheck()'></el-input>
    </label>
    </div>
    <span class='error' id='userName'>{{ userNameError }}</span>
    <br>
    <br>
    <div class="block">
    <label for="password">密码
      <el-input v-model="password" placeholder="密码(6~18位英文字母、数字)" class='inputClass' type='password' @blur ='passwordCheck()'></el-input>
    </label>
    </div>
    <span class='error' id='password'>{{ passwordError1 }}</span>
    <br>
    <br>
    <div class="block">
    <label for="passwordConfirm">确认密码
      <el-input v-model="passwordConfirm" placeholder="再次输入密码确认" class='inputClass' type='password' @blur='passwordConfirmCheck()'></el-input>
    </label>
    </div>
    <span class='error' id='password'>{{ passwordError2 }}</span>
    <br>
    <br>
    <div class="block">
    <label for="email">邮箱
      <el-input v-model="email" placeholder="邮箱(示例：abc@mail.com)" class='inputClass' @blur='emailCheck()'></el-input>
    </label>
    </div>
    <span class='error' id='email'>{{ emailError }}</span>
    <br>
    <br>
    <div>
      <el-button @click='reset()'>清除</el-button>
      <el-button type="primary" @click='signupButton()'>注册</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'signup',
  data () {
    return {
      title: '注册',
      userName: '',
      password: '',
      passwordConfirm: '',
      email: '',
      userNameError: '',
      passwordError1: '',
      passwordError2: '',
      emailError: ''
    }
  },
  methods: {
    signupButton: function () {
      var that = this
      this.$axios.request({
        method: 'post',
        url: 'http://localhost:8081/user/register',
        responseType: 'json',
        data: JSON.stringify({
          Username: this.userName,
          Password: this.password
        })
      }).then(function (response) {
        console.log(response.data)
        if (response.data.ok) {
          that.$store.commit('saveToken', {
            username: that.userName,
            token: response.data.ok
          })
          that.$router.push('/')
        } else {
          alert(response.data.error)
        }
      })
    },
    userNameCheck: function () {
      if (/^[a-zA-Z][a-zA-Z0-9_]{6,18}$/.test(this.userName)) {
        this.userNameError = ''
      } else {
        this.userNameError = '用户名格式不正确！6~18位英文字母、数字或下划线，必须以英文字母开头'
      }
    },
    passwordCheck: function () {
      if (/[0-9a-zA-Z]{6,18}$/.test(this.password)) {
        this.passwordError1 = ''
      } else {
        this.passwordError1 = '密码格式不正确！6~18位英文字母、数字'
      }
    },
    passwordConfirmCheck: function () {
      if (this.password === this.passwordConfirm) {
        this.passwordError2 = ''
      } else {
        this.passwordError2 = '两次输入密码不同！'
      }
    },
    emailCheck: function () {
      if (/^[a-zA-Z0-9_]+@([a-zA-Z0-9_]+\.)+[a-zA-Z]{2,4}$/.test(this.email)) {
        this.emailError = ''
      } else {
        this.emailError = '邮箱格式不正确！示例：abc@mail.com'
      }
    },
    reset: function () {
      this.userName = ''
      this.password = ''
      this.passwordConfirm = ''
      this.email = ''
    }
  }
}
</script>

<style scoped>
h1 {
  font-weight: border;
}
.block {
  width: 550px;
  display: block;
  margin: 0 auto;
}
label {
  display: inline-block;
  width: 100%;
  text-align: right;
}
.inputClass {
  height: 20px;
  width: 450px;
  margin-left: 10px;
  margin-bottom: 20px;
}
.error {
  color: red;
  font-size:12px;
  text-align: left;
  margin-bottom: 30px;
}
#signup{
  background-image:url("../assets/background.jpg");
  background-attachment: fixed;
  width:100%;
  height:100%;
  position: fixed;
  background-size:100% 100%;
}
</style>
