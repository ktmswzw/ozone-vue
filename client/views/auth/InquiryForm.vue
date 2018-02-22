<template>

  <card-modal ref="cm" :visible="visible" @ok="ok" @cancel="cancel" :okText="okText" :cancelText="cancelText"
              :title="title" transition="zoom">
    <el-form class="small-space" :rules="rules" :model="ruleForm" ref="ruleForm" label-position="left"
             label-width="100px">

      <el-input type="hidden" name="id" id="id" v-model="ruleForm.id"></el-input>

      <el-form-item label="Nickname" prop="name">
        <el-input v-model="ruleForm.name" name="name" id="name"></el-input>
      </el-form-item>

      <el-form-item label="Email" prop="email">
        <el-input v-model="ruleForm.email" name="email" id="email" type="email"></el-input>
      </el-form-item>

      <el-form-item label="Question" prop="question">
        <quill-editor v-model="ruleForm.question"
                      :options="editorOption">
        </quill-editor>
      </el-form-item>

    </el-form>

  </card-modal>
</template>

<script>
  import { CardModal } from 'vue-bulma-modal'
  import { quillEditor } from 'vue-quill-editor'
  import { isEmail } from '../../utils/validate'

  export default {
    name: 'InquiryForm',
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
        name: '',
        question: '',
        email: '',
        time: Date,
        solved: false
      }
    },

    data () {
      const validateEmail = (rule, value, callback) => {
        if (!isEmail(value)) {
          callback(new Error('Please input email'))
        } else {
          callback()
        }
      }
      return {
        listProduct: [],
        loading: false,
        states: [],
        cancelText: 'close',
        okText: 'Send',
        rules: {
          email: [
            {required: true, message: 'Please input email', trigger: 'blur', validator: validateEmail}
          ],
          question: [
            {required: true, message: 'Please input question', trigger: 'blur'}
          ]
        },
        editorOption: {
          height: 400,
          modules: {
            toolbar: [
              ['bold', 'italic'],
              [{'list': 'bullet'}],
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
            self.parent.$store.dispatch('Send', self.ruleForm).then((res) => {
              if (self.create) {
                if (self.parent.list !== undefined) {
                  self.parent.list.push(res.result.bean)
                  self.parent.total = self.parent.total + 1
                }
              }
              self.$notify({
                title: '',
                message: 'Thanks, send successful',
                type: 'success',
                duration: 2000
              })
              this.$refs.cm.deactive()
            }).catch(err => {
              console.error(err)
            })
          } else {
            console.log('Sorry, error submit!!')
            return false
          }
        })
      },
      cancel () {
        this.$refs.cm.deactive()
      }
    },
    created () {
    }
  }
</script>
