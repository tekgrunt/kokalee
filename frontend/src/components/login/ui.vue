<template>
  <form @submit.prevent="_login()">
    <input type="text" name="username" v-model="username">
    <input type="password" name="password" v-model="password">
    <button type="submit">Login</button>
  </form>
</template>

<script lang="ts">

import Vue from 'vue'
import Component from 'vue-class-component';

@Component({
  props: [
    'login'
  ],
  data: () => ({
    username: '',
    password: ''
  })
})
export default class LoginUi extends Vue {
  _login() {
    if (typeof this.$props.login === 'function') {
      Promise.resolve(this.$props.login(this.$data))
      .then(() => {
        console.log('TODO: show success ui');
      }).catch((err) => {
        console.log('TODO: show err ui');
      })
      ;
    }
  }
}

</script>
