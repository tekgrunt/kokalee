<template>
  <div>
  <ui :login="login" :signup="signup" :logout="logout" :user="user"></ui>
    {{user|json}}
    </div>
</template>

<script lang="ts">
// TODO: use vue-inject instead of a container component
import Vue, {ComponentOptions} from 'vue'
import {Component, Prop, Watch} from 'vue-property-decorator';
import Ui from './ui.vue';
import hoodie from '../../util/hoodie'
// import {Logger} from '../util/log';

export interface User {
  username: string
  password: string
}

interface LoginData {
  user: {
    createdAt: string,
    id: string
  }
}

type Nullable<T> = {
  [K in keyof T]: T[K] | null
}

@Component({
  components: {
    Ui
  },
  filters: {
    json(o) {
      return JSON.stringify(o)
    }
  }
} as ComponentOptions<Vue>)
export default class LoginContainer extends Vue {
  user: User | null

  data() {
    return {
      user: null
    }
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

  login(credentials: User) {
    return hoodie.account.signIn(credentials)
    .then(() => {
      return hoodie.account.get()
    })
    .then((user) => {
      this.user = user
    })
  }
  signup(credentials: User) {
    return hoodie.account.signUp(credentials)
    .then(() => {
      return this.login(credentials);
    })
  }
  logout() {
    return hoodie.account.signOut().then((result) => {
      console.log(result);
      this.user = null;
    })
  }
}
</script>
