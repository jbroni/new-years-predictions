<template>
  <Loading v-if="loading" />
  <div id="year-selector" class="page" v-else-if="years.length > 0">
    <TopBar
      v-bind:years="years"
      v-bind:currentYearId="selectedYear && selectedYear.id"
    />

    <Year v-bind:id="selectedYear.id" v-if="selectedYear" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Year } from '@/interfaces/year';
import Loading from './Loading.vue';
import TopBar from './TopBar.vue';
import YearComponent from './Year.vue';

@Component({
  components: { Year: YearComponent, TopBar, Loading }
})
export default class YearSelector extends Vue {
  public selectedYear: Year | null = null;

  @Prop() private years!: Year[];
  @Prop({ default: false }) private loading!: boolean;

  @Watch('years') public onYearsChanged(): void {
    this.updateYear();
  }

  @Watch('$route') public onRouteChanged(): void {
    this.updateYear();
  }

  private updateYear(): void {
    if (this.years.length > 0) {
      this.selectedYear =
        this.years.find(year => year.id === this.$route.params.year) ||
        this.years[this.years.length - 1];

      document.title = `Nytårsforudsigelser for ${this.selectedYear.id}`;
    }
  }
}
</script>
