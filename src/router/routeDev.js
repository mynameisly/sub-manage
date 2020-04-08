
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
        title: '竞赛信息'
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
        title: '新闻管理'
      }
    },
    {
      path: '/pub/notice',
      component: () => import('@/views/pub/notice/index'),
      meta: {
        title: '公告管理'
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
        title: '成果展示'
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
      name: 'treepage',
      path: '/treepage',
      component: resolve => require(['@/components/treepage/treepage.vue'], resolve),
      meta: {
        title: '树组件页'
      }
    },
    {
      name: 'OrganizationTree',
      path: '/organizationTree',
      component: resolve => require(['@/components/admin/OrganizationTree.vue'], resolve),
      meta: { title: '机构管理' }
    },
    {
      name: 'user',
      path: '/pub/user',
      component: resolve => require(['@/views/pub/user/index'], resolve),
      meta: { title: '用户管理' }
    },
    {
      name: 'SysAcl',
      path: '/sysAcl',
      component: resolve => require(['@/components/admin/SysAcl.vue'], resolve),
      meta: { title: '角色资源管理' }
    },
    // {
    //   name: 'SysMenu',
    //   path: '/sysMenu',
    //   component: resolve => require(['@/components/admin/SysMenu.vue'], resolve),
    //   meta: { title: '菜单管理' }
    // },
    {
      name: 'menu',
      path: '/pub/menu',
      component: resolve => require(['@/views/pub/menu/index'], resolve),
      meta: { title: '菜单管理' }
    },
    {
      name: 'SysResource',
      path: '/sysResource',
      component: resolve => require(['@/components/admin/SysResource.vue'], resolve),
      meta: { title: '资源管理' }
    },
    {
      name: 'SysRole',
      path: '/sysRole',
      component: resolve => require(['@/components/admin/SysRole.vue'], resolve),
      meta: { title: '角色管理' }
    },
    {
      name: 'sysRoleMap',
      path: '/sysRoleMap',
      component: resolve => require(['@/components/admin/SysRoleMap.vue'], resolve),
      meta: { title: '角色权限管理' }
    },
    {
      name: 'msg',
      path: '/msg',
      component: resolve => require(['@/components/message/msg.vue'], resolve),
      meta: { title: '建议留言' }
    },
    {
      name: 'messageboard',
      path: '/messageboard',
      component: resolve => require(['@/components/tablepage/messageboard.vue'], resolve),
      meta: {
        title: '增删改查'
      }
    },
    {
      name: 'ckeditor',
      path: '/ckeditor',
      component: resolve => require(['@/components/ckeditor/index.vue'], resolve),
      meta: { title: '文本编辑器' }
    }
];
//静态菜单
var menuDevList = [
    {
      icon: 'el-icon-setting',
      index: 1,
      title: '系统管理',
      subs: [
        {
          index: '/pub/user',
          title: '用户管理'
        },
        {
          index: '/pub/menu',
          title: '菜单管理'
        },
        {
          index: '/organizationTree',
          title: '机构管理'
        },
        {
          index: '/SysRole',
          title: '角色管理'
        },
        {
          index: '/SysResource',
          title: '资源管理'
        },
        {
          index: '/SysAcl',
          title: '角色资源管理'
        }
      ]
    },
    {
      icon: 'el-icon-tickets',
      index: 2,
      title: '系统首页',
      subs: [
        {
          index: '/pub/lunbo',
          title: '首页轮播'
        },
        {
          index: '/pub/news',
          title: '首页新闻'
        },
        {
          index: '/pub/info',
          title: '科研信息'
        },
        {
          index: '/pub/suc',
          title: '成果展示'
        },
        {
          index: '/pub/train',
          title: '竞赛培训'
        }
      ]
    },
    {
      icon: 'el-icon-date',
      index: 3,
      title: '二级菜单',
      subs: [
        {
          index: '/pub/newstwo',
          title: '新闻管理'
        },
        {
          index: '/pub/notice',
          title: '公告管理'
        },
        {
          index: '/pub/sign',
          title: '竞赛报名'
        },
        {
          index: '/pub/suctwo',
          title: '成果展示'
        },
        {
          index: '/pub/team',
          title: '团队建设'
        },
        {
          index: '/pub/line',
          title: '竞赛历程'
        },
        {
          index: '/pub/down',
          title: '资料下载'
        }
      ]
    },
    {
      icon: 'el-icon-view',
      index: 4,
      title: '基础模块',
      subs: [
        {
          index: '/ckeditor',
          title: '富文本编辑器'
        },
        {
          index: '/messageboard',
          title: '增删改查'
        },
        {
          index: '/msg',
          title: '建议留言'
        },
        {
          index: '/treepage',
          title: '树组件页'
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