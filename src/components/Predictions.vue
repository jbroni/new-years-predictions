<template>
  <div class="predictions">
    <img alt="Krystalkugle" src="../assets/crystal-ball.png" />
    <h1>Nyt&aring;rsforudsigelser for 2019</h1>

    <div class="results-container">
      <div class="participant-picker">
        <span class="participant-picker-label">Vis svar for:</span>
        <v-select
          v-model="selectedParticipant"
          label="name"
          :options="participants"
          :searchable="false"
        ></v-select>
      </div>

      <table>
        <th></th>
        <th>Sp&oslash;rgsm&aring;l</th>
        <th class="outcome-header">Udfald</th>
        <th
          v-for="participant in displayedParticipants"
          class="participant-name"
        >
          {{ participant.name }}
        </th>
        <tr v-for="(question, index) in questions">
          <td class="index">{{ index + 1 }}.</td>
          <td>{{ question.question }}</td>
          <td><Outcome v-bind:outcome="question.outcome" /></td>
          <td v-for="participant in displayedParticipants">
            <Answer
              v-bind:outcome="question.outcome"
              v-bind:answer="participant.predictions[index]"
            />
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import Answer from '@/components/answers/Answer.vue';
import Outcome from '@/components/outcomes/Outcome.vue';
import { Participant } from '@/interfaces/participant';
import { Question } from '@/interfaces/question';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import * as _ from 'lodash';

@Component({
  components: {
    Outcome,
    Answer
  }
})
export default class Predictions extends Vue {
  @Prop() private questions!: Question[];
  @Prop() private participants!: Participant[];
  // Reactive properties must be initialized. undefined does not work as initialization.
  private selectedParticipant: Participant | null = null;

  @Watch('participants') public onParticipantsChanged(): void {
    if (!this.selectedParticipant) {
      this.selectedParticipant = _.first(this.participants) || null;
    }
  }

  /**
   * Participants that should be shown in table.
   * Either the selected participant from the drop down
   * or all participants if selection is empty.
   */
  public get displayedParticipants(): Participant[] {
    return this.selectedParticipant
      ? [this.selectedParticipant]
      : this.participants;
  }
}
</script>

<style lang="scss">
h1 {
  font-size: 24px;
  font-weight: bold;
  margin-top: -10px;
}

.results-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.participant-picker {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  width: 100%;
  max-width: 500px;
}

.participant-picker-label {
  padding-right: 10px;
}

.participant-picker .dropdown.v-select {
  flex: 1;
}

.v-select .dropdown-toggle .clear {
  margin-top: 5px;
}

table {
  border-spacing: 0;
}

.participant-name,
.outcome-header {
  width: 75px;
  overflow: hidden;
  text-overflow: ellipsis;
}

td {
  padding: 5px 0 5px 0;
}

.index {
  text-align: right;
  font-weight: 600;
}

tr:nth-child(even) {
  background: rgba(0, 0, 0, 0.11);
}
</style>
