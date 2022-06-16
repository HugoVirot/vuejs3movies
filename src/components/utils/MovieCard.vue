<template>
  <router-link id="link" :to="`/MovieDetails/${id}`">
    <h3 v-if="index" class="pb-3 text-danger card-title">
      <span v-once>#{{ index }}</span>
    </h3>


    <div class="card" id="movie">

      <h5 class="font-weight-bold p-3">{{ title.toUpperCase() }}</h5>

      <div v-if="poster_path">
        <img v-bind:src="preUrl + poster_path" alt="moviePoster" />
      </div>
      <div v-else>
        <img v-bind:src="moviePoster.png" alt="moviePoster" />
      </div>

      <div class="card-body">
        <p class="mt-3">
          <b>Sortie :</b>
          <span v-if="release_date">
            {{ release_date }}
          </span>
          <span v-else> date non déterminée </span>
        </p>
        <p>
          <b>Note moyenne : </b>
          <span v-if="vote_average == '0'"> non noté </span>
          <span v-else>
            {{ vote_average }}
          </span>
        </p>
        <p><b>Résumé : </b> {{ overview.substring(0, 200) + "..." }}</p>
      </div>
    </div>

  </router-link>
</template>

<script>
export default {
  name: "MovieCard",
  props: [
    "id",
    "index",
    "title",
    "release_date",
    "vote_average",
    "overview",
    "poster_path",
  ],
  data() {
    return {
      preUrl: "https://image.tmdb.org/t/p/original/",
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#link {
  text-decoration: none;
  color: inherit;
}

#movie {
  max-width: 20rem;
  height: 50rem;
}

#movie img {
  width: 25vw;
  max-width: 17rem;
}
</style>
