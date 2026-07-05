<template>
  <div class="top-bar">
    <div class="year-picker" v-if="years && years.length">
      <span class="year-picker-label" @click="toggleMenu">
        ÅR: {{ currentYearId }} <span class="caret">▾</span>
      </span>
      <div class="year-menu" v-if="menuOpen">
        <div
          v-for="year in sortedYears"
          :key="year.id"
          class="year-menu-item"
          @click="selectYear(year)"
        >
          {{ year.id }}
        </div>
      </div>
    </div>
    <div v-else></div>
    <nav class="top-links">
      <router-link to="/stats/">STATISTIK</router-link>
      <span class="dot">&middot;</span>
      <router-link to="/admin">ADMIN</router-link>
    </nav>
  </div>
</template>

<script lang="ts">
import { Year } from '@/interfaces/year';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class TopBar extends Vue {
  @Prop() private years?: Year[];
  @Prop() private currentYearId?: string;
  private menuOpen: boolean = false;

  public get sortedYears(): Year[] {
    return this.years
      ? [...this.years].sort((a, b) => b.id.localeCompare(a.id))
      : [];
  }

  public mounted(): void {
    document.addEventListener('click', this.onDocumentClick);
  }

  public beforeDestroy(): void {
    document.removeEventListener('click', this.onDocumentClick);
  }

  public toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  public selectYear(year: Year): void {
    this.menuOpen = false;
    this.$router.push(`/years/${year.id}`);
  }

  private onDocumentClick(event: Event): void {
    if (this.menuOpen && !this.$el.contains(event.target as Node)) {
      this.menuOpen = false;
    }
  }
}
</script>

<style lang="scss">
.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  color: var(--color-text-muted);
}

.year-picker {
  position: relative;
}

.year-picker-label {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 0;
  letter-spacing: 0.04em;

  .caret {
    font-size: 9px;
  }
}

.year-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: var(--color-surface);
  border: 1px solid var(--color-border-strong);
  border-radius: 6px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  z-index: 20;
  min-width: 90px;
  overflow: hidden;
}

.year-menu-item {
  padding: 8px 14px;
  font-size: 13px;
  color: var(--color-text);
  cursor: pointer;

  &:hover {
    background: var(--color-surface-alt);
  }
}

.top-links {
  display: flex;
  align-items: center;
  gap: 14px;

  a {
    color: var(--color-text-muted) !important;
    text-decoration: none;
    letter-spacing: 0.04em;

    &:hover {
      color: var(--color-text) !important;
    }
  }

  .dot {
    color: var(--color-border);
  }
}
</style>
