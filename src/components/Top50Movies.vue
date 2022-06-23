<template>
  <div>
    <h1 class="pt-5 font-weight-light">Top 50 : films les mieux notés</h1>
    <SortButtons :movies="top50Movies" @sort-movies="sortMovies" />
    <Top50MoviesList :movies="top50Movies" :loading="loading" :errored="errored" />
  </div>
</template>

<script>
import Top50MoviesList from "./utils/Top50MoviesList.vue";
import axios from "axios";
import SortButtons from "./utils/SortButtons.vue";

// on importe le store pour y accéder
import { store } from '../store'

export default {
  name: "Top50Movies",

  components: {
    SortButtons,
    Top50MoviesList,
  },

  computed: {
    top50Movies() {
      return store.state.top50Movies
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
      store.commit('storeTop50Movies', sortedMovies)
    },

    getTop50Movies(component) {
      console.log("lancement du premier appel axios")

      axios
        .get(
          "https://api.themoviedb.org/3/discover/movie/?api_key=3ea8988340d4ed715d28b9978346c29e&language=fr&sort_by=vote_average.desc&vote_count.gte=10000&page=1"
        )
        .then(function (response) {

          let twentyFirstMovies = response.data.results

          // on lance le 2ème appel
          console.log("lancement du 2ème appel axios")

          axios
            .get(
              "https://api.themoviedb.org/3/discover/movie/?api_key=3ea8988340d4ed715d28b9978346c29e&language=fr&sort_by=vote_average.desc&vote_count.gte=10000&page=2"
            )
            .then(function (response) {

              let fortyMovies = twentyFirstMovies.concat(response.data.results)

              // // on lance le 3ème appel
              console.log("lancement du 3ème appel axios")

              axios
                .get(
                  "https://api.themoviedb.org/3/discover/movie/?api_key=3ea8988340d4ed715d28b9978346c29e&language=fr&sort_by=vote_average.desc&vote_count.gte=10000&page=3"
                )

                .then(function (response) {
                  console.log("passage dans le .then")

                  // on concatène les deux tableaux (40 films précédents + 20 derniers films récupérés)
                  let fiftyMovies = fortyMovies.concat(response.data.results)

                  // on ne garde que les 50 premiers grâce à splice
                  fiftyMovies.splice(50, 10);
                  console.log(fiftyMovies)

                  component.loading = false;       // gros pb pour accéder au this
                  console.log(component.loading)  // aucun affichage en console

                  // on lance un commit pour stocker les 50 films dans la variable top50Movies du state
                  store.commit('storeTop50Movies', fiftyMovies)

                  console.log("appels API terminé sur Top 50, 50 films récupérés et stockés dans le state")

                })

                .catch(function () {
                  console.log("passage dans le .catch")
                  component.errored = true;  // ERREUR ICI : THIS IS UNDEFINED
                })

            })

            .catch(function () {
              component.errored = true;
            })
        })
        .catch(function () {
          component.errored = true;
        })
    }
  },

  created() {
    console.log(this.top50Movies)

    // si les films du top 50 n'ont pas encore été récupérés, on le fait (sinon, on ne relance pas l'appel)
    if (!this.top50Movies) {

      this.getTop50Movies(this)

      // si les films ont déjà été récupérés, on fait passer le chargement à false (sinon aucun affichage !)
    } else {
      this.loading = false
    }
  }
}
</script>

<style>
</style>
