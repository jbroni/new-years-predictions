<template>
  <div class="predictions">
    <h1>Predictions</h1>

    <div v-for="question in questions">
      {{ question.question }} {{ question.outcome }}
    </div>

    <div v-for="participant in participants">{{ participant.name }}</div>
  </div>
</template>

<script lang="ts">
import { Participant } from '@/interfaces/participant';
import { Question } from '@/interfaces/question';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Predictions extends Vue {
  @Prop() private questions!: Question[];
  @Prop() private participants!: Participant[];
}
</script>

<style scoped></style>
