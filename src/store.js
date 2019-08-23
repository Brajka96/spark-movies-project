import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import VueAxios from 'vue-axios'
import db from './firebaseConfig'

Vue.use(Vuex);
Vue.use(VueAxios, axios)

export default new Vuex.Store({
  state: {
    movies           : [],
    singleMovie      : '',
    singleMovieIMDB  : '',
    favourites       : '',
    favouritesLength : 0,
    moviesLoader     : false,
    singleMovieLoader: false,
    favouriteLoader  : false,
    gridColumns      : 1,
  },
  getters: {
    getMovies           : state => state.movies,
    getSingleMovie      : state => state.singleMovie,
    getSingleMovieIMDB  : state => state.singleMovieIMDB,
    getFavourites       : state => state.favourites,
    getFavouritesLength : state => state.favouritesLength,
    getMoviesLoader     : state => state.moviesLoader,
    getSingleMovieLoader: state => state.singleMovieLoader,
    getFavouriteLoader  : state => state.favouriteLoader,
    getGridColumns      : state => state.gridColumns,
  },
  mutations: {
    storeMovies            : (state, data) => state.movies = data,
    storeSingleMovie       : (state, payload) => {
      state.singleMovie     = Object.values(payload.movies).find(movie => movie.title === payload.title);
      state.singleMovieIMDB = Object.keys(payload.movies).find(movie => payload.movies[movie].title === payload.title)
    },
    storeFilteredMovies    : (state, data) => {
      state.movies = Object.values(data.movies).filter(movie => movie.title.toLowerCase().indexOf(data.search) > -1);
    },
    storeFavourites        : (state, data) => {
      state.favourites = data.docs.map(doc => {
        return doc.data();
      })
      state.favouritesLength = data.docs.length;
    },
    sortByYear             : (state, data) => {
      state.movies = data.sort((a,b) => {
        parseInt(new Date(a.releaseDate)) - parseInt(new Date(b.releaseDate))
      })
    },
    toggleMoviesLoader     : (state, loader = false) => {
      state.moviesLoader = loader;
    },
    toggleSingleMovieLoader: (state, loader = false) => {
      state.singleMovieLoader = loader;
    },
    toggleFavouriteLoader  : (state, loader = false) => {
      state.favouriteLoader = loader;
    },
    toggleGridColumns      : state => state.gridColumns = state.gridColumns === 1 ? 5 : 1,
  },
  actions: {
    async fetchMovies({ commit }) {
      commit('toggleMoviesLoader', true)
      await axios.get('https://output.jsbin.com/wokedotuki.json')
        .then(response => {
            commit('toggleMoviesLoader')
            commit('storeMovies', response.data.data);
        })
    },
    async fetchSingleMovie({ commit }, title) {
      commit('toggleSingleMovieLoader', true)
      await axios.get('https://output.jsbin.com/wokedotuki.json')
        .then(response => {
          commit('toggleSingleMovieLoader');
          commit('storeSingleMovie', { movies: response.data.data, title });
        })
    },
    async filterMovies({ commit }, search) {
      commit('toggleMoviesLoader', true)
      await axios.get('https://output.jsbin.com/wokedotuki.json')
        .then(response => {
          commit('toggleMoviesLoader')
          commit('storeFilteredMovies', { movies: response.data.data, search });
        })
    },
    async addToFavourite({ commit }, movie) {
      db.collection('favourites').add(movie).then(res => {
        console.log('added');
      })
    },
    async fetchFavourites({ commit }) {
      commit('toggleFavouriteLoader', true)
      db.collection("favourites").get().then((querySnapshot) => {
        commit('toggleFavouriteLoader')
        commit('storeFavourites', querySnapshot);
      });
    },

    async fetchForSort({ commit }) {
      commit('toggleMoviesLoader', true)
      await axios.get('https://output.jsbin.com/wokedotuki.json')
        .then(response => {
            commit('toggleMoviesLoader')
            commit('sortByYear', response.data.data);
        })
    },
    
    changeGridColumns({commit}) {
      commit('toggleGridColumns');
    }
    
  }
})
