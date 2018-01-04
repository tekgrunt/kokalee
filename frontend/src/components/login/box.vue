<template>
  <ui :login="login" :signup="signup" :logout="logout" :user="user"></ui>
</template>

<script lang="ts">

import Vue, {ComponentOptions} from 'vue'
import Component from 'vue-class-component';
import Ui from './ui.vue';
import hoodie from '../../util/hoodie'
// import {Logger} from '../util/log';

export interface User {
  username: string
  password: string
}

@Component({
  components: {
    Ui
  },
  data: () => ({
    user: null
  })
} as ComponentOptions<Vue>)
export default class LoginContainer extends Vue {
  constructor() {
    super();
    console.log('get user')
    hoodie.account.get().then((user) => {
      console.log('got user', user)
      if (user.session) {
        this.$data.user = user
      }
    }).catch((err) => {
      console.log(err)
    })
  }
  login(credentials: User) {
    return hoodie.account.signIn(credentials)
  }
  signup(credentials: User) {
    return hoodie.account.signUp(credentials)
  }
  logout() {
    return hoodie.account.signOut()
  }
}
</script>
