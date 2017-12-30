
import Vue from 'vue';
import Component from 'vue-class-component';
import {Logger} from '../../util/log';
import {Link} from '../util/link';

@Component({
  template: require('./sidemenu.html')
})
export class SideMenuComponent extends Vue {

  protected logger: Logger;

  object: { default: string } = {default: 'Default object property!'}; // objects as default values don't need to be wrapped into functions

  links: Link[] = [
    new Link('Home', '/'),
    new Link('About', '/about'),
    new Link('List', '/list')
  ];

  mounted() {
    if (!this.logger) this.logger = new Logger();
    this.$nextTick(() => this.logger.info('about is ready!'));
  }
}
