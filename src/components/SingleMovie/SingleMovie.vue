<template>
  <div v-if="!getSingleMovieLoader">
    <Navbar :title="title"></Navbar>
    <div class="single-movie container">
      <div class="single-movie-image">
        <img :src="getSingleMovie.cover" :alt="getSingleMovie.title" />
      </div>
      <div class="single-movie-info">
        <h3>
          <strong>Name:</strong>
          {{getSingleMovie.title}}
        </h3>
        <h3>
          <strong>Release Country:</strong>
          {{getSingleMovie.releaseCountry}}
        </h3>
        <h3>
          <strong>Release Date:</strong>
          {{getSingleMovie.releaseDate}}
        </h3>
        <h3>
          <strong>Rating:</strong>
          {{getSingleMovie.rating}}
        </h3>
        <div style="font-size: 19px" class="likes">
          <font-awesome-icon style="color: darkblue" icon="thumbs-up"></font-awesome-icon>
          <small class="count"> likes</small>
          <font-awesome-icon style="color: red" icon="thumbs-down"></font-awesome-icon>
          <small class="count"> dislikes</small>
        </div>

        <div class="imdb-button" style="background: darkblue" @click="like(title)">+ Like</div>
        <div class="imdb-button">- Dislike</div>
      </div>
      <div class="favorite">
        <font-awesome-icon class="single-movie-favorite-icon" icon="heart"></font-awesome-icon>
      </div>
    </div>
    <div class="imdb-field">
      <div class="container">
        <a :href="'https://www.imdb.com/title/' + getSingleMovieIMDB" target="blank" class="imdb-button" style="background: darkseagreen">View on IMDB</a>
        <div class="imdb-button" style="background: darkseagreen" @click="$router.go(-1)">Back to Movies</div>
      </div>
    </div>
  </div>
  <div v-else class="loader">
    <Loader></Loader>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Loader from "../Loader/Loader";
import Navbar from "../Navbar/Navbar.vue";

export default {
  name: "singleMovie",
  components: {
    Navbar,
    Loader
  },
  data() {
    return {
      title: this.$route.params.name
    };
  },
  computed: {
    ...mapGetters(["getSingleMovie", "getSingleMovieIMDB", "getSingleMovieLoader"])
  },
  methods: {
    ...mapActions(["fetchSingleMovie", "like"])
  },
  created() {
    this.fetchSingleMovie(this.title);
  }
};
</script>

<style scoped>
.single-movie {
  display: flex;
  justify-content: space-between;
}

.single-movie-image {
  max-width: 300px;
  width: 100%;
  margin-top: -150px;
  z-index: 2;
}

.single-movie-image img {
  width: 100%;
}

.single-movie-info {
  line-height: 2;
}

.imdb-button {
  background: rgb(160, 3, 13);
  border: none;
  color: white;
  padding: 10px 25px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 15px 2px;
  cursor: pointer;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
}

.imdb-button:hover {
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
    0 17px 50px 0 rgba(0, 0, 0, 0.19);
}

.single-movie-favorite-icon {
  font-size: 35px;
  color: #888;
  cursor: pointer;
}

.count {
  margin: 0 10px;
}

.imdb-field {
  margin-top: 10px;
  padding: 5px 0;
  background: #eee;
}
</style>