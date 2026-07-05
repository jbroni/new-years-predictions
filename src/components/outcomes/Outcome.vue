<template>
  <span class="outcome" :class="{ 'outcome-unknown': outcome === -1 }">{{
    label
  }}</span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Outcome extends Vue {
  @Prop() private outcome!: number;

  get label(): string {
    if (this.outcome === 1) {
      return 'Ja';
    }
    if (this.outcome === 0) {
      return 'Nej';
    }
    return '—';
  }
}
</script>

<style lang="scss">
.outcome {
  font-size: 13.5px;
  font-weight: 500;
  color: #55534c;

  &.outcome-unknown {
    color: var(--color-text-faint);
  }
}
</style>
