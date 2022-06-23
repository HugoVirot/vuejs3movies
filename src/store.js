// // on importe createStore et on initialise le store
import { createStore } from 'vuex'
import VuexPersist from 'vuex-persist'

// vuex-persist permet de stocker le state dans le local storage
// => en cas d'actualisation de la page, on garde la connexion utilisateur
const vuexPersist = new VuexPersist({
    key: 'vuejs3movies',
    storage: window.localStorage
})

const defaultState = {
    popularMovies: null,
    frenchMovies: null,
    americanMovies: null,
    lastMovies: null,
    top50Movies: null
}

export const store = createStore({
    state() {
        // si un state est stocké dans le localStorage, on l'utilise
        // sinon : state par défaut (avec variables vides)
        if (localStorage.state) {
            return localStorage.state
        }
        else {
            return defaultState
        }
    },

    mutations: {
        // stocker les films les plus populaires dans le state
        storePopularMovies(state, payload) {
            state.popularMovies = payload
        },

        // stocker les films français dans le state
        storeFrenchMovies(state, payload) {
            state.frenchMovies = payload
        },

        // stocker les films américains dans le state
        storeAmericanMovies(state, payload) {
            state.americanMovies = payload
        },

        // stocker les derniers films dans le state
        storeLastMovies(state, payload) {
            state.lastMovies = payload
        },

        // stocker les films du top 50 dans le state
        storeTop50Movies(state, payload) {
            state.top50Movies = payload
        },

        // réinitialiser le state
        resetState(state) {
            Object.assign(state, defaultState)
        }
    },

    actions: {
        resetState() {
            store.commit("resetState")
        }
    },

    plugins: [vuexPersist.plugin]
})

