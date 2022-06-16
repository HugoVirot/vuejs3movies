<template>
  <div>
    <h1 class="pt-5 font-weight-light">Top 50 : films les mieux notés</h1>
    <SortButtons :movies="movies" @sort-movies="sortMovies" />
    <Top50MoviesList :movies="movies" :loading="loading" :errored="errored" />
  </div>
</template>

<script>
import Top50MoviesList from "./utils/Top50MoviesList.vue";
import axios from "axios";
import SortButtons from "./utils/SortButtons.vue";

export default {
  name: "LastMovies",
  components: {
    SortButtons,
    Top50MoviesList,
  },
  data() {
    return {
      movies: [],
      loading: true,
      errored: false,
    };
  },
  methods: {
    sortMovies(movies) {
      this.movies = movies;
    },
    getTopRatedMovies(component) {
      axios
        .get(
          "https://api.themoviedb.org/3/discover/movie/?api_key=3ea8988340d4ed715d28b9978346c29e&language=fr&sort_by=vote_average.desc&vote_count.gte=10000&page=1"
        )
        .then(function (response) {
          component.movies = response.data.results;
          console.log(component.movies);
          axios
            .get(
              "https://api.themoviedb.org/3/discover/movie/?api_key=3ea8988340d4ed715d28b9978346c29e&language=fr&sort_by=vote_average.desc&vote_count.gte=10000&page=2"
            )
            .then(function (response) {
              component.loading = false;
              response.data.results.forEach(function (movie) {
                component.movies.push(movie);
              });
              console.log(component.movies);
              axios
                .get(
                  "https://api.themoviedb.org/3/discover/movie/?api_key=3ea8988340d4ed715d28b9978346c29e&language=fr&sort_by=vote_average.desc&vote_count.gte=10000&page=3"
                )
                .then(function (response) {
                  component.loading = false;
                  response.data.results.forEach(function (movie) {
                    component.movies.push(movie);
                  });
                  component.movies.splice(50, 10);
                  console.log(component.movies);
                });
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
    this.getTopRatedMovies(this);
  },
};
</script>

<style>
</style>
