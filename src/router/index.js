import Vue from 'vue'
import VueRouter from 'vue-router'
// 通过import .. from... 加载的组件, 无论组件有没有用到, 都会被加载进来
/* import Recommend from '../views/Recommend'
import Singer from '../views/Singer'
import Rank from '../views/Rank'
import Search from '../views/Search' */

// 按需加载组件
const Recommend = (resolve) => {
  import('../views/Recommend').then((module) => {
    resolve(module)
  })
}
const Rank = (resolve) => {
  import('../views/Rank').then((module) => {
    resolve(module)
  })
}
const Singer = (resolve) => {
  import('../views/Singer').then((module) => {
    resolve(module)
  })
}
const Search = (resolve) => {
  import('../views/Search').then((module) => {
    resolve(module)
  })
}
// 二级组件
const Detail = (resolve) => {
  import('../views/Detail').then((module) => {
    resolve(module)
  })
}

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/recommend' },
  {
    path: '/recommend',
    component: Recommend,
    children: [
      { path: '/recommend/detail/:id', component: Detail }
    ]
  },
  { path: '/singer', component: Singer },
  { path: '/rank', component: Rank },
  { path: '/search', component: Search }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
