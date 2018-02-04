<template>
  <div class="container content">
    <h1>
      <strong>This is the test page</strong>
    </h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import {Logger} from '../util/log';

@Component({})
export default class AboutComponent extends Vue {
  protected logger: Logger;

  mounted() {
    if (!this.logger) this.logger = new Logger();
    this.$nextTick(() => this.logger.info('about is ready!'));
  }
}

</script>
