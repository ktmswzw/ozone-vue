<template>
  <section>
    <div class="block" style="padding: 100px">
      <a @click="openModalCard">
        <span class="tag is-danger is-medium">
          <i class="fa fa-question-circle-o" aria-hidden="true"></i>
          &nbsp;Inquiry
        </span>
      </a>
    </div>
  </section>
</template>
<script>

  import Vue from 'vue'
  import InquiryForm from '../auth/InquiryForm'

  const CardModalComponent = Vue.extend(InquiryForm)

  const openCardModal = (propsData = {
    visible: true
  }) => {
    return new CardModalComponent({
      el: document.createElement('div'),
      propsData
    })
  }

  export default {
    name: 'webInquiry',
    components: {},

    data () {
      return {
        cardModal: null
      }
    },

    computed: {},

    mounted () {
      this.openModalCard()
    },
    methods: {
      openModalCard () {
        const cardModal = (this.cardModal = openCardModal({
          title: 'Inquiry',
          create: true,
          parent: this,
          ruleForm: {
            id: '',
            name: '',
            question: '',
            email: '',
            time: Date,
            solved: false
          }
        }))
        cardModal.$children[0].active()
      }
    }
  }
</script>
