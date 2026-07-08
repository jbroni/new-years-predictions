<template>
  <div id="years">
    <YearSelector v-bind:years="years" v-bind:loading="loading"></YearSelector>
  </div>
</template>

<script lang="ts">
import YearSelector from '@/components/YearSelector.vue';
import { db } from '@/db';
import { Year } from '@/interfaces/year';
import { Component, Vue } from 'vue-property-decorator';

import 'firebase/firestore';

@Component({
  components: {
    YearSelector
  }
})
export default class Years extends Vue {
  public years: Year[] = [];
  public loading: boolean = true;

  public created(): void {
    this.$bind('years', db.collection('years')).then(() => {
      this.loading = false;
    });
  }
}
</script>
