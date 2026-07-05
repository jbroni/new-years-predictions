<template>
  <div id="admin" class="page">
    <TopBar :years="years" />
    <div v-if="!isEmailUser" class="admin-content">
      <AdminLogin />
    </div>
    <div v-else class="admin-content">
      <h1>Admin</h1>
      <div class="admin-controls">
        <select v-model="selectedYearId" class="year-select">
          <option disabled value="">Vælg år</option>
          <option v-for="year in years" :key="year.id" :value="year.id">
            {{ year.id }}
          </option>
        </select>
        <button class="logout-button" @click="logout">Log ud</button>
      </div>
      <AdminQuestions v-if="selectedYearId" :yearId="selectedYearId" />
    </div>
  </div>
</template>

<script lang="ts">
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import AdminLogin from '@/components/admin/AdminLogin.vue';
import AdminQuestions from '@/components/admin/AdminQuestions.vue';
import TopBar from '@/components/TopBar.vue';
import { db } from '@/db';
import { Year } from '@/interfaces/year';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  data() {
    return {
      years: [],
      isEmailUser: false,
      selectedYearId: ''
    };
  },
  components: {
    TopBar,
    AdminLogin,
    AdminQuestions
  },
  firestore: {
    years: db.collection('years')
  }
})
export default class Admin extends Vue {
  private years!: Year[];
  private isEmailUser!: boolean;
  private selectedYearId!: string;
  private unsubscribeAuth: (() => void) | null = null;

  public created(): void {
    this.unsubscribeAuth = firebase.auth().onAuthStateChanged(user => {
      this.isEmailUser = !!(user && user.email);
    });
  }

  public beforeDestroy(): void {
    if (this.unsubscribeAuth) {
      this.unsubscribeAuth();
    }
  }

  public async logout(): Promise<void> {
    await firebase.auth().signOut();
  }
}
</script>

<style lang="scss" scoped>
.admin-content {
  max-width: 700px;
  margin: 0 auto;
  padding: 0 16px;
}

.admin-controls {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.year-select {
  padding: 8px 12px;
  font-size: 1em;
  background: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-border-strong);
  border-radius: 4px;
  cursor: pointer;
}

.logout-button {
  padding: 8px 16px;
  background: transparent;
  color: var(--color-text);
  border: 1px solid var(--color-border-strong);
  border-radius: 4px;
  font-size: 1em;
  cursor: pointer;

  &:hover {
    background: var(--color-surface-alt);
  }
}
</style>
