<template>
  <div id="year-picker" v-if="years.length > 0">
    <v-select
      v-model="selectedYear"
      label="id"
      :options="years"
      :searchable="false"
      :clearable="false"
    ></v-select>

    <Year v-bind:id="selectedYear.id" v-if="selectedYear" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Year } from '@/interfaces/year';
import YearComponent from './Year.vue';

@Component({
  components: { Year: YearComponent }
})
export default class YearPicker extends Vue {
  public selectedYear: Year | null = null;

  @Prop() private years!: Year[];

  @Watch('years') public onYearsChanged(): void {
    if (this.years.length > 0) {
      this.selectedYear = this.years[this.years.length - 1];
    }
  }
}
</script>

<style scoped></style>
