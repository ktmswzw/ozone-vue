<template>
  <info-all :typeName="typeName" :typeList="list"></info-all>
</template>

<script>
  import InfoAll from './Info'
  export default {
    name: 'webContact',
    components: {
      InfoAll
    },
    data () {
      return {
        typeName: '',
        list: [
          {title: 'Factory Address', description: `Wangchun Industry zone, Ningbo,China`},
          {title: 'Liaison office contact Address', description: `No.6 1 lane, Shatian Road, Taoyuan Street, Ningbo County, China 315100 ZJ.`},
          {title: 'TEL & FAX', description: `(+86-574)-82080668 & (+86-574)-82080667`},
          {title: 'Email', description: `Maintenance/technical services&nbsp;<a href='mailto:ozone-service@ozone-factory.com;?subject=Products  service'>ozone-service@ozone-factory.com</a><br>Sales department&nbsp;<a href='mailto:ozone-sales@ozone-factory.com;?subject=Products  inquiry'>ozone-sales@ozone-factory.com</a>`}
        ]
      }
    }
  }
</script>
