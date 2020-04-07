<template>
  <div id="years"><YearPicker v-bind:years="years"></YearPicker></div>
</template>

<script lang="ts">
import YearPicker from '@/components/YearPicker.vue';
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
    YearPicker
  },
  firestore: {
    years: db.collection('years')
  }
})
export default class Years extends Vue {}
</script>
