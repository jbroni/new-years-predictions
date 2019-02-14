<template>
  <div class="outcome">
    <No v-if="isNo()" />
    <Yes v-if="isYes()" />
  </div>
</template>

<script lang="ts">
import No from '@/components/outcomes/No.vue';
import Yes from '@/components/outcomes/Yes.vue';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {
    No,
    Yes
  }
})
export default class Outcome extends Vue {
  @Prop() private outcome!: number;

  private isYes(): boolean {
    return this.outcome === 1;
  }

  private isNo(): boolean {
    return this.outcome === 0;
  }
}
</script>

<style lang="scss">
div.outcome {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
