import Vue from 'vue';
import VueRouter, {Location, Route, RouteConfig} from 'vue-router';
import {makeHot, reload} from './util/hot-reload';

const homeComponent = () => import('./components/home').then(({HomeComponent}) => HomeComponent);
const aboutComponent = () => import('./components/about').then(({AboutComponent}) => AboutComponent);
const listComponent = () => import('./components/list').then(({ListComponent}) => ListComponent);
const sidemenuComponent = () => import('./components/sidemenu').then(({SideMenuComponent}) => SideMenuComponent);
// const homeComponent = () => import(/* webpackChunkName: 'home' */'./components/home').then(({HomeComponent}) => HomeComponent);
// const aboutComponent = () => import(/* webpackChunkName: 'about' */'./components/about').then(({AboutComponent}) => AboutComponent);
// const listComponent = () => import(/* webpackChunkName: 'list' */'./components/list').then(({ListComponent}) => ListComponent);

if (process.env.ENV === 'development' && module.hot) {
  const homeModuleId = './components/home';
  const aboutModuleId = './components/about';
  const listModuleId = './components/list';
  const sidemenuModuleId = './components/sidemenu';

  // first arguments for `module.hot.accept` and `require` methods have to be static strings
  // see https://github.com/webpack/webpack/issues/5668
  makeHot(homeModuleId, homeComponent,
    module.hot.accept('./components/home', () => reload(homeModuleId, (<any>require('./components/home')).HomeComponent)));

  makeHot(aboutModuleId, aboutComponent,
    module.hot.accept('./components/about', () => reload(aboutModuleId, (<any>require('./components/about')).default)));

  makeHot(listModuleId, listComponent,
    module.hot.accept('./components/list', () => reload(listModuleId, (<any>require('./components/list')).ListComponent)));

  makeHot(sidemenuModuleId, sidemenuComponent,
    module.hot.accept('./components/sidemenu', () => reload(sidemenuModuleId, (<any>require('./components/sidemenu')).SideMenuComponent)));
}

Vue.use(VueRouter);

export const createRoutes: () => RouteConfig[] = () => [
  {
    path: '/',
    component: homeComponent,
  },
  {
    path: '/about',
    component: aboutComponent,
  },
  {
    path: '/list',
    component: listComponent,
  },
  {
    path: '/sidemenu',
    component: sidemenuComponent,
  }
];

export const createRouter = () => new VueRouter({mode: 'history', routes: createRoutes()});
