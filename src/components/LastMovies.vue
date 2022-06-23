<template>
  <div>
    <h1 class="p-5 font-weight-light">Films sortis cette année</h1>
    <SortButtons :movies="lastMovies" @sort-movies="sortMovies" />
    <MoviesList :movies="lastMovies" :loading="loading" :errored="errored" />
  </div>
</template>

<script>
import MoviesList from "./utils/MoviesList.vue";
import axios from "axios";
import SortButtons from "./utils/SortButtons.vue";

// on importe le store pour y accéder
import { store } from '../store'

export default {
  name: "LastMovies",

  components: {
    MoviesList,
    SortButtons,
  },

  computed: {
    lastMovies() {
      return store.state.lastMovies
    }
  },

  data() {
    return {
      loading: true,
      errored: false,
    };
  },

  methods: {
    sortMovies(sortedMovies) {
        store.commit('storeLastMovies', sortedMovies)
    },

    getMovies(component) {
      axios
        .get(
          "https://api.themoviedb.org/3/discover/movie/?api_key=3ea8988340d4ed715d28b9978346c29e&language=fr&primary_release_year=2022&sort_by=popularity.desc&page=1"
        )
        .then(function (response) {

          // on stocke les 20 films récupérés dans le state
          store.commit('storeLastMovies', response.data.results)

          // on lance le 2ème appel
          axios
            .get(
              "https://api.themoviedb.org/3/discover/movie/?api_key=3ea8988340d4ed715d28b9978346c29e&language=fr&primary_release_year=2022&sort_by=popularity.desc&page=2"
            )
            .then(function (response) {

              component.loading = false;

              // on déclare une variable temporaire qui va contenir les 20 premiers films.
              let lastMovies = component.lastMovies

              // On lui ajoute les 20 suivants
              response.data.results.forEach(function (movie) {
                lastMovies.push(movie)
              });

              // on lance un commit pour actualiser la variable lastMovies du state
              store.commit('storeLastMovies', lastMovies)

              console.log("appels API terminé sur LastMovies, 40 films récupérés et stockés dans le state")
            })

            .catch(function () {
              component.errored = true;
            });

        })
        .catch(function () {
          component.errored = true;
        });
    }
  },

  created() {
    if (!this.lastMovies) {

      this.getMovies(this)
    }

    // si les films ont déjà été récupérés, on fait passer le chargement à false (sinon aucun affichage !)
    else {
      this.loading = false
    }
  }
}

</script>