<template>
  <div class="answer">
    <CorrectNo v-if="isNo() && isCorrect()" />
    <CorrectYes v-if="isYes() && isCorrect()" />
    <UnknownNo v-if="isNo() && isUnknown()" />
    <UnknownYes v-if="isYes() && isUnknown()" />
    <WrongNo v-if="isNo() && isWrong()" />
    <WrongYes v-if="isYes() && isWrong()" />
  </div>
</template>

<script lang="ts">
import CorrectNo from '@/components/answers/CorrectNo.vue';
import CorrectYes from '@/components/answers/CorrectYes.vue';
import UnknownNo from '@/components/answers/UnknownNo.vue';
import UnknownYes from '@/components/answers/UnknownYes.vue';
import WrongNo from '@/components/answers/WrongNo.vue';
import WrongYes from '@/components/answers/WrongYes.vue';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {
    CorrectNo,
    CorrectYes,
    UnknownNo,
    UnknownYes,
    WrongNo,
    WrongYes
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
