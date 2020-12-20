<template>
  <div id="index">
    <ul>
      <li v-for="item in articlesList" :key="item">
        <el-container>
          <el-main>
            <div class="title">
              <router-link :to="{'path':'/article/details/'+item.id}">{{ item.title }}</router-link>
            </div>
            <div class="message">
              <div class="author">{{ item.username }}</div>
              <div class="date">{{ item.date }}</div>
            </div>
          </el-main>
        </el-container>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      articlesList: []
    }
  },
  mounted: function () {
    this.getArticles()
  },
  methods: {
    getArticles: function () {
      var that = this
      this.$axios.request({
        method: 'get',
        url: 'http://localhost:8081/articles?page=1',
        responseType: 'json'
      }).then(function (response) {
        console.log(response.data)
        that.articlesList = response.data.ok.slice(1)
      })
    }
  }
}
</script>

<style scoped>
.el-container {
  height: 100px;
  width: 800px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin: 20px auto;
}
ul {
  margin: 0;
  padding: 0;
}
li {
  list-style-type: none;
  position: relative;
}
a {
  float: left;
}
.title {
  height: 30px;
}
.message {
  margin-top: 12px;
  bottom: 10px;
  font-size: 12px;
}
.author {
  float: left;
}
.date {
  float: right;
}
#index{
  background-image:url("../assets/background.jpg");
  background-attachment: fixed;
  width:100%;
  height:100%;
  position: fixed;
  background-size:100% 100%;
}
</style>
