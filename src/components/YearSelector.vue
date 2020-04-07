<template>
  <div id="year-selector" v-if="years.length > 0">
    <div class="header">
      <img alt="Krystalkugle" src="../assets/crystal-ball.png" />
      <h1>{{ title }}</h1>
    </div>

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
export default class YearSelector extends Vue {
  public selectedYear: Year | null = null;
  public title: string = 'Nytårsforudsigelser';

  @Prop() private years!: Year[];

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

      this.title = `Nytårsforudsigelser for ${this.selectedYear.id}`;
      document.title = this.title;
    }
  }
}
</script>

<style lang="scss">
h1 {
  font-size: 24px;
  font-weight: bold;
  margin-top: -10px;
}

.header {
  padding-bottom: 20px;
}
</style>
