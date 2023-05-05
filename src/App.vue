<script>
export default {
  data() {
    return {
      showCollapse: false
    }
  },
  watch: {
    '$route' () {
      // This will close the collapse if any part of the route changes
      // including query, params, hash, name, or path
      this.showCollapse = false
    }
  }
}
</script>

<template>
  <header>
    <div class="wrapper">
      <nav class="navbar navbar-expand-lg fixed-top navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">
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
            @click="visible = !visible"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <RouterLink class="nav-link" to="/select">
                  <font-awesome-icon icon="eye" />
                  Sélectionner</RouterLink
                >
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" to="/select">
                  <font-awesome-icon icon="bullseye" />
                  Afficher les observations</RouterLink
                >
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" to="/record">
                  <font-awesome-icon icon="gear" />
                  Réglages</RouterLink
                >
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" to="/record">
                  <font-awesome-icon icon="book" />
                  Tutoriel</RouterLink
                >
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" to="/record">
                  <font-awesome-icon icon="file-contract" />
                  Confidentialité et licence</RouterLink
                >
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" to="/about">
                  <font-awesome-icon icon="puzzle-piece" />
                  A propos</RouterLink
                >
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </header>
	<div style="height:64px;"></div>
  <RouterView />
  <nav class="navbar fixed-bottom navbar-light bg-light">
    <div class="container-fluid">
      <RouterLink class="nav-link" to="/mainrecord">
        <button class="btn btn-outline-success me-2" type="button">
          <font-awesome-icon icon="microphone" />
          enregistrer
        </button>
      </RouterLink>
      <RouterLink class="nav-link" to="/select">
        <button class="btn btn-outline-success me-2" type="button">
          <font-awesome-icon icon="sliders" />
          sélectionner
        </button>
      </RouterLink>
      <RouterLink class="nav-link" to="/select">
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
