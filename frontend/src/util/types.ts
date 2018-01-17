import Vue from 'vue';

export interface User {
  id: string
  username: string
  createdAt: string
  signedUpAt: string
  session: {
    id: string
  }
}

export declare class AppComponent extends Vue {
  user?: User | null;
}
