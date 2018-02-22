<template>
  <div class="content has-text-centered">
    <p class="is-title">
    </p>

    <div class="columns is-vcentered">
      <div class="column is-10 is-offset-1">
        <el-carousel  indicator-position="outside" height="500px">
          <el-carousel-item v-for="item in list()" :key="item">
            <div class="container">
              <figure class="image is-450x450" style="margin: 10px 0 20px 0">
                <!--<img class="mini-cover" :src="getNewUrl(item.images)">-->
                <progressive-img :src="getNewUrl(item.images)" />
              </figure>
              <span>{{ item.name }}</span>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>

    <p class="is-bottom">

    </p>

  </div>
</template>

<script>

  export default {
    name: 'webFactory',
    components: {
    },

    data () {
      return {
        listS: null,
        listQuery: {
          page: 1,
          limit: 100,
          name: undefined,
          type: 1
        }
      }
    },

    computed: {
    },

    created () {
      this.getList()
    },
    methods: {
      list () {
        return this.listS
      },
      getNewUrl: function (url) {
        return window.IMAGE_GET + url
      },
      getList () {
        this.$store.dispatch('ListProduct', this.listQuery).then((response) => {
          this.listS = response.result.list
        }).catch(err => {
          console.error(err)
        })
      }
    }
  }
</script>

<style>
  .is-title {
    padding-bottom: 20px;
  }
  .is-bottom {
    padding-top: 10px;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #ffffff;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #ffffff;
  }
</style>
