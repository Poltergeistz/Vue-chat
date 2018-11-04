<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>SUPER</span>
        <span class="font-weight-light">CHAT 2000</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-btn flat>Login</v-btn>
      <v-btn flat>Register</v-btn> -->
    </v-toolbar>

    <v-content>
      <Chat/>
    </v-content>
  </v-app>
</template>

<script>
import Chat from './components/Chat'

export default {
  name: 'App',
  components: {
    Chat
  },
  data () {
    return {
      //
    }
  }
}
</script>
