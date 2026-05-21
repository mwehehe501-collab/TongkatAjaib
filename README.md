# ✨ Tongkat Ajaib - Minecraft Bedrock Add-On v1.0.0

> **Magic Wand Add-On untuk Minecraft Bedrock Edition 1.26.20**

![Status](https://img.shields.io/badge/Status-Development-yellow)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![Minecraft](https://img.shields.io/badge/Minecraft-Bedrock%201.26.20-brightgreen)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🎯 Deskripsi

**Tongkat Ajaib** adalah add-on Minecraft Bedrock yang memberikan 3 fungsi magical kepada pemain:
- 🔄 **Duplikasi** - Gandakan item di inventory
- 🔍 **Salin** - Salin entity/blok dari dunia
- 🎒 **Penyimpanan** - Storage 81 slot yang persistent

Add-on ini didesain untuk gameplay yang fun dan tidak mengganggu mekanik vanilla maupun add-on lain.

---

## ⚡ Fitur Utama

### 1. UI Custom & Pengaktifan Tongkat ✨
- **UI Grid Modern** - Menu yang simpel tapi unik dengan ikon untuk setiap fitur
- **Auto-Spawn** - Tongkat otomatis muncul di inventory saat spawn/respawn
- **Cek Duplikasi** - Sistem cek agar tongkat tidak duplikat di inventory
- **Klik Kanan Menu** - Menu langsung muncul saat klik kanan tongkat

### 2. Perpindahan ke Offhand 🔄
- **Double Crouch** - Tekan crouch dua kali dalam 1 detik
- **Seamless Swap** - Tongkat langsung pindah ke offhand
- **Full Functionality** - Semua fitur tetap bekerja di offhand
- **Visual Feedback** - Pesan action bar saat perpindahan

### 3. Duplikasi Item 📋
- **Duplikasi Semua** - Gandakan seluruh isi inventory
- **Duplikasi Held** - Hanya gandakan item di mainhand
- **Kompatibel** - Bekerja dengan item vanilla dan add-on lain
- **Smart Detection** - Deteksi item berdasarkan internal name

### 4. Salin Item/Entity 🔍
- **Target Detection** - Arahkan crosshair ke target
- **Property Copy** - Salin semua properti (tipe, warna, atribut)
- **Universal** - Bekerja untuk mob, blok, dan item di dunia
- **Auto-Add** - Salinan langsung masuk inventory

### 5. Inventory Penyimpanan 🎒
- **81 Slot** - Penyimpanan 9x9 grid yang besar
- **Persistent** - Data tidak hilang saat mati/respawn
- **Easy Access** - Buka menu kapan saja
- **Dual Mode** - Simpan 1 item atau semua sekaligus

---

## 📦 Struktur Folder

```
TongkatAjaib/
├── behavior_pack/
│   ├── manifest.json           # Metadata pack
│   ├── items/
│   │   └── tongkat_ajaib.json # Item definition
│   └── scripts/
│       └── main.js             # Core logic (GameTest Framework)
├── resource_pack/
│   ├── manifest.json           # Metadata pack
│   ├── textures/
│   │   ├── item_texture.json  # Texture mapping
│   │   └── items/
│   │       └── tongkat_ajaib.png # Texture file (custom)
│   ├── models/
│   │   └── item/
│   │       └── tongkat_ajaib.json # 3D model
│   └── texts/
│       └── en_US.lang          # Language strings
├── TESTING_GUIDE.md            # Testing checklist
├── IMPROVEMENT_CHECKLIST.md    # Development roadmap
├── README.md                   # This file
└── .gitignore                  # Git ignore rules
```

---

## 🚀 Installation

### Requirement
- Minecraft Bedrock Edition v1.26.20+
- Experimental Features Enabled:
  - ✅ Upcoming Creator Features
  - ✅ Script API
  - ✅ New Achievements

### Steps

1. **Download Add-on**
   ```bash
   git clone https://github.com/mwehehe501-collab/TongkatAjaib.git
   ```

2. **Locate Behavior Pack**
   - Windows: `%APPDATA%\Microsoft\Windows\Start Menu\Programs\Minecraft\com.mojang\minecraftWorlds\YOUR_WORLD\behavior_packs`
   - Copy folder `behavior_pack` ke lokasi tersebut

3. **Locate Resource Pack**
   - Copy folder `resource_pack` ke resource packs directory yang sama

4. **Create World**
   - Buka Minecraft
   - Create New World
   - World Settings → Add-ons
   - Enable `Tongkat Ajaib Behavior Pack`
   - Enable `Tongkat Ajaib Resource Pack`
   - Create World

5. **Verify**
   - Spawn di dunia
   - Check inventory - Tongkat harus ada
   - Klik kanan → Menu harus muncul

---

## 📖 Cara Penggunaan

### Menu Utama
```
Klik Kanan dengan Tongkat
    ↓
┌─────────────────────────┐
│  ✨ TONGKAT AJAIB ✨   │
├─────────────────────────┤
│ 📋 DUPLIKASI           │ ← Gandakan item
│ 🔍 SALIN               │ ← Salin dari dunia
│ 🎒 PENYIMPANAN         │ ← Simpan/ambil item
│ ❌ TUTUP               │ ← Tutup menu
│ 📖 BANTUAN             │ ← Lihat bantuan
└─────────────────────────┘
```

### 1. Duplikasi Item
```
Menu Utama → Duplikasi
    ↓
Pilih Mode:
  • Semua Item      → Gandakan semua inventory
  • Item Dipegang   → Hanya gandakan item di tangan
    ↓
Item tertera jumlahnya berlipat ganda!
```

**Contoh**:
- Before: Diamond x10, Iron x20, Stone x30
- After: Diamond x20, Iron x40, Stone x60

### 2. Salin Item/Entity
```
Menu Utama → Salin
    ↓
Arahkan crosshair ke target (mob/blok/item)
    ↓
Klik "Salin Target"
    ↓
Salinan ditambahkan ke inventory!
```

**Support**:
- 🐷 Entities (Pig, Cow, Zombie, etc)
- 🧱 Blocks (Stone, Diamond, Custom blocks)
- 📦 Items (dari dunia)

### 3. Inventory Penyimpanan
```
Menu Utama → Penyimpanan
    ↓
Pilih Aksi:
  • Simpan Item Dipegang  → Simpan 1 item
  • Simpan Semua          → Simpan semua inventory
  • Ambil Item            → Ambil dari storage
    ↓
Item tersimpan permanen hingga diambil!
```

**Features**:
- 81 slot penyimpanan (9x9)
- Data persistent (tidak hilang saat mati)
- Support semua jenis item

### 4. Move to Offhand
```
1. Pegang tongkat di Mainhand
2. Press Crouch (Shift) + Lepas
3. Press Crouch lagi CEPAT (< 1 detik)
    ↓
Tongkat pindah ke Offhand!
   ↓
Klik kanan tetap bisa buka menu
```

**Tips**:
- Timing harus cepat (max 1 detik)
- Akan ada pesan: "Tongkat dipindahkan ke Offhand!"
- Di offhand juga bisa klik kanan

---

## 🧪 Testing

Untuk testing lengkap, lihat file **TESTING_GUIDE.md** yang berisi:
- Setup testing
- 12 test cases lengkap
- Checklist verifikasi
- Report template

**Quick Test**:
```bash
1. Join world
2. Check tongkat di inventory ✓
3. Klik kanan, menu muncul ✓
4. Duplikasi 1 item ✓
5. Simpan ke storage ✓
6. Salin entity ✓
7. All good! ✓
```

---

## 🔧 Fine-Tuning & Improvements

Untuk development roadmap dan checklist improvement, lihat **IMPROVEMENT_CHECKLIST.md**

**Planned Features**:
- [ ] Custom wand skins
- [ ] Sound effects
- [ ] Particle effects
- [ ] Advanced filters
- [ ] Settings menu
- [ ] Multiplayer support

---

## ⚙️ Konfigurasi

### Customize Storage Size
Edit `behavior_pack/scripts/main.js`:
```javascript
const MAX_STORAGE_SLOTS = 81; // Ubah ke nilai lain (misal: 128)
```

### Customize Crouch Timing
Edit timing untuk double-crouch:
```javascript
const CROUCH_THRESHOLD = 1000; // 1000ms = 1 detik
```

### Customize Item Name
Edit display name di `behavior_pack/items/tongkat_ajaib.json`:
```json
"minecraft:display_name": {
  "value": "§6✨ Tongkat Ajaib ✨"
}
```

---

## 🎨 Texture & Model

### Custom Texture
Untuk membuat texture custom:
1. Buat file PNG 16x16 atau 32x32 pixel
2. Save di: `resource_pack/textures/items/tongkat_ajaib.png`
3. Recommended colors:
   - Emas: #FFD700
   - Ungu: #9933FF
   - Highlight: #FFFFFF

### 3D Model
File model sudah ada di:
```
resource_pack/models/item/tongkat_ajaib.json
```

Edit menggunakan:
- Blockbench (recommended)
- Manual JSON editing
- Online model editors

---

## 🐛 Troubleshooting

### Tongkat tidak muncul di inventory
```
✓ Check: Pack sudah di-enable?
✓ Cek: Experimental features aktif?
✓ Solusi: Respawn atau restart world
```

### Menu tidak muncul saat klik kanan
```
✓ Check: Tongkat di mainhand?
✓ Cek: Script error di console?
✓ Solusi: Disable & re-enable pack
```

### Item tidak bisa disalin
```
✓ Check: Target di depan player?
✓ Cek: Crosshair di entity?
✓ Solusi: Lebih dekat ke target
```

### Storage tidak save
```
✓ Check: World sudah disave?
✓ Cek: Tidak ada script error?
✓ Solusi: Pastikan world mode Survival
```

---

## 📋 Compatibility

### ✅ Supported
- Minecraft Bedrock 1.26.20+
- Vanilla items & blocks
- Most add-ons
- Multiplayer (partial)
- Controller support

### ⚠️ Known Issues
- [ ] Multiplayer sync delay
- [ ] Some entity properties not copied
- [ ] Custom NBT data not fully supported

---

## 📝 Lisensi

Proyek ini menggunakan lisensi **MIT**. Lihat file LICENSE untuk detail lengkap.

---

## 🤝 Kontribusi

Kontribusi sangat diterima! Untuk berkontribusi:

1. Fork repository
2. Buat branch fitur baru (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 👨‍💻 Developer

**Made by**: mwehehe501-collab  
**Version**: 1.0.0  
**Last Updated**: 2026-05-21

---

## 📞 Support

- 🐛 **Report Bugs**: [GitHub Issues](https://github.com/mwehehe501-collab/TongkatAjaib/issues)
- 💡 **Suggest Features**: [GitHub Discussions](https://github.com/mwehehe501-collab/TongkatAjaib/discussions)
- 💬 **Contact**: Open Issue with `[QUESTION]` label

---

## 🙏 Terima Kasih

Terima kasih telah menggunakan **Tongkat Ajaib**! 

Jangan lupa:
- ⭐ Star repository ini
- 🔔 Watch untuk update terbaru
- 📢 Share dengan teman-teman

---

```
     ✨
     |
     |
    /|\
    / \\
   /   \\
✨ Tongkat Ajaib ✨
```

**Enjoy your magical journey! 🪄✨**
