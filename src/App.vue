<template>
  <div id="app"><router-view></router-view></div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator';

export default class App extends Vue {}
</script>

<style lang="scss">
@import '~vue-select/src/scss/vue-select.scss';

:root {
  --color-bg: #0d1b2a;
  --color-surface: #152236;
  --color-surface-alt: #1a2d45;
  --color-gold: #f5c518;
  --color-gold-dim: rgba(245, 197, 24, 0.15);
  --color-correct: #4ade80;
  --color-correct-bg: rgba(74, 222, 128, 0.15);
  --color-wrong: #f87171;
  --color-wrong-bg: rgba(248, 113, 113, 0.15);
  --color-unknown-bg: rgba(148, 163, 184, 0.06);
  --color-text: #e2e8f0;
  --color-text-muted: #94a3b8;
  --color-border: rgba(255, 255, 255, 0.08);
  --color-border-strong: rgba(255, 255, 255, 0.15);
}

html {
  background: var(--color-bg);
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--color-text);
  font-size: 16px;
}

/* vue-select dark theme overrides */
.v-select {
  .vs__dropdown-toggle {
    background: var(--color-surface);
    border-color: var(--color-border-strong);
    color: var(--color-text);
  }

  .vs__search,
  .vs__search:focus {
    color: var(--color-text);
  }

  .vs__selected {
    color: var(--color-text);
  }

  .vs__open-indicator {
    fill: var(--color-text-muted);
  }

  .vs__clear {
    fill: var(--color-text-muted);
  }

  .vs__dropdown-menu {
    background: var(--color-surface-alt);
    border-color: var(--color-border-strong);
  }

  .vs__dropdown-option {
    color: var(--color-text);

    &:hover,
    &.vs__dropdown-option--highlight {
      background: var(--color-gold-dim);
      color: var(--color-gold);
    }
  }
}
</style>
