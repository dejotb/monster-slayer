function getRandomValue(max, min) {
  return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      roundNumber: 0,
      result: null,
    };
  },

  watch: {
    playerHealth(val) {
      if (val <= 0 && this.monsterHealth <= 0) {
        this.result = 'A draw!';
      } else if (val <= 0) {
        this.result = 'You lost!';
      }
    },

    monsterHealth(val) {
      if (val <= 0 && this.playerHealth <= 0) {
        this.result = 'A draw!';
      } else if (val <= 0) {
        this.result = 'You Won!';
      }
    },
  },

  computed: {
    playerBarStyles() {
      if (this.playerHealth <= 0) {
        return { width: `0%` };
      }
      return { width: `${this.playerHealth}%` };
    },
    monsterBarStyles() {
      if (this.monsterHealth <= 0) {
        return { width: `0%` };
      }
      return { width: `${this.monsterHealth}%` };
    },

    activeSpecialAttack() {
      return this.roundNumber % 3 !== 0;
    },
  },

  methods: {
    restartGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.roundNumber = 0;
      this.result = null;
    },

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

    surrender() {
      this.result = 'You lost!';
    },
  },
});

app.mount('#game');
