<template>
  <nav class="top-navbar">
    <img src="@/assets/buras.png" alt="Logo Sekolah" class="logo-image" />

    <!-- Hamburger Button (Mobile only) -->
    <button class="hamburger" @click="toggleMenu">☰</button>

    <!-- Menu Links -->
    <ul :class="['menu-links', { show: isMenuOpen }]">
      <li><router-link to="/absensi">Absensi</router-link></li>
      <li><router-link to="/kehadiran">Kehadiran</router-link></li>
      <li><router-link to="/nilai">Nilai</router-link></li> <!-- Menu Nilai ditambahkan -->
      <li><router-link to="/survey">Survey</router-link></li>
      <li><router-link to="/evaluasi">Evaluasi</router-link></li>
      <li><router-link to="/game">Game</router-link></li>
      <li><router-link to="/ekstrakurikuler">Ekstrakurikuler</router-link></li>
      <li><router-link to="/perpustakaan">Perpustakaan</router-link></li>
    </ul>

    <div class="right">
      <router-link to="/" class="cta">Home</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'WixStyleNavbar',
  data() {
    return {
      isMenuOpen: false
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap');

.top-navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 16px 20px;
  color: #000;
  font-family: 'Poppins', sans-serif;
  border-bottom: 1px solid #eaeaea;
  position: sticky;
  top: 0;
  z-index: 1000;
  flex-wrap: wrap;
}

.logo-image {
  height: 40px;
  width: auto;
}

.hamburger {
  display: none;
  font-size: 1.8rem;
  background: none;
  border: none;
  color: #000;
  cursor: pointer;
  margin-left: auto;
}

.menu-links {
  display: flex;
  list-style: none;
  gap: 24px;
  padding: 0;
  margin: 0;
}

.menu-links a {
  color: #000;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 700;
  display: inline-block;
  transition: transform 0.3s ease, color 0.3s ease;
}

.menu-links a:hover {
  color: #0057ff;
  transform: scale(1.15);
}

.right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.cta {
  background-color: #0057ff;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  color: white;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  text-decoration: none;
  display: inline-block;
}

.cta:hover {
  background-color: #0040cc;
  transform: scale(1.1);
}

/* Responsive */
@media (max-width: 768px) {
  .menu-links {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    background-color: #fff;
    padding: 16px;
    z-index: 999;
    border-bottom: 1px solid #eee;
  }

  .menu-links.show {
    display: flex;
  }

  .menu-links li {
    margin: 10px 0;
  }

  .right {
    display: none;
  }

  .hamburger {
    display: block;
    position: absolute;
    right: 20px;
    top: 16px;
  }

  .top-navbar {
    padding: 12px 16px;
  }
}
</style>
