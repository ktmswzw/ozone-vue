import Vue from 'vue'
import Message from 'vue-bulma-message'

const MessageComponent = Vue.extend(Message)

const openMessage = (propsData = {
  title: '',
  message: '',
  type: '',
  direction: '',
  duration: 1500,
  container: '.messages'
}) => {
  return new MessageComponent({
    el: document.createElement('div'),
    propsData
  })
}

export function msg (options) {
  openMessage({
    title: options.title ? options.title : '',
    message: options.message ? options.message : '',
    type: options.type ? options.type : 'success',
    duration: options.duration ? options.duration : 3000,
    showCloseButton: false
  })
}
