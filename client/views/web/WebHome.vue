<template>
  <section class="hero is-bold app-navbar_web animated">
    <div class="hero-head" style="z-index: 9999">
      <nav class="nav">
        <div class="nav-left">
          <a class="nav-item hero-brand" href="/#/login">
            <img src="~assets/logo.png" :alt="'LongFa'">
            <tooltip :label="'LongFa'" placement="right" type="success" size="small" :no-animate="true" :always="true"
                     :rounded="true">
              <div class="is-hidden-mobile">
                <span class="vue">Ozone</span><strong class="admin">Factory</strong>
              </div>
            </tooltip>
          </a>
        </div>
        <span class="nav-toggle" @click="toggleMemu()">
          <span></span>
          <span></span>
          <span></span>
        </span>
        <div class="nav-right nav-menu" v-bind:class="{ 'is-active': show}">
          <a class="nav-item is-tab" v-bind:class="{ 'is-active': homeActive}" @click="goHome">
            Home
          </a>
          <a class="nav-item is-tab" v-bind:class="{ 'is-active': productsActive}" @click="goProducts">
            Products
          </a>
          <a class="nav-item is-tab" v-bind:class="{ 'is-active': newsActive}" @click="goNews">
            News
          </a>
          <a class="nav-item is-tab" v-bind:class="{ 'is-active': inquiryActive}" @click="goInquiry">
            Inquiry
          </a>
          <a class="nav-item is-tab" v-bind:class="{ 'is-active': aboutActive}" @click="goAbout">
            About us
          </a>
          <a class="nav-item is-tab" v-bind:class="{ 'is-active': contactActive}" @click="goContact">
            Contact
          </a>
        </div>
      </nav>
    </div>
    <transition
      mode="out-in"
      enter-active-class="fadeIn"
      leave-active-class="fadeOut"
      appear>
      <router-view class="animated" style="padding: 10px"></router-view>
    </transition>


    <footer style="padding-bottom: 20px;font-size: smaller">
      <div class="">
        <div class="content">
          <p id="copyright" > NINGBO LONGFA INDUSTRY & TRADE CO., LTD.</p>
          <p>&copy; 2008~2017 </p>
        </div>
      </div>
    </footer>


  </section>

</template>

<script>
  import Tooltip from 'vue-bulma-tooltip'

  export default {
    name: 'webHome',
    components: {
      Tooltip
    },

    data () {
      return {
        show: false,
        productsActive: false,
        newsActive: false,
        inquiryActive: false,
        aboutActive: false,
        contactActive: false,
        homeActive: true
      }
    },

    methods: {
      disableAll () {
        this.productsActive = false
        this.newsActive = false
        this.inquiryActive = false
        this.aboutActive = false
        this.contactActive = false
        this.homeActive = false
      },
      goNews () {
        this.$router.push({path: '/webNews'})
        this.disableAll()
        this.newsActive = true
      },
      goHome () {
        this.$router.push({path: '/webFactory'})
        this.disableAll()
        this.homeActive = true
      },
      goInquiry () {
        this.$router.push({path: '/webInquiry'})
        this.disableAll()
        this.inquiryActive = true
      },
      goContact () {
        this.$router.push({path: '/webContact'})
        this.disableAll()
        this.contactActive = true
      },
      goAbout () {
        this.$router.push({path: '/webAbout'})
        this.disableAll()
        this.aboutActive = true
      },
      goProducts () {
        this.$router.push({path: '/webProducts'})
        this.disableAll()
        this.productsActive = true
      },
      toggleMemu () {
        this.show = !this.show
      }
    }
  }
</script>

<style lang="scss">
  @import '~bulma/sass/utilities/variables';

  .app-navbar_web {
    position: static;
    min-width: 100%;
    min-height: 99%;
    text-align: center;
    z-index: 1024;
    box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);

    .container {
      margin: auto 10px;
    }

    .nav-right {
      align-items: stretch;
      flex: 1;
      justify-content: flex-end;
      overflow: hidden;
      overflow-x: auto;
      white-space: nowrap;
    }
  }

  .hero-brand {
    .vue {
      margin-left: 10px;
      color: #36AC70;
    }
    .admin {
      color: #28374B;
    }
  }
</style>


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
