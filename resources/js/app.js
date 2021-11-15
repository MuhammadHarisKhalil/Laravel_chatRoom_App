

require('./bootstrap');

window.Vue = require('vue').default;
import Vue from 'vue'

import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)

import Toaster from 'v-toaster'

// You need a specific loader for CSS files like https://github.com/webpack/css-loader
import 'v-toaster/dist/v-toaster.css'

// optional set default imeout, the default is 10000 (10 seconds).
Vue.use(Toaster, {timeout: 5000})

Vue.component('message', require('./components/ExampleComponent.vue').default);


const app = new Vue({
    el: '#app',

    data:{
        message : '',
        typing : '',
        chat :{
            message: [],
            user: [],
            color:[],
            time : []
        },
        totaluser:0
    },
    watch:{
        message(){
        Echo.private('chat')
        .whisper('typing', {
            name: this.message
        });
    }
    },
    methods:{
        send(){
            if(this.message.length != 0)
            {
              this.chat.message.push(this.message);
              this.chat.color.push('success');
              this.chat.time.push(this.gettime());
              this.chat.user.push('You');
              axios.post('/send', {
                message :this.message,
                chat:this.chat
              })
              .then( response => {
                //console.log(response);
                this.message='';
              })
              .catch(error => {
                console.log("hello");
              });
            }
        },
        gettime(){
            let time =new Date();
            return time.getHours()+':'+time.getMinutes();
        },
        getoldmessage(){
            axios.post('/getOldMessage')
              .then( response => {
                console.log(response.data);
                  if(response.data != ''){
                   this.chat=response.data;
                  }  
              })
              .catch(error => {
                console.log(error);
              });
        } 
    },
    mounted(){
        // this.getoldmessage();
        Echo.private('chat')
            .listen('ChatEvent', (e) => {
            this.chat.message.push(e.message);
            this.chat.color.push('warning');
            this.chat.time.push(this.gettime());
            this.chat.user.push(e.user);
            
    //         axios.post('/savetosession',{
    //             chat : this.chat
    //         })
    //         .then( response => {
    //         })
    //         .catch(error => {
    //         });
    //         console.log(e);
    })
    .listenForWhisper('typing', (e) => {
        if(e.name != ''){
           this.typing='typing...'
        }else{
            this.typing=''
        }  
    });
    Echo.join(`chat`)
    .here((users) => {
        this.totaluser=users.length;
    })
    .joining((user) => {
        this.totaluser += 1;
        this.$toaster.success(user.name+' is join the chat room')
    })
    .leaving((user) => {
        this.totaluser -= 1;
        this.$toaster.warning(user.name+' is leave the chat room')
    })
    .error((error) => {
        console.error(error);
    });
    }
});
