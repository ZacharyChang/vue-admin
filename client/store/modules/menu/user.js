import { lazyLoading } from './lazyLoading'

export default {
  name: 'User',
  meta: {
    icon: 'fa-user-circle-o',
    expanded: false
  },

  children: [
    {
      name: 'User Number',
      path: 'userNumber',
      component: lazyLoading('user/UserNumber')
    },
    {
      name: 'User Register',
      path: '/user/userRegister',
      component: lazyLoading('user/UserRegister')
    },
    {
      name: 'User Login',
      path: '/user/userLogin',
      component: lazyLoading('user/UserLogin')
    },
    {
      name: 'User Online',
      path: '/user/userOnline',
      component: lazyLoading('user/UserOnline')
    }
  ]
}
