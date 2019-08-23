<template>
  <div v-if="!getFavouriteLoader">
    <Navbar :title="title"></Navbar>
    <div class="container movie-list">
      <div class="card" v-for="(movie, index) in getFavourites" :key="index">
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
import MovieCard from "../Movies/MovieCard";
import Navbar from "../Navbar/Navbar.vue";
import Loader from "../Loader/Loader";

export default {
  name: "favourites",
  components: {
    MovieCard,
    Navbar,
    Loader
  },
  data() {
    return {
      title: "Favourites"
    };
  },
  computed: {
    ...mapGetters(["getFavouriteLoader", "getFavourites"])
  },
  methods: {
    ...mapActions(["fetchFavourites"])
  },
  created() {
    this.fetchFavourites();
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
  grid-template-columns: repeat(auto-fit, minmax(100px, 200px));
  grid-gap: 20px;
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