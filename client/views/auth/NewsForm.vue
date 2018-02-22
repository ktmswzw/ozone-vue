<template>

  <card-modal ref="cm" :visible="visible" @ok="ok" @cancel="cancel" :okText="okText" :cancelText="cancelText"
              :title="title" transition="zoom">
    <el-form class="small-space" :rules="rules" :model="ruleForm" ref="ruleForm" label-position="left"
             label-width="70px">

      <el-input type="hidden" name="id" id="id" v-model="ruleForm.id"></el-input>

      <el-form-item label="标题" prop="title">
        <el-input v-model="ruleForm.title" name="title" id="title"></el-input>
      </el-form-item>

      <el-form-item label="描述" prop="description">
        <quill-editor v-model="ruleForm.description"
                      :options="editorOption">
        </quill-editor>
      </el-form-item>

    </el-form>

  </card-modal>
</template>

<script>
  import { CardModal } from 'vue-bulma-modal'
  import { quillEditor } from 'vue-quill-editor'

  export default {
    components: {
      quillEditor,
      CardModal
    },

    props: {
      visible: Boolean,
      title: String,
      parent: Object,
      create: false,
      ruleForm: {
        id: '',
        title: '',
        productId: '',
        description: '',
        time: Date
      }
    },

    data () {
      return {
        listProduct: [],
        loading: false,
        states: [],
        cancelText: '关闭',
        okText: '保存',
        rules: {
          title: [
            {required: true, message: '请输入标题', trigger: 'blur'}
          ]
        },
        editorOption: {
          modules: {
            toolbar: [
              [{'size': ['small', false, 'large']}],
              ['bold', 'italic'],
              [{'list': 'ordered'}, {'list': 'bullet'}],
              ['link']
            ],
            history: {
              delay: 1000,
              maxStack: 50,
              userOnly: false
            }
          }
        }
      }
    },
    mounted () {
    },
    methods: {
      ok () {
        const self = this
        self.$refs.ruleForm.validate((valid) => {
          if (valid) {
            self.parent.$store.dispatch('SaveNews', self.ruleForm).then((res) => {
              if (self.create) {
                self.parent.list.push(res.result.bean)
                self.parent.total = self.parent.total + 1
              }
              self.$notify({
                title: '',
                message: '保存成功',
                type: 'success',
                duration: 2000
              })
              this.$refs.cm.deactive()
            }).catch(err => {
              console.error(err)
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      cancel () {
        this.$refs.cm.deactive()
      },
      update () {
        this.$notify({
          title: '成功',
          message: '更新成功',
          type: 'success',
          duration: 2000
        })
      }
    },
    created () {
    }
  }
</script>
