
import Vue from 'vue';
import Component from 'vue-class-component';
import Hoodie from '../../util/hoodie'

import './home.scss';

@Component({
  template: require('./home.html')
})
export class HomeComponent extends Vue {
  package: string = 'vue-webpack-typescript';
  repo: string = 'https://github.com/ducksoupdev/vue-webpack-typescript';
  mode: string = process.env.ENV || '';
}
