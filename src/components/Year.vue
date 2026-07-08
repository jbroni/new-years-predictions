<template>
  <div id="year">
    <Loading v-if="loading" inline />
    <Predictions
      v-else
      v-bind:questions="questions"
      v-bind:participants="participants"
    />
  </div>
</template>

<script lang="ts">
import Loading from '@/components/Loading.vue';
import Predictions from '@/components/Predictions.vue';
import { db } from '@/db';
import { Participant } from '@/interfaces/participant';
import { Question } from '@/interfaces/question';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

import 'firebase/firestore';

const years = db.collection('years');

@Component({
  components: {
    Predictions,
    Loading
  }
})
export default class YearComponent extends Vue {
  @Prop() private id!: string;

  public questions: Question[] = [];
  public participants: Participant[] = [];
  public loading: boolean = true;

  @Watch('id', { immediate: true })
  public onIdChanged(id: string): void {
    this.loading = true;
    Promise.all([
      this.$bind('questions', years.doc(id).collection('questions')),
      this.$bind('participants', years.doc(id).collection('participants'))
    ]).then(() => {
      this.loading = false;
    });
  }
}
</script>
