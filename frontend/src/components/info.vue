<template lang="html">
  <div>
    <p>{{ greeting }}</p>
    <!-- <ul class="nav nav-tabs">
      <li role="presentation" v-for="topic in topics">{{ topic }}</li>
    </ul> -->
  </div>
</template>

<script lang="ts">

import Vue from 'vue'
import {Component} from 'vue-property-decorator'
// import hoodie from '../util/hoodie'
import app from '../util/app'


@Component({})

export default class InfoComponent extends Vue {
  greeting: string = "Hello World"
}
</script>

<style lang="scss">
</style>
