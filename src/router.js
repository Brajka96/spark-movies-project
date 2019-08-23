import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Movies      = () => import(/* webpackChunkName: "movies" */ './components/Movies/Movies');
const SingleMovie = () => import(/* webpackChunkName: "single-movie" */ './components/SingleMovie/SingleMovie');
const Favourites  = () => import(/* webpackChunkName: "favourites" */ './components/Favourites/Favourites');

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'movies',
      component: Movies
    },
    {
      path: '/movies/:name',
      name: 'singleMovie',
      component: SingleMovie,
      props: true
    },
    {
      path: '/favourites',
      name: 'favourites',
      component: Favourites,
    },
   
  ]
})
