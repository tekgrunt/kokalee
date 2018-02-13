<template>
  <b-row class="chat-container">
    <div class="content">
      <iframe :src="chatServer"></iframe>
    </div>
  </b-row>
</template>

<script lang="ts">
/// <reference types="node" />

import Vue from 'vue'
import Component from 'vue-class-component';
import {Logger} from '../util/log';

@Component({})
export default class ChatComponent extends Vue {
  protected logger!: Logger;

  chatServer: string = process.env.ROCKET_CHAT!;

  mounted() {
    if (!this.logger) this.logger = new Logger();
    this.$nextTick(() => {
      this.logger.info('chat is ready!' + this.chatServer)
    });
  }
}

</script>

<style lang="scss" scoped>
@import "../sass/variables";

.chat-container {
  height: 100vh;
  display: flex;
}
// Repeated to raise selector specificity
.content.content.content {
  margin-top: $navbar-height;
  display: flex;
  width: 100%;
}
iframe {
  width: 100%;
  border: 0;
  min-height: 500px;
}
</style>