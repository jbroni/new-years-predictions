<template>
  <div id="app"><router-view></router-view></div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator';

export default class App extends Vue {}
</script>

<style lang="scss">
:root {
  --color-bg: #f7f1e2;
  --color-surface: #ffffff;
  --color-surface-alt: #f1efe9;
  --color-gold: #b08a1e;
  --color-gold-dim: rgba(176, 138, 30, 0.1);
  --color-correct: #2e7d4f;
  --color-correct-bg: rgba(46, 125, 79, 0.12);
  --color-wrong: #b3402e;
  --color-wrong-bg: rgba(179, 64, 46, 0.12);
  --color-unknown-bg: rgba(0, 0, 0, 0.04);
  --color-text: #1c1b18;
  --color-text-muted: #8a877f;
  --color-text-faint: #b5b1a6;
  --color-border: rgba(0, 0, 0, 0.09);
  --color-border-strong: #1c1b18;
  --font-sans: 'Instrument Sans', Helvetica, Arial, sans-serif;
  --font-serif: 'Newsreader', Georgia, serif;
}

html {
  background: var(--color-bg);
}

#app {
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--color-text);
  font-size: 16px;
}

.page {
  max-width: 560px;
  margin: 0 auto;
  padding: 24px 20px 56px;
  box-sizing: border-box;
  text-align: left;
}
</style>
