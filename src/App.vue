<template>
  <div id="app"><router-view></router-view></div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator';

export default class App extends Vue {}
</script>

<style lang="scss">
@import '~vue-select/src/scss/vue-select.scss';

html {
  background: rgba(0, 0, 0, 0.07);
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333333;
  margin-top: 30px;
}
</style>
