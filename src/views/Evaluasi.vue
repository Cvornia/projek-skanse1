<template>
  <div class="evaluasi-hero">
    <div class="hero-content">
      <h1 class="title">Hi, ini halaman <span>Evaluasi</span></h1>
      <p class="subtitle">Bantu kami meningkatkan kualitas layanan sekolah.</p>

      <h2 class="typing-text">📋 {{ typingText }}</h2>
      <p class="rotating-text">{{ rotatingQuote }}</p>

      <!-- Tombol-tombol aksi -->
      <div class="button-group">
        <button @click="showModal = true" class="cta-button">✍️ ISI EVALUASI SEKARANG</button>
        <button @click="lihatHasilEvaluasi" class="hasil-button">📖 LIHAT HASIL EVALUASI</button>
        <button @click="goToHome" class="home-button">🏠 KEMBALI KE BERANDA</button>
      </div>
    </div>

    <!-- Modal -->
    <transition name="zoom">
      <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
        <div class="modal">
          <h2>Buka Formulir Evaluasi?</h2>
          <p>Form akan dibuka di tab baru.</p>
          <div class="modal-actions">
            <button @click="openForm" class="modal-button confirm">Buka</button>
            <button @click="showModal = false" class="modal-button cancel">Batal</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'EvaluasiPage',
  data() {
    return {
      showModal: false,
      typingText: '',
      fullTypingText: 'heyy, kiw kiw, bantu kami isi evaluasi donk...',
      quotes: [
        'Evaluasi adalah kunci perbaikan.',
        'Suara kamu, perubahan nyata.',
        'Bantu kami jadi lebih baik.',
        'Sekolah yang hebat dimulai dari masukanmu.'
      ],
      rotatingQuote: '',
      quoteIndex: 0,
      typingIndex: 0
    };
  },
  created() {
    this.typeText();
    this.rotatingQuote = this.quotes[0];
    setInterval(() => {
      this.quoteIndex = (this.quoteIndex + 1) % this.quotes.length;
      this.rotatingQuote = this.quotes[this.quoteIndex];
    }, 3000);
  },
  methods: {
    typeText() {
      if (this.typingIndex < this.fullTypingText.length) {
        this.typingText += this.fullTypingText[this.typingIndex];
        this.typingIndex++;
        setTimeout(this.typeText, 100);
      }
    },
    openForm() {
      window.open(
        'https://docs.google.com/forms/d/e/1FAIpQLSeP0Tmno7QJxu-M5ZWDi-EwexW0mdR2toRIrdiKG4sWZ3YSPg/viewform',
        '_blank'
      );
      this.showModal = false;
    },
    lihatHasilEvaluasi() {
      window.open(
        'https://docs.google.com/spreadsheets/d/1RuLZjPNkIvflRaGaxpe_8iRHZJ9tgr8iR-0kqNP43QM/edit?usp=drivesdk',
        '_blank'
      );
    },
    goToHome() {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

.evaluasi-hero {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  background: linear-gradient(to right, #e0f7ff, #fcefee);
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
  color: #1b1b1b;
  text-align: center;
  flex-direction: column;
  gap: 30px;
}

.hero-content {
  max-width: 700px;
}

.title {
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 10px;
}

.title span {
  color: #007bff;
}

.subtitle {
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 20px;
}

.typing-text {
  font-size: 1.3rem;
  font-weight: 500;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  border-right: 2px solid #007bff;
  animation: blink 0.8s step-end infinite;
  margin-bottom: 10px;
  max-width: 100%;
}

@keyframes blink {
  50% {
    border-color: transparent;
  }
}

.rotating-text {
  font-size: 1.1rem;
  color: #666;
  font-style: italic;
  transition: opacity 0.5s ease;
  min-height: 24px;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
}

.cta-button,
.home-button,
.hasil-button {
  padding: 14px 30px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.cta-button {
  background-color: #007bff;
  color: white;
}

.home-button {
  background-color: #555;
  color: white;
}

.hasil-button {
  background-color: #28a745;
  color: white;
}

.cta-button:hover,
.home-button:hover,
.hasil-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal {
  background: white;
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  width: 300px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  color: #333;
}

.modal-actions {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}

.modal-button {
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  font-size: 0.9rem;
}

.modal-button.confirm {
  background-color: #007bff;
  color: white;
}

.modal-button.cancel {
  background-color: #e0e0e0;
  color: #333;
}

.zoom-enter-active, .zoom-leave-active {
  transition: all 0.3s ease;
}

.zoom-enter-from, .zoom-leave-to {
  transform: scale(0.7);
  opacity: 0;
}
</style>
