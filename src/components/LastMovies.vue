<template>
  <div>
    <h1 class="pt-5 font-weight-light">Films de 2021</h1>
    <SortButtons :movies="movies" @sort-movies="sortMovies" />
    <MoviesList :movies="movies" :loading="loading" :errored="errored" />
  </div>
</template>

<script>
import MoviesList from "./utils/MoviesList.vue";
import axios from "axios";
import SortButtons from "./utils/SortButtons.vue";

export default {
  name: "LastMovies",
  components: {
    MoviesList,
    SortButtons,
  },
  data() {
    return {
      movies: [],
      loading: true,
      errored: false,
      message: "Films français du moment",
    };
  },
  methods: {
    sortMovies(movies) {
      this.movies = movies;
    },
    getLastMovies(component) {
      axios
        .get(
          "https://api.themoviedb.org/3/discover/movie/?api_key=3ea8988340d4ed715d28b9978346c29e&language=fr&primary_release_year=2021&sort_by=popularity.desc&page=1"
        )
        .then(function (response) {
          component.movies = response.data.results;
          console.log(component.movies);
          axios
            .get(
              "https://api.themoviedb.org/3/discover/movie/?api_key=3ea8988340d4ed715d28b9978346c29e&language=fr&primary_release_year=2021&sort_by=popularity.desc&page=2"
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
    this.getLastMovies(this);
  },
};
</script>