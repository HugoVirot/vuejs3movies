<template>
  <div v-if="loading">Chargement...</div>

  <div v-else>

    <div id="movie" class="container-fluid m-auto p-5 justify-content-center">

      <div class="row">

        <div class="col">
          <img class="m-auto" v-bind:src="preUrl + movie.poster_path" alt="moviePoster" />
        </div>

        <div class="col">
          <div class="mt-5" id="trailer" v-if="video[0]">
            <iframe width="650" height="300" v-bind:src="'https://www.youtube.com/embed/' + video[0].key"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen class="shadow"></iframe>
          </div>

          <h1 class="p-4">{{ movie.title }}</h1>

          <div v-if="movie.tagline">
            <h5 class="fst-italic p-2 mb-3">"{{ movie.tagline }}"</h5>
          </div>

          <p class="pt-3">
            <b>Sortie :</b>
            <span v-if="movie.release_date">
              {{
                  movie.release_date
              }}
            </span>
            <span v-else> date non déterminée </span>
          </p>

          <p>
            <font-awesome-icon class="me-2" icon="fa-solid fa-star" size="xl" :style="{ color: 'yellow' }" />
            <span v-if="movie.vote_average == '0'"> non noté </span>
            <span v-else>
              {{ movie.vote_average }}
            </span>
          </p>

          <p v-if="movie.original_language !== 'fr' && movie.title !== movie.original_title"><b> Titre original : </b>{{ movie.original_title }}</p>

          <p>
            <b>Langue originale : </b>
            <span v-if="movie.original_language == 'fr'"> français </span>
            <span v-else-if="movie.original_language == 'en'"> anglais </span>
            <span v-else>
              {{ movie.original_language }}
            </span>
          </p>

          <div><b> Résumé : </b>{{ movie.overview }}</div>

        </div>

      </div>

    </div>
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
h1 {
  font-family: 'Zen Tokyo Zoo', sans-serif;
  letter-spacing: 1vw;
  font-size: 3rem
}

#link {
  text-decoration: none;
  color: inherit;
}

#movie img {
  width: 50vw;
  max-width: 600px;
}
</style>
