<template>
  <div class="game-page">
    <header class="game-header">
      <h1>Kartu Kehidupan</h1>
      <p class="game-description">Buka kartu untuk mendapatkan pesan inspiratif!</p>
    </header>

    <div class="cards-container">
      <div 
        v-for="(card, index) in cards" 
        :key="index"
        class="game-card"
        :class="{ 'flipped': card.isFlipped }"
        @click="flipCard(index)"
        :style="getCardStyle(index)"
      >
        <div class="card-inner">
          <div class="card-front">
            <span class="card-icon">✨</span>
            <h3 class="card-title">Kartu {{ index + 1 }}</h3>
          </div>
          <div class="card-back">
            <p>{{ card.message }}</p>
          </div>
        </div>
      </div>
    </div>

    <button class="game-reset-btn" @click="resetCards">
      <span class="reset-icon">🔄</span> Acak Kartu
    </button>
  </div>
</template>

<script>
export default {
  name: 'GamePage',
  data() {
    return {
      messages: [
        "Hidup ini seperti kopi, pahit tapi bikin melek",
        "Sukses itu 1% inspirasi, 99% menghindari scroll medsos",
        "Jangan bandingkan dirimu dengan orang lain, kecuali mau sakit hati",
        "Kalau mau cepat kaya, tidur lebih lama biar mimpi lebih panjang",
        "Sukses itu butuh usaha bukan sekedar mimpi",
        "Kerja keras takkan mengkhianati hasil, tapi PHK bisa",
        "Masa depan cerah? Matikan lampu biar terlihat lebih terang",
        "Uang memang tak dibawa mati, tapi gk ada uang serasa mati",
        "Hidup ini singkat, jangan dibuat susah. Kecuali lo punya utang",
        "Sabarlah, semua akan indah pada waktunya. Kecuali pas tua"
      ],
      cards: [],
      isAnimating: false
    }
  },
  created() {
    this.resetCards()
  },
  methods: {
    getRandomMessages() {
      const shuffled = [...this.messages].sort(() => 0.5 - Math.random())
      return shuffled.slice(0, 5).map(msg => ({ 
        message: msg, 
        isFlipped: false 
      }))
    },
    flipCard(index) {
      if (!this.isAnimating && !this.cards[index].isFlipped) {
        this.cards[index].isFlipped = true
      }
    },
    resetCards() {
      this.isAnimating = true
      this.cards.forEach((card, index) => {
        setTimeout(() => {
          card.isFlipped = false
          if (index === this.cards.length - 1) {
            setTimeout(() => {
              this.cards = this.getRandomMessages()
              this.isAnimating = false
            }, 300)
          }
        }, index * 100)
      })

      if (this.cards.length === 0) {
        this.cards = this.getRandomMessages()
        this.isAnimating = false
      }
    },
    getCardStyle(index) {
      return {
        '--delay': `${index * 100}ms`,
        '--rotate': `${Math.random() * 10 - 5}deg`
      }
    }
  }
}
</script>

<style>
:root {
  --primary-color: #4a90e2;
  --secondary-color: #f5f7fa;
  --card-shadow: rgba(0, 0, 0, 0.2);
  --background: linear-gradient(to bottom right, #1e3a5f, #0d1b2a);
}
</style>

<style scoped>
.game-page {
  max-width: 1200px;
  margin: auto;
  padding: 2rem;
  text-align: center;
  font-family: 'Arial', sans-serif;
  animation: fadeIn 1s ease-out;
  background: var(--background);
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.game-header h1 {
  font-size: 3rem;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
  text-shadow: 0 0  10px rgba(74, 144, 226, 0.8);
}

.game-description {
  font-size: 1.2rem;
  color: #ffffff;
  margin-bottom: 2rem;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  margin-bottom: 30px;
}

.game-card {
  height: 260px;
  perspective: 1000px;
  cursor: pointer;
  opacity: 0;
  transform: translateY(30px) rotate(var(--rotate));
  animation: cardAppear 0.5s ease-out forwards;
  animation-delay: var(--delay);
}

.card-inner {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s ease;
  border-radius: 20px;
  box-shadow: 0 8px 16px var(--card-shadow);
}

.game-card.flipped .card-inner {
  transform: rotateY(180deg);
}

.card-front, .card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
}

.card-front {
  background: linear-gradient(135deg, var(--primary-color), #6dd5ed);
  box-shadow: 0 0 20px rgba(74, 144, 226, 0.8);
}

.card-back {
  background: var(--secondary-color);
  color: var(--primary-color);
  transform: rotateY(180deg);
  border: 2px solid var(--primary-color);
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
}

.card-icon {
  font-size: 4rem;
}

.card-title {
  margin-top: 10px;
  font-size: 1.5rem;
}

.game-reset-btn {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  box-shadow: 0 0 10px rgba(74, 144, 226, 0.8);
}

.game-reset-btn:hover {
  background-color: #3b82f6;
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(74, 144, 226, 1);
}

.reset-icon {
  margin-right: 10px;
  transition: transform 0.5s ease;
}

.game-reset-btn:hover .reset-icon {
  transform: rotate(360deg);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes cardAppear {
  to {
    opacity: 1;
    transform: translateY(0) rotate(0deg);
  }
}

@media (max-width: 768px) {
  .cards-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .cards-container {
    grid-template-columns: 1fr;
  }
}
</style>