<template>
  <div class="box">
    <article>
      <div class="app-container calendar-list-container">
        <div class="filter-container">
          <div class="columns">
            <div class="column is-4">
              <p class="control has-icon">
                <input class="input" @keyup.enter.native="handleFilter" placeholder="名称或邮箱" v-model="listQuery.title"/>
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


            <el-table-column label="昵称">
              <template scope="scope">
                <span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.name}}</span>
              </template>
            </el-table-column>

            <el-table-column label="邮箱">
              <template scope="scope">
                <span class="link-type" >{{scope.row.email}}</span>
              </template>
            </el-table-column>

            <el-table-column label="问题">
              <template scope="scope">
                <span class="link-type" v-html="scope.row.question"></span>
              </template>
            </el-table-column>


            <el-table-column align="center" label="时间">
              <template scope="scope">
                <el-icon name="time"></el-icon>
                <span>{{scope.row.time}}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="状态">
              <template scope="scope">
                <span v-if="scope.row.solved" class="is-success">已处理</span>
                <span v-else class="is-danger ">未处理</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="操作">
              <template scope="scope">
                <a><i class="el-icon-edit" @click="handleUpdate(scope.row)"></i></a>
                &nbsp;
                <a><i class="el-icon-star-on" @click="handleSovled(scope.row)"></i></a>
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
  import InquiryForm from './InquiryForm'

  const CardModalComponent = Vue.extend(InquiryForm)

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
          name: undefined
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
          title: 'New Inquiry',
          create: true,
          parent: this,
          ruleForm: {
            id: '',
            name: '',
            question: '',
            email: '',
            time: Date,
            solved: false
          }
        }))
        cardModal.$children[0].active()
      },
      getList () {
        this.listLoading = true
        this.$store.dispatch('FetchList', this.listQuery).then((response) => {
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
      handleSovled (row) {
        this.listLoading = true
        this.$store.dispatch('Solved', row.id).then((response) => {
          this.$notify({
            title: 'OK',
            message: '已标记处理完成',
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
