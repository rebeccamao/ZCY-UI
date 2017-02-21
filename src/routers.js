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
        path: 'message',
        name: 'message',
        component: require('../zcy/components/message/message.md')
      },
      {
        path: 'notification',
        name: 'notification',
        component: require('../zcy/components/notification/notification.md')
      }
    ]
  }
]
