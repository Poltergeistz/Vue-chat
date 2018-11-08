<template>
    <v-flex xs12 sm6 offset-sm3>
    <v-container>
    <v-card>
        <v-toolbar class="elevation-0">
        <span>REGISTER</span>
        </v-toolbar>
        <v-container>
        <v-form>
            <v-text-field solo
            color="indigo lighten-1" 
            label="Your email address" 
            v-model="email">
            </v-text-field>
            <v-text-field
              :append-icon="show3 ? 'visibility' : 'visibility_off'"
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
            <v-btn class="white--text" color="indigo lighten-1" @click="register">
                Sign in
            </v-btn>
            <a>Return to Home</a>
            </v-form>
            </v-container>
    </v-card>
    </v-container>
    </v-flex>
</template>
<script>
// import firebase from 'firebase'

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
        /* register: (e) => {
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
            .then(user => {
                alert(`Account created for ${user.email}`)
                this.$router.push('/')
            }, 
            error => {
                alert(error.message)
            }) 
            // console.log(register)
            e.preventDefault()
        } */
    }
}
</script>