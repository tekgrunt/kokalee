<template>
  <form v-if="user" @submit.prevent="_logout()">
    {{ user.username }} is currently logged in.
    <button type="submit">Logout</button>
  </form>
  <form v-else @submit.prevent="_login()">
    <div>{{error}}</div>
    <input type="text" name="username" v-model="credentials.username">
    <input type="password" name="password" v-model="credentials.password">
    <button type="submit">Login</button>
    <button @click.prevent="_signup">Create Account</button>
  </form>
</template>

<script lang="ts">

import Vue from 'vue'
import {Component, Prop, Watch} from 'vue-property-decorator'

@Component({
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
  @Prop() login: Function;
  @Prop() signup: Function
  @Prop() logout: Function
  @Prop() user: {id: string, session: string, username: string} | null = null

  error = null

  constructor() {
    super()
    // this._onError = this._onError.bind(this)
  }

  @Watch('user')
  onUserChanged() {
    console.log('got user in ui')
  }

  _onError(err) {
    this.error = err;
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
