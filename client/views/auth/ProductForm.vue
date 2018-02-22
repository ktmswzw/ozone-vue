<template>

  <card-modal ref="cm" :visible="visible" @ok="ok" @cancel="cancel" :okText="okText" :cancelText="cancelText"
              :title="title" transition="zoom">
    <el-form class="small-space" :rules="rules" :model="ruleForm" ref="ruleForm" label-position="left"
             label-width="70px">

      <el-input type="hidden" name="id" id="id" v-model="ruleForm.id"></el-input>
      <el-input type="hidden" name="type" id="type" v-model="ruleForm.type"></el-input>
      <el-input type="hidden" name="images" id="images" v-model="ruleOut.images" v-bind:is="images"></el-input>

      <el-form-item label="名称" prop="name" >
        <el-input v-model="ruleForm.name" ></el-input>
      </el-form-item>

      <el-form-item label="型号" prop="model" v-if="this.parent.$store.state.product.type==0">
        <el-input v-model="ruleForm.model" ></el-input>
      </el-form-item>

      <el-form-item label="价格" prop="price" v-if="this.parent.$store.state.product.type==0">
        <el-input type="number" v-model="ruleForm.price" ></el-input>
      </el-form-item>

      <el-form-item label="图片" prop="images">
        <multiple-file-uploader :multiple="false" :images="this.ruleForm.images" :parent="this" successMessagePath="" errorMessagePath=""></multiple-file-uploader>
      </el-form-item>

      <el-form-item label="描述" prop="description" v-if="this.parent.$store.state.product.type==0">
        <quill-editor v-model="ruleForm.description"
                      :options="editorOption">
        </quill-editor>
      </el-form-item>


    </el-form>

  </card-modal>
</template>

<script>
  import { CardModal } from 'vue-bulma-modal'
  import MultipleFileUploader from '../components/MultipleFileUploader'
  import { quillEditor } from 'vue-quill-editor'

  export default {
    name: 'ProductForm',
    components: {
      quillEditor,
      MultipleFileUploader,
      CardModal
    },

    props: {
      visible: Boolean,
      title: String,
      parent: Object,
      create: false,
      ruleOut: {
        type: Object,
        default: function () {
          return {
            id: '',
            name: '',
            price: '',
            model: '',
            images: '',
            description: '',
            time: Date,
            type: this.parent.$route.params.type
          }
        }
      }
    },
    data () {
      return {
        images: '',
        ruleForm: this.ruleOut,
        imageTemp: this.ruleOut.images,
        imagesList: [],
        loading: false,
        cancelText: '关闭',
        okText: '保存',
        rules: {
          name: [
            {required: true, message: '请输入名称', trigger: 'blur'}
          ],
          model: [
            {required: true, message: '请输入型号', trigger: 'blur'}
          ],
          images: [
            {required: true, message: '请选择图片', trigger: 'blur'}
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
    methods: {
      ok () {
        const self = this
        self.$refs.ruleForm.validate((valid) => {
          if (valid) {
            self.parent.$store.dispatch('SaveProduct', self.ruleForm).then((res) => {
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
            }).catch(res => {
              self.$notify({
                title: res.result.error_en,
                message: res.result.error_code + res.result.error,
                type: 'error',
                duration: 2000
              })
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
