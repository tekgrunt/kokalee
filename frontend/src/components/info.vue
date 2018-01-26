<template lang="html">
  <div class="content">
    <p>{{ greeting }}</p>
    <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
      <div class="panel panel-default">
        <div class="panel-heading" role="tab" id="headingOne">
          <h4 class="panel-title">
            <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne">
            Responsibilities</a>
          </h4>
        </div>
        <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
          <div class="panel-body">
            <h4>Employer Responsibilities</h4>
            <ul>
              <li>Provide a safe work environment. Meet health and safety regulations.</li>
              <li>If there are 20 or more workers on site, a written safety program is required.</li>
              <li>Provide training for the use of power tools, machinery and equipment</li>
            </ul>
            <h4>Supervisor Responsibilities</h4>
            <ul>
              <li>Ensure employees under their direction are trained adequately before performing assigned tasks.</li>
              <li>Identify and eliminate work hazards.</li>
              <li>Receive and act upon injury and accident reports.</li>
            </ul>
            <h4>Employee Responsibilities</h4>
            <ul>
              <li>Comply with safety and health regulations and do not endanger yourself or others.</li>
              <li>Report unsafe conditions that are hazardous to yourself and others.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- <ul class="nav nav-tabs">
      <li role="presentation" v-for="topic in topics"><a href='#'>{{ topic }}</a></li>
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
  topics: string[] = ['Responsibilities', 'Camps']
}
</script>

<style lang="scss">
</style>
