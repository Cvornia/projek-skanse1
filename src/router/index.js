import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Absensi from '../views/Absensi.vue'
import Kehadiran from '../views/Kehadiran.vue'
import Nilai from '../views/Nilai.vue'
import Survey from '../views/Survey.vue'
import Evaluasi from '../views/Evaluasi.vue'
import Game from '../views/Game.vue'
import Ekstrakurikuler from '../views/Ekstrakurikuler.vue'
import Perpustakaan from '../views/Perpustakaan.vue'
import BookReader from '../views/BookReader.vue' // Tetap gunakan BookReader

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/absensi', name: 'Absensi', component: Absensi },
  { path: '/kehadiran', name: 'Kehadiran', component: Kehadiran },
  { path: '/nilai', name: 'Nilai', component: Nilai },
  { path: '/survey', name: 'Survey', component: Survey },
  { path: '/evaluasi', name: 'Evaluasi', component: Evaluasi },
  { path: '/game', name: 'Game', component: Game },
  { path: '/ekstrakurikuler', name: 'Ekstrakurikuler', component: Ekstrakurikuler },
  { path: '/perpustakaan', name: 'Perpustakaan', component: Perpustakaan },
  { path: '/perpustakaan/buku/:id', name: 'BookReader', component: BookReader, props: true }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
