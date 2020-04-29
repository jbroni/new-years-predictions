<template>
  <div id="stats">
    <Navigation v-bind:years="years"></Navigation>
    <h1>Statistik</h1>

    <canvas ref="totalPerYearChart"></canvas> <canvas ref="totalChart"></canvas>
  </div>
</template>

<script lang="ts">
import * as palette from 'google-palette';
import { uniq } from 'lodash';

import Navigation from '@/components/Navigation.vue';
import { db } from '@/db';
import Chart from 'chart.js';
import { Component, Vue } from 'vue-property-decorator';

interface YearlyTotal {
  label: string;
  participants: {
    name: string;
    score: number;
  }[];
}

@Component({
  data: () => {
    return {
      years: []
    };
  },
  components: { Navigation },
  firestore: {
    years: db.collection('years')
  }
})
export default class Stats extends Vue {
  public mounted(): void {
    const yearsCollection = db.collection('years');

    yearsCollection
      .get()
      .then(result => {
        return Promise.all(
          result.docs.map(year =>
            Promise.all([
              Promise.resolve(year.id),
              yearsCollection
                .doc(year.id)
                .collection('participants')
                .get(),
              yearsCollection
                .doc(year.id)
                .collection('questions')
                .get()
            ])
          )
        );
      })
      .then(results => {
        return results.map(year => {
          const questions = year[2].docs.map(doc => doc.data());

          return {
            label: year[0],
            participants: year[1].docs.map(doc => {
              const participant = doc.data();

              return {
                name: participant.name,
                score: participant.predictions.reduce(
                  (total: number, answer: boolean, currentIndex: number) =>
                    isCorrect(answer, questions[currentIndex].outcome)
                      ? total + 1
                      : total,
                  0
                )
              };
            })
          };
        });
      })
      .then(totalsByYear => {
        this.generateTotalPerYearChart(totalsByYear);
        this.generateTotalChart(totalsByYear);
      });
  }

  private generateTotalPerYearChart(totalsByYear: YearlyTotal[]): void {
    const context = this.$refs.totalPerYearChart as HTMLCanvasElement;

    new Chart(context, {
      type: 'bar',
      data: generateChartData(totalsByYear),
      options: {
        title: {
          display: true,
          text: 'Rigtige svar per år'
        },
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0,
                max: 25
              }
            }
          ]
        }
      }
    });
  }

  private generateTotalChart(totalsByYear: YearlyTotal[]): void {
    const context = this.$refs.totalChart as HTMLCanvasElement;

    new Chart(context, {
      type: 'bar',
      data: generateChartData(totalsByYear),
      options: {
        title: {
          display: true,
          text: 'Rigtige svar i alt'
        },
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0,
                max: 25 * totalsByYear.length
              },
              stacked: true
            }
          ],
          xAxes: [
            {
              stacked: true
            }
          ]
        }
      }
    });
  }
}

function isCorrect(answer: boolean, outcome: number): boolean {
  return answer ? outcome === 1 : outcome === 0;
}

function generateChartData(totalsByYear: YearlyTotal[]): Chart.ChartData {
  const backgroundColors = palette('tol', totalsByYear.length);

  const labels = getParticipantLabels(totalsByYear);

  const datasets = totalsByYear.map((year, index) => {
    return {
      label: year.label,
      backgroundColor: `#${backgroundColors[index]}`,
      data: labels.map(label => {
        const participant = year.participants.find(p => p.name === label);
        return participant ? participant.score : 0;
      })
    };
  });

  return { labels, datasets };
}

function getParticipantLabels(totalsByYear: YearlyTotal[]): string[] {
  return uniq(
    totalsByYear
      .flatMap(year => year.participants)
      .map(participant => participant.name)
  );
}
</script>

<style lang="scss">
canvas {
  margin: 0 auto;
  max-width: 800px;
}
</style>
