<template>
  <div class="card-container">
    <router-link :to="'/movies/' + movie.title">
      <img :src="movie.cover" :alt="movie.title" style="width:100%" />
    </router-link>
    <div class="card-info">
      <h3 class="card-title">{{movie.title}}</h3>
      <div class="card-favorite">
        <font-awesome-icon class="card-icon-heart" icon="heart" @click="addToFavourite(movie)"></font-awesome-icon>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "movieCard",
  props: ["movie"],
  data() {
    return {

    };
  },
  methods: {
    ...mapActions(['addToFavourite']),
  }
};
</script>

<style scoped>
.card-container {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 100%;
  height: 100%;
  background: #ffffff;
  display: flex;
  flex-direction: column;
}

.card-container:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.card-info {
  height: 100%;
  padding: 2px 16px 10px 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-favorite {
  align-self: flex-end;
}

.card-icon-heart {
  color: #888;
  font-size: 17px;
}
</style>