<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>SUPER</span>
        <span class="font-weight-light">CHAT 2000</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat to="/">Chat</v-btn>
      <v-btn flat to="/login">Login</v-btn>
      <v-btn flat to="/register">Register</v-btn>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      //
    }
  }
}
</script>
