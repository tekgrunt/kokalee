<template>
  <form v-if="user">
    {{ user.username }} is currently logged in.
    <button type="submit">Logout</button>
  </form>
  <form v-else @submit.prevent="_login()">
    <div>{{error}}</div>
    <input type="text" name="username" v-model="credentials.username">
    <input type="password" name="password" v-model="credentials.password">
    <button type="submit">Login</button>
    <button>Create Account</button>
  </form>
</template>

<script lang="ts">

import Vue from 'vue'
import Component from 'vue-class-component';

@Component({
  props: {
    login: {type: Function},
    signup: {type: Function},
    logout: {type: Function},
    user: {default: null}
  },
  data: function (this: LoginUi) {
    return {
      credentials: {
        username: '',
        password: ''
      },
      error: null
    };
  }
})
export default class LoginUi extends Vue {
  user: {id: string, session: string, username: string}
  _onError = (err) => {
    this.$data.error = err;
  }
  _login() {
    if (!(typeof this.$props.login === 'function')) return;

    Promise.resolve(this.$props.login(this.$data.credentials))
    .then((user) => {
      console.log('TODO: show success ui or welcome message, etc.');
    }).catch(this._onError);
  }
  _logout() {
    if (!(typeof this.$props.login === 'function')) return;

    Promise.resolve(this.$props.logout())
    .then((user) => {
      console.log('TODO: show success ui or goodbye message, etc.');
    }).catch(this._onError);
  }
  _signup() {
    if (!(typeof this.$props.login === 'function')) return;

    Promise.resolve(this.$props.signup(this.$data.credentials))
    .then((user) => {
      console.log('TODO: show success ui or welcome message, etc.');
    }).catch(this._onError);
  }
}

</script>
