<template>
  <form v-if="user" @submit.prevent="logout()">
    {{ user.username }} is currently logged in.
    <button type="submit">Logout</button>
  </form>
  <form v-else @submit.prevent="login(credentials)">
    <div>{{error}}</div>
    <input type="text" name="username" v-model="credentials.username">
    <input type="password" name="password" v-model="credentials.password">
    <button type="submit">Login</button>
    <button @click.prevent="signup(credentials)">Create Account</button>
  </form>
</template>

<script lang="ts">

import Vue from 'vue'
import {Component, Prop, Watch} from 'vue-property-decorator'
import hoodie from '../util/hoodie'
import app from '../util/app'
import {User} from '../util/types'

export interface UserCredentials {
  username: string
  password: string
}

@Component({
  filters: {
    json(o) {
      return JSON.stringify(o)
    }
  }
})
export default class LoginUi extends Vue {
  user: User | null = null
  credentials: UserCredentials = {username: '', password: ''}
  error = null

  constructor() {
    super()
    // this._onError = this._onError.bind(this)
  }

  created() {
    hoodie.account.get().then((user) => {
      if (user.session) {
        this.user = user
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  @Watch('user')
  onUserChange() {
    app.user = this.user
  }

  _onError(err) {
    this.error = err;
    console.error(err.stack || err)
  }

  login(credentials: UserCredentials) {
    hoodie.account.signIn(credentials)
    .then(() => {
      return hoodie.account.get()
    })
    .then((user) => {
      this.user = user
    }).catch(this._onError)
  }
  signup(credentials: UserCredentials) {
    hoodie.account.signUp(credentials)
    .then(() => {
      return this.login(credentials);
    }).catch(this._onError)
  }
  logout() {
    hoodie.account.signOut().then((result) => {
      console.log(result);
      this.user = null;
    }).catch(this._onError)
  }
}

</script>
