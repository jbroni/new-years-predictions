<template>
  <div class="predictions">
    <div class="scoreboard-container">
      <div class="scoreboard">
        <div
          v-for="(participant, index) in participantsSortedByBest"
          :key="participant.id"
          class="score-card"
          :class="rankClass(index)"
        >
          <span class="rank">{{ index + 1 }}</span>
          <span class="name">{{ participant.name }}</span>
          <span class="score">{{ correctAnswers(participant) }}</span>
        </div>
      </div>
    </div>

    <div class="results-container">
      <div class="participant-picker">
        <span class="participant-picker-label">Vis svar for:</span>
        <v-select
          v-model="selectedParticipant"
          label="name"
          :options="participants"
          :searchable="false"
          :clearable="!isMobile"
          @input="participantChanged"
        ></v-select>
      </div>

      <!-- Mobile: card layout, single participant only -->
      <div v-if="isMobile" class="question-list">
        <div
          v-for="(question, index) in questions"
          :key="index"
          class="question-item"
          :class="mobileCellClass(question, mobileParticipant, index)"
        >
          <div class="question-item-left">
            <span class="question-index">{{ index + 1 }}.</span>
            <span class="question-item-text">{{ question.question }}</span>
          </div>
          <div class="question-item-right">
            <Outcome v-bind:outcome="question.outcome" />
            <Answer
              v-if="mobileParticipant"
              v-bind:outcome="question.outcome"
              v-bind:answer="mobileParticipant.predictions[index]"
            />
          </div>
        </div>
        <div v-if="mobileParticipant" class="mobile-total">
          {{ correctAnswers(mobileParticipant) }} / {{ determinedOutcome }} rigtige
        </div>
      </div>

      <!-- Desktop: full table -->
      <div v-else class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th class="col-index"></th>
              <th class="col-question">Sp&oslash;rgsm&aring;l</th>
              <th class="col-outcome">Udfald</th>
              <th
                v-for="participant in displayedParticipants"
                :key="participant.id"
                class="col-participant"
              >
                {{ participant.name }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(question, index) in questions" :key="index">
              <td class="col-index index">{{ index + 1 }}.</td>
              <td class="col-question question-text">{{ question.question }}</td>
              <td class="col-outcome"><Outcome v-bind:outcome="question.outcome" /></td>
              <td
                v-for="participant in displayedParticipants"
                :key="participant.id"
                :class="['col-participant', answerCellClass(question, participant, index)]"
              >
                <Answer
                  v-bind:outcome="question.outcome"
                  v-bind:answer="participant.predictions[index]"
                />
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr class="total">
              <td></td>
              <td></td>
              <td class="result">{{ determinedOutcome }}</td>
              <td v-for="participant in displayedParticipants" :key="participant.id" class="result">
                {{ correctAnswers(participant) }}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
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
    Answer,
  },
})
export default class Predictions extends Vue {

  public get isMobile(): boolean {
    return this.windowWidth < 640;
  }

  /** On mobile we always show exactly one participant. */
  public get mobileParticipant(): Participant | null {
    return this.selectedParticipant || first(this.participantsSortedByBest) || null;
  }

  public get displayedParticipants(): Participant[] {
    return this.selectedParticipant ? [this.selectedParticipant] : this.participants;
  }

  public get participantsSortedByBest(): Participant[] {
    if (!this.participants) { return []; }
    return [...this.participants].sort((a, b) => this.correctAnswers(b) - this.correctAnswers(a));
  }

  public get determinedOutcome(): number {
    return this.questions ? this.questions.filter((q) => q.outcome !== -1).length : 0;
  }
  @Prop() private questions!: Question[];
  @Prop() private participants!: Participant[];
  private selectedParticipant: Participant | null = null;
  private selectedParticipantKey = 'selectedParticipant';
  private windowWidth: number = window.innerWidth;

  public mounted(): void {
    window.addEventListener('resize', this.onResize);
  }

  public beforeDestroy(): void {
    window.removeEventListener('resize', this.onResize);
  }

  @Watch('participants') public onParticipantsChanged(): void {
    if (!this.selectedParticipant) {
      const participantId = window.localStorage.getItem(this.selectedParticipantKey);
      const participant = find(this.participants, { id: participantId }) as Participant | undefined;
      this.selectedParticipant = participant || first(this.participants) || null;
    }
  }

  public correctAnswers(participant: Participant): number {
    if (isEmpty(this.questions)) { return 0; }
    return participant.predictions.filter((prediction, index) =>
      prediction ? this.questions[index].outcome === 1 : this.questions[index].outcome === 0,
    ).length;
  }

  public participantChanged(participant: Participant | undefined): void {
    if (participant) {
      window.localStorage.setItem(this.selectedParticipantKey, participant.id);
    }
    this.selectedParticipant = participant || null;
  }

  public rankClass(index: number): string {
    if (index === 0) { return 'rank-gold'; }
    if (index === 1) { return 'rank-silver'; }
    if (index === 2) { return 'rank-bronze'; }
    return '';
  }

  public answerCellClass(question: Question, participant: Participant, index: number): string {
    if (question.outcome === -1) { return 'cell-unknown'; }
    const prediction = participant.predictions[index];
    const correct = prediction ? question.outcome === 1 : question.outcome === 0;
    return correct ? 'cell-correct' : 'cell-wrong';
  }

  public mobileCellClass(question: Question, participant: Participant | null, index: number): string {
    if (!participant || question.outcome === -1) { return 'cell-unknown'; }
    const prediction = participant.predictions[index];
    const correct = prediction ? question.outcome === 1 : question.outcome === 0;
    return correct ? 'cell-correct' : 'cell-wrong';
  }

  private onResize(): void {
    this.windowWidth = window.innerWidth;
  }
}
</script>

<style lang="scss">
.scoreboard-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 16px 28px;
}

.scoreboard {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  max-width: 420px;
}

.score-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;

  .rank {
    font-size: 0.85em;
    font-weight: 700;
    color: var(--color-text-muted);
    min-width: 20px;
    text-align: right;
  }

  .name {
    flex: 1;
    font-weight: 600;
    text-align: left;
  }

  .score {
    font-size: 1.1em;
    font-weight: 700;
    color: var(--color-text-muted);
    min-width: 32px;
    text-align: right;
  }

  &.rank-gold {
    border-color: var(--color-gold);
    background: linear-gradient(135deg, rgba(245, 197, 24, 0.12), var(--color-surface));

    .rank { color: var(--color-gold); }
    .score { color: var(--color-gold); }
  }

  &.rank-silver {
    border-color: #94a3b8;
    background: linear-gradient(135deg, rgba(148, 163, 184, 0.1), var(--color-surface));

    .rank { color: #cbd5e1; }
    .score { color: #cbd5e1; }
  }

  &.rank-bronze {
    border-color: #cd7f32;
    background: linear-gradient(135deg, rgba(205, 127, 50, 0.1), var(--color-surface));

    .rank { color: #cd7f32; }
    .score { color: #cd7f32; }
  }
}

.participant-picker {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px 20px;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  box-sizing: border-box;
}

.participant-picker-label {
  padding-right: 12px;
  font-size: 0.9em;
  color: var(--color-text-muted);
  white-space: nowrap;
}

.participant-picker .dropdown.v-select {
  flex: 1;
}

/* Mobile card layout */
.question-list {
  padding: 0 12px 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.question-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);

  &.cell-correct {
    background: var(--color-correct-bg);
    border-color: rgba(74, 222, 128, 0.25);
  }

  &.cell-wrong {
    background: var(--color-wrong-bg);
    border-color: rgba(248, 113, 113, 0.25);
  }

  &.cell-unknown {
    background: var(--color-surface);
  }
}

.question-item-left {
  flex: 1;
  display: flex;
  align-items: baseline;
  gap: 8px;
  text-align: left;
  min-width: 0;
}

.question-index {
  font-size: 0.75em;
  font-weight: 700;
  color: var(--color-text-muted);
  flex-shrink: 0;
}

.question-item-text {
  font-size: 0.9em;
  line-height: 1.4;
  word-break: break-word;
}

.question-item-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  flex-shrink: 0;
}

.mobile-total {
  margin-top: 4px;
  padding: 10px 14px;
  background: var(--color-surface);
  border: 1px solid var(--color-border-strong);
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.9em;
  color: var(--color-text);
  text-align: center;
}

/* Desktop table layout */
.table-wrapper {
  overflow-x: auto;
  padding: 0 16px 32px;
  -webkit-overflow-scrolling: touch;
}

table {
  border-spacing: 0;
  margin: 0 auto;
  border-collapse: collapse;
  width: 100%;
}

thead th {
  border-bottom: 1px solid var(--color-border-strong);
  padding: 8px 10px;
  font-size: 0.8em;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
  white-space: nowrap;
}

tbody tr {
  border-bottom: 1px solid var(--color-border);

  &:nth-child(even) {
    background: var(--color-surface-alt);
  }

  &:nth-child(odd) {
    background: var(--color-surface);
  }
}

td {
  padding: 8px 10px;
  vertical-align: middle;
}

.col-index {
  width: 28px;
  min-width: 28px;
}

.col-question {
  min-width: 180px;
  text-align: left;
}

.col-outcome {
  width: 60px;
  min-width: 60px;
}

.col-participant {
  width: 80px;
  min-width: 70px;
}

.index {
  text-align: right;
  font-weight: 600;
  font-size: 0.8em;
  color: var(--color-text-muted);
}

.question-text {
  font-size: 0.9em;
  line-height: 1.4;
}

.cell-correct {
  background: var(--color-correct-bg) !important;
}

.cell-wrong {
  background: var(--color-wrong-bg) !important;
}

.cell-unknown {
  background: var(--color-unknown-bg) !important;
}

tfoot tr.total {
  font-weight: 700;
  font-size: 0.9em;

  td {
    padding-top: 10px;
    border-top: 1px solid var(--color-border-strong);
    color: var(--color-text-muted);
  }

  .result {
    color: var(--color-text);
  }
}

@media (max-width: 640px) {
  .participant-picker {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
    padding-bottom: 16px;

    .participant-picker-label {
      padding-right: 0;
    }
  }
}
</style>
