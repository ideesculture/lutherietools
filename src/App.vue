<script setup>
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <header>
    <div class="wrapper">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <img
              alt="Vue logo"
              class="logo"
              src="@/assets/lutherietools.svg"
              style="height: 40px"
          /></a>
					LutherieTools
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <RouterLink class="nav-link active" to="/">Accueil</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" to="/record"
                  >Enregistrer</RouterLink
                >
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" to="/about">A propos</RouterLink>
              </li>
            </ul>
            <form class="d-flex">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button class="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  </header>

  <RouterView />
  <nav class="navbar fixed-bottom navbar-light bg-light">
    <div class="container-fluid">
      <RouterLink class="nav-link" to="/mainrecord">
        <button class="btn btn-outline-success me-2" type="button">
          <font-awesome-icon icon="microphone" />
          enregistrer
        </button>
      </RouterLink>
      <RouterLink class="nav-link" to="/mainselect">
      <button class="btn btn-outline-success me-2" type="button">
        <font-awesome-icon icon="sliders" />
        sélectionner
      </button>
			</RouterLink>
      <RouterLink class="nav-link" to="/mainresults">
      <button class="btn btn-outline-success me-2" type="button">
        <font-awesome-icon icon="list" />
        résultats
      </button>
			</RouterLink>
    </div>
  </nav>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
}
</style>
