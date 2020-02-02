<template>
  <div id="year">
    <Predictions
      v-bind:questions="questions"
      v-bind:participants="participants"
    />
  </div>
</template>

<script lang="ts">
import Predictions from '@/components/Predictions.vue';
import { db } from '@/db';
import { Component, Prop, Vue } from 'vue-property-decorator';

import 'firebase/firestore';

const years = db.collection('years');

@Component({
  data() {
    return {
      questions: [],
      participants: []
    };
  },
  components: {
    Predictions
  },
  firestore: {
    years
  },
  watch: {
    id: {
      immediate: true,
      handler(id) {
        this.$bind('questions', years.doc(id).collection('questions'));
        this.$bind('participants', years.doc(id).collection('participants'));
      }
    }
  }
})
export default class YearComponent extends Vue {
  @Prop() private id!: string;
}
</script>
