import {spy, assert} from 'sinon';
import {expect} from 'chai';
import Component from 'vue-class-component';
import {ComponentTest, MockLogger} from '../../util/component-test';
import {SideMenuComponent} from './sidemenu';

const loggerSpy = spy();

@Component({
  template: require('./sidemenu.html')
})
class MockSideMenuComponent extends SideMenuComponent {
  constructor() {
    super();
    this.logger = new MockLogger(loggerSpy);
  }
}

describe('SideMenu component', () => {
  let directiveTest: ComponentTest;

  beforeEach(() => {
    directiveTest = new ComponentTest('<div><sidemenu></sidemenu></div>', {'sidemenu': MockSideMenuComponent});
  });

  it('should render correct contents', async () => {
    debugger;
    directiveTest.createComponent();

    await directiveTest.execute((vm) => {
      expect(vm.$el.querySelector('.repo-link')!.getAttribute('href')).to.equal('https://github.com/ducksoupdev/vue-webpack-typescript');
      assert.calledWith(loggerSpy, 'about is ready!');
    });
  });
});
