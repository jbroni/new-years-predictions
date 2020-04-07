<template>
  <div id="navigation">
    <Slide :closeOnNavigation="true" noOverlay>
      <h1>&Aring;r</h1>
      <a href="#/years/2019"> <span>2019</span> </a>
      <a href="#/years/2020"> <span>2020</span> </a>
    </Slide>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Slide } from 'vue-burger-menu';

@Component({
  components: {
    Slide
  }
})
export default class Navigation extends Vue {}
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
