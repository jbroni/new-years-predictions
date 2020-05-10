<template>
  <div class="predictions">
    <div class="scoreboard-container">
      <table>
        <th>Navn</th>
        <th>Rigtige svar</th>
        <tr v-for="participant in participantsSortedByBest">
          <td class="participant-name">{{ participant.name }}</td>
          <td>{{ correctAnswers(participant) }}</td>
        </tr>
      </table>
    </div>

    <div class="results-container">
      <div class="participant-picker">
        <span class="participant-picker-label">Vis svar for:</span>
        <v-select
          v-model="selectedParticipant"
          label="name"
          :options="participants"
          :searchable="false"
          @input="participantChanged"
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
        <tr class="total">
          <td></td>
          <td></td>
          <td class="result">{{ determinedOutcome }}</td>
          <td v-for="participant in displayedParticipants" class="result">
            {{ correctAnswers(participant) }}
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
import { first, find, isEmpty } from 'lodash';

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
  private selectedParticipantKey = 'selectedParticipant';

  @Watch('participants') public onParticipantsChanged(): void {
    if (!this.selectedParticipant) {
      const participantId = window.localStorage.getItem(
        this.selectedParticipantKey
      );
      const participant = find(this.participants, {
        id: participantId
      }) as Participant | undefined;

      this.selectedParticipant =
        participant || first(this.participants) || null;
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

  public get participantsSortedByBest(): Participant[] {
    if (!this.participants) {
      return [];
    }
    return [...this.participants].sort((a, b) => {
      return this.correctAnswers(b) - this.correctAnswers(a);
    });
  }

  public get determinedOutcome(): number {
    return this.questions
      ? this.questions.filter(question => question.outcome !== -1).length
      : 0;
  }

  public correctAnswers(participant: Participant): number {
    if (isEmpty(this.questions)) {
      return 0;
    }
    return participant.predictions.filter((prediction, index) =>
      prediction
        ? this.questions[index].outcome === 1
        : this.questions[index].outcome === 0
    ).length;
  }

  public participantChanged(participant: Participant | undefined): void {
    if (participant) {
      window.localStorage.setItem(this.selectedParticipantKey, participant.id);
    }
    this.selectedParticipant = participant || null;
  }
}
</script>

<style lang="scss">
.scoreboard-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.scoreboard-container {
  padding-bottom: 30px;
}

.participant-picker {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 20px;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}

.participant-picker-label {
  padding-right: 10px;
}

.participant-picker .dropdown.v-select {
  flex: 1;
}

table {
  border-spacing: 0;
  margin: 0 auto;
}

th {
  border-bottom: rgba(0, 0, 0, 0.11) solid 1px;
}

.participant-name,
.outcome-header {
  width: 75px;
  overflow: hidden;
  text-overflow: ellipsis;
}

td {
  padding: 5px 5px 5px 0;
}

.index {
  text-align: right;
  font-weight: 600;
  padding-left: 5px;
}

tr:nth-child(even) {
  background: rgba(0, 0, 0, 0.11);
}

.total {
  font-weight: 600;
}

.total .result {
  border-top: black solid 1px;
}
</style>
