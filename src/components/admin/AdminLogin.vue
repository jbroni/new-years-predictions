<template>
  <div class="admin-login">
    <h1>Admin login</h1>
    <p v-if="error" class="error">{{ error }}</p>
    <button :disabled="loading" @click="login">Log ind med Google</button>
  </div>
</template>

<script lang="ts">
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { adminEmail } from '../../../environments/firebase';
import { Component, Vue } from 'vue-property-decorator';

const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

@Component
export default class AdminLogin extends Vue {
  private error: string = '';
  private loading: boolean = false;

  public async mounted(): Promise<void> {
    if (!isMobile) return;
    this.loading = true;
    try {
      const result = await firebase.auth().getRedirectResult();
      if (result.user) {
        if (result.user.email !== adminEmail) {
          await firebase.auth().signOut();
          this.error = 'Ingen adgang.';
        }
      }
    } catch (e: any) {
      this.error = e.message;
    } finally {
      this.loading = false;
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
        const result = await firebase.auth().signInWithPopup(provider);
        if (result.user?.email !== adminEmail) {
          await firebase.auth().signOut();
          this.error = 'Ingen adgang.';
        }
      }
    } catch (e: any) {
      this.error = e.message;
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
