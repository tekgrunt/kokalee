
import {Collapse, Dropdown} from 'uiv';
import Vue from 'vue';
import Component from 'vue-class-component';
import {Watch} from 'vue-property-decorator';
import {Link} from '../util/link';
import {Logger} from '../../util/log';
import hoodie from '../../util/hoodie'

@Component({
  template: require('./navbar.html'),
  components: {
    collapse: Collapse,
  }
})

export class NavbarComponent extends Vue {
  protected logger!: Logger;

  links: Link[] = [
    new Link('Home', '/'),
    new Link('About', '/about'),
    new Link('List', '/list'),
    new Link('File Share', '/share'),
    new Link('Resources', '/info')
  ];

  @Watch('$route.path')
  pathChanged() {
    this.logger.info(`Changed current path to: ${this.$route.path}`);
  }

  mounted() {
    if (!this.logger) this.logger = new Logger();
  }
}
