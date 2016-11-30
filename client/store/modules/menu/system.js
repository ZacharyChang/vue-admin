import { lazyLoading } from './lazyLoading'

export default {
  name: 'System',
  path: '/system',
  meta: {
    icon: 'fa-cogs',
    expanded: false
  },
  component: lazyLoading('system', true),

  children: [
    {
      name: 'System Upgrade',
      path: 'upgrade',
      component: lazyLoading('system/Upgrade')
    }
  ]
}
