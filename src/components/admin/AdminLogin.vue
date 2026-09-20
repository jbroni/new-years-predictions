<template>
  <div class="admin-login">
    <h1>Admin login</h1>
    <p v-if="error || loginError" class="error">{{ error || loginError }}</p>
    <button :disabled="loading" @click="login">Log ind med Google</button>
  </div>
</template>

<script lang="ts">
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Component, Prop, Vue } from 'vue-property-decorator';

const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

@Component
export default class AdminLogin extends Vue {
  @Prop({ default: '' }) private loginError!: string;

  private error: string = '';
  private loading: boolean = false;

  public async mounted(): Promise<void> {
    // A successful redirect sign-in is picked up by the auth state listener in
    // Admin.vue; this only surfaces errors from a failed redirect attempt.
    try {
      await firebase.auth().getRedirectResult();
    } catch (e) {
      this.error = (e as Error).message;
    }
  }

  public async login(): Promise<void> {
    this.error = '';
    this.loading = true;
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      if (isMobile) {
        await firebase.auth().signInWithRedirect(provider);
      } else {
        await firebase.auth().signInWithPopup(provider);
      }
    } catch (e) {
      this.error = (e as Error).message;
      this.loading = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.admin-login {
  max-width: 360px;
  margin: 60px auto;

  .error {
    color: #c00;
  }

  button {
    padding: 10px 20px;
    background: #333;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 1em;
    cursor: pointer;

    &:disabled {
      opacity: 0.5;
      cursor: default;
    }
  }
}
</style>
