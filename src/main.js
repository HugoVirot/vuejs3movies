// On importe createApp pour instancier l'application
import { createApp } from 'vue'

// On importe le composant principal App
import App from './App.vue'

// On importe le routeur
import router from "./router"

// on importe le store
import { store } from "./store";

// on importe Bootstrap et Bootstrap Vue 3
import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faStar, faUserSecret } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faUserSecret, faStar)

// On monte l'application Vue sur l'élément #app
// on inclut le routeur dans l'application
createApp(App).use(router, require('vue-moment'),BootstrapVue3, store).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
