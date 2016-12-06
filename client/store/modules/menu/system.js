import { lazyLoading } from './lazyLoading'

export default {
  name: 'System',
  meta: {
    icon: 'fa-cogs',
    expanded: false
  },

  children: [
    {
      name: 'System Upgrade',
      path: '/system/upgrade',
      component: lazyLoading('system/Upgrade')
    },
    {
      name: 'System Distribution',
      path: '/system/distribution',
      component: lazyLoading('system/Distribution')
    }
  ]
}
