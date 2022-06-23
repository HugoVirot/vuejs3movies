<template>
  <header class="bg-light">
    <img class="pt-3" alt="banner" src="../../assets/banner.jpg" style="width: 70vw" />
    <h1 class="p-5" id="title">VUE JS MOVIES</h1>
    <div>

      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">

        <div class="container-fluid">

          <a class="navbar-brand" href="#">
            <router-link to="/" class="link mx-5" id="titreNav">Vue JS Movies</router-link>
          </a>

          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavDropdown">

            <ul class="navbar-nav">
              <li class="nav-item">
                <router-link to="/FrenchMovies" class="link text-center nav-link mx-5">Films français</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/AmericanMovies" class="link text-center nav-link mx-5">Films américains</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/LastMovies" class="link text-center nav-link mx-5">Films de 2022</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/Top50Movies" class="link text-center nav-link mx-5">Top 50 : les mieux notés
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/SearchMovies" class="link text-center nav-link mx-5">rechercher un film</router-link>
              </li>
            </ul>

          </div>
        </div>
      </nav>

    </div>
  </header>
</template>

<script>

export default {
  name: "HeaderNav",
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Zen+Tokyo+Zoo&display=swap');

#title {
  font-family: 'Zen Tokyo Zoo', sans-serif;
  letter-spacing: 4vw;
}

#titreNav {
  font-family: 'Zen Tokyo Zoo', sans-serif;
  font-size: larger;
}

header {
  margin-top: -60px;
}

.link {
  text-decoration: none;
  color: inherit;
}

@media screen and (max-width: 1024px) {
  nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>