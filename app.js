function getRandomValue(max, min) {
  return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      roundNumber: 0,
    };
  },

  computed: {
    playerBarStyles() {
      return { width: `${this.playerHealth}%` };
    },
    monsterBarStyles() {
      return { width: `${this.monsterHealth}%` };
    },

    activeSpecialAttack() {
      return this.roundNumber % 3 !== 0;
    },

    // ableToHeal() {
    //   return this.playerHealth >= 80;
    // },
  },

  methods: {
    attackMonster() {
      this.roundNumber++;
      this.monsterHealth -= getRandomValue(5, 12);
      setTimeout(this.attackPlayer, 500);
      console.log(this.roundNumber);
    },

    attackPlayer() {
      this.playerHealth -= getRandomValue(8, 15);
    },

    specialAttack() {
      this.roundNumber++;
      this.monsterHealth -= getRandomValue(10, 30);
      setTimeout(this.attackPlayer, 500);
    },

    healPlayer() {
      this.roundNumber++;
      const healValue = getRandomValue(5, 20);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      setTimeout(this.attackPlayer, 500);
    },
  },
});

app.mount('#game');
