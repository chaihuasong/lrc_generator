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
      <el-button type="primary" @click="lrcCheck">结果校验</el-button>
    </el-row>
  </div>
</template>

<script language="JavaScript">
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
      if (text.indexOf('\n') <= 1) {
        text = text.replace('\n', '')
      }
      // eslint-disable-next-line eqeqeq
      if (text.trim() == '') {
        this.$message({
          message: '未输入任何内容！',
          type: 'warning'
        })
        return
      }
      text = text.replace('\n', 'tt_rp')
      var formated = text.replace(/\n/g, '')
      formated = formated.replace(/\t/g, '')
      formated = formated.replace(/。\n/g, '。')
      formated = formated.replace(/！\n/g, '！')
      formated = formated.replace(/？\n/g, '？')
      formated = formated.replace(/。/g, '。\n')
      formated = formated.replace(/？/g, '？\n')
      formated = formated.replace(/！/g, '！\n')
      formated = formated.replace(/\n\n/g, '\n')

      var arry = formated.split('\n')
      var result = ''
      for (var i = 0; i < arry.length; i++) {
        if (arry[i].length > 30) {
          if (arry[i].indexOf('，') <= 0) {
            result += arry[i].trim() + '\n'
            continue
          }
          var tmpArray = arry[i].split('，')
          var tmp = tmpArray[0].trim() + '，'
          for (var j = 1; j < tmpArray.length; j++) {
            if (tmp.length + tmpArray[j].length <= 30 &&
              !tmpArray[j].startsWith('講  師：') &&
              !tmpArray[j].startsWith('講 師：') &&
              !tmpArray[j].startsWith('講師：') &&
              !tmpArray[j].startsWith('讲  师：') &&
              !tmpArray[j].startsWith('讲 师：') &&
              !tmpArray[j].startsWith('讲师：') &&
              !tmpArray[j].startsWith('主持人：') &&
              !tmpArray[j].startsWith('乔  安：') &&
              !tmpArray[j].startsWith('乔 安：') &&
              !tmpArray[j].startsWith('乔安：')) {
              // eslint-disable-next-line eqeqeq
              if (j == (tmpArray.length - 1)) {
                result += tmp.trim() + tmpArray[j].trim() + '\n'
              } else {
                tmp += tmpArray[j].trim() + '，'
              }
            } else {
              result += tmp.trim() + '\n'
              // eslint-disable-next-line eqeqeq
              if (j == (tmpArray.length - 1)) {
                result += tmpArray[j].trim() + '\n'
              } else {
                tmp = tmpArray[j].trim() + '，'
              }
            }
          }
        } else {
          result += arry[i].trim() + '\n'
        }
      }

      var finalResult = result.replace(/\n”/g, '”\n')
      finalResult = finalResult.replace(/\n\n/g, '\n')
      finalResult = finalResult.replace('tt_rp', '\n\n')
      this.textarea = finalResult
      this.$message({
        message: '格式转换完成! 共' + finalResult.length + '个字',
        type: 'success'
      })
    },
    lrcCheck () {
      // eslint-disable-next-line eqeqeq
      if (this.textarea.trim() == '') {
        this.$message({
          message: '未输入任何内容！',
          type: 'warning'
        })
        return
      }
      var arry = this.textarea.split('\n')
      for (var i = 0; i < arry.length; i++) {
        if (arry[i].length > 50) {
          this.$message({
            message: '该行字数太长，建议换行：\n' + arry[i],
            type: 'warning'
          })
          return
        }
        // eslint-disable-next-line eqeqeq
        if (arry[i].trim() != '' && (!arry[i].startsWith('[') || arry[i].indexOf('[') < 0 || arry[i].indexOf(']') < 0)) {
          this.$message({
            message: '未包含时间的行：\n' + arry[i],
            type: 'warning'
          })
          return
        }
      }
      this.$message({
        message: '校验成功！可以发布了',
        type: 'success'
      })
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
