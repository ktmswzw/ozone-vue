<template>
  <info-all :typeName="typeName" :typeList="list"></info-all>
</template>

<script>
  import InfoAll from './Info'
  export default {
    name: 'webNews',
    components: {
      InfoAll
    },
    data () {
      return {
        typeName: 'ListNews',
        list: []
      }
    }
  }
</script>
