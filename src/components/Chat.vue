<template>
<div>
    <v-flex xs12 sm6 offset-sm3>
    <v-container>
    <!-- Show User form  -->
    <div v-if="!show">
        <v-form @submit.prevent="addUser">
            <v-layout row>
            <h4 class="font-weight-light">Select Username</h4>
              <v-flex xs9>
                  <v-text-field 
                  color="indigo lighten-1" 
                  solo label="User" 
                  v-model="user">
                  </v-text-field>
                </v-flex>
                <v-flex xs3>
                  <v-btn 
                  color="indigo lighten-1" 
                  class="white--text" 
                  type="submit">
                  Connect
                  </v-btn>
              </v-flex>
              </v-layout>
          </v-form>
    </div>
    <div v-else>
        test
    </div>
    <v-toolbar class="elevation-0">
        <v-toolbar-side-icon></v-toolbar-side-icon>
        <span>SUPER</span>
        <span class="font-weight-light">CHAT ROOM</span>
        <v-spacer></v-spacer>
        <v-icon>fas fa-users</v-icon>
        <v-chip label color="indigo lighten-1">
            <b class="font-weight-bold white--text">{{connections}}</b>
        </v-chip>
        </v-toolbar>
        <!-- Chat box -->
    <v-card id="chatbox" class="card-body">
        <!-- Alert Broadcast User is connected/disconnected -->
        <div v-if="connected">
            <div v-for="(infos, index) in info" :key="index">
            <v-alert
        v-model="alert"
        dismissible
        type="info"
        color="indigo lighten-1"
      >
        {{infos.user}} joined the chat.
      </v-alert>
      <div v-if="connected">
      <v-alert v-if="!connected"
        v-model="alert"
        dismissible
        type="info"
        color="indigo lighten-1"
      >
        {{infos.user}} left the chat.
      </v-alert>
      </div>
        </div>
        </div>
        <div class="messages" v-for="(msg, index) in messages" :key="index">
            <v-list>
                <v-chip label class="font-weight-bold">{{ msg.user }} : </v-chip>
                <span class="font-weight-light">{{ msg.message }}</span>
            </v-list>
            <v-divider></v-divider>
        </div>
          </v-card>
          <!-- GOAL IS TO GRAB USER FROM THE BACKEND AND APPEND IT HERE -->
              <h4 class="caption font-weight-light font-italic text-xs-right" 
              v-if="typing">Someone is typing</h4>
          <!-- Chat box end -->
          <!-- Message & User Form  -->
      <v-card-text>
          <v-form @submit.prevent="sendMessage">
              <v-layout row>
              <!-- <v-flex xs4>
                  <v-text-field solo label="User" 
                  v-model="user"
                  color="indigo lighten-1">
                  </v-text-field>
              </v-flex> -->
              <v-flex xs10>
                  <v-text-field solo label="Message" 
                  v-model="message" 
                  clear-icon="far fa-times-circle"
                  color="indigo lighten-1" 
                  clearable 
                  @click:clear="clearMessage">
                  </v-text-field>
              </v-flex>
              <v-flex xs2>
              <v-btn 
              class="white--text" 
              color="indigo lighten-1" 
              type="submit">Send</v-btn>
          </v-flex>
          </v-layout>
          </v-form>
      </v-card-text>
      </v-container>
      <!-- Message & User Form end -->
      <!-- Footer -->
      <v-footer
      dark
      height="auto"
    >
      <v-card
        flat
        tile
        class="indigo lighten-1 white--text text-xs-center"
      >
        <v-card-text>
          <v-btn
            v-for="(item, index) in items"
            :key="index"
            class="mx-3 white--text"
            icon
            :href="item.url"
            target="_blank"
          >
            <v-icon size="24px">{{ item.icon }}</v-icon>
          </v-btn>
        </v-card-text>
  
        <v-card-text class="white--text pt-0">
          Amélioration du chat fait en semaine 8 grâce aux technologies suivantes :
          Express, Vue, Vuetify, Socket.io
        </v-card-text>
  
        <v-divider></v-divider>
  
        <v-card-text class="white--text">
          2018 — <strong>SUPER</strong><span>CHAT</span>
        </v-card-text>
      </v-card>
    </v-footer>
    <!-- Footer end -->
      </v-flex>
      </div>
</template>

<script>
import io from 'socket.io-client';
export default {
    data() {
        return {
            user: null,
            users: [],
            message: null,
            messages: [],
            info: [], // Information about users leaving and joining
            connections: 0, // Nb of sockets on the server
            connected: true, // If user is connected show something
            typing: false, // Show when user is typing
            show: false, // 
            alert: true, // alert popup
            socket : io('localhost:3001'),
            /* Links to my social medias */
            items : [
                {
                    icon: 'fab fa-github',
                    url: 'https://github.com/Poltergeistz'
                },
                {
                    icon: 'fab fa-dev',
                    url: 'https://dev.to/poltergeistz'
                },
                {
                    icon: 'fab fa-linkedin',
                    url: 'https://www.linkedin.com/in/david-journo/'
                },
            ]
        }
    },
    methods: {
        // Clear message 
        clearMessage() {
            this.message = null
        },
        // Add User
        addUser() {
            this.show = true
            this.socket.emit('JOINED', this.user)
        },
        // Send message with username and message
        sendMessage() {
            // Emit to the server the new data
            this.socket.emit('SEND_MESSAGE', {
                user: this.user,
                message: this.message
            });
            // Errase the message so the user can type a new message
            this.message = null
            // this.socket.emit('JOINED', this.user)
            // this.user = null
        }
    },
    watch: {
        // Watch message, when the value changes typing is true
        message(value){
            console.log(value) // Debug 
            value ? this.socket.emit('TYPING') : this.socket.emit('STOP_TYPING')
        }
    },
    created() {
        window.onbeforeunload = () => {
            this.socket.emit('LEAVED', this.user)
        }
        // Send to the server when the vue is mounted 
        this.socket.emit('MOUNTED', 'SUCCESSFULY MOUNTED')
        // Listen and console log the message from the server
        this.socket.on('MOUNTED', (data) => {
            console.log(data)
        })

        // Send to the server the Array of users
        this.socket.emit('LIST_OF_USERS', this.users)
        // Show a list of users
        this.socket.on('LIST_OF_USERS', (data) => {
            this.users = data
        })

        // Number of Connections
        this.socket.on('CONNECTED_USERS', (data) => {
            this.connections = data
        })


        // Display messages
        this.socket.on('MESSAGE', (data) => {
            // Push data into messages Array
            this.messages = [...this.messages, data];
            // Loop into object
            this.messages.forEach(element => {
                // Fetch messages
                console.log(`Messages : ${element.message}`)
            });
            let chatBox = document.getElementById('chatbox');
            chatBox.scrollTop = chatBox.scrollHeight
        });

        this.socket.on('LIST_OF_USERS', (data) => {
            // Push data into users Array
            this.users = [...this.users, data];
            // Loop into object
            this.messages.forEach(element => {
                // Fetch users
                //this.users = users.push(element.user)
                console.log(`Users : ${element.user}`)
            });
        });

        // LISTEN ON TYPING
        this.socket.on('TYPING', () => {
            this.typing = true
            console.log('typing...')
        })

        // LISTEN ON STOP_TYPING
        this.socket.on('STOP_TYPING', () => {
            this.typing = false
        })

        // JOINED
        this.socket.on('JOINED', (data) => {
        this.info.push({ user: data, type: 'JOINED'})
        })

        // LEAVED
        this.socket.on('LEAVED', (data) => {
        this.info.push({ user: data, type: 'LEAVED'})
        })
        
    }
}
</script>

<style>
#chatbox {
  height: 200px;
  overflow-y: scroll;
}
</style>