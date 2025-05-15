<template>
  <div class="library-container">
    <h1 class="library-title">Perpustakaan Digital skansev</h1>

    <!-- Komponen Rak Buku -->
    <div v-for="rak in rakBuku" :key="rak.judul" class="bookshelf">
      <h2 class="shelf-title">{{ rak.judul }}</h2>
      <div class="book-row">
        <router-link
          v-for="item in rak.items"
          :key="item.id"
          :to="{ name: 'BookReader', params: { id: item.id } }"
          class="book-card"
        >
          <img :src="item.cover" alt="cover" class="book-image" />
          <div class="book-title">{{ item.title }}</div>
        </router-link>
      </div>
    </div>

    <!-- Tombol Eksternal -->
    <div class="external-links">
      <a href="https://sites.google.com/view/perpustakaansmkn7pangkep/home" target="_blank" class="external-btn">KUNJUNGI WEBSITE PERPUSTAKAAN MACCA SMKN 7 PANGKEP</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PerpustakaanPage',
  data() {
    return {
      rakBuku: [
        {
          judul: 'Sertifikat',
          items: [
            { id: 1, title: 'Piagam', cover: '/img/piagam1.png', file: '/file/piagam1.pdf' },
            { id: 2, title: 'Piagam', cover: '/img/piagam2.png', file: '/file/piagam2.pdf' },
            { id: 10, title: 'Piagam', cover: '/img/piagam3.png', file: '/file/piagam3.pdf' },
          ],
        },
        {
          judul: 'Buku Fiksi & Nonfiksi',
          items: [
            { id: 3, title: 'Soul Land: Black Dragon', cover: '/img/OIP.jpg', file: '/file/fiksi1.pdf' },
            { id: 4, title: 'Berjuta Kisah', cover: '/img/B1.png', file: '/file/cerpen full.pdf' },
            { id: 5, title: 'Puisi Antologi', cover: '/img/puisi antologi.png', file: '/file/puisi antologi.pdf' },
            { id: 9, title: 'Star-Embracing Sword Master', cover: '/img/test1.jpeg', file: '/file/star1.pdf' },
            { id: 14, title: 'Alan Bintang Anak Laut', cover: '/img/alan bintang.png', file: '/file/Alan Bintang Anak Laut.pdf' },
            { id: 15, title: 'Awal Pendakian', cover: '/img/awal pendakian.png', file: '/file/Awal Pendakian.pdf' },
            { id: 16, title: 'Babi Sombong dan Kuda Kurus', cover: '/img/babi sombong.png', file: '/file/Babi Sombong Dan_Kuda_Kurus.pdf' },
            { id: 17, title: 'Basisir Langit', cover: '/img/basisir langit.png', file: '/file/Basisir Langit.pdf' },
            { id: 18, title: 'Batu Keinsyafan', cover: '/img/batu.png', file: '/file/Batu Keinsyafan.pdf' },
            { id: 19, title: 'Bebek dari Kakek', cover: '/img/bebek dari kakek.png', file: '/file/Bebek Dari Kakek.pdf' },
          ],
        },
        {
          judul: 'Buku Paket Kelas 1 - 3',
          items: [
            { id: 11, title: 'ENGGLISH X', cover: '/img/X ENGGLISH.png', file: '/file/X10/Bahasa-Indonesia-BG-KLS-X.pdf' },
            { id: 12, title: 'INDONESIA X', cover: '/img/X INDO.png', file: '/file/X10/Bahasa-Inggris-BG-KLS-X.pdf' },
            { id: 13, title: 'Sejarah XI', cover: '/img/sejarah 11.png', file: '/file/X10/Sejarah-BS-KLS-XI.pdf' },
            { id: 20, title: 'pendidikan panca sila XI ', cover: '/img/INFORMATIKA.png', file: '/file/X10/Pendidikan-Pancasila-BS-KLS-XI.pdf' },
            { id: 21, title: 'IPA X', cover: '/img/ipa X.png', file: '/file/X10/IPA-BS-KLS-X.png' },
            { id: 22, title: 'fisika XII', cover: '/img/fisika XII.png', file: '/file/Fisika_BS_KLS_XII_Lc.pdf' },
            { id: 23, title: 'ENGGLISH XII', cover: '/img/X ENGGLISH.png', file: '/file/X10/Inggris_BS_KLS_XII.pdf' },
            { id: 24, title: 'ENGGLISH XI', cover: '/img/X ENGGLISH.png', file: '/file/X10/Bahasa-Inggris-BS-KLS-XI-efc.pdf' },
            { id: 25, title: 'INDONESIA XI', cover: '/img/INFORMATIKA.png', file: '/file/X10/Bahasa-Indonesia-BS-KLS-XI.pdf' },
          ],
        },
      ],
    };
  },
};
</script>

<style scoped>
.library-container {
  padding: 2rem;
  background: #0d1b2a;
  min-height: 100vh;
  color: #fff;
  font-family: 'Segoe UI', sans-serif;
}
.library-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 2rem;
}
.bookshelf {
  margin-bottom: 3rem;
  padding: 1rem;
  background: #13293d;
  border-radius: 15px;
}
.shelf-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid #1e3a5f;
  padding-bottom: 0.5rem;
}
.book-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.book-card {
  background: #1e3a5f;
  border-radius: 10px;
  text-align: center;
  width: 150px;
  overflow: hidden;
  color: white;
  text-decoration: none;
  transition: transform 0.3s, box-shadow 0.3s;
}
.book-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.4);
}
.book-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
.book-title {
  padding: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
}
.external-links {
  text-align: center;
  margin-top: 2rem;
}
.external-btn {
  background-color: #1c7ed6;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  color: white;
  text-decoration: none;
  font-weight: bold;
  transition: background 0.3s ease;
}
.external-btn:hover {
  background-color: #339af0;
}
</style>