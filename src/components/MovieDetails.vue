<template>
  <div v-if="loading">Chargement...</div>
  <div v-else>
    <b-container fluid id="movie" class="m-auto p-5 justify-content-center">
      <b-row>

        <b-col>
          <img class="m-auto" v-bind:src="preUrl + movie.poster_path" alt="moviePoster" />
        </b-col>

        <b-col>
          <div class="mt-5" id="trailer" v-if="video[0]">
            <iframe width="650" height="300" v-bind:src="'https://www.youtube.com/embed/' + video[0].key"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen class="shadow"></iframe>
          </div>
          <h1 class="p-3">
            <b>{{ movie.title }}</b>
          </h1>
          <div v-if="movie.tagline">
            <h5 class="font-italic p-2 mb-3">"{{ movie.tagline }}"</h5>
          </div>

          <p class="pt-3">
            <b>Sortie :</b>
            <span v-if="movie.release_date">
              {{
                  formatDate(movie.release_date)
              }}
            </span>
            <span v-else> date non déterminée </span>
          </p>
          <p>
            <b>Note moyenne : </b>
            <span v-if="movie.vote_average == '0'"> non noté </span>
            <span v-else>
              {{ movie.vote_average }}
            </span>
          </p>
          <p><b> Titre original : </b>{{ movie.original_title }}</p>
          <p>
            <b>Langue originale : </b>
            <span v-if="movie.original_language == 'fr'"> français </span>
            <span v-else-if="movie.original_language == 'en'"> anglais </span>
            <span v-else>
              {{ movie.original_language }}
            </span>
          </p>
          <div><b> Résumé : </b>{{ movie.overview }}</div>
        </b-col>

      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MovieDetails",
  data() {
    return {
      id: this.$route.params.id,
      movie: null,
      preUrl: "https://image.tmdb.org/t/p/original/",
      loading: true,
      errored: false,
      video: [],
    };
  },
  computed: {
    formatDate(date) {
      return date.dateParse("YYYY-MM-DD").dateFormat("MMMM D, YYYY")
    }
  },
  methods: {
    getMovieById(component) {
      axios
        .get(
          "https://api.themoviedb.org/3/movie/" +
          component.id +
          "?api_key=3ea8988340d4ed715d28b9978346c29e&language=fr"
        )
        .then(function (response) {
          component.loading = false;
          component.movie = response.data;
          console.log(component.movie);
        })
        .catch(function () {
          component.errored = true;
        });
    },
    getVideo(component) {
      axios
        .get(
          "https://api.themoviedb.org/3/movie/" +
          component.id +
          "/videos?api_key=3ea8988340d4ed715d28b9978346c29e&language=fr"
        )
        .then((response) => {
          component.video = response.data.results;
          console.log(component.video);
        });
    },
  },
  created() {
    this.getMovieById(this);
    this.getVideo(this);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#link {
  text-decoration: none;
  color: inherit;
}

#movie img {
  width: 50vw;
  max-width: 600px;
}
</style>
