<template>
  <section class="home-page">
    <div class="background-glow">
      <div class="glow-circle glow-1"></div>
      <div class="glow-circle glow-2"></div>
      <div class="glow-circle glow-3"></div>
    </div>

    <div class="container">
      <header class="page-header">
        <h1 class="title">Selamat Datang di <span class="highlight">SKANSEVGEV SMKN 7 Pangkep</span></h1>
        <div class="header-divider"></div>

        <div class="additional-section">
          <h2>Tentang Portal Ini</h2>
          <p>
            Portal SKANSEVGEP dirancang untuk memudahkan Siswa, Guru, Staf, Komite (Warga Sekolah dan Orang Tua/Wali) dalam mengakses informasi penting seperti Absensi, Nilai, Survey, EValuasi, Game, Ekstrakurikuler dan Perpustakaan dengan tampilan modern dan interaktif, kami berkomitmen menyediakan pengalaman pengguna terbaik
          </p>
          <p>
            Silakan eksplorasi setiap fitur yang tersedia. Jika ada pertanyaan atau kendala, jangan ragu untuk menghubungi tim pengembang atau pihak sekolah.
          </p>
        </div>
      </header>

      <div class="cards">
        <div v-for="card in cards" :key="card.title" class="card">
          <router-link :to="card.link" class="card-link">
            <div class="card-icon">
              <div class="icon-bg"></div>
              <span class="icon-emoji">{{ card.icon }}</span>
            </div>
            <div class="card-content">
              <h2>{{ card.title }}</h2>
              <p>{{ card.description }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      cards: [
        {
          title: 'Absensi',
          description: 'Cek dan kelola kehadiran siswa secara mudah.',
          icon: '📅',
          link: '/absensi',
        },
        {
          title: 'Kehadiran',
          description: 'Lihat rekap kehadiran siswa dalam satu tampilan.',
          icon: '✅',
          link: '/kehadiran',
        },
        {
          title: 'Nilai',
          description: 'Lihat dan analisis nilai akademik siswa.',
          icon: '📊',
          link: '/nilai',
        },
        {
          title: 'Survey',
          description: 'Ikuti dan buat survei internal sekolah.',
          icon: '📝',
          link: '/survey',
        },
        {
          title: 'Evaluasi',
          description: 'Lakukan evaluasi terhadap kegiatan belajar mengajar.',
          icon: '📋',
          link: '/evaluasi',
        },
        {
          title: 'Game',
          description: 'Mainkan game edukatif yang menarik.',
          icon: '🎮',
          link: '/game',
        },
        {
          title: 'Ekstrakurikuler',
          description: 'Informasi dan pendaftaran kegiatan ekstrakurikuler.',
          icon: '🏀',
          link: '/ekstrakurikuler',
        },
        {
          title: 'Perpustakaan',
          description: 'Akses buku dan materi pembelajaran digital.',
          icon: '📚',
          link: '/perpustakaan',
        },
      ],
    };
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

.home-page {
  position: relative;
  padding: 2rem;
  overflow: hidden;
  background-color: #f5f5f5;
  font-family: 'Poppins', sans-serif;
}

.background-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
}

.glow-circle {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;
}

.glow-1 {
  width: 300px;
  height: 300px;
  background-color: #ff6b6b;
  top: 10%;
  left: 10%;
}

.glow-2 {
  width: 400px;
  height: 400px;
  background-color: #6bc1ff;
  top: 30%;
  left: 50%;
}

.glow-3 {
  width: 200px;
  height: 200px;
  background-color: #51d88a;
  top: 60%;
  left: 30%;
}

.container {
  position: relative;
  z-index: 1;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
}

.highlight {
  color: #007bff;
}

.header-divider {
  width: 60px;
  height: 4px;
  background-color: #007bff;
  margin: 1rem auto 2rem;
}

.additional-section {
  margin-bottom: 3rem;
  text-align: center;
}

.additional-section h2 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.additional-section p {
  font-size: 1rem;
  color: #666;
  margin: 0.25rem 0;
}

.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
}

.card {
  width: 260px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}

.card-link {
  display: block;
  text-decoration: none;
  color: inherit;
  padding: 1.5rem;
}

.card-icon {
  text-align: center;
  margin-bottom: 1rem;
  position: relative;
}

.icon-bg {
  width: 60px;
  height: 60px;
  background-color: #007bff;
  border-radius: 50%;
  margin: 0 auto;
  opacity: 0.1;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}

.icon-emoji {
  font-size: 2rem;
  position: relative;
  z-index: 1;
}

.card-content h2 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  text-align: center;
  color: #007bff;
}

.card-content p {
  font-size: 0.95rem;
  color: #555;
  text-align: center;
}
</style>
