<template>
  <div class="answer">
    <Correct v-if="isCorrect()" />
    <UnknownNo v-if="isNo() && isUnknown()" />
    <UnknownYes v-if="isYes() && isUnknown()" />
    <Wrong v-if="isWrong()" />
  </div>
</template>

<script lang="ts">
import Correct from '@/components/answers/Correct.vue';
import UnknownNo from '@/components/answers/UnknownNo.vue';
import UnknownYes from '@/components/answers/UnknownYes.vue';
import Wrong from '@/components/answers/Wrong.vue';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {
    Correct,
    UnknownNo,
    UnknownYes,
    Wrong
  }
})
export default class Answer extends Vue {
  @Prop() private answer!: boolean;
  @Prop() private outcome!: number;

  private isUnknown(): boolean {
    return this.outcome === -1;
  }

  private isYes(): boolean {
    return this.answer;
  }

  private isNo(): boolean {
    return !this.answer;
  }

  private isCorrect(): boolean {
    return this.isYes() ? this.outcome === 1 : this.outcome === 0;
  }

  private isWrong(): boolean {
    return this.isYes() ? this.outcome === 0 : this.outcome === 1;
  }
}
</script>

<style lang="scss">
div.answer {
  display: flex;
  align-items: center;
  justify-content: center;
}

img.answer {
  width: 25px;
  height: 25px;
}
</style>
