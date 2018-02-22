<template>
  <div class="box">
    <article>
      <div class="app-container calendar-list-container">
        <div class="filter-container">
          <div class="columns">
            <div class="column is-4">
              <p class="control has-icon">
                <input class="input" @keyup.enter.native="handleFilter" placeholder="标题" v-model="listQuery.title"/>
                <span class="icon is-small"><i class="fa fa-globe"></i></span>
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


            <el-table-column label="标题">
              <template scope="scope">
                <span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.title}}</span>
              </template>
            </el-table-column>

            <el-table-column label="描述">
              <template scope="scope">
                <span class="link-type" v-html="scope.row.description"></span>
              </template>
            </el-table-column>


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
  import NewsForm from './NewsForm'

  const CardModalComponent = Vue.extend(NewsForm)

  const openCardModal = (propsData = {
    visible: true
  }) => {
    return new CardModalComponent({
      el: document.createElement('div'),
      propsData
    })
  }

  export default {
    name: 'NewsTable',
    data () {
      return {
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 5,
          title: undefined
        },
        cardModal: null,
        importanceOptions: [1, 2, 3],
        showAuditor: false,
        tableKey: 0
      }
    },
    created () {
      this.getList()
    },
    filters: {},
    methods: {
      openModalCard () {
        const cardModal = (this.cardModal = openCardModal({
          title: '新增',
          create: true,
          parent: this,
          ruleForm: {
            id: '',
            title: '',
            productId: '',
            description: '',
            time: Date
          }
        }))
        cardModal.$children[0].active()
      },
      getList () {
        this.listLoading = true
        this.$store.dispatch('ListNews', this.listQuery).then((response) => {
          this.list = response.result.list
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
          ruleForm: row
        }))
        cardModal.$children[0].active()
      },
      handleDelete (row) {
        this.listLoading = true
        this.$store.dispatch('DeleteNews', row.id).then((response) => {
          this.$notify({
            title: '成功',
            message: response.result,
            type: 'success',
            duration: 2000
          })
          const index = this.list.indexOf(row)
          this.list.splice(index, 1)
          this.listLoading = false
        }).catch(err => {
          console.error(err)
        })
      },
      handleDownload () {
        require.ensure([], () => {
          const {export_json_to_excel} = require('../../vendor/Export2Excel')
          const tHeader = ['标题', '描述', '时间']
          const filterVal = ['title', 'description', 'time']
          const data = formatJson(filterVal, this.list)
          export_json_to_excel(tHeader, data, '新闻')
        })
      }
    }
  }
</script>
