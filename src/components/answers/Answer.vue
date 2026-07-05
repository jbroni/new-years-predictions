<template>
  <span class="answer" :class="stateClass">{{ label }}</span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Answer extends Vue {
  @Prop() private answer!: boolean;
  @Prop() private outcome!: number;

  get label(): string {
    const base = this.answer ? 'Ja' : 'Nej';
    if (this.outcome === -1) {
      return base;
    }
    const correct = this.answer ? this.outcome === 1 : this.outcome === 0;
    return `${base} ${correct ? '✓' : '✗'}`;
  }

  get stateClass(): string {
    if (this.outcome === -1) {
      return 'unknown';
    }
    const correct = this.answer ? this.outcome === 1 : this.outcome === 0;
    return correct ? 'correct' : 'wrong';
  }
}
</script>

<style lang="scss">
.answer {
  font-size: 13.5px;
  font-weight: 600;
  text-align: right;
  white-space: nowrap;

  &.unknown {
    color: var(--color-text-muted);
    font-weight: 500;
  }

  &.correct {
    color: var(--color-correct);
  }

  &.wrong {
    color: var(--color-wrong);
  }
}
</style>
