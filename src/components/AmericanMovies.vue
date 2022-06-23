<template>
  <div>
    <h1 class="p-5 font-weight-light">Films américains</h1>
    <SortButtons :movies="americanMovies" @sort-movies="sortMovies" />
    <MoviesList :movies="americanMovies" :loading="loading" :errored="errored" />
  </div>
</template>

<script>
import MoviesList from "./utils/MoviesList.vue";
import axios from "axios";
import SortButtons from "./utils/SortButtons.vue";
import { store } from '../store'

export default {
  name: "AmericanMovies", // nom du composant

  components: {
    // composants enfants affichés
    MoviesList,
    SortButtons,
  },

  computed: {
    americanMovies() {
      return store.state.americanMovies
    }
  },

  data() {
    // partie VIEW-MODEL = CONTROLLER dans Laravel
    return {
      // on déclare les variables accessibles dans la vue
      loading: true,
      errored: false,
    };
  },

  methods: {
    sortMovies(sortedMovies) {
        store.commit('storeAmericanMovies', sortedMovies)
    },

    getMovies(component) {
      axios
        .get(
          "https://api.themoviedb.org/3/discover/movie/?api_key=3ea8988340d4ed715d28b9978346c29e&language=fr&certification_country=us&page=1"
        )
        .then(function (response) {

          // on stocke les 20 films récupérés dans le state
          store.commit('storeAmericanMovies', response.data.results)

          // on lance le 2ème appel
          axios
            .get(
              "https://api.themoviedb.org/3/discover/movie/?api_key=3ea8988340d4ed715d28b9978346c29e&certification_country=us&language=fr&page=2"
            )
            .then(function (response) {

              component.loading = false;

              // on déclare une variable temporaire qui va contenir les 20 premiers films.
              let americanMovies = component.americanMovies

              // On lui ajoute les 20 suivants
              response.data.results.forEach(function (movie) {
                americanMovies.push(movie)
              });

              // on lance un commit pour actualiser la variable frenchMovies du state
              store.commit('storeAmericanMovies', americanMovies)

              console.log("appels API terminé sur AmericanMovies, 40 films récupérés et stockés dans le state")
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
    if (!this.americanMovies) {

      this.getMovies(this)

      // si les films ont déjà été récupérés, on fait passer le chargement à false (sinon aucun affichage !)
    } else {
      this.loading = false
    }
  }
};
</script>
