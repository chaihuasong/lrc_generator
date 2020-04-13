<template xmlns:el-row="http://www.w3.org/1999/html">
  <div>
    <h2>{{ msg }}</h2>

    <el-input
      type="textarea"
      placeholder="请输入内容"
      style="width:60%;"
      :rows="30"
      v-model="textarea">
    </el-input>
    <el-row style="margin-top: 10px">
      <el-button type="primary" @click="lrcGenerator">Generator</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'LRCGenerator',
  data () {
    return {
      msg: 'LRC Generator工具',
      textarea: ''
    }
  },
  methods: {
    lrcGenerator () {
      var text = this.textarea
      var formated = text.replace(/[\r\n]/g, '')
      formated = text.replaceAll('。', '。\n')
      formated = text.replaceAll('', '\uff1f\n')
      this.textarea = formated
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
a {
  color: #42b983;
}
</style>
