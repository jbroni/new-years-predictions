<template>
  <div class="predictions">
    <h1>Nyt&aring;rsforudsigelser for 2019</h1>

    <table>
      <th>Sp&oslash;rgsm&aring;l</th>
      <th>Udfald</th>
      <th v-for="participant in participants">{{ participant.name }}</th>
      <tr v-for="(question, index) in questions">
        <td>{{ index + 1 }}: {{ question.question }}</td>
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

<style scoped></style>
