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
  font-size: 26px;
  font-weight: 700;
  color: var(--color-gold);
  margin: 8px 0 0;
  letter-spacing: -0.01em;
}

.header {
  padding: 24px 16px 20px;

  img {
    filter: drop-shadow(0 0 8px rgba(245, 197, 24, 0.4));
    width: 48px;
    height: auto;
  }
}
</style>
