<template>
  <div class="content has-text-centered">
    <p>
      <img width="200" src="~assets/logo.png" :alt="description">
    </p>

    <h1 class="is-title is-bold">{{ name.replace('-', ' ') }}</h1>

  </div>
</template>

<script>
  export default {
    name: 'home',
    data () {
      return this.$store.state.pkg
    },
    mounted () {
    }

  }
</script>

<style lang="scss" scoped>
  .is-title {
    text-transform: capitalize;
  }
</style>
