<template>
  <div class="uploadBox">
    <form role="form" ref="form" enctype="multipart/form-data" @submit.prevent="onSubmit">
      <div class="uploadBoxMain" v-if="!itemsAdded">
        <div class="form-group">
          <div class="dropArea" @ondragover="onChange">
            同时拖入多个图片放这里
            <input type="file" name="items" v-if="multiple" multiple required  @change="onChange">
            <input type="file" name="items" v-if="!multiple" required  @change="onChange">
          </div>
        </div>
      </div>
      <div class="uploadBoxMain" v-else>
        <p><strong>名称/大小</strong></p>
        <ol>
          <li v-for="item in itemsNames">{{item.name}} / {{item.size}}</li>
        </ol>
        <p><strong>合计 文件数:</strong> {{itemsAdded}}</p>
        <p><strong>合计 大小:</strong> {{itemsTotalSize}}</p>
        <!-- Loader -->
        <div class="loader" v-if="isLoaderVisible">
          <div class="loaderImg"></div>
        </div>
        <!-- End Loader -->
      </div>
      <div class="action">
        <a class="button  is-success is-inverted" :disabled="itemsAdded < minItems" @click="onSubmit">
                <span class="icon">
                  <i class="fa fa-cloud-upload" aria-hidden="true"></i>
                </span>
          <span>上传</span>
        </a>
        <a class="button is-inverted" :disabled="itemsAdded < minItems" @click="removeItems">
                <span class="icon">
                  <i class="fa fa-times"></i>
                </span>
          <span>取消</span>
        </a>
      </div>
      <br>

      <div class="columns" v-if="images!=''">
        <div class="column is-2" v-for="image in imagesList">
          <figure class="image is-128x128">
            <img :src="getNewUrl(image)">
          </figure>
        </div>
      </div>

      <div class="successMsg" v-if="successMsg !== ''">{{successMsg}}</div>
      <div class="errorMsg" v-if="errorMsg !== ''">An error has occurred:<br>{{errorMsg}}</div>
      <div class="errorMsg" v-if="itemsAdded && itemsAdded < minItems">Minimum {{minItems}} files need to be added to uploader. Please remove files and try again.</div>
    </form>
  </div>
</template>

<script>
  /* eslint-disable no-undef */
  require('es6-promise').polyfill()
  export default {
    props: {
      images: {
        type: String,
        default: ''
      },
      multiple: {
        type: Boolean,
        required: false,
        default: true
      },
      minItems: {
        type: Number,
        default: 1
      },
      method: {
        type: String,
        default: 'post'
      },
      postMeta: {
        type: [String, Array, Object],
        default: ''
      },
      successMessagePath: {
        type: String,
        required: true
      },
      errorMessagePath: {
        type: String,
        required: true
      },
      parent: Object
    },
    /*
     * The component's data.
     */
    data () {
      return {
        imagesList: [],
        imagesIN: [],
        items: [],
        itemsAdded: '',
        itemsNames: [],
        itemsTotalSize: '',
        formData: Object,
        successMsg: '',
        errorMsg: '',
        isLoaderVisible: false
      }
    },
    watch: {
      imagesIN: function (newVal) {
        this.imagesList = newVal.split(',')
      }
    },
    methods: {
      getNewUrl: function (url) {
        return window.IMAGE_GET + url
      },
      bytesToSize (bytes) {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
        if (bytes === 0) return 'n/a'
        let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
        if (i === 0) return bytes + ' ' + sizes[i]
        return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i]
      },
      onChange (e) {
        this.successMsg = ''
        this.errorMsg = ''
        this.formData = new FormData()
        let files = e.target.files || e.dataTransfer.files
        this.itemsAdded = files.length
        let fileSizes = 0
        for (let x in files) {
          if (!isNaN(x)) {
            let temp = {name: '', size: ''}
            this.items = e.target.files[x] || e.dataTransfer.files[x]
            temp.name = files[x].name
            temp.size = this.bytesToSize(files[x].size)
            this.itemsNames.push(temp)
            fileSizes += files[x].size
            this.formData.append('items', this.items)
            console.info(this.formData)
          }
        }
        this.itemsTotalSize = this.bytesToSize(fileSizes)
      },
      removeItems () {
        this.items = ''
        this.itemsAdded = ''
        this.itemsNames = []
        this.itemsTotalSize = ''
      },
      onSubmit () {
        var self = this
        self.isLoaderVisible = true
        if ((typeof self.postMeta === 'string' && self.postMeta !== '') ||
          (typeof self.postMeta === 'object' && Object.keys(self.postMeta).length > 0)) {
          self.formData.append('postMeta', self.postMeta)
        }
        if (self.method === 'put' || self.method === 'post') {
          self.parent.parent.$store.dispatch('UploadFile', self.formData).then((res) => {
            self.isLoaderVisible = false
            self.removeItems()
            self.$notify({
              title: '',
              message: '上传成功',
              type: 'success',
              duration: 2000
            })
            self.imagesIN = res.result.list
            self.parent.ruleForm.images = self.imagesIN
          }).catch(res => {
            self.$notify({
              title: '',
              message: '上传失败',
              type: 'error',
              duration: 2000
            })
            self.isLoaderVisible = false
            self.errorMsg = self.errorMessagePath
            self.removeItems()
          })
        } else {
          self.errorMsg = "This HTTP method is not allowed. Please use either 'put' or 'post' methods."
          self.removeItems()
        }
      }
    },
    mounted () {
      this.imagesIN = this.images
      this.imagesList = this.imagesIN.split(',')
    }
  }
</script>

<style>
  .uploadBox {
    position: relative;
    background: #eee;
    padding-top: 20px;
    padding-left: 30px;
    line-height: 20px;
  }

  .uploadBox .uploadBoxMain {
    position: relative;
    margin-right: 2em
  }

  .action {
    padding-top: 10px;
  }

  /* Drag and drop */
  .uploadBox .dropArea {
    position: relative;
    width: 100%;
    height: 100px;
    border: 5px dashed #00ADCE;
    text-align: center;
    font-size: 1.5em;
    padding-top: 40px
  }

  .uploadBox .dropArea input {
    position: absolute;
    cursor: pointer;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0
  }

  /* End drag and drop */
  /* Loader */
  .uploadBox .loader {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    opacity: 0.9
  }

  .uploadBox .loaderImg {
    border: 9px solid #eee;
    border-top: 9px solid #00ADCE;
    border-radius: 50%;
    width: 70px;
    height: 70px;
    animation: spin 1s linear infinite
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg)
    }
    100% {
      transform: rotate(360deg)
    }
  }

  /* End Loader */
  .uploadBox .errorMsg {
    font-size: 2em;
    color: #a94442
  }

  .uploadBox .successMsg {
    font-size: 2em;
    color: #3c763d
  }
</style>
