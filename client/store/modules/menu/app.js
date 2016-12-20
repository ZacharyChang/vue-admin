import { lazyLoading } from './lazyLoading'

export default {
  name: 'APP',
  meta: {
    icon: 'fa-android',
    expanded: false
  },

  children: [
    {
      name: 'APP Upgrade',
      path: '/application/upgrade',
      component: lazyLoading('application/Upgrade')
    },
    {
      name: 'APP Install',
      path: '/application/install',
      component: lazyLoading('application/Install')
    },
    {
      name: 'APP Uninstall',
      path: '/application/uninstall',
      component: lazyLoading('application/Uninstall')
    },
    {
      name: 'APP Use',
      path: '/application/use',
      component: lazyLoading('application/Use')
    },
    {
      name: 'APP Distribution',
      path: '/application/distribution',
      component: lazyLoading('application/Distribution')
    }
  ]
}
