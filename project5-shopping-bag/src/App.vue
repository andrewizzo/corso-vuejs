<template>
  <div id="nav">
    <router-link to="/">Home</router-link> - 
    <router-link to="/carrello">Carrello ({{ this.prodottiCarrello.length }})</router-link>
  </div>
  <router-view/>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  created(){
    this.$store.dispatch('caricaProdotti');
    this.$store.dispatch('caricaCarrello');
  },
  computed:{
    prodottiCarrello(){
      return this.$store.state.prodottiCarrello
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#nav {
  padding: 16px 0;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  text-align: center;
  background-color: rgb(37, 37, 37);
  color: white;
}

#nav a {
  color: white;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #007bff;
}
</style>
