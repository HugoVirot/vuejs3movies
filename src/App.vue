<template>
  <div id="app">
    <HeaderNav />

    <div v-if="$route.path == '/'">
      <!-- si la route est / (racine du site) -->
      <h1 class="pt-5 font-weight-light">
        Vos films préférés sont sur VueJS Movies !
      </h1>
      <MoviesList :movies="movies" :loading="loading" :errored="errored" />
    </div>

    <div v-else>
      <!-- si la route est différente de / -->
      <router-view v-bind:key="$route.fullPath"></router-view>
    </div>

    <FooterApp />
  </div>
</template>

<script>
import HeaderNav from "./components/template/HeaderNav.vue";
import FooterApp from "./components/template/FooterApp.vue";
import MoviesList from "./components/utils/MoviesList.vue";
import axios from "axios";

export default {
  name: "App",
  components: {
    HeaderNav,
    MoviesList,
    FooterApp,
  },
  data() {
    return {
      movies: [], // liste de films
      loading: true,
      errored: false,
    };
  },
  methods: {
    getAllMovies(component) {
      axios
        .get(
          "https://api.themoviedb.org/3/discover/movie/?api_key=3ea8988340d4ed715d28b9978346c29e&language=fr&sort_by=popularity.desc&page=1"
        )
        .then(function (response) {
          component.movies = response.data.results;
          console.log(component.movies);
          axios
            .get(
              "https://api.themoviedb.org/3/discover/movie/?api_key=3ea8988340d4ed715d28b9978346c29e&language=fr&sort_by=popularity.desc&page=2"
            )
            .then(function (response) {
              component.loading = false;
              response.data.results.forEach(function (movie) {
                component.movies.push(movie);
              });
              console.log(component.movies);
            })
            .catch(function () {
              component.errored = true;
            });
        })
        .catch(function () {
          component.errored = true;
        });
    },
  },
  created() {
    this.getAllMovies(this);
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Oxygen");

#app {
  font-family: "Oxygen", sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
