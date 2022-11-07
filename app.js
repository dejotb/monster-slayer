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
      logMessages: [],
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
      this.logMessages = [];
    },

    attackMonster() {
      this.roundNumber++;
      const value = getRandomValue(5, 12);
      this.monsterHealth -= value;
      this.addLogMessage('player', 'attack', value);
      setTimeout(this.attackPlayer, 500);
      console.log(this.roundNumber);
    },

    attackPlayer() {
      const value = getRandomValue(8, 15);
      this.playerHealth -= value;
      this.addLogMessage('monster', 'attack', value);
    },

    specialAttack() {
      this.roundNumber++;
      const value = getRandomValue(10, 30);
      this.monsterHealth -= value;
      this.addLogMessage('player', 'attack', value);
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
      this.addLogMessage('player', 'heal', healValue);
      setTimeout(this.attackPlayer, 500);
    },

    surrender() {
      this.result = 'You lost!';
    },

    addLogMessage(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
});

app.mount('#game');
