<!--
This component is for the specific Droppy (DropBox clone) integration.

Instructions on how to configure your local developmnent environment
can be found in the Github Wiki

https://github.com/tekgrunt/kokalee/wiki/Droppy
-->

<template lang="html">
  <b-row>
    <b-col sm="2" class="pl-0" id="droppyMenu">
      <sidemenu id="sidemenu"></sidemenu>
    </b-col>
    <b-col sm="10" class="content" id="droppy">
        <iframe id="droppyFrame" src="http://192.168.2.83:8989/"></iframe>
    </b-col>
  </b-row>
</template>

<script lang="ts">

import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import app from '../util/app'

@Component({})

export default class ShareComponent extends Vue {


}
</script>

<style lang="scss">

</style>
