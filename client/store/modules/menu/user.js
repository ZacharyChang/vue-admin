import { lazyLoading } from './lazyLoading'

export default {
  name: 'User',
  path: '/user',
  meta: {
    icon: 'fa-user-circle-o',
    expanded: false
  },
  component: lazyLoading('user', true),

  children: [
    {
      name: 'User Number',
      path: 'userNumber',
      component: lazyLoading('user/UserNumber')
    },
    {
      name: 'User Register',
      path: 'userRegister',
      component: lazyLoading('user/UserRegister')
    },
    {
      name: 'User Login',
      path: 'userLogin',
      component: lazyLoading('user/UserLogin')
    },
    {
      name: 'User Online',
      path: 'userOnline',
      component: lazyLoading('user/UserOnline')
    }
  ]
}
