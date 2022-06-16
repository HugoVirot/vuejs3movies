<template>
  <div>
    <h1 class="pt-5 font-weight-light">Films américains</h1>
    <SortButtons :movies="movies" @sort-movies="sortMovies" />
    <MoviesList :movies="movies" :loading="loading" :errored="errored" />
  </div>
</template>

<script>
import MoviesList from "./utils/MoviesList.vue";
import axios from "axios";
import SortButtons from "./utils/SortButtons.vue";

export default {
  name: "AmericanMovies", // nom du composant
  components: {
    // composants enfants affichés
    MoviesList,
    SortButtons,
  },
  data() {
    // partie VIEW-MODEL = CONTROLLER dans Laravel
    return {
      // on déclare les variables accessibles dans la vue
      movies: [],
      loading: true,
      errored: false,
    };
  },
  methods: {
    sortMovies(movies) {
      this.movies = movies;
    },
    getAmericanMovies(component) {
      axios
        .get(
          "https://api.themoviedb.org/3/discover/movie/?api_key=3ea8988340d4ed715d28b9978346c29e&language=fr&certification_country=us&page=1"
        )
        .then(function (response) {
          component.movies = response.data.results;
          console.log(component.movies);
          axios
            .get(
              "https://api.themoviedb.org/3/discover/movie/?api_key=3ea8988340d4ed715d28b9978346c29e&certification_country=us&language=fr&page=2"
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
    this.getAmericanMovies(this);
  },
};
</script>
