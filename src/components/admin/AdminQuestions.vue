<template>
  <div class="admin-questions">
    <div
      v-for="(question, index) in questions"
      :key="question.id"
      class="question-row"
    >
      <span class="question-index">{{ index + 1 }}.</span>
      <span class="question-text">{{ question.question }}</span>
      <div class="outcome-buttons">
        <button
          v-for="option in outcomeOptions"
          :key="option.value"
          :class="{
            active: question.outcome === option.value,
            [`outcome-${option.value}`]: true
          }"
          @click="setOutcome(question, option.value)"
        >
          {{ option.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { db } from '@/db';
import { Question } from '@/interfaces/question';
import { Component, Prop, Vue } from 'vue-property-decorator';

import 'firebase/firestore';

const years = db.collection('years');

const outcomeOptions = [
  { label: 'Ja', value: 1 },
  { label: 'Nej', value: 0 },
  { label: 'Ukendt', value: -1 }
];

@Component({
  data() {
    return {
      questions: [],
      outcomeOptions
    };
  },
  watch: {
    yearId: {
      immediate: true,
      handler(this: AdminQuestions, yearId: string) {
        this.$bind('questions', years.doc(yearId).collection('questions'));
      }
    }
  }
})
export default class AdminQuestions extends Vue {
  @Prop() private yearId!: string;

  public setOutcome(question: Question, outcome: number): void {
    years
      .doc(this.yearId)
      .collection('questions')
      .doc(question.id)
      .update({ outcome });
  }
}
</script>

<style lang="scss" scoped>
.admin-questions {
  max-width: 700px;
  margin: 0 auto;
}

.question-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  border-bottom: 1px solid var(--color-border);

  &:last-child {
    border-bottom: none;
  }
}

.question-index {
  font-weight: 600;
  min-width: 24px;
  text-align: right;
  flex-shrink: 0;
  color: var(--color-text-muted);
}

.question-text {
  flex: 1;
  text-align: left;
}

.outcome-buttons {
  display: flex;
  gap: 6px;
  flex-shrink: 0;

  button {
    padding: 4px 12px;
    border: 1px solid var(--color-border-strong);
    border-radius: 4px;
    background: var(--color-surface);
    color: var(--color-text-muted);
    cursor: pointer;
    font-size: 0.9em;
    transition: background 0.1s, color 0.1s, border-color 0.1s;

    &:hover:not(.active) {
      background: var(--color-surface-alt);
      color: var(--color-text);
    }

    &.active {
      font-weight: 700;
    }

    /* outcome === 1 → Ja → green */
    &.outcome-1.active {
      background: rgba(74, 222, 128, 0.2);
      border-color: rgba(74, 222, 128, 0.5);
      color: var(--color-correct);
    }

    /* outcome === 0 → Nej → red */
    &.outcome-0.active {
      background: rgba(248, 113, 113, 0.2);
      border-color: rgba(248, 113, 113, 0.5);
      color: var(--color-wrong);
    }

    /* outcome === -1 → Ukendt → muted */
    &.outcome--1.active {
      background: var(--color-surface-alt);
      border-color: var(--color-border-strong);
      color: var(--color-text);
    }
  }
}
</style>
