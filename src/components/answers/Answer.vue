<template>
  <div class="answer" :class="stateClass">
    <span v-if="icon" class="answer-icon">{{ icon }}</span>
    <span class="answer-label">{{ label }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Answer extends Vue {
  @Prop() private answer!: boolean;
  @Prop() private outcome!: number;

  get label(): string {
    return this.answer ? 'Ja' : 'Nej';
  }

  get icon(): string {
    if (this.outcome === -1) { return ''; }
    return this.answer ? (this.outcome === 1 ? '✓' : '✗') : (this.outcome === 0 ? '✓' : '✗');
  }

  get stateClass(): string {
    if (this.outcome === -1) { return 'unknown'; }
    const correct = this.answer ? this.outcome === 1 : this.outcome === 0;
    return correct ? 'correct' : 'wrong';
  }
}
</script>

<style lang="scss">
div.answer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 0.85em;
  font-weight: 600;
  white-space: nowrap;

  .answer-icon {
    font-size: 1em;
  }

  .answer-label {
    color: var(--color-text-muted);
  }

  &.correct .answer-icon {
    color: var(--color-correct);
  }

  &.wrong .answer-icon {
    color: var(--color-wrong);
  }

  &.unknown .answer-label {
    color: var(--color-text-muted);
  }
}
</style>
