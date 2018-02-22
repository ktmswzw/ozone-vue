<template>
  <div class="columns">
    <div class="column is-one-third">
      <nav class="panel">
        <div class="panel-heading">
          <el-input
            placeholder="Search..."
            icon="search"
            v-model="listQuery.title"
            @keyup.enter.native="handleFilter"
            :on-icon-click="handleFilter">
          </el-input>
        </div>

        <a class="panel-block  is-active" v-for="(item, index) in list" :key="item" v-on:click="shwoImags(item.images)">
            <span class="panel-icon">
            <i class="fa" v-bind:class="[item.name.indexOf('AIR')!=-1 ? 'fa-cube' : 'fa-puzzle-piece']"
               aria-hidden="true"></i>
          </span>
            {{item.model}}&nbsp;
            <span class="tag is-success">{{item.name}}</span>
        </a>

        <a class="panel-block is-active" v-if="list.length==0" @click="goInquiry">
          No results found &nbsp;
          <span class="tag is-danger is-medium">
            <i class="fa fa-question-circle-o" aria-hidden="true"></i>
            Inquiry
          </span>

        </a>

      </nav>
    </div>
    <div class="column">
      <figure class="image is-50x50" v-if="images!=''" v-for="image in images.split(',')">
        <img class="mini-cover" :src="getNewUrl(image)" width="100%" height="400">
      </figure>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'webProducts',
    components: {},

    data () {
      return {
        list: [],
        images: '',
        listQuery: {
          page: 1,
          limit: 100,
          title: '',
          type: 0
        }
      }
    },

    computed: {},

    mounted () {
      this.getList('ListProduct')
    },
    methods: {
      handleFilter () {
        this.getList('ListProduct')
      },
      goInquiry () {
        this.$router.push({path: '/webInquiry'})
      },
      shwoImags (imgs) {
        this.images = imgs
      },
      getNewUrl: function (url) {
        return window.IMAGE_GET + url
      },
      getList (typename) {
        this.listLoading = true
        this.$store.dispatch(typename, this.listQuery).then((response) => {
          this.list = response.result.list
          this.listLoading = false
        }).catch(err => {
          console.error(err)
        })
      }
    }
  }
</script>


<style lang="scss" scoped>
  .is-title {
    padding-bottom: 20px;
  }

  .is-content {
    text-align: left;
  }

  .is-ven {
    padding: 0 10px 0 10px;
  }

  .is-bottom {
    padding-top: 10px;
  }
</style>
