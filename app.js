function getAttackValue(max, min) {
  return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
    };
  },

  computed: {
    playerBarStyles() {
      return { width: `${this.playerHealth}%` };
    },
    monsterBarStyles() {
      return { width: `${this.monsterHealth}%` };
    },
  },

  methods: {
    attackMonster() {
      this.monsterHealth -= getAttackValue(12, 5);
      setTimeout(this.attackPlayer, 500);
    },

    attackPlayer() {
      this.playerHealth -= getAttackValue(15, 8);
    },

    specialAttack() {
      this.monsterHealth -= getAttackValue(30, 10);
      setTimeout(this.attackPlayer, 1000);
    },
  },
});

app.mount('#game');
