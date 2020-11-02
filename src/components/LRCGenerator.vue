<template xmlns:el-row="http://www.w3.org/1999/html">
  <div>
    <el-row>
      <div style="display: inline-flex">
      <h2 style="margin-top: 15px;margin-left: 30px">{{ msg }}</h2>
        <el-tooltip class="item" effect="light" placement="bottom-start" style="border: white;margin-top: 10px;">
          <div slot="content" style="font-size: 16px;color: grey; line-height:1.8">
            注： Generator之后需要二次编辑确认 <br/>
            <div style="color: red;display: inline-flex;margin-right: 10px">*</div>结果需要满足： <br/>
            1. 第一行标题行以[00:00.00]开头 <br/>
            2. 每行字幕都需要包含时间标签 <br/>
            3. 每行去除时间标签不超过20个字 <br/>
            4. 符号需要使用空格代替 <br/>
            5. Generator按钮只能点击一次
          </div>
          <el-button style="height: fit-content;font-size: 10px;color: grey">?</el-button>
        </el-tooltip>
      </div>
    </el-row>
    <el-input
      type="textarea"
      placeholder="请输入内容"
      style="width:60%;"
      :rows="30"
      v-model="textarea">
    </el-input>
    <el-row style="margin-top: 10px;margin-bottom: 20px">
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
        var length = 20
        if (arry[i].startsWith('[') && arry[i].indexOf(']') > 0 && arry[i].indexOf(':') > 0) {
          length += 10
        }
        if (arry[i].length > length) {
          if (arry[i].indexOf('，') <= 0) {
            result += arry[i].trim() + '\n'
            continue
          }
          var tmpArray = arry[i].split('，')
          var tmp = tmpArray[0].trim() + '，'
          for (var j = 1; j < tmpArray.length; j++) {
            if (tmp.length + tmpArray[j].length <= length &&
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
      finalResult = finalResult.replace('tt_rp', '\n')

      finalResult = finalResult.replace(/。/g, ' ')
      finalResult = finalResult.replace(/！/g, ' ')
      finalResult = finalResult.replace(/？/g, ' ')
      finalResult = finalResult.replace(/，/g, ' ')
      finalResult = finalResult.replace(/、/g, ' ')
      finalResult = finalResult.replace(/……/g, ' ')
      finalResult = finalResult.replace(/；/g, ' ')
      finalResult = finalResult.replace(/：/g, ' ')
      finalResult = finalResult.replace(/～/g, ' ')

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
        if (arry[i].length > 30) {
          this.$message({
            message: '该行字数太长，请换行：\n' + arry[i],
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
