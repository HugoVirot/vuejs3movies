<template>
  <div id="app">
    <HeaderNav />

    <div v-if="$route.path == '/'">
      <!-- si la route est / (racine du site) -->
      <h1 class="pt-5 font-weight-light">
        Vos films préférés sont sur VueJS Movies !
      </h1>
      <MoviesList :movies="popularMovies" :loading="loading" :errored="errored" />
    </div>

    <div v-else>
      <!-- si la route est différente de / -->
      <router-view v-bind:key="$route.fullPath"></router-view>
    </div>

    <FooterApp />
  </div>
</template>

<script>
import { store } from './store'
import HeaderNav from "./components/template/HeaderNav.vue";
import FooterApp from "./components/template/FooterApp.vue";
import MoviesList from "./components/utils/MoviesList.vue";
import axios from "axios";

export default {
  name: "App",

  components: {
    HeaderNav,
    MoviesList,
    FooterApp,
  },

  computed: {
    popularMovies() {
      return store.state.popularMovies
    }
  },

  data() {
    return {
      loading: true,
      errored: false,
    };
  },

  methods: {
    getMovies(component) {
      axios
        .get(
          "https://api.themoviedb.org/3/discover/movie/?api_key=3ea8988340d4ed715d28b9978346c29e&language=fr&sort_by=popularity.desc&page=1"
        )
        .then(function (response) {

          // on stocke les 20 films récupérés dans le state
          store.commit('storePopularMovies', response.data.results)

          // on lance le 2ème appel
          axios
            .get(
              "https://api.themoviedb.org/3/discover/movie/?api_key=3ea8988340d4ed715d28b9978346c29e&language=fr&sort_by=popularity.desc&page=2"
            )
            .then(function (response) {

              component.loading = false;

              // on déclare une variable temporaire qui va contenir les 20 premiers films.
              let popularMovies = component.popularMovies

              // On lui ajoute les 20 suivants
              response.data.results.forEach(function (movie) {
                popularMovies.push(movie)
              });

              // on lance un commit pour actualiser la variable frenchMovies du state
              store.commit('storePopularMovies', popularMovies)

              console.log("appels API terminé sur accueil, 40 films récupérés et stockés dans le state")
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
    if (!this.popularMovies) {
      
    // si les films du top 50 n'ont pas encore été récupérés, on le fait (sinon, on ne relance pas l'appel)
      this.getMovies(this)

      // si les films ont déjà été récupérés, on fait passer le chargement à false (sinon aucun affichage !)
    } else {
      this.loading = false
    }
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Oxygen");

#app {
  font-family: "Oxygen", sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1 {
  font-family: 'Zen Tokyo Zoo', sans-serif;
  letter-spacing: 1vw;
}
</style>
