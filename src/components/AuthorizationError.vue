<template>
  <div id="authorizationError">
    <h1>Utilstr&aelig;kkelige tilladelser</h1>
    <span
      >Du har ikke lov til at se denne side. Pr&oslash;v at genindl&aelig;se
      siden.</span
    >
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class AuthorizationError extends Vue {}
</script>

<style scoped></style>
