<template>
  <section v-if="accessGranted" class="absensi-page">
    <!-- Konten absensi seperti sebelumnya -->
    <div class="attendance-container">
      <header class="attendance-header">
        <h1 class="attendance-title">Sistem Presensi Digital</h1>
        <p class="attendance-subtitle">Rekam Kehadiran Harian Siswa & Guru</p>
        <div class="header-decoration"></div>
      </header>

      <div class="table-wrapper">
        <table class="attendance-table">
          <thead>
            <tr>
              <th class="name-column">Nama Peserta</th>
              <th class="rank-column">kelas/jurusan</th>
              <th v-for="day in days" :key="day" class="day-column">{{ day }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(person, index) in people" :key="index" :class="{'present-row': isRowHighlighted(person)}">
              <td class="name-cell">{{ person.name }}</td>
              <td class="rank-cell">{{ person.rank }}</td>
              <td v-for="(day, dayIndex) in days" :key="dayIndex" class="attendance-cell">
                <label class="attendance-toggle">
                  <input type="checkbox" v-model="person.attendance[dayIndex]" @change="handleAttendanceChange" />
                  <span class="toggle-slider"></span>
                </label>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="attendance-footer">
        <div class="attendance-summary">
          <div class="summary-item">
            <span class="summary-label">Total Hadir:</span>
            <span class="summary-value">{{ selectedPeople.length }}</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">Total Peserta:</span>
            <span class="summary-value">{{ people.length }}</span>
          </div>
        </div>

        <div class="action-buttons">
          <button @click="submitAttendance" class="submit-btn" :disabled="!canSubmitAttendance || loading">
            <span v-if="loading">
              <i class="fas fa-spinner fa-spin"></i> Memproses...
            </span>
            <span v-else>
              <i class="fas fa-paper-plane"></i> Simpan Presensi
            </span>
          </button>

          <router-link to="/" class="back-link">
            <i class="fas fa-arrow-left"></i> Kembali
          </router-link>
        </div>

        <div v-if="notifMessage" :class="['notification', notifSuccess ? 'success' : 'error']">
          <i :class="notifSuccess ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'"></i>
          {{ notifMessage }}
        </div>
      </div>
    </div>
  </section>

  <!-- Modal Sandi -->
  <div v-else class="modal-overlay">
    <div class="modal-content">
      <h3>Masukkan Sandi</h3>
      <input type="password" v-model="passwordInput" placeholder="Sandi" />
      <div class="modal-buttons">
        <button @click="verifyPassword">Masuk</button>
        <button @click="cancelAccess">Batal</button>
      </div>
      <p v-if="wrongPassword" class="error-text">Sandi salah. Coba lagi.</p>
    </div>
  </div>
</template>

<script>
import PocketBase from 'pocketbase';
const pb = new PocketBase('https://pocketbase-railway-production-83c8.up.railway.app');

export default {
  name: 'AbsensiPage',
  data() {
    return {
      accessGranted: false,
      passwordInput: '',
      wrongPassword: false,

      days: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum'],
      people: [
      { name: 'ABD. RAHMAN FAIZ', rank: 'X TJKT', attendance: [false, false, false, false, false] },
  { name: 'AHMAD ADHYAKSA SAHAR', rank: 'X TJKT', attendance: [false, false, false, false, false] },
  { name: 'ANDIKA', rank: 'X TJKT ', attendance: [false, false, false, false, false] },
  { name: 'BAYU SAPUTRA', rank: 'X TJKT', attendance: [false, false, false, false, false] },
  { name: 'INCE WALDI RAHMATULLAH', rank: 'X TJKT', attendance: [false, false, false, false, false] },
  { name: 'MUH. ALFIAN SYAM', rank: 'X TJKT', attendance: [false, false, false, false, false] },
  { name: 'MUHAMMAD HAUZAN IRHAB', rank: 'X TJKT', attendance: [false, false, false, false, false] },
  { name: 'M. JIBRIL MAULANA', rank: 'X TJKT ', attendance: [false, false, false, false, false] },
  { name: 'MUH. MAILI NASHIRUL HAQ', rank: 'X TJKT', attendance: [false, false, false, false, false] },
  { name: 'M. RADITYA IRAWAN', rank: 'X TJKT', attendance: [false, false, false, false, false] },
  { name: 'MUHAMMAD RIDHO', rank: 'X TJKT', attendance: [false, false, false, false, false] },
  { name: 'MUH. SYAHRUL', rank: 'X TJKT ', attendance: [false, false, false, false, false] },
  { name: 'MUHAMMAD YASSIR FAIRUZ', rank: 'X TJKT', attendance: [false, false, false, false, false] },
  { name: 'RAHMAT EFENDY', rank: 'X TJKT', attendance: [false, false, false, false, false] },
  { name: 'RIANK SAPUTRA', rank: 'X TJKT', attendance: [false, false, false, false, false] },
  { name: 'NUR AZIZAH', rank: 'X TJKT', attendance: [false, false, false, false, false] },
  { name: 'NUR AIDA', rank: 'X TJKT ', attendance: [false, false, false, false, false] },
  { name: 'NUR HASISAH', rank: 'X TJKT', attendance: [false, false, false, false, false] },
  { name: 'RIRIN DWI YANTI', rank: 'X TJKT', attendance: [false, false, false, false, false] },
  { name: 'ALFINO', rank: 'X AKUNTANSI', attendance: [false, false, false, false, false] },
  { name: 'IMRAN SYAHREZA', rank: 'X AKUNTANSI', attendance: [false, false, false, false, false] },
  { name: 'MUH ALIF PUTRA RAMADAN', rank: 'X AKUNTANSI ', attendance: [false, false, false, false, false] },
  { name: 'MUH. NAUFAL ARKAN PUTRA', rank: 'X AKUNTANSI', attendance: [false, false, false, false, false] },
  { name: 'RAHMAN', rank: 'X AKUNTANSI', attendance: [false, false, false, false, false] },
  { name: 'WAWAN', rank: 'X AKUNTANSI', attendance: [false, false, false, false, false] },
  { name: 'ADINDA SUFRIADI', rank: 'X AKUNTANSI', attendance: [false, false, false, false, false] },
  { name: 'ANANDA ZULFA', rank: 'X AKUNTANSI', attendance: [false, false, false, false, false] },
  { name: 'ALISCA AULYA', rank: 'X AKUNTANSI ', attendance: [false, false, false, false, false] },
  { name: 'DEWI PARAMITHA', rank: 'X AKUNTANSI', attendance: [false, false, false, false, false] },
  { name: 'FEBY AULYA SAFITRI', rank: 'X AKUNTANSI', attendance: [false, false, false, false, false] },
  { name: 'JESSICA PATRISYA', rank: 'X AKUNTANSI', attendance: [false, false, false, false, false] },
  { name: 'JUMMILDAWATI ABBAS', rank: 'X AKUNTANSI', attendance: [false, false, false, false, false] },
  { name: 'KEYSA', rank: 'X AKUNTANSI', attendance: [false, false, false, false, false] },
  { name: 'NAILA ALYA SALSABILA', rank: 'X AKUNTANSI', attendance: [false, false, false, false, false] },
  { name: 'NUR ANNISYA', rank: 'X AKUNTANSI', attendance: [false, false, false, false, false] },
  { name: 'NUR AULIA', rank: 'X AKUNTANSI', attendance: [false, false, false, false, false] },
  { name: 'RASNA IDRIS', rank: 'X AKUNTANSI ', attendance: [false, false, false, false, false] },
  { name: 'RIMA MELATI', rank: 'X AKUNTANSI', attendance: [false, false, false, false, false] },
  { name: 'VALENTINA FEBRIANTI', rank: 'X AKUNTANSI', attendance: [false, false, false, false, false] },
  { name: 'ZAHRA AFIFAH. H', rank: 'X AKUNTANSI', attendance: [false, false, false, false, false, false] },
  { name: 'ALFIAN', rank: 'X APHPi', attendance: [false, false, false, false, false] },
  { name: 'ARHAM HIDAYAT', rank: 'X APHPi', attendance: [false, false, false, false, false] },
  { name: 'ANGGA SAPUTRA', rank: 'X APHPi', attendance: [false, false, false, false, false] },
  { name: 'ADE RAHMAN MAULANA', rank: 'X APHPi', attendance: [false, false, false, false, false] },
  { name: 'MUHAMMAD ADIL PRAKASA', rank: 'X APHPi', attendance: [false, false, false, false, false] },
  { name: 'MUH. RIDHO', rank: 'X APHPi', attendance: [false, false, false, false, false] },
  { name: 'KAIZAR', rank: 'X APHPi', attendance: [false, false, false, false, false] },
  { name: 'RIDWAN MAULANA', rank: 'X APHPi', attendance: [false, false, false, false, false] },
  { name: 'SAPARUDDIN', rank: 'X APHPi ', attendance: [false, false, false, false, false] },
  { name: 'HALIMAH TUSA DIYAH', rank: 'X APHPi', attendance: [false, false, false, false, false] },
  { name: 'NURUL RAMADANI', rank: 'X APHPi', attendance: [false, false, false, false, false] },
  { name: 'YULI ASRIANI', rank: 'X APHPi', attendance: [false, false, false, false, false, false] },
  { name: 'AKSAN JAYA', rank: 'X APL', attendance: [false, false, false, false, false] },
  { name: 'ARMAN MAULANA', rank: 'X APL', attendance: [false, false, false, false, false] },
  { name: 'DIKA ABDUL AZIZ', rank: 'X APL ', attendance: [false, false, false, false, false] },
  { name: 'MUH.RAIHAN RAMADHAN', rank: 'X APL', attendance: [false, false, false, false, false] },
  { name: 'KARTINI', rank: 'X APL', attendance: [false, false, false, false, false] },
  { name: 'SITTI NUR AISYAH', rank: 'X APL', attendance: [false, false, false, false, false, false] },
  { name: 'RAISYA PUTRI. S', rank: 'X APL', attendance: [false, false, false, false, false, false] },
  { name: 'ANDI AFRISAL', rank: 'X APL', attendance: [false, false, false, false, false, false] },
  { name: 'ABDUL KAHAR MUZAKKAR', rank: 'XI TJKT 1', attendance: [false, false, false, false, false] },
  { name: 'ANDI MUHAMMAD NAYLENDRA', rank: 'XI TJKT 1 ', attendance: [false, false, false, false, false] },
  { name: 'AZIS ZULAIMAN NUR', rank: 'XI TJKT 1', attendance: [false, false, false, false, false] },
  { name: 'GIFFARI ADITYAH FAUZAN', rank: 'XI TJKT 1', attendance: [false, false, false, false, false] },
  { name: 'MUH. ALDY DEWA', rank: 'XI TJKT 1', attendance: [false, false, false, false, false] },
  { name: 'MUHAMMAD AIDI FIRDAUS', rank: 'XI TJKT 1 ', attendance: [false, false, false, false, false] },
  { name: 'MUH KHAERIL AMRI', rank: 'XI TJKT 1', attendance: [false, false, false, false, false] },
  { name: 'MUH. NUR KHOLIZ FAIZ', rank: 'XI TJKT 1', attendance: [false, false, false, false, false] },
  { name: 'MUHAMMAD TAUFIQ', rank: 'XI TJKT 1', attendance: [false, false, false, false, false] },
  { name: 'MUHAMMAD SAHRIL', rank: 'XI TJKT 1', attendance: [false, false, false, false, false] },
  { name: 'SETIARKI SASTRA SAPUTRA', rank: 'XI TJKT 1', attendance: [false, false, false, false, false] },
  { name: 'SURYA ADI SAPUTRA', rank: 'XI TJKT 1 ', attendance: [false, false, false, false, false] },
  { name: 'DZAKIRAH', rank: 'XI TJKT 1', attendance: [false, false, false, false, false] },
  { name: 'LUTFIAH MAULIDAH', rank: 'XI TJKT 1', attendance: [false, false, false, false, false] },
  { name: 'MAURA RESKY MAULIDA', rank: 'XI TJKT 1', attendance: [false, false, false, false, false] },
  { name: 'NUR AMALIA FITRI', rank: 'XI TJKT 1', attendance: [false, false, false, false, false] },
  { name: 'SEINA PUTRY JELITA', rank: 'XI TJKT 1', attendance: [false, false, false, false, false] },
  { name: 'SUCI RAMADANY KH', rank: 'XI TJKT 1', attendance: [false, false, false, false, false] },
  { name: 'A. BERKAH MULYA AGUNG', rank: 'XI TJKT 2', attendance: [false, false, false, false, false] },
  { name: 'ADAM SAKTI KAI', rank: 'XI TJKT 2', attendance: [false, false, false, false, false] },
  { name: 'ARYHA RAJA FIRMANSYAH', rank: 'XI TJKT 2', attendance: [false, false, false, false, false] },
  { name: 'HELMI KURNIAWAN', rank: 'XI TJKT 2', attendance: [false, false, false, false, false] },
  { name: 'IKBAL ANDIKA SAPUTRA', rank: 'XI TJKT 2', attendance: [false, false, false, false, false] },
  { name: 'MUHAMMAD FAREL MAULIANRI', rank: 'XI TJKT 2', attendance: [false, false, false, false, false] },
  { name: 'MUHAMMAD ISNAN RISWANDI', rank: 'XI TJKT 2', attendance: [false, false, false, false, false] },
  { name: 'MUH. REIHAN', rank: 'XI TJKT 2', attendance: [false, false, false, false, false] },
  { name: 'DILLA AMLIA', rank: 'XI TJKT 2', attendance: [false, false, false, false, false] },
  { name: 'DIRGAHAYU PUTRI', rank: 'XI TJKT 2', attendance: [false, false, false, false, false] },
  { name: 'FADILAH DWI PUTRI', rank: 'XI TJKT 2', attendance: [false, false, false, false, false] },
  { name: 'INCE SATRIANI BINTANG', rank: 'XI TJKT 2', attendance: [false, false, false, false, false] },
  { name: 'NURUL ARISKA', rank: 'XI TJKT 2', attendance: [false, false, false, false, false] },
  { name: 'RHAYZA PUTRI NAVADYA MUCHTAR', rank: 'XI TJKT 2', attendance: [false, false, false, false, false] },
  { name: 'SYARIFAH AQIFAH NAYLA', rank: 'XI TJKT 2', attendance: [false, false, false, false, false] },
  { name: 'WAHYUNI', rank: 'XI TJKT 2', attendance: [false, false, false, false, false] },
  { name: 'NURUL NAZIFAH', rank: 'XI TJKT 2', attendance: [false, false, false, false, false] },
  { name: 'SAFIRA SUCIA DEWI', rank: 'XI TJKT 2', attendance: [false, false, false, false, false] },
  { name: 'A. DWI BATARI APRILIA', rank: 'XI TJKT 2', attendance: [false, false, false, false, false] },
  { name: 'A. MUH. FAJAR', rank: 'XI AKUNTANSI', attendance: [false, false, false, false, false] },
  { name: 'DESTI RUSLAN', rank: 'XI AKUNTANSI', attendance: [false, false, false, false, false] },
  { name: 'HERAWATI SYAM', rank: 'XI AKUNTANSI ', attendance: [false, false, false, false, false] },
  { name: 'INDRIANI', rank: 'XI AKUNTANSI', attendance: [false, false, false, false, false] },
  { name: 'INTAN WULANSARI', rank: 'XI AKUNTANSI', attendance: [false, false, false, false, false] },
  { name: 'KHUSNUL KHATIMAH', rank: 'XI AKUNTANSI', attendance: [false, false, false, false, false] },
  { name: 'MAGFIRATU IZZAH', rank: 'XI AKUNTANSI', attendance: [false, false, false, false, false] },
  { name: 'MAULIA', rank: 'XI AKUNTANSI', attendance: [false, false, false, false, false] },
  { name: 'NUR FADILAH', rank: 'XI AKUNTANSI ', attendance: [false, false, false, false, false] },
  { name: 'NUR FIANA', rank: 'XI AKUNTANSI', attendance: [false, false, false, false, false] },
  { name: 'SAFIRAH RAMADANI', rank: 'XI AKUNTANSI', attendance: [false, false, false, false, false] },
  { name: 'SRI WILDA WATI', rank: 'XI AKUNTANSI', attendance: [false, false, false, false, false] },
  { name: 'SYAMSINAR RAHAYU PUTRI', rank: 'XI AKUNTANSI', attendance: [false, false, false, false, false] },
  { name: 'DIAN PRATAMA T', rank: 'XI APHPi', attendance: [false, false, false, false, false] },
  { name: 'FHAREL RAMADHAN', rank: 'XI APHPi', attendance: [false, false, false, false, false] },
  { name: 'HAMZAH', rank: 'XI APHPi', attendance: [false, false, false, false, false] },
  { name: 'MUH. FAJAR FADILLAH KAHAR', rank: 'XI APHPi', attendance: [false, false, false, false, false] },
  { name: 'MUH. FARID', rank: 'XI APHPi', attendance: [false, false, false, false, false] },
  { name: 'NASRUNIL HAQ SYAIFUL', rank: 'XI APHPi', attendance: [false, false, false, false, false] },
  { name: 'A. REZKY IRAWAN', rank: 'XI APHPi', attendance: [false, false, false, false, false] },
  { name: 'ARSYANDA', rank: 'XI APHPi', attendance: [false, false, false, false, false] },
  { name: 'DZAKIYAH', rank: 'XI APHPi ', attendance: [false, false, false, false, false] },
  { name: 'MIRAH ', rank: 'XI APHPi', attendance: [false, false, false, false, false] },
  { name: 'SUCI CAHAYA ', rank: 'XI APHPi', attendance: [false, false, false, false, false] },
  { name: 'M. ALIF AL IKHSAN ABBAS', rank: 'XI APL', attendance: [false, false, false, false, false, false] },
  { name: 'MUH. ILHAM', rank: 'XI APL', attendance: [false, false, false, false, false, false] },
  { name: 'ANDI MMUH FAJAR', rank: 'XI APL', attendance: [false, false, false, false, false, false] },
  { name: 'SAFIRA', rank: 'XI APL', attendance: [false, false, false, false, false, false] },
  { name: 'ULFA INSYIRAH NUD AH', rank: 'XI APL', attendance: [false, false, false, false, false, false] },
  { name: 'FADILA', rank: 'XI APL', attendance: [false, false, false, false, false, false] },
  { name: 'AL MALIKUL MULQI', rank: 'XII TJKT 1', attendance: [false, false, false, false, false] },
  { name: 'ANDI FAIZ MUHAMMAD LUTFHI', rank: 'XII TJKT 1 ', attendance: [false, false, false, false, false] },
  { name: 'ANJAS', rank: 'XII TJKT 1', attendance: [false, false, false, false, false] },
  { name: 'ARHAN ABDI NUGRAHA', rank: 'XII TJKT 1', attendance: [false, false, false, false, false] },
  { name: 'AWAL SAPUTRA M', rank: 'XII TJKT 1', attendance: [false, false, false, false, false] },
  { name: 'FAHRI ARDIANSYAH', rank: 'XII TJKT 1 ', attendance: [false, false, false, false, false] },
  { name: 'INCE ARMIN ASBAR', rank: 'XII TJKT 1', attendance: [false, false, false, false, false] },
  { name: 'KUSNADY', rank: 'XII TJKT 1', attendance: [false, false, false, false, false] },
  { name: 'MUH. AL-ADHIM ASRUL', rank: 'XII TJKT 1', attendance: [false, false, false, false, false] },
  { name: 'MUH. RAFLI RAMLI', rank: 'XII TJKT 1', attendance: [false, false, false, false, false] },
  { name: 'MUH. WAHYU', rank: 'XII TJKT 1', attendance: [false, false, false, false, false] },
  { name: 'MUHAMMAD ADITIYA PRATAMA', rank: 'XII TJKT 1 ', attendance: [false, false, false, false, false] },
  { name: 'MUHAMMAD NUR RAMADHAN', rank: 'XII TJKT 1', attendance: [false, false, false, false, false] },
  { name: 'MULIADI', rank: 'XII TJKT 1', attendance: [false, false, false, false, false] },
  { name: 'RIO PRATAMA', rank: 'XII TJKT 1', attendance: [false, false, false, false, false] },
  { name: 'UMAR', rank: 'XII TJKT 1', attendance: [false, false, false, false, false] },
  { name: 'VERYANZAH', rank: 'XII TJKT 1', attendance: [false, false, false, false, false] },
  { name: 'ZULFADLIL ADZIM', rank: 'XII TJKT 1', attendance: [false, false, false, false, false] },
  { name: 'ANDI AYU', rank: 'XII TJKT 1', attendance: [false, false, false, false, false] },
  { name: 'HANISA', rank: 'XII TJKT 1', attendance: [false, false, false, false, false] },
  { name: 'NUR AURA AWALIAH', rank: 'XII TJKT 1', attendance: [false, false, false, false, false] },
  { name: 'RISMA AULIA SAHMAD', rank: 'XII TJKT 1', attendance: [false, false, false, false, false] },
  { name: 'SATRIANI', rank: 'XII TJKT 1', attendance: [false, false, false, false, false] },
  { name: 'ZASKIA', rank: 'XII TJKT 1', attendance: [false, false, false, false, false] },
  { name: 'AIRIN RAHMI DIYANI', rank: 'XII AKUNTANSI', attendance: [false, false, false, false, false] },
  { name: 'ANNISA', rank: 'XII AKUNTANSI', attendance: [false, false, false, false, false] },
  { name: 'BIDASARI', rank: 'XII AKUNTANSI', attendance: [false, false, false, false, false] },
  { name: 'IZZATUL JANNAH', rank: 'XII AKUNTANSI', attendance: [false, false, false, false, false] },
  { name: 'JULIA ANASTASYA', rank: 'XII AKUNTANSI', attendance: [false, false, false, false, false] },
  { name: 'KHAERUNNISA MUTMAINNAH', rank: 'XII AKUNTANSI', attendance: [false, false, false, false, false] },
  { name: 'NOVI AULIA RAMADHANI', rank: 'XII AKUNTANSI', attendance: [false, false, false, false, false] },
  { name: 'REZKY ADINDA PUTRI', rank: 'XII AKUNTANSI', attendance: [false, false, false, false, false] },
  { name: 'RIKA RAHMAWATI', rank: 'XII AKUNTANSI', attendance: [false, false, false, false, false] },
  { name: 'JUMRIANA', rank: 'XII AKUNTANSI', attendance: [false, false, false, false, false] },
  { name: 'HANIPA', rank: 'XII AKUNTANSI', attendance: [false, false, false, false, false] },
  { name: 'TENRIOLA', rank: 'XII AKUNTANSI', attendance: [false, false, false, false, false] },
  { name: 'FAJAR ARDIANSYAH', rank: 'XII APHPi', attendance: [false, false, false, false, false] },
  { name: 'M. IBRAHIM AL- TUSI', rank: 'XII APHPi', attendance: [false, false, false, false, false] },
  { name: 'MUH. SABRI. M', rank: 'XII APHPi', attendance: [false, false, false, false, false] },
  { name: 'RAFLY REYHAN FIRMANSYAH', rank: 'XII APHPi ', attendance: [false, false, false, false, false] },
  { name: 'RESKI', rank: 'XII APHPi', attendance: [false, false, false, false, false] },
  { name: 'RIZAL ', rank: 'XII APHPi', attendance: [false, false, false, false, false] },
  { name: 'FEBRIAN SURYA JAYA', rank: 'XII APHPi', attendance: [false, false, false, false, false] },
  { name: 'NASRULLAH SYAMSUDDIN', rank: 'XII APHPi', attendance: [false, false, false, false, false] },
  { name: 'IKRAM', rank: 'XII APHPi', attendance: [false, false, false, false, false] },
  { name: 'TESAR ANANTA ADEPUTRA', rank: 'XII APHPi ', attendance: [false, false, false, false, false] },
  { name: 'AKMAL FADHIL', rank: 'XII APL', attendance: [false, false, false, false, false] },
  { name: 'ANUGRAH', rank: 'XII APL', attendance: [false, false, false, false, false] },
  { name: 'MUH. AL-FATUR REIHAN', rank: 'XII APL', attendance: [false, false, false, false, false] },
  { name: 'MUH. RAFLY FAJAR RAMADHAN', rank: 'XII APL', attendance: [false, false, false, false, false] },
  { name: 'MUH. ABIL ARHAM', rank: 'XII APL', attendance: [false, false, false, false, false] },
  { name: 'MUH. YUSRIL', rank: 'XII APL', attendance: [false, false, false, false, false] },
  { name: 'ARMINA', rank: 'XII APL', attendance: [false, false, false, false, false] },
  { name: 'ISMA', rank: 'XII APL', attendance: [false, false, false, false, false] },
  { name: 'JIHAN NUR INTAN AMALIAH', rank: 'XII APL', attendance: [false, false, false, false, false] },
  { name: 'MENTARI MUIS', rank: 'XII APL', attendance: [false, false, false, false, false] },
  { name: 'NURUL MAWADDAH', rank: 'XII APL', attendance: [false, false, false, false, false] },
  { name: 'SALWA JUNIAR', rank: 'XII APL', attendance: [false, false, false, false, false] },
  { name: 'SUCI AMILIAH.A', rank: 'XII APL', attendance: [false, false, false, false, false] },
      ],
      selectedPeople: [],
      loading: false,
      notifMessage: '',
      notifSuccess: true,
    };
  },
  computed: {
    canSubmitAttendance() {
      return this.selectedPeople.length > 0;
    }
  },
  methods: {
    verifyPassword() {
      const correctPassword = '12345'; // Ganti sesuai kebutuhan
      if (this.passwordInput === correctPassword) {
        this.accessGranted = true;
        this.wrongPassword = false;
      } else {
        this.wrongPassword = true;
      }
    },
    cancelAccess() {
      this.$router.push('/'); // Kembali ke home
    },
    handleAttendanceChange() {
      this.selectedPeople = this.people.filter(person => 
        person.attendance.some(attended => attended)
      );
    },
    async submitAttendance() {
      this.loading = true;
      this.notifMessage = '';

      const selectedData = this.selectedPeople.map(person => {
        const attendedDays = person.attendance
          .map((attended, idx) => attended ? this.days[idx] : null)
          .filter(day => day !== null);

        return {
          name: person.name,
          rank: person.rank,
          days: attendedDays
        };
      });

      try {
        for (const person of selectedData) {
          await pb.collection('absensi').create(person);
        }
        this.notifMessage = 'Data presensi berhasil disimpan!';
        this.notifSuccess = true;
        this.resetAttendance();
      } catch (error) {
        console.error(error);
        this.notifMessage = 'Gagal menyimpan presensi.';
        this.notifSuccess = false;
      } finally {
        this.loading = false;
      }
    },
    resetAttendance() {
      this.people.forEach(person => {
        person.attendance = [false, false, false, false, false];
      });
      this.selectedPeople = [];
    },
    isRowHighlighted(person) {
      return person.attendance.includes(true);
    }
  }
};
</script>

<style scoped>
/* Tambahan untuk modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  text-align: center;
}
.modal-buttons {
  margin-top: 1rem;
  display: flex;
  justify-content: space-around;
}
.modal-buttons button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.modal-buttons button:first-child {
  background-color: #4a6bff;
  color: white;
}
.modal-buttons button:last-child {
  background-color: #e53e3e;
  color: white;
}
.error-text {
  color: red;
  margin-top: 0.5rem;
}

/* Tetap gunakan stylE */

.absensi-page {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f7fa;
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.attendance-container {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 1200px;
  overflow: hidden;
}

.attendance-header {
  background: linear-gradient(135deg, #4a6bff, #6a11cb);
  color: white;
  padding: 1.5rem 2rem;
  position: relative;
}

.attendance-title {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 600;
}

.attendance-subtitle {
  margin: 0.5rem 0 0;
  font-size: 1rem;
  opacity: 0.9;
}

.header-decoration {
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 100%;
  height: 20px;
  background-color: white;
  clip-path: polygon(0 0, 100% 0, 100% 10px, 0 100%);
}

.table-wrapper {
  padding: 1.5rem;
  overflow-x: auto;
}

.attendance-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 0.95rem;
}

.attendance-table th {
  background-color: #f8f9fc;
  color: #4a5568;
  font-weight: 600;
  text-align: left;
  padding: 1rem;
  border-bottom: 2px solid #e2e8f0;
  position: sticky;
  top: 0;
}

.attendance-table td {
  padding: 1rem;
  border-bottom: 1px solid #edf2f7;
  vertical-align: middle;
}

.name-column {
  width: 25%;
  min-width: 180px;
}

.rank-column {
  width: 30%;
  min-width: 200px;
}

.day-column {
  width: 9%;
  min-width: 70px;
  text-align: center !important;
}

.name-cell {
  font-weight: 500;
  color: #2d3748;
}

.rank-cell {
  color: #4a5568;
}

.attendance-cell {
  text-align: center;
}

.present-row {
  background-color: #f0f9ff;
}

.attendance-toggle {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 26px;
}

.attendance-toggle input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #e2e8f0;
  transition: .4s;
  border-radius: 34px;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .toggle-slider {
  background-color: #48bb78;
}

input:checked + .toggle-slider:before {
  transform: translateX(24px);
}

.attendance-footer {
  padding: 1.5rem;
  border-top: 1px solid #e2e8f0;
  background-color: #f8fafc;
}

.attendance-summary {
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
}

.summary-item {
  display: flex;
  align-items: center;
}

.summary-label {
  color: #4a5568;
  margin-right: 0.5rem;
}

.summary-value {
  font-weight: 600;
  color: #2d3748;
  font-size: 1.1rem;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.submit-btn {
  background-color: #4a6bff;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.submit-btn:hover:not(:disabled) {
  background-color: #3a56e8;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(74, 107, 255, 0.2);
}

.submit-btn:disabled {
  background-color: #cbd5e0;
  cursor: not-allowed;
}

.back-link {
  color: #4a5568;
  text-decoration: none;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.back-link:hover {
  background-color: #edf2f7;
  color: #2d3748;
}

.notification {
  margin-top: 1.5rem;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.notification.success {
  background-color: #f0fff4;
  color: #38a169;
  border: 1px solid #c6f6d5;
}

.notification.error {
  background-color: #fff5f5;
  color: #e53e3e;
  border: 1px solid #fed7d7;
}

@media (max-width: 768px) {
  .absensi-page {
    padding: 1rem;
  }
  
  .attendance-header {
    padding: 1rem;
  }
  
  .attendance-title {
    font-size: 1.5rem;
  }
  
  .table-wrapper {
    padding: 0.5rem;
  }
  
  .attendance-table th,
  .attendance-table td {
    padding: 0.75rem 0.5rem;
    font-size: 0.85rem;
  }
  
  .action-buttons {
    flex-direction: column;
    align-items: stretch;
  }
  
  .submit-btn,
  .back-link {
    justify-content: center;
  }
}

</style>