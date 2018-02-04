<template>
  <div class="content">
    <iframe :src="chatServer"></iframe>
  </div>
</template>

<script lang="ts">
/// <reference types="node" />

import Vue from 'vue'
import Component from 'vue-class-component';
import {Logger} from '../util/log';

@Component({})
export default class ChatComponent extends Vue {
  protected logger: Logger;

  chatServer: string = process.env.ROCKET_CHAT!;

  mounted() {
    if (!this.logger) this.logger = new Logger();
    this.$nextTick(() => this.logger.info('chat is ready!'));
  }
}

</script>

<style lang="scss" scoped>
@import "../sass/variables";

// Repeated to raise selector specificity
.content.content.content {
  margin-top: $navbar-height + 2px;
  margin-left: -15px;
  margin-right: -15px;
  display: flex;
  width: 100%;
}
iframe {
  width: 100%;
  border: 0;
}
</style>