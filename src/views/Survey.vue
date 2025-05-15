<template>
  <div class="survey-container">
    <div class="chat-box">
      <div class="chat-bubble system" v-if="step >= 1">
        👋 Hai, kiw kiw, bisa bantu gk, isi survey tentang sekolah kami.
      </div>
      <div class="chat-bubble system" v-if="step >= 2">
        💬 Cukup isi survei bro, kami butuh pendapatmu untuk berkembang
      </div>
      <div class="chat-bubble user" v-if="step >= 3">
         eeeee, gimana yaaa...!
      </div>
      <div class="action-buttons" v-if="step >= 4">
        <button @click="showModal = true" class="start-button">✅ ISI SURVEI</button>
        <button @click="viewForm" class="view-button">👀 LIHAT SURVEI</button>
        <button @click="goToHome" class="back-button">🏠 KEMBALI</button>
      </div>
    </div>

    <!-- Modal Konfirmasi -->
    <!-- Modal Konfirmasi -->
<transition name="fade">
  <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
    <div class="modal">
      <h2>Buka survei sekarang?</h2>
      <p>Form akan terbuka di tab baru.</p>
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
  name: 'SurveyPage',
  data() {
    return {
      showModal: false,
      step: 0
    };
  },
  mounted() {
    this.startConversation();
  },
  methods: {
  startConversation() {
    const delays = [1000, 2000, 1000, 1200];
    delays.forEach((delay, index) => {
      setTimeout(() => {
        this.step = index + 1;
      }, delays.slice(0, index + 1).reduce((a, b) => a + b, 0));
    });
  },
  openForm() {
    window.open(
      'https://docs.google.com/forms/d/1eloK7sdiiIjdbhu_RFjdIdyzz4bkIrxB53Nb2qjm70k/preview?edit_requested=true'
    );
    this.showModal = false;
  },
  goToHome() {
    this.$router.push('/');
  },

  // ⬇️ Tambahan Baru
  viewForm() {
    window.open(
      'https://docs.google.com/spreadsheets/d/1l8yeYT9xYrLwMCZ6-5E1dJX0NQKV5u4anN4peLdkvzg/edit?usp=drivesdk'
    );
  }
}};

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

.survey-container {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f1f5f9;
  min-height: 100vh;
  padding: 30px;
  font-family: 'Inter', sans-serif;
}

.chat-box {
  width: 100%;
  max-width: 600px;
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.chat-bubble {
  max-width: 80%;
  padding: 12px 20px;
  border-radius: 20px;
  margin-bottom: 16px;
  line-height: 1.5;
  animation: fadeInUp 0.6s ease both;
}

.chat-bubble.system {
  background-color: #e0f2fe;
  color: #0c4a6e;
  align-self: flex-start;
}

.chat-bubble.user {
  background-color: #dcfce7;
  color: #065f46;
  align-self: flex-end;
  margin-left: auto;
}

.action-buttons {
  margin-top: 20px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.start-button,
.back-button {
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: background 0.3s ease;
}

.start-button {
  background-color: #3b82f6;
  color: white;
}

.start-button:hover {
  background-color: #2563eb;
}

.back-button {
  background-color: #f3f4f6;
  color: #111827;
}

.back-button:hover {
  background-color: #e5e7eb;
}

/* Modal */
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
  z-index: 999;
}

.modal {
  background: white;
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  width: 300px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.modal-actions {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}

.modal-button {
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}

.modal-button.confirm {
  background-color: #2563eb;
  color: white;
}

.modal-button.cancel {
  background-color: #e5e7eb;
  color: #111;
}

/* Animasi */
.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.view-button {
  background-color: #facc15;
  color: #78350f;
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
}

.view-button:hover {
  background-color: #fbbf24;
}

</style>