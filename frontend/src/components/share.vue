<template>
  <b-row>
    <b-col md="2" class="pl-0">
      <sidemenu id="sidemenu"></sidemenu>
    </b-col>
    <b-col id="shareContainer" md="10" class="content">
      <iframe id="shareFrame" src="http://localhost:8989/"></iframe>
    </b-col>
  </b-row>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import {Logger} from '../util/log';

@Component({})
export default class ShareComponent extends Vue {

  protected logger!: Logger;

  mounted() {
    if (!this.logger) this.logger = new Logger();
    this.$nextTick(() => this.logger.info('about is ready!'));
  }
}

</script>
