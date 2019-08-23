<template>
  <div v-if="!getMoviesLoader">
    <Navbar :title="title"></Navbar>
    <div class="container movie-list" :class="gridClass">
      <div class="card" v-for="(movie, index) in getMovies" :key="index">
          <MovieCard :movie="movie"></MovieCard>
      </div>
    </div>
  </div>
  <div v-else class="loader">
    <Loader></Loader>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MovieCard                  from "./MovieCard";
import Navbar                     from "../Navbar/Navbar.vue";
import Loader                     from "../Loader/Loader";

export default {
  name: "movies",
  components: {
    MovieCard,
    Navbar,
    Loader
  },
  data() {
    return {
      title: "Vue Movies"
    };
  },
  computed: {
    ...mapGetters(["getMovies", "getMoviesLoader", "getGridColumns"]),
    gridClass() {
      return this.getGridColumns === 5 ? 'five-column-grid' : 'one-column-grid'
    }
  },
  methods: {
    ...mapActions(["fetchMovies"])
  },
  created() {
    this.fetchMovies();
  }
};
</script>

<style scoped>
.movie-list {
  position: relative;
  -webkit-animation-name: animateLeft;
  -webkit-animation-duration: 1s;
  animation-name: animateLeft;
  animation-duration: 1s;
  display: grid;
  grid-gap: 20px;
}

.one-column-grid {
  grid-template-columns: 1fr;
  max-width: 300px;
  width: 100%;
}

.five-column-grid {
  grid-template-columns: repeat(5, 1fr);
}

@-webkit-keyframes animateLeft {
  from {
    left: -100px;
    opacity: 0;
  }
  to {
    left: 0px;
    opacity: 1;
  }
}

@keyframes animateLeft {
  from {
    left: -100px;
    opacity: 0;
  }
  to {
    left: 0;
    opacity: 1;
  }
}
</style>