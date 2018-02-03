<template>
  <b-row>
    <b-col sm="2" class="pl-0">
      <sidemenu id="sidemenu"></sidemenu>
    </b-col>
    <b-col sm="10" class="content">
      <h1>
        <strong>This is the test page</strong>
      </h1>
    </b-col>
  </b-row>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import {Logger} from '../util/log';

@Component({})
export default class AboutComponent extends Vue {

  // protected logger: Logger;
  repo = 'https://github.com/ducksoupdev/vue-webpack-typescript';

  // mounted() {
  //   if (!this.logger) this.logger = new Logger();
  //   this.$nextTick(() => this.logger.info('about is ready!'));
  // }
}

</script>
