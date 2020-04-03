
/**
 * 这里配置开发环境写死的路由和菜单，方便开发
 */

//静态路由
var routeDevList = [
    {
      path: '/aboutus',
      component: () => import('@/components/common/aboutus'),
      meta: {
        title: '关于我们'
      }
    },
    {
      path: '/pub/down',
      component: () => import('@/views/pub/down/index'),
      meta: {
        title: '资料下载'
      }
    },
    {
      path: '/pub/info',
      component: () => import('@/views/pub/info/index'),
      meta: {
        title: '首页学科竞赛信息'
      }
    },
    {
      path: '/pub/line',
      component: () => import('@/views/pub/line/index'),
      meta: {
        title: '竞赛历程'
      }
    },
    {
      path: '/pub/lunbo',
      component: () => import('@/views/pub/lunbo/index'),
      meta: {
        title: '首页轮播'
      }
    },
    {
      path: '/pub/menu',
      component: () => import('@/views/pub/menu/index'),
      meta: {
        title: '菜单管理'
      }
    },
    {
      path: '/pub/news',
      component: () => import('@/views/pub/news/index'),
      meta: {
        title: '首页新闻'
      }
    },
    {
      path: '/pub/newstwo',
      component: () => import('@/views/pub/newstwo/index'),
      meta: {
        title: '二级新闻'
      }
    },
    {
      path: '/pub/notice',
      component: () => import('@/views/pub/notice/index'),
      meta: {
        title: '二级公告'
      }
    },
    {
      path: '/pub/sign',
      component: () => import('@/views/pub/sign/index'),
      meta: {
        title: '竞赛报名'
      }
    },
    {
      path: '/pub/suc',
      component: () => import('@/views/pub/suc/index'),
      meta: {
        title: '首页成果展示'
      }
    },
    {
      path: '/pub/suctwo',
      component: () => import('@/views/pub/suctwo/index'),
      meta: {
        title: '二级成果展示'
      }
    },
    {
      path: '/pub/team',
      component: () => import('@/views/pub/team/index'),
      meta: {
        title: '团队建设'
      }
    },
    {
      path: '/pub/train',
      component: () => import('@/views/pub/train/index'),
      meta: {
        title: '首页竞赛培训'
      }
    },
    {
      path: '/pub/user',
      component: () => import('@/views/pub/user/index'),
      meta: {
        title: '用户管理'
      }
    }

];
//静态菜单
var menuDevList = [
    {
        icon: 'el-icon-date',
        index: Math.random()+'',
        title: '静态菜单',
        subs: [
            {
              index: '/pub/down',
              title: '资料下载'
            },
            {
              index: '/pub/info',
              title: '首页学科竞赛信息'
            },
            {
              index: '/pub/line',
              title: '竞赛历程'
            },
            {
              index: '/pub/lunbo',
              title: '首页轮播'
            },
            {
              index: '/pub/menu',
              title: '菜单管理'
            },
            {
              index: '/pub/news',
              title: '首页新闻'
            },
            {
              index: '/pub/newstwo',
              title: '二级新闻'
            },
            {
              index: '/pub/notice',
              title: '二级公告'
            },
            {
              index: '/pub/sign',
              title: '竞赛报名'
            },
            {
              index: '/pub/suc',
              title: '首页成果展示'
            },
            {
              index: '/pub/suctwo',
              title: '二级成果展示'
            },
            {
              index: '/pub/team',
              title: '团队建设'
            },
            {
              index: '/pub/train',
              title: '首页竞赛培训'
            },
            {
              index: '/pub/user',
              title: '用户管理'
            }
        ]
    }
]


var routeDev = {
    ROUTE_DEV: true,//是否写入静态路由（开关）
    routeDevList: routeDevList,
    MENU_DEV: true,//是否写入静态菜单（开关）
    menuDevList: menuDevList,
}
export default routeDev;