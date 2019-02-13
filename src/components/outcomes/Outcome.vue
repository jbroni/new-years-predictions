<template>
  <div class="outcome">
    <No v-if="isNo()" />
    <Unknown v-if="isUnknown()" />
    <Yes v-if="isYes()" />
  </div>
</template>

<script lang="ts">
  import No from '@/components/outcomes/No.vue';
  import Unknown from '@/components/outcomes/Unknown.vue';
  import Yes from '@/components/outcomes/Yes.vue';
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component({
    components: {
      No,
      Unknown,
      Yes
    }
  })
  export default class Outcome extends Vue {
    @Prop() private outcome!: number;

    private isUnknown(): boolean {
      return this.outcome === -1;
    }

    private isYes(): boolean {
      return this.outcome === 1;
    }

    private isNo(): boolean {
      return this.outcome === 0;
    }
  }
</script>

<style lang="scss">
  img.outcome {
    width: 35px;
    height: 35px;
  }
</style>
