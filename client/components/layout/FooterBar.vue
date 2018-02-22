<template>
  <footer class="footer">
    <div class="container">
      <div class="content has-text-centered">
        <p class="social">
          <a :href="'https://github.com/ktmswzw'" target="_blank">
            <span class="icon">
              <i class="fa fa-github"></i>
            </span>
          </a>
        </p>
        <p>NINGBO LONGFA INDUSTRY & TRADE CO., LTD.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {

  data () {
    return this.$store.state.pkg
  }

}
</script>

<style lang="scss">
.footer {
  margin-left: 180px;

  .social a {
    border-bottom: none !important;
  }

  .fa.fa-heart {
    color: red;
  }
}
</style>
