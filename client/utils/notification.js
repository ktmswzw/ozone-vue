/**
 * Created by vincent on 5/1/17.
 */
import Vue from 'vue'
import Notification from 'vue-bulma-notification'

const NotificationComponent = Vue.extend(Notification)

const openNotification = (propsData = {
  title: '',
  message: '',
  type: '',
  direction: '',
  duration: 4500,
  container: '.notifications'
}) => {
  return new NotificationComponent({
    el: document.createElement('div'),
    propsData
  })
}

export function notice (options) {
  openNotification({
    title: options.title ? options.title : '',
    message: options.message ? options.message : '',
    type: options.type ? options.type : 'success',
    duration: options.duration ? options.duration : 3000
  })
}
