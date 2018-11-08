<template>
    <v-flex xs12 sm6 offset-sm3>
    <v-container>
    <v-card>
        <v-toolbar class="elevation-0">
        <span>LOGIN</span>
        </v-toolbar>
       <v-container>
        <v-form>
            <v-text-field solo
            label="Your email address" 
            v-model="email"
            color="indigo lighten-1">
            </v-text-field>
            <v-text-field
              :append-icon="show ? 'visibility' : 'visibility_off'"
              :rules="[rules.required, rules.min]"
              :type="show ? 'text' : 'password'"
              name="input-10-2"
              label="Password"
              hint="At least 8 characters"
              value=""
              solo
              class="input-group--focused"
              @click:append="show = !show"
              v-model="password"
              color="indigo lighten-1"
            ></v-text-field>
            <v-btn class="white--text" color="indigo lighten-1" @click="login">
                Login
            </v-btn>
            <a to="/forgot-password">Forgot Your Password?</a>
        </v-form>
        </v-container>
    </v-card>
    </v-container>
    </v-flex>
</template>
<script>
export default {
    data(){
        return{
            email: null,
            password: null,
            show: false,
            rules: {
            required: value => !!value || 'Required.',
            min: v => v.length >= 8 || 'Min 8 characters',
            emailMatch: () => ('The email and password you entered don\'t match')
            }
        }
    },
    methods: {
        /* login: (e) => {
            firebase.auth.signInWithEmailAndPassword(this.email, this.password)
            .then(user => {
                alert(`Logged as ${user.email}`)
                this.$router.push('/')
            }, error => {
                alert(error.message)
            })
            // console.log(login)
            e.preventDefault()
        } */
    }
}
</script>
