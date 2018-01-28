<template lang="html">
  <div class="content">
    <h2>Safety Guidelines</h2>
    <div id="accordion">
      <div class="card">
        <div class="card-header" id="headingOne">
          <h5 class="mb-0">
            <button v-on:click="showOne = !showOne" class="btn btn-link">
            Responsibilities
            </button>
          </h5>
        </div>
        <div v-if="showOne">
          <div class="card-body">
            <details>
              <summary>Employer Responsibilities</summary>
              <ul>
                <li>Meet health and safety regulations.</li>
                <li>If there are 20 or more workers on site, provide a written safety program.</li>
                <li>Provide training for the use of power tools, machinery and equipment.</li>
              </ul>
            </details>
            <details>
              <summary>Supervisor Responsibilities</summary>
              <ul>
                <li>Ensure employees under their direction are trained adequately before performing assigned tasks.</li>
                <li>Identify and eliminate work hazards.</li>
                <li>Receive and act upon injury and accident reports.</li>
              </ul>
            </details>
            <details>
              <summary>Employee Responsibilities</summary>
              <ul>
                <li>Comply with safety and health regulations and do not endanger yourself or others.</li>
                <li>Report unsafe conditions that are hazardous to yourself and others.</li>
              </ul>
            </details>
          </div>
        </div>
      </div>
    </div>
      <div class="card">
        <div class="card-header" id="headingTwo">
          <h5 class="mb-0">
            <button class="btn btn-link" v-on:click="showTwo = !showTwo">
            Camps
            </button>
          </h5>
        </div>
        <div id="collapseTwo" v-if="showTwo">
          <div class="card-body">
            <div class="alert alert-warning" role="alert">
              <p><strong>All camps must exceed minimum standards in the regulations:</strong></p>
              <ul>
                <li>Industrial Camp Health Regulations(Health Act)</li>
                <li>Ministry of Forests <i>Silviculture Contract, Camp Standards</i> (Schedule "D")</li>
              </ul>
            </div>
            <details>
              <summary>Types of Accommodations</summary>
              <ul>
                <li>semi-permanent work camps (e.g. logging or construction camp)</li>
                <li>community sources (e.g. motel/hotel, boarding house)</li>
                <li>tent camps with temporary washing and cooking facilities</li>
              </ul>
            </details>
            <details>
              <summary>Laundry</summary>
              <p>Laundry must be done at least once per week. The laundry facility must be:</p>
              <ul>
                <li>heated and lighted</li>
                <li>separate from food preparation, serving and dining areas</li>
                <li>adequate for changing clothes</li>
                <li>capable of drying clothes for all workers in 12 hours</li>
              </ul>
            </details>
            <details>
              <summary>Food preparation, handling, and storage</summary>
              <p>Follow guidelines as outlined ________. </p>
              <ul>
                <li>hand washing facilities must be provided for food handlers</li>
                <li>all utensils and kitchenware must be cleaned and sanitized</li>
                <li>dining facilities must be dry, heated, with backend chairs and sanitary furniture</li>
                <li>water used for food preparation must be drinking quality</li>
                <li>food preparation surfaces must be impermeable to water, easy to clean, and kept sanitary</li>
              </ul>
            </details>
            <details>
              <summary>Sanitary Facilities</summary>
              <ul>
                <li>privies, washing and sewage sources must not contaminate any bodies of water</li>
                <li>privies must be adequately stocked, easy to clean, vented and private</li>
                <li>refuse and waste must not accumulate in or near the camp and be stored in covered waste disposals</li>
                <li>Reduce bear problems. DO NOT throw food into surrounding areas of the camp.</li>
              </ul>
            </details>
            <details>
              <summary>Water and Nutrition</summary>
              <ul>Drinking water must be:
                <li>potable</li>
                <li>stored in clean containers and dispensed in a closed container with a tap</li>
              </ul>
              <div class="alert alert-info" role="alert">
                <p><strong>Physically demanding work requires a higher daily intake of calories and water.</strong></p>
                <ul>
                  <li>eat approximately 5000-7000 calories a day</li>
                  <li>drink approximately 4-8 litres of water per day</li>
                  <li>Listen to your body. Pay attention to the demands of your job and the environment.</li>
                </ul>
              </div>
            </details>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header" id="headingThree">
          <h5 class="mb-0">
            <button class="btn btn-link" v-on:click="showThree = !showThree">
            Accidents and Injuries
            </button>
          </h5>
        </div>
        <div id="collapseThree" v-if="showThree">
          <div class="card-body">
            <div class="alert alert-danger" role="alert">
              <p><strong>24 hour WCB emergency phone number: 604-273-7711</strong></p>
              <ul>Call immediately when the accident:
                <li>results in death or critical injury</li>
                <li>involves a major structural failure of a building, bridge, tower crane, hoist, excavation</li>
                <li>involves a major release of a toxic or hazardous substance</li>
                <li>involves a blasting or diving incident</li>
              </ul>
            </div>
            <details>
              <summary>Accidents</summary>
              <div>
                <p><strong>Report all accidents to your supervisor immediately.</strong></p>
                <p>Accidents include anything resulting in damage to property or equipment, personal injury and a hazardous substance spill.</p>
              </div>
              <ul>Your employer must investigate the cause of accidents if they:
                <li>result in death or critical injury</li>
                <li>involve a major structural failure or building collapse</li>
                <li>involve a major release of a toxic or hazardous substance</li>
                <li>involve a blast or diving incident</li>
                <li>result in injury requiring medical treatment</li>
                <li>could have resulted in causing serious injury</li>
              </ul>
              <p>A report with recommendations to prevent recurrence must be produced then reviewed at the monthly safety meeting.</p>
              <p>Copies of the report must be sent to the local WCB office.</p>
            </details>
            <details>
              <summary>Injuries</summary>
                <p><strong>Report injuries to your supervisor and get first aid treatment immediately.<br>Without a report, you may not be able to claim compensation.</strong></p>
                <div>
                  <p>Report these events to the WCB to process a compensation claim <strong>within 72 hours</strong> of their occurrence:</p>
                  <ul>
                    <li>losing consciousness following an injury</li>
                    <li>transportation to a hospital for medical treatment or recommendation to do so</li>
                    <li>obvious need for medical treatment, intention to seek medical treatment or receiving medical treatment</li>
                    <li>unable to return to usual job function due to injury</li>
                    <li>employee or the board has requested an "Employer's Report" be sent to the WCB</li>
                  </ul>
                  <p>Report these incidents using the WCB Form 7, <i>Employer's Report of Injury or Industrial Disease</i>and also Form 7A, First Aid Report.</p>
                </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import Vue from 'vue'
import {Component} from 'vue-property-decorator'
// import hoodie from '../util/hoodie'
import app from '../util/app'


@Component({})

export default class InfoComponent extends Vue {
  showOne: boolean = false
  showTwo: boolean = false
  showThree: boolean = false
}
</script>

<style lang="scss">
  .btn-link {
      font-size: 25px;
  }
  summary {
    font-size: 18px;
    padding: 5px;
  }
  li {
    font-size: 16px;
    padding: 2px;
  }
</style>
