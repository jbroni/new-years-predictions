<template>
  <div id="years">
    <Navigation v-bind:years="years"></Navigation>
    <YearSelector v-bind:years="years"></YearSelector>
  </div>
</template>

<script lang="ts">
import Navigation from '@/components/Navigation.vue';
import YearSelector from '@/components/YearSelector.vue';
import { db } from '@/db';
import { Component, Vue } from 'vue-property-decorator';
import vSelect from 'vue-select';

import 'firebase/firestore';

Vue.component('v-select', vSelect);

@Component({
  data: () => {
    return {
      years: []
    };
  },
  components: {
    Navigation,
    YearSelector
  },
  firestore: {
    years: db.collection('years')
  }
})
export default class Years extends Vue {}
</script>
