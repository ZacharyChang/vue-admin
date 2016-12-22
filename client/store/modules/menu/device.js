import { lazyLoading } from './lazyLoading'

export default {
  name: 'Device',
  meta: {
    icon: 'fa-user-circle-o',
    expanded: false
  },

  children: [
    {
      name: 'Device Register',
      path: '/device/register',
      component: lazyLoading('device/Register')
    },
    {
      name: 'Device Login',
      path: '/device/login',
      component: lazyLoading('device/Login')
    },
    {
      name: 'Device Online',
      path: '/device/online',
      component: lazyLoading('device/Online')
    }
  ]
}
