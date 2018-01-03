<template>
  <ui :login="login"></ui>
</template>

<script lang="ts">

import Vue, {ComponentOptions} from 'vue'
import Component from 'vue-class-component';
import Ui from './ui.vue';
// import {Logger} from '../util/log';

@Component({
  components: {
    Ui
  }
} as ComponentOptions<Vue>)
export default class LoginContainer extends Vue {
  login(credentials: {username: string, password: string}) {
    console.log('logging in...')
  }
}
</script>
