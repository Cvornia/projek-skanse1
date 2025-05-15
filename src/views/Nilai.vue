<template>
  <div :class="['nilai-page', theme]">
    <!-- Dark/Light Toggle -->
    <div class="theme-switch">
      <label>
        <input type="checkbox" v-model="isDark" />
        <span>🌙 Dark Mode</span>
      </label>
    </div>

    <!-- Header dengan Typing Effect -->
    <header class="header">
      <h1 class="typing">{{ headerText }}</h1>
      <p class="subheader">Pilih kelasmu untuk melihat nilai secara real-time!</p>
    </header>

    <!-- Filter Jurusan -->
    <div class="filters">
      <select v-model="selectedJurusan">
        <option value="">Semua Jurusan</option>
        <option v-for="j in uniqueJurusan" :key="j" :value="j">{{ j }}</option>
      </select>
    </div>

    <!-- Grid Kelas -->
    <div class="grid">
      <div
        v-for="kelas in filteredKelas"
        :key="kelas.nama"
        :class="['card', kelas.bg]"
        @click="openLink(kelas.link)"
      >
        <div class="icon">{{ kelas.icon }}</div>
        <h2 class="nama">{{ kelas.nama }}</h2>
        <p class="jurusan">{{ kelas.jurusan }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NilaiPage',
  data() {
    return {
      isDark: false,
      headerText: '',
      fullHeader: 'yoo!, mau lihat nilai kamu cek aja',
      typingIndex: 0,
      selectedJurusan: '',
      daftarKelas: [
        { nama: 'X APHPi', jurusan: 'Agribisnis', icon: '🌱', bg: 'bg-green-400', link: 'https://docs.google.com/spreadsheets/d/1qHTl7WVHNSSoCS9bp--0kdbqkWixGo2YpGueN5Q0QJg/edit?usp=sharing' },
        { nama: 'X AKL', jurusan: 'Keuangan', icon: '💼', bg: 'bg-blue-500', link: 'https://docs.google.com/spreadsheets/d/1WTTnlLVwNO2nGvI5iXtQscxrvfI639o7BV1nw5VuC5Y/edit?usp=sharing' },
        { nama: 'X APL', jurusan: 'Pengolahan', icon: '🥫', bg: 'bg-orange-400', link: 'https://docs.google.com/spreadsheets/d/1eBLU9LAAITg3AXrxp84TnZobetjeOGYTVAydfL_QoqA/edit?usp=sharing' },
        { nama: 'X TJKT 1', jurusan: 'Teknik Jaringan', icon: '💻', bg: 'bg-purple-500', link: 'https://docs.google.com/spreadsheets/d/1XdgiCYODNuyNE43Sc3HJkuru0a3Bm10C8sTd7Kpm_Oo/edit?usp=sharing' },
        { nama: 'X TJKT 2', jurusan: 'Teknik Jaringan', icon: '💻', bg: 'bg-purple-400', link: '' },
        { nama: 'XI AKL', jurusan: 'Keuangan', icon: '💼', bg: 'bg-blue-600', link: 'https://docs.google.com/spreadsheets/d/1gyt82Iji-iK_S-XSKCG8PvQjAVKyUQN7kLTX7QiVid0/edit?usp=drivesdk' },
        { nama: 'XI APHPi', jurusan: 'Agribisnis', icon: '🌾', bg: 'bg-green-500', link: 'https://docs.google.com/spreadsheets/d/11GckZXjQ0B4bIgkGdpC-dxDUi8T36BqQAUojwTYhfdc/edit?usp=drivesdk' },
        { nama: 'XI APL', jurusan: 'Pengolahan', icon: '🥫', bg: 'bg-orange-500', link: 'https://docs.google.com/spreadsheets/d/1OlBEbSf4dlNPf_ZWHrxHf-jKtIY2eptz5y01ObUDLZQ/edit?usp=drivesdk' },
        { nama: 'XI TJKT 1', jurusan: 'Teknik Jaringan', icon: '🧠', bg: 'bg-indigo-500', link: 'https://docs.google.com/spreadsheets/d/1RW45w8g59oMefq3Ka7FFnkkb8Xbs5jRMIodrGN6t99k/edit?usp=drivesdk' },
        { nama: 'XI TJKT 2', jurusan: 'Teknik Jaringan', icon: '📡', bg: 'bg-indigo-600', link: 'https://docs.google.com/spreadsheets/d/1qoieQQZ8bJmjQoWEYQv2y9bI6nVyiiE55pNA2Q-BIgw/edit?usp=drivesdk' },
        { nama: 'XII AKL', jurusan: 'Keuangan', icon: '📊', bg: 'bg-blue-700', link: 'https://docs.google.com/spreadsheets/d/1K7SpXmWQmCLtP4o1giiIzJk7aLGpOu_4eEUyYP4Ej1w/edit?usp=drivesdk' },
        { nama: 'XII APHPi', jurusan: 'Agribisnis', icon: '🌽', bg: 'bg-green-600', link: 'https://docs.google.com/spreadsheets/d/1Ccs-iXluQQt2e6HIfnk8wuVbgy0i0bcbTROuFKA5M0k/edit?usp=drivesdk' },
        { nama: 'XII APL', jurusan: 'Pengolahan', icon: '🍯', bg: 'bg-yellow-500', link: 'https://docs.google.com/spreadsheets/d/1kKLp1DAzm2Jm9GA0Ybt9HMJmSroaeF4-OMySKgA7b5s/edit?usp=drivesdk' },
        { nama: 'XII TJKT 1', jurusan: 'Teknik Jaringan', icon: '📡', bg: 'bg-purple-600', link: 'https://docs.google.com/spreadsheets/d/1EE4WLq-7aK9wL82T9h63Pof1__FEOwzEy0fnZYjlpxc/edit?usp=drivesdk' },
        { nama: 'XII TJKT 2', jurusan: 'Teknik Jaringan', icon: '🛰️', bg: 'bg-purple-700', link: 'https://docs.google.com/spreadsheets/d/1GwpUdKlquAVPfM4OZ7VL5sELeXLnSmEFISrc_m_CQd0/edit?usp=drivesdk' }
      ]
    }
  },
  computed: {
    theme() {
      return this.isDark ? 'dark' : 'light';
    },
    uniqueJurusan() {
      return [...new Set(this.daftarKelas.map(k => k.jurusan))];
    },
    filteredKelas() {
      return this.selectedJurusan
        ? this.daftarKelas.filter(k => k.jurusan === this.selectedJurusan)
        : this.daftarKelas;
    }
  },
  mounted() {
    this.typeHeader();
  },
  methods: {
    openLink(url) {
      if (url) window.open(url, '_blank');
    },
    typeHeader() {
      if (this.typingIndex < this.fullHeader.length) {
        this.headerText += this.fullHeader[this.typingIndex++];
        setTimeout(this.typeHeader, 100);
      }
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap');

.nilai-page {
  font-family: 'Plus Jakarta Sans', sans-serif;
  padding: 30px 20px;
  min-height: 100vh;
  transition: background 0.3s, color 0.3s;
}
.nilai-page.light {
  background: #f9fafb;
  color: #1f2937;
}
.nilai-page.dark {
  background: #1f2937;
  color: #f9fafb;
}

/* Theme Switch */
.theme-switch {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}
.theme-switch input {
  margin-right: 6px;
  accent-color: #6366f1;
}

/* Header */
.header {
  text-align: center;
  margin-bottom: 25px;
}
.typing {
  font-size: 2rem;
  font-weight: 700;
  min-height: 2.5rem;
  position: relative;
}
.typing::after {
  content: '';
  position: absolute;
  right: 0;
  width: 2px;
  height: 1.2rem;
  background: currentColor;
  animation: blink 0.8s infinite;
}
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
.subheader {
  font-size: 1rem;
  margin-top: 8px;
  color: inherit;
  opacity: 0.8;
}

/* Filters */
.filters {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
.filters select {
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.3s;
}
.filters select:focus {
  border-color: #6366f1;
}

/* Grid & Cards */
.grid {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
}
.card {
  cursor: pointer;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
}
.card:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}
.icon {
  font-size: 2rem;
  margin-bottom: 8px;
}
.nama {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 4px;
}
.jurusan {
  font-size: 0.9rem;
  opacity: 0.8;
}

/* Background warna) */
.bg-green-400 { background: #4ade80; }
.bg-green-500 { background: #22c55e; }
.bg-green-600 { background: #16a34a; }
.bg-blue-500 { background: #3b82f6; }
.bg-blue-600 { background: #2563eb; }
.bg-blue-700 { background: #1d4ed8; }
.bg-orange-400 { background: #fb923c; }
.bg-orange-500 { background: #f97316; }
.bg-yellow-500 { background: #fbbf24; }
.bg-purple-400 { background: #c084fc; }
.bg-purple-500 { background: #a855f7; }
.bg-purple-600 { background: #9333ea; }
.bg-purple-700 { background: #7e22ce; }
.bg-indigo-500 { background: #6366f1; }
.bg-indigo-600 { background: #4f46e5; }

/* Card text color override for dark mode */
.dark .card { color: #f9fafb; }
</style>
