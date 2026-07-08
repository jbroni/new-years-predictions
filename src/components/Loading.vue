<template>
  <div class="loading" :class="{ 'loading--inline': inline }">
    <span class="loading-spinner" aria-hidden="true"></span>
    <span class="loading-label" v-if="label">{{ label }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Loading extends Vue {
  @Prop({ default: 'Indlæser…' }) private label?: string;
  @Prop({ default: false }) private inline!: boolean;
}
</script>

<style lang="scss" scoped>
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 64px 0;
  color: var(--color-text-muted);
  font-family: var(--font-serif);

  &--inline {
    padding: 32px 0;
  }
}

.loading-spinner {
  width: 28px;
  height: 28px;
  border: 3px solid var(--color-gold-dim);
  border-top-color: var(--color-gold);
  border-radius: 50%;
  animation: loading-spin 0.8s linear infinite;
}

.loading-label {
  font-size: 14px;
  letter-spacing: 0.02em;
}

@keyframes loading-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
