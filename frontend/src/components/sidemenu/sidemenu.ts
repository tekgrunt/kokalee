
import Vue from 'vue';
import Component from 'vue-class-component';
import {Logger} from '../../util/log';
import {Link} from '../util/link';

@Component({
  template: require('./sidemenu.html')
})
export class SideMenuComponent extends Vue {

  protected logger!: Logger;

  links: Link[] = [
    new Link('Home', '/'),
    new Link('About', '/about'),
    new Link('List', '/list'),
    new Link('Chat', '/chat')
  ];

  mounted() {
    if (!this.logger) this.logger = new Logger();
  }
}
