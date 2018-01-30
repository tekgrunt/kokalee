
import Vue from 'vue';
import Component from 'vue-class-component';
import Hoodie from '../../util/hoodie'

import './home.scss';

@Component({
  template: require('./home.html')
})
export class HomeComponent extends Vue {
  mode: string = process.env.ENV || '';
}
