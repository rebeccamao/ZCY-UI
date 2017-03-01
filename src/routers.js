export default [
  {
    path: '/',
    name: 'index',
    redirect: '/components/message'
  },
  {
    path: '/components',
    component: require('./views/components.vue'),
    children: [
      {
        path: 'button',
        name: 'button',
        component: require('../zcy/components/button/button.md')
      },
      {
        path: 'message',
        name: 'message',
        component: require('../zcy/components/message/message.md')
      },
      {
        path: 'modal',
        name: 'modal',
        component: require('../zcy/components/modal/modal.md')
      },
      {
        path: 'notification',
        name: 'notification',
        component: require('../zcy/components/notification/notification.md')
      },
      {
        path: 'progress',
        name: 'progress',
        component: require('../zcy/components/progress/progress.md')
      },
      {
        path: 'popover',
        name: 'popover',
        component: require('../zcy/components/popover/popover.md')
      },
      {
        path: 'tooltip',
        name: 'tooltip',
        component: require('../zcy/components/tooltip/tooltip.md')
      },
      {
        path: 'upload',
        name: 'upload',
        component: require('../zcy/components/upload/upload.md')
      }
    ]
  }
]
