<template>
  <div id="navigation">
    <Slide :closeOnNavigation="true" noOverlay>
      <h1>&Aring;r</h1>
      <a v-for="year in years" :href="'#/years/' + year.id">
        <span>{{ year.id }}</span>
      </a>
      <h1>Statistik</h1>
      <a href="#/stats/"><span>Oversigt</span></a>
    </Slide>
  </div>
</template>

<script lang="ts">
import { Year } from '@/interfaces/year';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Slide } from 'vue-burger-menu';

@Component({
  components: {
    Slide
  }
})
export default class Navigation extends Vue {
  @Prop() private years!: Year[];
}
</script>

<style lang="scss">
#navigation {
  padding-bottom: 50px;

  h1 {
    padding: 0;
    margin: 0;
  }
}
</style>
