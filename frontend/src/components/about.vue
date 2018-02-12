<template>
  <b-row>
    <b-col md="2" class="pl-0">
      <sidemenu id="sidemenu"></sidemenu>
    </b-col>
    <b-col md="10" class="content">
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

  protected logger!: Logger;

  mounted() {
    if (!this.logger) this.logger = new Logger();
    this.$nextTick(() => this.logger.info('about is ready!'));
  }
}

</script>
