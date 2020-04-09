import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter);
const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: resolve => require(['@/components/login.vue'], resolve),
      meta: {
        title: '登录'
      }
    },
    {
      path: '/register',
      component: resolve => require(['@/components/register.vue'], resolve),
      meta: {
        title: '注册'
      }
    },
    {
      path: '/404',
      component: resolve => require(['../components/common/404.vue'], resolve)
    },
    {
      path: '/403',
      component: resolve => require(['../components/common/403.vue'], resolve)
    },
    {
      path: '*',
      redirect: '/404'
    }
  ],
  mode: 'history'
});

/**
 * 请求拦截器,添加请求头token
 */
axios.interceptors.request.use(
  config => {
    console.log('>>>请求url:', config.url);
    var headers = config.headers;
    if (sessionStorage.getItem("token")) {
      headers.token = sessionStorage.getItem("token");
    }
    return config;
  },
  error => {
    console.log('>>>请求异常:', error.message);
    return Promise.reject(error);
  });
//接口请求超时设置
axios.defaults.timeout = 5000;//毫秒
/**
 * 应答拦截器,添加请求头token
 */
axios.interceptors.response.use(function (response) {
  // Do something with response data
  console.log('<<<请求成功');
  return response;
}, error => {
  // Do something with response error
  console.log('<<<异常信息:', error.message);
  return Promise.reject(error);
});


//全局路由守卫
// router.beforeEach((to, from, next) => {
//   //debugger
//   console.log('跳转到:', to.fullPath);
//   if (to.path == '/index') {
//     next();
//   }
//   else {
//     var token = sessionStorage.getItem('token');
//     //如果没登录,都导向登录页
//     if (!token) {
//       if (to.path !== '/login') {
//         next({ path: '/login' })
//       }
//       else {
//         next();
//       }
//     }
//     else {
//       next();
//     }
//   }
// })

export default router
