<template>
  <div>
    <h1 class="p-5 font-weighvt-light">Films français</h1>
    <SortButtons :movies="frenchMovies" @sort-movies="sortMovies" />
    <MoviesList :movies="frenchMovies" :loading="loading" :errored="errored" />
  </div>
</template>

<script>

import MoviesList from "./utils/MoviesList.vue";
import axios from "axios";
import SortButtons from "./utils/SortButtons.vue";

// on importe le store pour y accéder
import { store } from '../store'

export default {
  name: "FrenchMovies",

  components: {
    MoviesList,
    SortButtons
  },

  computed: {
    frenchMovies() {
      return store.state.frenchMovies
    }
  },

  data() {
    return {
      loading: true,
      errored: false,
    };
  },

  methods: {
    sortMovies(sortedMovies) {  // déclenchée si tri effectuée dans SortButtons
       store.commit('storeFrenchMovies', sortedMovies)// on stocke les films triés dans les movies des datas du composant FrenchMovies
    },

    getMovies(component) {
      axios
        .get(
          "https://api.themoviedb.org/3/discover/movie/?api_key=3ea8988340d4ed715d28b9978346c29e&language=fr&with_original_language=fr&vote_count.gte=1000&include_adult=false&page=1"
        )
        .then(function (response) {

          // on stocke les 20 films récupérés dans le state
          store.commit('storeFrenchMovies', response.data.results)

          // on lance le 2ème appel
          axios
            .get(
              "https://api.themoviedb.org/3/discover/movie/?api_key=3ea8988340d4ed715d28b9978346c29e&language=fr&with_original_language=fr&vote_count.gte=1000&include_adult=false&page=2"
            )
            .then(function (response) {

              component.loading = false;

              // on déclare une variable temporaire qui va contenir les 20 premiers films.
              let frenchMovies = component.frenchMovies

              // On lui ajoute les 20 suivants
              response.data.results.forEach(function (movie) {
                frenchMovies.push(movie)
              });

              // on lance un commit pour actualiser la variable frenchMovies du state
              store.commit('storeFrenchMovies', frenchMovies)

              console.log("appels API terminé sur FrenchMovies, 40 films récupérés et stockés dans le state")
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
    // si les films français n'ont pas encore été récupérés (sinon, on ne relance pas l'appel)
    if (!this.frenchMovies) {

      this.getMovies(this)
      // si les films ont déjà été récupérés, on fait passer le chargement à false (sinon aucun affichage !)
    } else {
      this.loading = false
    }
  }
}
</script>