import { createWebHistory, createRouter } from "vue-router";

// on importe les différents composants
import AmericanMovies from "./components/AmericanMovies.vue";
import FrenchMovies from "./components/FrenchMovies.vue";
import TopRatedMovies from "./components/TopRatedMovies.vue";
import LastMovies from "./components/LastMovies.vue";
import SearchMovies from "./components/SearchMovies.vue";
import MovieDetails from "./components/MovieDetails.vue";

const routes = [   // on déclare les routes
  {
    path: '/AmericanMovies',   // path = url
    component: AmericanMovies  // composant associé 
  },
  {
    path: '/FrenchMovies',
    component: FrenchMovies
  },
  {
    path: '/TopRatedMovies',
    component: TopRatedMovies
  },
  {
    path: '/LastMovies',
    component: LastMovies
  },
  {
    path: '/SearchMovies',
    component: SearchMovies
  },
  {
    path: '/MovieDetails/:id', //détails du film : variable :id = id du film
    component: MovieDetails
  }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router;
  