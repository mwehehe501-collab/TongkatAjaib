# 📋 PANDUAN TESTING - Tongkat Ajaib v1.0.0

## 🚀 SETUP TESTING

### Langkah 1: Persiapan File
1. Pastikan folder structure sudah benar:
   ```
   TongkatAjaib/
   ├── behavior_pack/
   │   ├── manifest.json
   │   ├── items/
   │   └── scripts/
   ├── resource_pack/
   │   ├── manifest.json
   │   ├── textures/
   │   └── models/
   └── testing_results.md
   ```

2. **PENTING**: Tambahkan texture PNG di:
   - `resource_pack/textures/items/tongkat_ajaib.png` (16x16 atau 32x32 pixel)

### Langkah 2: Import ke Minecraft
1. Buka Minecraft Bedrock Edition v1.26.20
2. Pergi ke Settings → Global Resources
3. Import behavior_pack (folder)
4. Import resource_pack (folder)
5. Buat world baru dengan kedua pack di-enable

### Langkah 3: Enable Experimental Features
Pastikan enabled:
- ✅ Upcoming Creator Features
- ✅ Script API
- ✅ New Achievements

---

## ✅ TESTING CHECKLIST

### TEST 1: Auto-Spawn Tongkat
**Expected**: Tongkat otomatis muncul saat join/spawn

- [ ] Join world → Cek inventory
- [ ] Tongkat ada di inventory (slot kosong pertama)
- [ ] Tunggu 30 detik, tongkat tidak duplikat
- [ ] Respawn setelah mati → Tongkat ada lagi
- [ ] Hasil: PASS / FAIL
  
**Notes**: _______________

---

### TEST 2: Main Menu
**Expected**: Menu utama muncul saat klik kanan tongkat

- [ ] Klik kanan dengan tongkat di mainhand
- [ ] Menu ActionForm muncul di tengah layar
- [ ] Ada 5 button: Duplikasi, Salin, Penyimpanan, Tutup, Bantuan
- [ ] UI tidak lag/freeze
- [ ] Hasil: PASS / FAIL
  
**Notes**: _______________

---

### TEST 3: Duplikasi - Semua Item
**Expected**: Semua item di inventory ter-gandakan

**Setup**:
1. Kumpulkan 5 item berbeda di inventory
2. Catat jumlah masing-masing

**Test**:
- [ ] Buka menu Tongkat → Duplikasi → Semua Item
- [ ] Check inventory setelah duplikasi
- [ ] Semua item jumlahnya berlipat ganda
- [ ] Tongkat TIDAK ter-duplikasi
- [ ] Item dari add-on lain juga ter-duplikasi
- [ ] Hasil: PASS / FAIL
  
**Before**: Stone x10, Oak Log x5, Dirt x20
**After**: Stone x20, Oak Log x10, Dirt x40
**Notes**: _______________

---

### TEST 4: Duplikasi - Item yang Dipegang
**Expected**: Hanya item di mainhand yang ter-duplikasi

**Setup**:
1. Pegang item di mainhand (misal: Diamond x1)
2. Catat jumlahnya

**Test**:
- [ ] Buka menu Tongkat → Duplikasi → Item yang Dipegang
- [ ] Item di mainhand menjadi 2 (1 di tangan + 1 di inventory)
- [ ] Item lain di inventory TIDAK berubah
- [ ] Hasil: PASS / FAIL
  
**Before**: Diamond x1 (mainhand), Iron Ingot x10 (inventory)
**After**: Diamond x2, Iron Ingot x10
**Notes**: _______________

---

### TEST 5: Salin Target
**Expected**: Bisa menyalin entity dari dunia

**Setup**:
1. Spawn entity apapun di dekat player (misal: Pig)
2. Arahkan crosshair ke entity

**Test**:
- [ ] Buka menu Tongkat → Salin → Scan target
- [ ] Target entity terdeteksi
- [ ] Salinan ditambahkan ke inventory
- [ ] Inventory ada item baru
- [ ] Hasil: PASS / FAIL
  
**Target**: Pig
**Result**: Spawn egg muncul di inventory
**Notes**: _______________

---

### TEST 6: Penyimpanan - Simpan Item yang Dipegang
**Expected**: Item di mainhand disimpan ke storage

**Setup**:
1. Pegang item di mainhand (misal: Diamond x64)
2. Check slot penyimpanan kosong

**Test**:
- [ ] Buka menu → Penyimpanan → Simpan Item yang Dipegang
- [ ] Pesan sukses muncul: "Item disimpan! (1/81)"
- [ ] Item tetap di tangan (tidak hilang)
- [ ] Storage menunjukkan 1 slot terpakai
- [ ] Hasil: PASS / FAIL
  
**Item**: Diamond x64
**Storage**: 1/81
**Notes**: _______________

---

### TEST 7: Penyimpanan - Simpan Semua
**Expected**: Seluruh inventory disimpan, inventory jadi kosong

**Setup**:
1. Isi inventory dengan 10 item berbeda
2. Catat jumlahnya

**Test**:
- [ ] Buka menu → Penyimpanan → Simpan Semua
- [ ] Semua item hilang dari inventory
- [ ] Storage menunjukkan "10/81"
- [ ] Tongkat masih ada di inventory
- [ ] Hasil: PASS / FAIL
  
**Items Saved**: 10
**Storage**: 10/81
**Notes**: _______________

---

### TEST 8: Penyimpanan - Ambil Item
**Expected**: Bisa ngambil item dari storage

**Setup**:
1. Sudah simpan beberapa item sebelumnya
2. Storage punya item minimal 1

**Test**:
- [ ] Buka menu → Penyimpanan → Ambil Item
- [ ] List item di storage muncul
- [ ] Klik 1 item dari list
- [ ] Item muncul di inventory
- [ ] Storage counter berkurang
- [ ] Hasil: PASS / FAIL
  
**Retrieved**: Diamond x64
**Storage After**: 9/81
**Notes**: _______________

---

### TEST 9: Double Crouch - Move to Offhand
**Expected**: Double crouch cepat memindahkan tongkat ke offhand

**Setup**:
1. Tongkat di mainhand
2. Offhand kosong

**Test**:
- [ ] Press Crouch (Shift)
- [ ] Lepas dalam 0.5 detik
- [ ] Press Crouch lagi cepat
- [ ] Pesan muncul: "Tongkat dipindahkan ke Offhand!"
- [ ] Tongkat ada di offhand
- [ ] Klik kanan tetap bisa buka menu
- [ ] Hasil: PASS / FAIL
  
**Timing**: < 1 detik
**Result**: Tongkat di Offhand
**Notes**: _______________

---

### TEST 10: Compatibility Check
**Expected**: Tidak crash dengan add-on lain

**Setup**:
1. Enable beberapa add-on populer lainnya
2. Test dalam 5 menit gameplay

**Test**:
- [ ] Game tidak crash saat startup
- [ ] Tongkat tetap berfungsi normal
- [ ] Item dari add-on lain bisa diduplikasi
- [ ] Tidak ada error di console
- [ ] Hasil: PASS / FAIL
  
**Add-ons Tested**: _______________
**Errors**: _______________
**Notes**: _______________

---

### TEST 11: UI/UX Experience
**Expected**: Interface user-friendly dan responsif

**Test**:
- [ ] Menu muncul instant (< 500ms)
- [ ] Tidak ada lag saat buka/tutup menu
- [ ] Text readable dan warna-warna bagus
- [ ] Button responsif saat diklik
- [ ] Pesan action bar muncul dengan jelas
- [ ] Hasil: PASS / FAIL
  
**Response Time**: _____ ms
**UI Rating**: ⭐⭐⭐⭐⭐ / 5
**Notes**: _______________

---

### TEST 12: Storage Persistence
**Expected**: Data storage tetap saat quit/rejoin

**Setup**:
1. Simpan 5 item ke storage
2. Check storage menunjukkan "5/81"

**Test**:
- [ ] Save world
- [ ] Quit ke main menu
- [ ] Rejoin world
- [ ] Buka menu → Penyimpanan
- [ ] Storage masih menunjukkan "5/81"
- [ ] Semua item tetap ada
- [ ] Hasil: PASS / FAIL
  
**Before Quit**: 5/81
**After Rejoin**: 5/81
**Notes**: _______________

---

## 📊 SUMMARY HASIL TESTING

### Overall Status
- [ ] PASS - Semua fitur berfungsi normal
- [ ] PASS WITH NOTES - Berfungsi tapi ada catatan
- [ ] FAIL - Ada bug yang perlu diperbaiki

### Bug Found (jika ada)
1. **Bug Title**: _______________
   - Deskripsi: _______________
   - Severity: Critical / High / Medium / Low
   - Solution: _______________

2. **Bug Title**: _______________
   - Deskripsi: _______________
   - Severity: Critical / High / Medium / Low
   - Solution: _______________

### Improvements Needed
- [ ] _______________
- [ ] _______________
- [ ] _______________

### Performance Metrics
- Frame Rate: _____ FPS (Before / After)
- Load Time: _____ ms
- Memory Usage: _____ MB

### Tester Info
- **Name**: _______________
- **Date**: _______________
- **Minecraft Version**: 1.26.20
- **Device**: _______________

---

## 🔧 NEXT STEPS

1. **Jika PASS**: 
   - Publish ke marketplace
   - Announce ke community

2. **Jika PASS WITH NOTES**:
   - Fix issues yang dilaporkan
   - Re-test sebelum publish

3. **Jika FAIL**:
   - Analyze bugs
   - Update scripts/resources
   - Re-test dari awal

---

## 📝 NOTES

Gunakan area ini untuk catatan tambahan atau observations:

___________________________________________________________
___________________________________________________________
___________________________________________________________
___________________________________________________________
