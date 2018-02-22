<template>
  <div class="box">
    <article>
      <div class="app-container calendar-list-container">
        <div class="filter-container">
          <div class="columns">
            <div class="column is-4">
              <p class="control has-icon">
                <input class="input" @keyup.enter.native="handleFilter" placeholder="名称或者型号" v-model="listQuery.title"/>
                <span class="icon is-small"><i class="fa fa-search"></i></span>
              </p>
            </div>

            <div class="column is-4">
              <a class="button" @click="handleFilter">
                  <span class="icon">
                    <i class="fa fa-search" aria-hidden="true"></i>
                  </span>
                <span>搜索</span>
              </a>
              <a class="button" @click="openModalCard">
                  <span class="icon">
                    <i class="fa fa-newspaper-o" aria-hidden="true"></i>
                  </span>
                <span>添加</span>
              </a>

              <a class="button" @click="handleDownload">
                  <span class="icon">
                    <i class="fa fa-file-excel-o" aria-hidden="true"></i>
                  </span>
                <span>导出</span>

              </a>
            </div>
            <div class="column is-4">
              <div v-show="!listLoading" class="pagination-container">
                <el-pagination small @size-change="handleSizeChange" @current-change="handleCurrentChange"
                               :current-page="listQuery.page" :page-sizes="[10,20,30, 50]"
                               :page-size="listQuery.limit" layout="prev, pager, next" :total="total">
                </el-pagination>
              </div>
            </div>
          </div>


          <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row
                    style="width: 100%">
            <el-table-column label="名称" width="150">
              <template scope="scope">
                <span class="link-type" >{{scope.row.name}}</span>
              </template>
            </el-table-column>

            <el-table-column label="型号" v-if="listQuery.type==0">
              <template scope="scope">
                <span class="link-type" >{{scope.row.model}}</span>
              </template>
            </el-table-column>

            <el-table-column label="价格" v-if="listQuery.type==0">
              <template scope="scope">
                <span class="link-type" >{{scope.row.price}}</span>
              </template>
            </el-table-column>

            <el-table-column label="描述" v-if="listQuery.type==0">
              <template scope="scope">
                <span class="link-type" v-html="scope.row.description"></span>
              </template>
            </el-table-column>

            <!--<el-table-column label="图片" >-->
              <!--<template scope="scope">-->
                <!--<figure class="image is-30x30" >-->
                  <!--<img class="mini-cover" :src="getNewUrl(scope.row.images)" width="100%" height="50">-->
                  <!--&lt;!&ndash;<progressive-img :src="getNewUrl(image)" />&ndash;&gt;-->
                <!--</figure>-->
              <!--</template>-->
            <!--</el-table-column>-->

            <el-table-column align="center" label="时间">
              <template scope="scope">
                <el-icon name="time"></el-icon>
                <span>{{scope.row.time}}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="操作">
              <template scope="scope">
                <a><i class="el-icon-edit" @click="handleUpdate(scope.row)"></i></a>
                &nbsp;
                <a><i class="el-icon-delete" @click="handleDelete(scope.row)"></i></a>
              </template>
            </el-table-column>

          </el-table>
        </div>
      </div>
    </article>
  </div>


</template>

<script>
  import { formatJson } from '../../utils'
  import Vue from 'vue'
  import ProductForm from './ProductForm'

  const CardModalComponent = Vue.extend(ProductForm)

  const openCardModal = (propsData = {
    visible: true
  }) => {
    return new CardModalComponent({
      el: document.createElement('div'),
      propsData
    })
  }

  export default {
    name: 'ProductTable',
    data () {
      return {
        listS: null,
        total: null,
        listLoading: false,
        listQuery: {
          page: 1,
          limit: 5,
          title: undefined,
          type: 0
        },
        cardModal: null,
        tableKey: 0
      }
    },
    watch: {
      type: function (newVal) {
//        this.getList()
      }
    },
    computed: {
      list () {
        return this.listS
      },
      type () {
        this.listS = []
        this.listQuery.type = this.$store.state.product.type
        return this.$store.state.product.type
      }
    },
    filters: {},
    methods: {
      getNewUrl: function (url) {
        return window.IMAGE_GET + url
      },
      openModalCard () {
        const cardModal = (this.cardModal = openCardModal({
          title: '新增',
          create: true,
          parent: this
        }))
        cardModal.$children[0].active()
      },
      getList () {
        this.listLoading = true
        this.$store.dispatch('ListProduct', this.listQuery).then((response) => {
          this.listS = response.result.list
          this.total = response.result.total
          this.listLoading = false
        }).catch(err => {
          console.error(err)
        })
      },
      reflash () {
        this.listLoading = false
        this.listLoading = true
      },
      handleFilter () {
        this.getList()
      },
      handleSizeChange (val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange (val) {
        this.listQuery.page = val
        this.getList()
      },
      handleUpdate (row) {
        const cardModal = (this.cardModal = openCardModal({
          title: '修改',
          create: false,
          parent: this,
          ruleOut: row
        }))
        cardModal.$children[0].active()
      },
      handleDelete (row) {
        this.listLoading = true
        this.$store.dispatch('DeleteProduct', row.id).then((response) => {
          this.$notify({
            title: '成功',
            message: response.result,
            type: 'success',
            duration: 2000
          })
          const index = this.listS.indexOf(row)
          this.listS.splice(index, 1)
          this.listLoading = false
        }).catch(err => {
          console.error(err)
        })
      },
      handleDownload () {
        require.ensure([], () => {
          const {export_json_to_excel} = require('../../vendor/Export2Excel')
          if (this.type === 0) {
            const tHeader = ['名称', '型号', '描述', '价格', '时间']
            const filterVal = ['name', 'model', 'description', 'price', 'time']
            const data = this.formatJson(filterVal, this.listS)
            export_json_to_excel(tHeader, data, '产品')
          } else {
            const tHeader = ['名称', '描述', '时间']
            const filterVal = ['name', 'description', 'time']
            const data = formatJson(filterVal, this.listS)
            export_json_to_excel(tHeader, data, '工厂')
          }
        })
      }
    },
    beforeUpdate () {
//      console.info('beforeUpdate---' + this.listQuery.type)
    },
    updated () {
//      console.info('updated--' + this.listQuery.type)
    },
    activated () {
//      console.info('activated--' + this.listQuery.type)
    }
  }
</script>
