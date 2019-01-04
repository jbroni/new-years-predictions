<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Predictions
        v-bind:questions="questions"
        v-bind:participants="participants"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { firebaseConfig } from '../environments/firebase';
import HelloWorld from './components/HelloWorld.vue';
import Predictions from './components/Predictions.vue';

import Firebase from 'firebase';

const firebaseApp = Firebase.initializeApp(firebaseConfig);
const firestore = firebaseApp.firestore();
const settings = {
  timestampsInSnapshots: true
};
firestore.settings(settings);

@Component({
  data: () => {
    return {
      questions: [],
      participants: [],
    };
  },
  components: {
    HelloWorld,
    Predictions,
  },
  firestore: {
    questions: firestore.collection('questions'),
    participants: firestore.collection('participants'),
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
