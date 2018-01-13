import Vue from 'vue';
import VueRouter from 'vue-router';
import {makeHot, reload} from './util/hot-reload';
import {createRouter} from './router';
import VueOnsen from 'vue-onsenui';

Vue.use(VueOnsen);

const navbarComponent = () => import('./components/navbar')
.then(({NavbarComponent}) => NavbarComponent);
// tslint:disable-next-line space-in-parens
// const navbarComponent = () => import(/* webpackChunkName: 'navbar' */'./components/navbar')
// .then(({NavbarComponent}) => NavbarComponent);

const sidemenuComponent = () => import('./components/sidemenu')
.then(({SideMenuComponent}) => SideMenuComponent);
const login = () => import('./components/login')
.then(({default: c}) => c);

import './sass/main.scss';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

if (process.env.ENV === 'development' && module.hot) {
  const navbarModuleId = './components/navbar';

  // first arguments for `module.hot.accept` and `require` methods have to be static strings
  // see https://github.com/webpack/webpack/issues/5668
  makeHot(navbarModuleId, navbarComponent,
    module.hot.accept('./components/navbar', () => reload(navbarModuleId, (<any>require('./components/navbar')).NavbarComponent)));
}

// tslint:disable-next-line no-unused-expression
new Vue({
  el: '#app-main',
  router: createRouter(),
  components: {
    login,
    'navbar': navbarComponent,
    'sidemenu': sidemenuComponent
  }
});
