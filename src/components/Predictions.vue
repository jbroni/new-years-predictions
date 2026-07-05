<template>
  <div class="predictions">
    <div class="page-title">
      <h1>Nyt&aring;rsforudsigelser</h1>
      <div class="page-subtitle">{{ subtitle }}</div>
    </div>

    <div class="leaderboard">
      <div
        v-for="(participant, index) in participantsSortedByBest"
        :key="participant.id"
        class="lb-row"
        :class="{ selected: isSelected(participant), leader: index === 0 }"
        @click="participantChanged(participant)"
      >
        <span class="lb-rank">{{ index + 1 }}</span>
        <span class="lb-name">{{ participant.name }}</span>
        <span class="lb-bar-track">
          <span
            class="lb-bar-fill"
            :style="{ width: percentCorrect(participant) + '%' }"
          ></span>
        </span>
        <span class="lb-score">{{ correctAnswers(participant) }}</span>
      </div>
      <div class="lb-hint">Tryk p&aring; et navn for at se svarene</div>
    </div>

    <div v-if="selectedParticipant" class="answers-header">
      <span class="answers-title">{{ possessive }} svar</span>
      <span class="answers-total">{{ totalLine }}</span>
    </div>

    <div v-if="selectedParticipant" class="answers-table">
      <div class="table-header-row">
        <span></span> <span></span> <span class="col-label">UDFALD</span>
        <span class="col-label col-answer-label">{{ selectedUpper }}</span>
      </div>
      <div
        v-for="(question, index) in questions"
        :key="index"
        class="table-row"
      >
        <span class="q-num">{{ index + 1 }}</span>
        <span class="q-text">{{ question.question }}</span>
        <Outcome v-bind:outcome="question.outcome" />
        <Answer
          v-bind:outcome="question.outcome"
          v-bind:answer="selectedParticipant.predictions[index]"
        />
      </div>
    </div>

    <div v-if="selectedParticipant" class="table-footer">
      <span>{{ determinedOutcome }} af {{ questions.length }} afgjort</span>
      <span class="footer-total">{{ totalLine }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Answer from '@/components/answers/Answer.vue';
import Outcome from '@/components/outcomes/Outcome.vue';
import { Participant } from '@/interfaces/participant';
import { Question } from '@/interfaces/question';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { find, first, isEmpty } from 'lodash';

@Component({
  components: {
    Outcome,
    Answer
  }
})
export default class Predictions extends Vue {
  public get participantsSortedByBest(): Participant[] {
    if (!this.participants) {
      return [];
    }
    return [...this.participants].sort(
      (a, b) => this.correctAnswers(b) - this.correctAnswers(a)
    );
  }

  public get determinedOutcome(): number {
    return this.questions
      ? this.questions.filter(q => q.outcome !== -1).length
      : 0;
  }

  public get subtitle(): string {
    const count = this.questions ? this.questions.length : 0;
    return `${count} FORUDSIGELSER · ${this.determinedOutcome} AFGJORT`;
  }

  public get possessive(): string {
    if (!this.selectedParticipant) {
      return '';
    }
    const name = this.selectedParticipant.name;
    return name.endsWith('s') ? `${name}’` : `${name}s`;
  }

  public get selectedUpper(): string {
    return this.selectedParticipant
      ? this.selectedParticipant.name.toUpperCase()
      : '';
  }

  public get totalLine(): string {
    if (!this.selectedParticipant) {
      return '';
    }
    return `${this.correctAnswers(this.selectedParticipant)} af ${
      this.determinedOutcome
    } rigtige`;
  }

  @Prop() private questions!: Question[];
  @Prop() private participants!: Participant[];
  private selectedParticipant: Participant | null = null;
  private selectedParticipantKey = 'selectedParticipant';

  @Watch('participants') public onParticipantsChanged(): void {
    if (!this.selectedParticipant) {
      const participantId = window.localStorage.getItem(
        this.selectedParticipantKey
      );
      const participant = find(this.participants, { id: participantId }) as
        | Participant
        | undefined;
      this.selectedParticipant =
        participant || first(this.participantsSortedByBest) || null;
    }
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

  public percentCorrect(participant: Participant): number {
    if (!this.determinedOutcome) {
      return 0;
    }
    return Math.round(
      (this.correctAnswers(participant) / this.determinedOutcome) * 100
    );
  }

  public isSelected(participant: Participant): boolean {
    return (
      !!this.selectedParticipant &&
      this.selectedParticipant.id === participant.id
    );
  }

  public participantChanged(participant: Participant): void {
    window.localStorage.setItem(this.selectedParticipantKey, participant.id);
    this.selectedParticipant = participant;
  }
}
</script>

<style lang="scss">
.page-title {
  text-align: center;
  padding: 28px 0 8px;
  border-bottom: 2px solid var(--color-border-strong);
}

.page-title h1 {
  font-family: var(--font-serif);
  font-weight: 500;
  font-size: 34px;
  line-height: 1.1;
  margin: 0;
  letter-spacing: -0.01em;
}

.page-subtitle {
  font-size: 12px;
  letter-spacing: 0.22em;
  color: var(--color-text-muted);
  margin-top: 8px;
}

.leaderboard {
  padding: 18px 0 6px;
}

.lb-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 10px;
  margin: 0 -10px;
  border-radius: 8px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background: var(--color-surface-alt);
  }

  &.selected {
    background: var(--color-gold-dim);

    &:hover {
      background: var(--color-gold-dim);
    }
  }
}

.lb-rank {
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  width: 16px;
  text-align: right;
  color: var(--color-text-faint);

  .lb-row.leader & {
    color: var(--color-gold);
  }
}

.lb-name {
  font-size: 15px;
  font-weight: 500;
  min-width: 76px;

  .lb-row.selected & {
    font-weight: 600;
    text-decoration: underline;
    text-decoration-thickness: 1.5px;
    text-underline-offset: 3px;
  }
}

.lb-bar-track {
  flex: 1;
  display: block;
  height: 3px;
  background: rgba(0, 0, 0, 0.08);
  border-radius: 2px;
  overflow: hidden;
  margin: 0 4px;
}

.lb-bar-fill {
  display: block;
  height: 100%;
  border-radius: 2px;
  background: var(--color-text-faint);

  .lb-row.leader & {
    background: var(--color-gold);
  }
}

.lb-score {
  font-size: 15px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  width: 22px;
  text-align: right;
  color: var(--color-text);

  .lb-row.leader & {
    color: var(--color-gold);
  }
}

.lb-hint {
  font-size: 12px;
  color: var(--color-text-faint);
  padding: 8px 2px 0;
  text-align: center;
}

.answers-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 26px 0 2px;
}

.answers-title {
  font-family: var(--font-serif);
  font-size: 21px;
  font-weight: 500;
}

.answers-total {
  font-size: 13px;
  color: var(--color-text-muted);
}

.table-header-row,
.table-row {
  display: grid;
  grid-template-columns: 22px 1fr 52px 58px;
  gap: 0 10px;
  align-items: baseline;
}

.table-header-row {
  padding: 10px 0 6px;
}

.col-label {
  font-size: 10.5px;
  letter-spacing: 0.14em;
  color: var(--color-text-muted);
}

.col-answer-label {
  text-align: right;
}

.table-row {
  padding: 9px 0;
  border-top: 1px solid var(--color-border);
}

.q-num {
  font-size: 12px;
  color: var(--color-text-faint);
  font-variant-numeric: tabular-nums;
}

.q-text {
  font-size: 14.5px;
  line-height: 1.45;
  text-align: left;
  text-wrap: pretty;
}

.table-footer {
  border-top: 2px solid var(--color-border-strong);
  margin-top: 2px;
  padding-top: 10px;
  display: flex;
  justify-content: space-between;
  font-size: 13.5px;

  span:first-child {
    color: var(--color-text-muted);
  }

  .footer-total {
    font-weight: 600;
  }
}
</style>
