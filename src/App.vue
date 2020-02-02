<template>
  <div id="app"><YearPicker v-bind:years="years" /></div>
</template>

<script lang="ts">
import YearComponent from '@/components/Year.vue';
import YearPicker from '@/components/YearPicker.vue';
import { db } from '@/db';
import { Component, Vue } from 'vue-property-decorator';
import Predictions from './components/Predictions.vue';
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
    YearPicker,
    Year: YearComponent,
    Predictions
  },
  firestore: {
    years: db.collection('years')
  }
})
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
