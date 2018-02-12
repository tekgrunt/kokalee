import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router';
import {makeHot, reload} from './util/hot-reload';
import {createRouter} from './router';

Vue.use(BootstrapVue);

const navbar = async () => (await import('./components/navbar')).NavbarComponent
const sidemenu = async () => (await import('./components/sidemenu')).SideMenuComponent
const info = async () => (await import('./components/info.vue')).default
const todo = async () => (await import('./components/todo.vue')).default
const login = async () => (await import('./components/login.vue')).default

import './sass/main.scss';
import {AppComponent} from './util/types';

if (process.env.ENV === 'development' && module.hot) {
  const navbarId = './components/navbar'
  makeHot(navbarId, navbar,
    module.hot.accept('./components/navbar', () =>
      reload(navbarId, (<any>require('./components/navbar')).NavbarComponent)))

  const sidemenuId = './components/sidemenu'
  makeHot(sidemenuId, sidemenu,
    module.hot.accept('./components/sidemenu', () =>
      reload(sidemenuId, (<any>require('./components/sidemenu')).SideMenuComponent)))

  const loginId = './components/login.vue'
  makeHot(loginId, login,
    module.hot.accept('./components/login.vue', () =>
      reload(loginId, (<any>require('./components/login.vue')).default)))
}

declare global {
  const app: AppComponent
}

// Globally registered components. Prefer to put components here, it keeps things simple
Vue.component('login', login);
Vue.component('sidemenu', sidemenu);
Vue.component('todo', todo);

(window as Window & {app: AppComponent}).app =
new Vue({
  el: '#app-main',
  router: createRouter(),
  components: {
    info,
    navbar,
  }
});
