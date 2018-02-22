<template>
  <info-all :typeName="typeName" :typeList="list"></info-all>
</template>

<script>
  import InfoAll from './Info'
  export default {
    name: 'webAbout',
    components: {
      InfoAll
    },
    data () {
      return {
        typeName: '',
        list: [
          {title: 'About us', description: `We are a 28 years ozone products manufacture experience,
                Committed to develop and study the new ozone tube sets and ozone sterilizer,
                custom ozone generator and multipurpose ozone sterilizer as your request,
                provide water treatment and air treatment solution.`},
          {title: 'After-sale service', description: `Every LONGFA ozone products is through at least 24 hours aging, then delivery.
                Any quality problem cause when transportation, it’s our duty to repair,
                and in the warranty period, the products is free repair,
                and we bear all the transportation costs.`},
          {title: 'Company Vision', description: `Make people’s life more clean!
                <br>
                Send your inquiries to us for a sample today and you will find we are the one you can trust.`}
        ]
      }
    }
  }
</script>
