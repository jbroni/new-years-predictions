<template>
  <div class="outcome">
    <span class="outcome-badge" :class="badgeClass">{{ label }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Outcome extends Vue {
  @Prop() private outcome!: number;

  get label(): string {
    if (this.outcome === 1) { return 'Ja'; }
    if (this.outcome === 0) { return 'Nej'; }
    return '?';
  }

  get badgeClass(): string {
    if (this.outcome === 1) { return 'outcome-yes'; }
    if (this.outcome === 0) { return 'outcome-no'; }
    return 'outcome-unknown';
  }
}
</script>

<style lang="scss">
div.outcome {
  display: flex;
  align-items: center;
  justify-content: center;
}

.outcome-badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 0.8em;
  font-weight: 700;
  letter-spacing: 0.02em;

  &.outcome-yes {
    background: rgba(74, 222, 128, 0.2);
    color: var(--color-correct);
    border: 1px solid rgba(74, 222, 128, 0.3);
  }

  &.outcome-no {
    background: rgba(248, 113, 113, 0.2);
    color: var(--color-wrong);
    border: 1px solid rgba(248, 113, 113, 0.3);
  }

  &.outcome-unknown {
    background: var(--color-unknown-bg);
    color: var(--color-text-muted);
    border: 1px solid var(--color-border);
  }
}
</style>
