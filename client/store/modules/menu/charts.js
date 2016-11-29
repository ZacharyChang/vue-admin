import { lazyLoading } from './lazyLoading'

export default {
  name: 'Charts',
  path: '/charts',
  meta: {
    icon: 'fa-bar-chart-o',
    expanded: false
  },
  component: lazyLoading('charts', true),

  children: [
    /*
    {
      name: 'CanvasGauges',
      path: 'canvas-gauges',
      component: lazyLoading('charts/CanvasGauges')
    },
    */
    {
      name: 'Chartist',
      path: 'chartist',
      component: lazyLoading('charts/Chartist')
    },
    {
      name: 'Chartjs',
      path: 'chartjs',
      component: lazyLoading('charts/Chartjs')
    },
    {
      name: 'Peity',
      path: 'peity',
      component: lazyLoading('charts/Peity')
    },
    {
      name: 'Plotly',
      path: 'plotly',
      component: lazyLoading('charts/Plotly')
    },
    {
      name: 'User Number',
      path: 'userNumber',
      component: lazyLoading('charts/UserNumber')
    },
    {
      name: 'User Register',
      path: 'userRegister',
      component: lazyLoading('charts/UserRegister')
    },
    {
      name: 'User Login',
      path: 'userLogin',
      component: lazyLoading('charts/UserLogin')
    },
    {
      name: 'User Online',
      path: 'userOnline',
      component: lazyLoading('charts/UserOnline')
    }
  ]
}
