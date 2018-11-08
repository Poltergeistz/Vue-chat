<template>
<v-flex xs12 sm6 offset-sm3>
    <v-container>
    <v-card>
        <v-toolbar class="elevation-0">
        <span>RESET</span> 
        <span class="font-weight-light">PASSWORD</span>
        </v-toolbar>
        <v-container>
        <v-form>
            <v-text-field solo
            color="indigo lighten-1" 
            label="Your email address" 
            v-model="email">
            </v-text-field>
            <v-btn class="white--text" color="indigo lighten-1">
                Send password reset link
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
            email: null
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
