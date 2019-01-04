<template>
  <div class="predictions">
    <img alt="Krystalkugle" src="../assets/crystal-ball.png" />
    <h1>Nyt&aring;rsforudsigelser for 2019</h1>

    <table>
      <th></th>
      <th>Sp&oslash;rgsm&aring;l</th>
      <th>Udfald</th>
      <th v-for="participant in participants">{{ participant.name }}</th>
      <tr v-for="(question, index) in questions">
        <td class="index">{{ index + 1 }}.</td>
        <td>{{ question.question }}</td>
        <td>{{ question.outcome }}</td>
        <td v-for="participant in participants">
          {{ participant.predictions[index] }}
        </td>
      </tr>
    </table>
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

<style lang="scss">
h1 {
  font-size: 24px;
  font-weight: bold;
  margin-top: -10px;
}

table {
  border-spacing: 0;
}

td {
  padding-right: 5px;
}

.index {
  text-align: right;
  font-weight: 600;
}

tr:nth-child(even) {
  background: rgba(0, 0, 0, 0.11);
}
</style>
