<template>
  <div class="kp-container">
    <!-- Header -->
    <header class="kp-header">
      <h1>📊 Rekap Kehadiran Bulanan</h1>
      <button class="kp-btn" @click="loadData">🔄 Muat Ulang</button>
    </header>

    <!-- Filter Bulan & Tahun -->
    <div class="kp-filters">
      <label>Bulan:
        <select v-model="month" @change="loadData">
          <option v-for="m in 12" :key="m" :value="m">{{ m }}</option>
        </select>
      </label>
      <label>Tahun:
        <select v-model="year" @change="loadData">
          <option v-for="y in [2024, 2025, 2026]" :key="y" :value="y">{{ y }}</option>
        </select>
      </label>
    </div>

    <!-- Summary Cards -->
    <section class="kp-summary">
      <div class="kp-card">
        <h2>Total Siswa</h2>
        <p>{{ students.length }}</p>
      </div>
      <div class="kp-card">
        <h2>Rata-rata % Hadir</h2>
        <p>{{ averagePercent }}%</p>
      </div>
      <div class="kp-card">
        <h2>Top Hadir</h2>
        <p>{{ topPerformer.name }} ({{ topPerformer.persen }}%)</p>
      </div>
    </section>

    <!-- Bar Chart -->
    <section class="kp-chart" v-if="barSeries.length">
      <apexchart
        type="bar"
        :series="barSeries"
        :options="barOptions"
        height="280"
        class="fade-in"
      />
    </section>

    <!-- Kehadiran Table -->
    <section class="kp-table-wrapper fade-in">
      <table class="kp-table">
        <thead>
          <tr>
            <th>Nama</th>
            <th v-for="d in weekdays" :key="d">{{ d }}</th>
            <th>% Hadir</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="s in students" :key="s.name">
            <td class="name-cell">{{ s.name }}</td>
            <td v-for="d in weekdays" :key="d" class="text-center">
              <span :class="{'check': hasDay(s, d), 'cross': !hasDay(s, d)}">
                {{ hasDay(s, d) ? '✔️' : '❌' }}
              </span>
            </td>
            <td class="percent-cell">{{ s.persen }}%</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import ApexCharts from 'vue3-apexcharts'
import PocketBase from 'pocketbase'

export default {
  name: 'KehadiranPage',
  components: { apexchart: ApexCharts },
  setup() {
    const weekdays = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum']
    const students = ref([])
    const barSeries = ref([])
    const month = ref(new Date().getMonth() + 1) // 1-12
    const year = ref(new Date().getFullYear())

    const barOptions = {
      chart: { toolbar: { show: false } },
      plotOptions: { bar: { borderRadius: 4 } },
      xaxis: { categories: [] },
      colors: ['#3B82F6'],
      dataLabels: { enabled: false },
    }

    const loadData = async () => {
      const pb = new PocketBase('https://pocketbase-railway-production-83c8.up.railway.app')

      const allRecs = await pb.collection('absensi').getFullList({ sort: 'name' })

      const filtered = allRecs.filter(r => {
        const created = new Date(r.created)
        return (created.getMonth() + 1 === month.value && created.getFullYear() === year.value)
      })

      const map = {}
      filtered.forEach(r => {
        if (!map[r.name]) map[r.name] = { name: r.name, days: [] }
        map[r.name].days.push(...(r.days || []))
      })

      students.value = Object.values(map).map(s => {
        const hadirCount = new Set(s.days).size
        const persen = Math.round((hadirCount / weekdays.length) * 100)
        return { ...s, persen }
      })

      barSeries.value = [
        {
          name: '% Hadir',
          data: students.value.map(s => s.persen)
        }
      ]
      barOptions.xaxis.categories = students.value.map(s => s.name)
    }

    const hasDay = (s, d) => s.days.includes(d)

    const averagePercent = computed(() => {
      if (!students.value.length) return 0
      const total = students.value.reduce((acc, s) => acc + s.persen, 0)
      return Math.round(total / students.value.length)
    })

    const topPerformer = computed(() => {
      if (!students.value.length) return { name: '-', persen: 0 }
      return [...students.value].sort((a, b) => b.persen - a.persen)[0]
    })

    onMounted(loadData)

    return {
      weekdays, students, barSeries, barOptions,
      loadData, hasDay, averagePercent, topPerformer,
      month, year
    }
  }
}
</script>

<style scoped>
.kp-container {
  max-width: 1200px;
  margin: auto;
  padding: 1rem;
}
.kp-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.kp-btn {
  background: #3b82f6;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
}
.kp-filters {
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
}
.kp-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  margin: 1rem 0;
}
.kp-card {
  background: white;
  border-radius: 0.75rem;
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  text-align: center;
}
.kp-chart,
.kp-table-wrapper {
  background: white;
  border-radius: 0.75rem;
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 1rem;
}
.kp-table {
  width: 100%;
  border-collapse: collapse;
}
.kp-table th,
.kp-table td {
  padding: 0.75rem 1rem;
  text-align: left;
}
.kp-table thead {
  background: #e0f2fe;
}
.kp-table tbody tr:hover {
  background: #f0f9ff;
}
.name-cell {
  font-weight: 500;
  color: #1e3a8a;
}
.percent-cell {
  font-weight: bold;
  color: #1e40af;
  text-align: center;
}
.check {
  color: #10b981;
}
.cross {
  color: #ef4444;
}
.fade-in {
  animation: fadeIn 0.6s ease-out both;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
