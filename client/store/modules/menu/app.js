import { lazyLoading } from './lazyLoading'

export default {
  name: 'APP',
  path: '/application',
  meta: {
    icon: 'fa-android',
    expanded: false
  },
  component: lazyLoading('application', true),

  children: [
    {
      name: 'APP Upgrade',
      path: 'upgrade',
      component: lazyLoading('application/Upgrade')
    }
  ]
}
