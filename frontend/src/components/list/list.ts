
import Vue from 'vue';
import Component from 'vue-class-component';
import axios, {AxiosResponse, AxiosStatic} from 'axios';
import hoodie from '../../util/hoodie';

interface UserResponse {
  id: string;
  name: string;
}

@Component({
  template: require('./list.html')
})
export class ListComponent extends Vue {

  items: UserResponse[] = [];
  private url = 'https://jsonplaceholder.typicode.com/users';
  protected axios: AxiosStatic = axios;
  protected hoodie = hoodie
  protected store = hoodie.store.withIdPrefix('list')

  mounted() {
    this.$nextTick(() => {
      this.loadItemsAxios();
    });
  }

  addItem() {
    this.store.add({
      name: 'another item'
    }).then((response) => {
      console.log('added item:', response)
    }).catch((err) => {
      this.hoodie.log(err);
    })
  }
  loadItems() {
    console.log('loading items')
    this.store.findAll().then((items) => {
      this.items = items
    }).catch((err) => {
      this.hoodie.log(err);
    })
  }
  private loadItemsAxios() {
    if (!this.items.length) {
      this.axios.get(this.url).then((response) => {
        this.items = response.data;
      }, (error) => {
        console.error(error);
      });
    }
  }
}
