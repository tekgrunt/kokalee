import Vue from 'vue';
import VueRouter, {Location, Route, RouteConfig} from 'vue-router';
import {makeHot, reload} from './util/hot-reload';

const homeComponent = () => import('./components/home').then(({HomeComponent}) => HomeComponent);
const shareComponent = () => import('./components/share.vue').then(({default: ShareComponent}) => ShareComponent);
const sidemenuComponent = () => import('./components/sidemenu').then(({SideMenuComponent}) => SideMenuComponent);
const infoComponent = () => import('./components/info.vue').then(({default: InfoComponent}) => InfoComponent);
const todoComponent = () => import('./components/todo.vue').then(({default: TodoComponent}) => TodoComponent);
const chat = async () => (await import('./components/chat.vue')).default

if (process.env.ENV === 'development' && module.hot) {
  const homeModuleId = './components/home';
  const shareModuleId = './components/share';
  const sidemenuModuleId = './components/sidemenu';
  const infoModuleId = './components/info.vue';
  const todoModuleId = './components/todo.vue';

  // first arguments for `module.hot.accept` and `require` methods have to be static strings
  // see https://github.com/webpack/webpack/issues/5668
  makeHot(homeModuleId, homeComponent,
    module.hot.accept('./components/home', () => reload(homeModuleId, (<any>require('./components/home')).HomeComponent)));

  makeHot(shareModuleId, shareComponent,
    module.hot.accept('./components/share', () => reload(shareModuleId, (<any>require('./components/share')).ShareComponent)));

  makeHot(sidemenuModuleId, sidemenuComponent,
    module.hot.accept('./components/sidemenu', () => reload(sidemenuModuleId, (<any>require('./components/sidemenu')).SideMenuComponent)));

  const chatId = './components/chat.vue'
  makeHot(chatId, chat,
    module.hot.accept('./components/chat.vue', () =>
      reload(chatId, (<any>require('./components/chat.vue')).default)))

  makeHot(infoModuleId, infoComponent,
    module.hot.accept('./components/info.vue', () => reload(infoModuleId, (<any>require('./components/info.vue')).default)));

  makeHot(todoModuleId, todoComponent,
    module.hot.accept('./components/todo.vue', () => reload(todoModuleId, (<any>require('./components/todo.vue')).default)));
}
Vue.use(VueRouter);

export const createRoutes: () => RouteConfig[] = () => [
  {
    path: '/',
    component: homeComponent,
  },
  {
    path: '/share',
    component: shareComponent,
  },
  {
    path: '/info',
    component: infoComponent
  },
  {
    path: '/todo',
    component: todoComponent
  },
  {
    path: '/chat',
    component: chat,
  }
];

export const createRouter = () => new VueRouter({mode: 'history', routes: createRoutes()});
