import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router';
import {makeHot, reload} from './util/hot-reload';
import {createRouter} from './router';

Vue.use(BootstrapVue);

const navbarComponent = () => import('./components/navbar')
.then(({NavbarComponent}) => NavbarComponent);
// tslint:disable-next-line space-in-parens
// const navbarComponent = () => import(/* webpackChunkName: 'navbar' */'./components/navbar')
// .then(({NavbarComponent}) => NavbarComponent);

const sidemenuComponent = () => import('./components/sidemenu')
.then(({SideMenuComponent}) => SideMenuComponent);
const login = () => import('./components/login.vue')
.then(({default: c}) => c);

import './sass/main.scss';
import {AppComponent} from './util/types';

if (process.env.ENV === 'development' && module.hot) {
  const navbarModuleId = './components/navbar';

  // first arguments for `module.hot.accept` and `require` methods have to be static strings
  // see https://github.com/webpack/webpack/issues/5668
  makeHot(navbarModuleId, navbarComponent,
    module.hot.accept('./components/navbar', () => reload(navbarModuleId, (<any>require('./components/navbar')).NavbarComponent)));
}

declare global {
  const app: AppComponent
}

(window as any).app =
new Vue({
  el: '#app-main',
  router: createRouter(),
  components: {
    login,
    'navbar': navbarComponent,
    'sidemenu': sidemenuComponent
  }
});
