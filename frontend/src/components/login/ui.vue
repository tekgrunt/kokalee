<template>
  <form @submit="login()">
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
  data: {
    username: '',
    password: ''
  }
})
export default class LoginUi extends Vue {
  login() {
    console.log('login')
    if (typeof this.$props.login === 'function') {
      Promise.resolve(this.$props.login(this.$data))
      .then(() => {
        console.log('TODO: success');
      }).catch((err) => {
        console.log('TODO: err');
      })
      ;
    }
  }
}

</script>
