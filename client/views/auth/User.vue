<template>
  <div class="box">
    <article>
      <div class="app-container calendar-list-container">
        <div class="filter-container">
          <div class="columns">
            <div class="column is-4">
              <p class="control has-icon">
                <input class="input" @keyup.enter.native="handleFilter" placeholder="昵称" v-model="listQuery.name"/>
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


            <el-table-column label="头像" >
            <template scope="scope">
              <figure class="image is-24x24" >
                <img class="mini-cover" :src="scope.row.avatar_url" width="100%" height="50">
              </figure>
            </template>
            </el-table-column>


            <el-table-column label="昵称">
              <template scope="scope">
                <span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.nickname}}</span>
              </template>
            </el-table-column>


            <el-table-column label="城市">
              <template scope="scope">
                <span class="link-type" v-html="scope.row.city"></span>
              </template>
            </el-table-column>

            <el-table-column label="性别">
              <template scope="scope">
                <span class="link-type" v-if="scope.row.gender==1">男</span>
                <span class="link-type" v-if="scope.row.gender==2">女</span>
              </template>
            </el-table-column>

            <el-table-column label="管理者">
              <template scope="scope">
                <span class="link-type" v-if="scope.row.manager==1">是</span>
                <span class="link-type" v-if="scope.row.manager==0">否</span>
              </template>
            </el-table-column>


            <el-table-column align="center" label="操作">
              <template scope="scope">
                <a @click="handleUpdate(scope.row)" title="设置为发布者"><i class="fa fa-cloud-upload" aria-hidden="true"></i></a>
                <a @click="handleDelete(scope.row)" title="取消发布资格"><i class="fa fa-cloud-download" aria-hidden="true"></i></a>
              </template>
            </el-table-column>

          </el-table>
        </div>
      </div>
    </article>
  </div>


</template>

<script>
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
      getList () {
        this.listLoading = true
        this.$store.dispatch('FetchUser', this.listQuery).then((response) => {
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
        this.listLoading = true
        row.manager = 1
        this.$store.dispatch('SetManager', row.id).then((response) => {
          this.$notify({
            title: '成功',
            message: response.result,
            type: 'success',
            duration: 2000
          })
          this.listLoading = false
        }).catch(err => {
          console.error(err)
        })
      },
      handleDelete (row) {
        this.listLoading = true
        row.manager = 0
        this.$store.dispatch('OffManager', row.id).then((response) => {
          this.$notify({
            title: '成功',
            message: response.result,
            type: 'success',
            duration: 2000
          })
          this.listLoading = false
        }).catch(err => {
          console.error(err)
        })
      }
    }
  }
</script>
