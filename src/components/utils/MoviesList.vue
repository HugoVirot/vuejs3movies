<template>
  <div class="p-5">
    <section v-if="errored">
      <!--message d'erreur si échec-->
      <p class="text-danger">Echec de la requête. Veuillez réessayer.</p>
    </section>

    <section v-else>
      <!--message de chargement en attendant-->
      <div v-if="loading">Chargement...</div>

      <!--ensuite, affichage de la liste des films-->
      <div v-else>
        <ul>
          <li class="list-unstyled" v-for="movie in movies" :key="movie.id">
            <MovieCard
              :id="movie.id"
              :title="movie.title"
              :poster_path="movie.poster_path"
              :release_date="movie.release_date"
              :vote_average="movie.vote_average"
              :overview="movie.overview"
            />
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import MovieCard from "./MovieCard.vue";

export default {
  name: "MoviesList",
  components: {
    MovieCard,
  },
  props: ["movies", "loading", "errored"],
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
