<template>
  <form v-if="user" @submit.prevent="logout()">
    {{ user.username }} is currently logged in.
    <button type="submit" class="btn btn-success">Logout</button>
  </form>
  <div v-else>
    <b-btn variant="success" @click="isSignup = true" v-b-modal.login-modal>Login</b-btn>

    <!-- Modal Component -->
    <b-modal @ok="submit()" ref="modal" id="login-modal" :title="isSignup ? 'Create Account' : 'Login'">
      <form @submit.prevent="submit(); $refs.modal.hide()" class="input-group">
        <div>{{error}}</div>
        <b-form-input type="text" name="username" v-model="credentials.username" placeholder="Username"></b-form-input>
      </form>
    </b-modal>
  </div>
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
  isSignup = false

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

  submit() {
    if (this.isSignup) {
      this.credentials.password = "temPassword2018";
      this.signup(this.credentials);
    } else {
      this.login(this.credentials);
    }
  }



  login(credentials: UserCredentials) {
    hoodie.account.signIn(credentials)
    .then(() => {
      return hoodie.account.get()
    })
    .then((user) => {
      this.user = user
      this.$router.push('/about')
    }).catch(this._onError)
  }
  signup(credentials: UserCredentials) {
    hoodie.account.signUp(credentials)
    .then(() => {
      return this.login(credentials);
    }).catch(this._onError)
    // TODO: show a flash / toast that account creation was successful
  }
  logout() {
    hoodie.account.signOut().then((result) => {
      console.log(result);
      this.user = null;
    }).catch(this._onError)
  }
}

</script>

<style lang="scss">

</style>
