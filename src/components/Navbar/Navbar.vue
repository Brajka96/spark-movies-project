<template>
  <header>
    <div class="top-nav">
      <div class="container">
        <h1 :style="{'text-align': alignTitle}">
          <font-awesome-icon icon="film"></font-awesome-icon>
          {{title}}
        </h1>
      </div>
    </div>
    <div v-if="path === '/'" class="container fixed-nav-container">
      <div class="fixed-nav">
        <div class=".sort">
          <font-awesome-icon class="navbar-icon" icon="sort" @click="fetchForSort"></font-awesome-icon>
        </div>
        <div class="grid-option">
          <font-awesome-icon class="navbar-icon" icon="th" @click="changeGridColumns"></font-awesome-icon>
        </div>
        <div class="favorite">
          <router-link to="/favourites" style="color: #fff">
            <font-awesome-icon class="navbar-icon" icon="heart"></font-awesome-icon>
          </router-link>
          <span class="badge">{{getFavouritesLength}}</span>
        </div>
      </div>
      <div class="search-bar">
        <input type="text" placeholder="Search Movie" v-model="search" />
        <font-awesome-icon class="navbar-icon" icon="search" @click="filterMovies"></font-awesome-icon>
      </div>
    </div>
  </header>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "navbar",
  props: ["title"],
  data() {
    return {
      search: "",
      path: this.$route.path
    };
  },
  computed: {
    ...mapGetters(["getFavouritesLength"]),
    alignTitle() {
      return this.path === "/" ? "left" : "right";
    }
  },
  methods: {
    ...mapActions(["changeGridColumns", "fetchForSort"]),
    filterMovies() {
      this.$store.dispatch("filterMovies", this.search);
    }
  },
  created() {
    //this.fetchFavourites();
  }
};
</script>

<style scoped>
header {
  position: relative;
  margin-bottom: 50px;
}

.top-nav {
  width: 100%;
  padding: 50px;
  text-align: left;
  background: #000000; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #434343,
    #000000
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #434343,
    #000000
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  color: #ffffff;
  font-size: 1.5rem;
}

.fixed-nav-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.fixed-nav {
  width: 100%;
  max-width: 200px;
  padding: 17px 22px;
  border: 1px solid black;
  border-radius: 25px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-self: flex-end;
  margin: 50px 0 20px 0;
  opacity: 0.8;
  background: #000000; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #434343,
    #000000
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #434343,
    #000000
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  color: #ffffff;
}

.navbar-icon {
  font-size: 22px;
  cursor: pointer;
}

.favorite {
  position: relative;
}

.badge {
  width: 15px;
  line-height: 15px;
  background: rgb(160, 3, 13);
  border-radius: 50%;
  text-align: center;
  font-size: 13px;
  border: 1px solid rgb(160, 3, 13);
  color: #ffffff;
  position: absolute;
  top: -5px;
  right: -11px;
}

.search-bar {
  display: flex;
  justify-content: space-between;
  width: 40%;
  align-self: flex-start;
  border-bottom: 1px solid #000;
  padding: 5px;
}

.search-bar input {
  border: 0;
  background: transparent;
  font-size: 15px;
  padding: 2px;
  font-style: italic;
  outline: none;
  width: 80%;
}
</style>