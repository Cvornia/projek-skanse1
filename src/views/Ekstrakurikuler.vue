<template>
  <div class="ekskul-page">
    <h1 class="page-title">✨ Kegiatan Ekstrakurikuler</h1>
    <p class="page-subtitle">Klik untuk lihat detail & cara gabung</p>

    <div class="accordion">
      <div v-for="item in ekskulList" :key="item.id" class="accordion-item">
        <button class="accordion-header" @click="toggle(item.id)">
          <span class="icon">{{ item.icon }}</span>
          <span class="name">{{ item.name }}</span>
          <span class="arrow" :class="{ open: activeId === item.id }">▶</span>
        </button>
        <transition name="slide">
          <div v-if="activeId === item.id" class="accordion-content">
            <p>{{ item.desc }}</p>
            <div class="button-group">
              <a :href="item.link" target="_blank" class="join-btn">Chat WA <strong>{{ item.contact }}</strong></a>
              <a :href="item.formLink" target="_blank" class="form-btn">Isi Data Diri</a>
              <a :href="item.participantLink" target="_blank" class="view-btn">Lihat Peserta</a>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EkstrakurikulerPage',
  data() {
    return {
      activeId: null,
      ekskulList: [
        {
          id: 1,
          name: 'OSIS',
          icon: '🏫',
          desc: 'Belajar kepemimpinan, etika, serta menjadi role model siswa lainnya.',
          contact: '0859-7113-1108',
          link: 'https://wa.me/6285971131108',
          formLink: 'https://forms.gle/t92v3qgCZy2qPzYM8',
          participantLink: 'https://docs.google.com/spreadsheets/d/1N6mM90zRQbfJfDzu293-hFiUPlbtkzTXFUNgapuPIrI/edit?usp=drivesdk'
        },
        {
          id: 2,
          name: 'Pramuka',
          icon: '🏕️',
          desc: 'Survival, tali-temali, hingga kepemimpinan mandiri dan tangguh.',
          contact: '0859-7113-1108',
          link: 'https://wa.me/6285971131108',
          formLink: 'https://forms.gle/HR3CYCcwHVEAxdA66',
          participantLink: 'https://docs.google.com/spreadsheets/d/1sMurb7lz1g6EPSG05ncSD3sFdPF1ZT2sOI2Xqc_ZkzM/edit?usp=sharing'
        },
        {
          id: 3,
          name: 'PMR',
          icon: '🩹',
          desc: 'Pelatihan pertolongan pertama, kesehatan dasar, dan aksi sosial kemanusiaan.',
          contact: '0859-7113-1108',
          link: 'https://wa.me/6285971131108',
          formLink: 'https://forms.gle/ifeJwfLY65GyYUf66',
          participantLink: 'https://docs.google.com/spreadsheets/d/1nLBndBvLApfGs3cekxL_LVo2aMi73ruUImLqXunHx-4/edit?usp=sharing'
        },
        {
          id: 4,
          name: 'Voli',
          icon: '🏐',
          desc: 'Latihan rutin, kekompakan tim, dan kompetisi antar sekolah.',
          contact: '0859-7113-1108',
          link: 'https://wa.me/6285971131108',
          formLink: 'https://forms.gle/C4PaGLyxC8vLuAvD8',
          participantLink: 'https://docs.google.com/spreadsheets/d/1YmRjuHUOYsG7gyO3hzUh30MOShYhtiNlncXgvUbGe4k/edit?usp=sharing'
        },
        {
          id: 5,
          name: 'Kera Sakti',
          icon: '🥋',
          desc: 'Melatih disiplin, bela diri tradisional, dan karakter pejuang sejati.',
          contact: '0859-7113-1108',
          link: 'https://wa.me/6285971131108',
          formLink : 'https://forms.gle/94WkUbXEGoR3oXbv5',
          participantLink: 'https://docs.google.com/spreadsheets/d/1ltUBP69axr0MKIPtHRwq4A0wUyFWdr_W9SkA1sUvw2U/edit?usp=sharing'
        }
      ]
    };
  },
  methods: {
    toggle(id) {
      this.activeId = this.activeId === id ? null : id;
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

.ekskul-page {
  max-width: 700px;
  margin: 40px auto;
  padding: 30px 24px;
  background: #f8fbff;
  font-family: 'Poppins', sans-serif;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 98, 210, 0.1);
  border: 1px solid #dbeafe;
}

.page-title {
  font-size: 2.4rem;
  font-weight: 700;
  color: #1e3a8a;
  text-align: center;
  margin-bottom: 6px;
}

.page-subtitle {
  text-align: center;
  color: #3b82f6;
  margin-bottom: 28px;
}

.accordion-item + .accordion-item {
  margin-top: 14px;
}

.accordion-header {
  width: 100%;
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  padding: 14px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: background 0.3s, transform 0.3s;
}

.accordion-header:hover {
  background: #e0f2fe;
  transform: scale(1.02);
}

.icon {
  font-size: 1.6rem;
  margin-right: 12px;
}

.name {
  flex: 1;
  text-align: left;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
}

.arrow {
  transition: transform 0.3s;
  color: #475569;
}

.arrow.open {
  transform: rotate(90deg);
}

.accordion-content {
  background: #f0f9ff;
  border: 1px solid #cbd5e1;
  border-top: none;
  border-radius: 0 0 10px 10px;
  padding: 16px;
  color: #334155;
  font-size: 0.95rem;
}

.button-group {
  display: flex;
  gap: 10px;
  margin-top: 14px;
  flex-wrap: wrap;
}

.join-btn, .form-btn, .view-btn {
  display: inline-block;
  padding: 10px 14px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 98, 210, 0.08);
  color: #fff;
}

.join-btn {
  background: #3b82f6;
}
.join-btn:hover {
  background: #2563eb;
  transform: translateY(-2px);
}

.form-btn {
  background: #0ea5e9;
}
.form-btn:hover {
  background: #0284c7;
  transform: translateY(-2px);
}

.view-btn {
  background: #facc15;
  color: #1f2937;
}
.view-btn:hover {
  background: #eab308;
  transform: translateY(-2px);
}

/* Slide transition */
.slide-enter-active,
.slide-leave-active {
  transition: max-height 0.3s ease, opacity 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
}
.slide-enter-to,
.slide-leave-from {
  max-height: 200px;
  opacity: 1;
}
</style> 
