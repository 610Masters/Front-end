<template>
  <div id="article">
  <div class = "main">
    <div class = "title">
      <h1>{{ article.title }}</h1>
    </div>
    <div class = "message">
      <div class = "date">{{ article.date }}</div>
      <div class = "author">{{ article.username }}</div>
    </div>
    <div class = "content" v-html="article.content">
      <br>
      <br>
      <br>
    </div>
    <div class = "comments">
      <div class = "addComment">
        <td><el-input v-model="addComment" placeholder="发表你的看法······" class='inputClass'></el-input></td>
        <td><el-button type="primary" @click="postComment()" class='buttonClass'>发表评论</el-button></td>
      </div>
      <div class="commentContent">
      <ul>
        <li v-for="item in article.comments" :key="item">
          <div class="header">
            <div class="commentAuthor">{{ item.user }}</div>
            <div class="commentDate">{{ item.date }}</div>
          </div>
          <div class = "comment">{{ item.content }}</div>
        </li>
      </ul>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'article',
  data () {
    return {
      article: {},
      comments: [],
      addComment: ''
    }
  },
  mounted: function () {
    this.initArticle()
  },
  methods: {
    initArticle: function () {
      var that = this
      var nid = this.$route.params.id
      this.$axios.request({
        method: 'get',
        url: 'http://localhost:8081/article/' + nid,
        responseType: 'json'
      }).then(function (response) {
        console.log(response.data)
        that.article = response.data.ok
      })
    },
    postComment: function () {
      var that = this
      var nid = this.$route.params.id
      if (this.$store.state.username) {
        if (this.addComment) {
          this.$axios.request({
            method: 'post',
            url: 'http://localhost:8081/article/' + nid + '/comment',
            responseType: 'json',
            data: JSON.stringify({
              User: that.$store.state.username,
              Article_id: parseInt(nid),
              Date: '2020-12-20',
              Content: this.addComment
            }),
            headers: {
              'Authorization': that.$store.state.token
            }
          }).then(function (response) {
            console.log(response.data)
            if (!response.data.error) {
              that.article.comments = []
              that.article.comments.push({
                user: response.data.ok.user,
                article_id: response.data.ok.article_id,
                date: response.data.ok.date,
                content: response.data.ok.content
              })
              that.addComment = ''
            } else {
              alert(response.data.error)
            }
          })
        } else {
          this.$alert('不能发送空的评论！', '提示', {
            confirmButtonText: '确定'
          })
        }
      } else {
        this.$router.push('/signin')
      }
    }
  }
}
</script>

<style scoped>
.main {
  width: 1200px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin: auto;
  margin-bottom: 20px;
  padding: 10px;
}
.message {
  height: 20px;
  bottom: 10px;
  font-size: 12px;
  margin-bottom: 20px;
}
.author {
  float: center;
  height: 20px;
  line-height: 20px;
  display: inline;
}
.date {
  float: center;
  height: 20px;
  line-height: 20px;
  display: inline;
}
.content {
  margin: auto 10px;
  border-top: 1px solid;
  border-bottom: 1px solid;
  padding-top: 20px;
  padding: 20px 40px;
  width: 1100px;
  text-align: left;
}
.comments {
  width: 1100px;
  margin: auto;
  margin-top: 20px;
}
.header {
  height: 20px;
  font-size: 14px;
  margin-top: 8px;
}
.commentAuthor {
  font-size: 14px;
  float: left;
}
.commentDate {
  font-size: 14px;
  float: right;
  color: #7a7575;
}
.comment {
  margin-top: 10px;
  margin-left: 20px;
  text-align: left;
}
.comments li {
  list-style-type: none;
  padding: 10px;
  margin: 5px;
  border-top: 1px dashed #7a7575;
}
.comments li:first-child {
  border-top: 1px #7a7575;
}
.inputClass {
  width: 1000px;
}
.commentContent {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}
#article{
  background-image:url("../assets/background.jpg");
  background-attachment: fixed;
  width:100%;
  height:100%;
  background-size:100% 100%;
}
</style>
