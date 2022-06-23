<template>
  <div class="search p-5">
    <h1 class="p-5">Rechercher un film</h1>
    <input class="mb-5" type="text" v-model="query" @keyup="getResult(query)" />
    <SortButtons :movies="movies" @sort-movies="sortMovies"/>
    <ul>
      <li
        class="row p-3 justify-content-center"
        v-for="result in movies"
        :key="result.id"
      >
        <MovieCard
          :id ="result.id"
          :title="result.title"
          :poster_path="result.poster_path"
          :release_date="result.release_date"
          :vote_average="result.vote_average"
          :overview="result.overview"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import MovieCard from "./utils/MovieCard.vue";
import axios from "axios";
import SortButtons from "./utils/SortButtons.vue";

export default {
  name: "SearchMovies",
  components: { MovieCard, SortButtons },
  data() {
    return {
      query: "",
      movies: [],
    };
  },
  methods: {
    sortMovies(movies) {
      this.movies = movies;
    },
    getResult(query) {
      axios
        .get(
          "https://api.themoviedb.org/3/search/movie?api_key=3ea8988340d4ed715d28b9978346c29e&language=fr&include_adult=false&query=" +
            query
        )
        .then((response) => {
          this.movies = response.data.results;
        });
    },
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>