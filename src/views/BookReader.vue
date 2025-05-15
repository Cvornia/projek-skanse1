<template>
  <div class="reader-container">
    <div class="header">
      <router-link to="/perpustakaan" class="back-btn">← Kembali ke Perpustakaan</router-link>
    </div>
    <h2 class="book-title">{{ book?.title }}</h2>

    <iframe
      v-if="book"
      :src="book.file"
      class="pdf-viewer"
      frameborder="0"
    ></iframe>
    <p v-else class="not-found">Buku tidak ditemukan.</p>
  </div>
</template>

<script>
export default {
  name: 'BooksReader',
  props: ['id'],
  data() {
    return {
      books: [
        { id: 1, title: 'piagam', file: '/file/piagam1.pdf' },
        { id: 2, title: 'piagam', file: '/file/piagam2.pdf' },
        { id: 3, title: 'soul land : black dragon', file: '/file/fiksi1.pdf' },
        { id: 4, title: 'berjuta kisah', file: '/file/cerpen full.pdf' },
        { id: 5, title: 'Paket Kelas 1', file: '/file/puisi_antologi.pdf' },
        { id: 6, title: 'Paket Kelas 2', file: '/file/paket2.pdf' },
        { id: 7, title: 'Paket Kelas 3', file: '/file/paket3.pdf' },
        { id: 8, title: 'puisi antologi', file: '/file/fiksi1.pdf' },
        { id: 9, title: 'star-embracing sword master', file: '/file/star1.pdf' },
        { id: 10, title: 'star-embracing sword master', file: '/file/SERT FP.pdf' },
        { id: 11, title: 'BAHASA INDONESIA X', file: '/file/X10/Bahasa-Indonesia-BG-KLS-X.pdf' },
        { id: 12, title: 'ENGGLISH X', file: '/file/X10/Bahasa-Inggris-BG-KLS-X.pdf' },
        { id: 14, title: 'alan bintang', file: '/file/X10/Alan Bintang Anak Laut.pdf' },
        { id: 15, title: 'awal pendakian', file: '/file/X10/Awal Pendakian.pdf' },
        { id: 16, title: 'ENGGLISH X', file: '/file/X10/Babi Sombong Dan Kuda Kurus.pdf' },
        { id: 17, title: 'ENGGLISH X', file: '/file/X10/Basisir Langit.pdf' },
        { id: 18, title: 'ENGGLISH X', file: '/file/X10/Batu Keinsyafan.pdf' },
        { id: 19, title: 'ENGGLISH X', file: '/file/X10/Bebek Dari Kakek.pdf' },
      ],
    };
  },
  computed: {
    book() {
      return this.books.find(b => b.id === parseInt(this.id));
    }
  }
};
</script>

<style scoped>
.reader-container {
  padding: 2rem;
  background: #f8f9fa;
  min-height: 100vh;
  font-family: 'Segoe UI', sans-serif;
}

.header {
  margin-bottom: 1rem;
}

.back-btn {
  text-decoration: none;
  color: #1c7ed6;
  font-weight: bold;
}

.book-title {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #212529;
}

.pdf-viewer {
  width: 100%;
  height: 80vh;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}

.not-found {
  color: red;
  font-weight: bold;
}
</style>
