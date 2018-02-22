<template>
  <div class="content">
    <p class="is-title">
    </p>

    <div class="columns is-vcentered is-ven">
      <div class="column is-10 is-offset-1  is-success">
        <div v-for="(item, index) in list" :key="item">
          <message-html :title="item.title" :type="[index%3==0 ? 'success' : index%2==0 ? 'info' : 'primary']" :direction="'down'" :message="item.description" :duration="0">
          </message-html>
          <br>
        </div>
      </div>
    </div>

  </div>

</template>

<script>

  import MessageHtml from '../components/MessageHtml.vue'

  export default {
    name: 'InfoAll',
    components: {
      MessageHtml
    },

    data () {
      return {
        list: null,
        listQuery: {
          page: 1,
          limit: 100,
          title: undefined,
          name: undefined
        }
      }
    },
    props: {
      typeName: {
        type: String,
        default: 'o',
        required: false
      },
      typeList: {
        type: Array,
        default: [],
        required: false
      }
    },
    computed: {},
    mounted () {
      if (this.typeList.length === 0) {
        this.getList(this.typeName)
      } else {
        this.list = this.typeList
      }
    },
    methods: {
      getList (typename) {
        this.$store.dispatch(typename, this.listQuery).then((response) => {
          this.list = response.result.list
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
