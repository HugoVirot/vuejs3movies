<template>
  <div class="container pb-5">
    <button class="btn btn-dark m-1" @click="sortByTitle()">
      Trier par titre
    </button>
    <button class="btn btn-dark m-1" @click="sortByDate()">
      Trier par date de sortie
    </button>
    <button class="btn btn-dark m-1" v-on:click="sortByRating()">
      Trier par note
    </button>
  </div>
</template>

<script>
export default {
  name: "SortButtons",
  props: ["movies"],
  data() {
    return {
      sortedByTitle: false, // false : films non triés par ordre alphabétique
      sortedByDate: false, // false : films non triés par date
      sortedByRating: false, // false : films non triés par note
    };
  },
  methods: {
    sortByTitle() {
      let sortedMovies = this.movies; // on déclare une variable qui contient les films en props

      if (!this.sortedByTitle) {
        // si les films ne sont PAS DEJA triés pas titre => tri normal par ordre alphabétique

        this.sortedByTitle = true; // on déclare le tri effectué

        sortedMovies.sort((a, b) => {
          //this.movies.sort((a, b) => {      // on effectue le tri des films stockés dans movies, avec la fonction sort()

          if (a.title < b.title) return -1; // si le titre du film a vient AVANT celui de b dans l'alphabet, on va lui donner un indice inférieur à b (-1) => il sera classé AVANT

          return a.title > b.title ? 1 : 0; // ligne 28 : équivalent d'un else if / else (opérateur ternaire)
          // si titre a > titre de b dans l'alphabet => indice 1 => a sera classé APRES b
        }); // sinon : pas de changement (titres identiques)
      } else {
        // si les films sont DEJA triés pas titre

        this.sortedByTitle = false; // on déclare le tri NON EFFECTUE (obligatoirement ici car un return va suivre)

        sortedMovies.sort((a, b) => {
          //this.movie.sort((a, b) => {  ancienne syntaxe (mutation des props encore possible)
          if (a.title > b.title) return -1;
          return a.title < b.title ? 1 : 0;
        });
      }
      
      this.$emit("sort-movies", sortedMovies); // déclenchement d'un évènement personnalisé : nom évènement + variable
      // to emit = émettre en anglais
    },

    sortByDate() {
      let sortedMovies = this.movies;

      if (!this.sortedByDate) {
        this.sortedByDate = true;

        sortedMovies.sort((a, b) => {
          if (a.release_date < b.release_date) return -1;
          return a.release_date > b.release_date ? 1 : 0;
        });
      } else {
        this.sortedByDate = false;

        sortedMovies.sort((a, b) => {
          if (a.release_date > b.release_date) return -1;
          return a.release_date < b.release_date ? 1 : 0;
        });
      }

      this.$emit("sort-movies", sortedMovies);
    },

    sortByRating() {
      let sortedMovies = this.movies;

      if (!this.sortedByRating) {
        this.sortedByRating = true;

        sortedMovies.sort((a, b) => {
          if (a.vote_average < b.vote_average) return -1;
          return a.vote_average > b.vote_average ? 1 : 0;
        });
      } else {
        this.sortedByRating = false;

        sortedMovies.sort((a, b) => {
          if (a.vote_average > b.vote_average) return -1;
          return a.vote_average < b.vote_average ? 1 : 0;
        });
      }

      this.$emit("sort-movies", sortedMovies);
    },
  },
};
</script>
