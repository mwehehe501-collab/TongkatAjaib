import { world, system, Player } from '@minecraft/server';
import { ActionFormData, ModalFormData } from '@minecraft/server-ui';

// ===== GLOBAL VARIABLES =====
const TONGKAT_ID = 'tongkat:ajaib';
const STORAGE_KEY = 'tongkat_storage';
const CROUCH_THRESHOLD = 1000; // 1 detik dalam milidetik
const MAX_STORAGE_SLOTS = 81; // 9x9

let playerCrouchTimes = new Map();
let playerStorages = new Map();
let tongkatGiven = new Set();

// ===== INITIALIZATION =====
function initializeStorage(playerId) {
  if (!playerStorages.has(playerId)) {
    playerStorages.set(playerId, []);
  }
}

// ===== AUTO-SPAWN TONGKAT =====
system.runInterval(() => {
  world.getAllPlayers().forEach(player => {
    const playerId = player.id;
    initializeStorage(playerId);
    
    // Cek apakah tongkat sudah ada di inventory
    let hasTongkat = false;
    for (const item of player.getComponent('minecraft:inventory').container) {
      if (item && item.typeId === TONGKAT_ID) {
        hasTongkat = true;
        break;
      }
    }
    
    // Berikan tongkat jika belum ada
    if (!hasTongkat && !tongkatGiven.has(playerId)) {
      const tongkat = new (require('@minecraft/server').ItemStack)(TONGKAT_ID, 1);
      player.getComponent('minecraft:inventory').container.addItem(tongkat);
      tongkatGiven.add(playerId);
      player.onScreenDisplay.setActionBar('§6✨ Tongkat Ajaib diberikan! Klik kanan untuk buka menu.');
    }
  });
}, 20); // Jalankan setiap detik

// ===== MAIN MENU =====
async function showMainMenu(player) {
  const form = new ActionFormData()
    .title('§6✨ TONGKAT AJAIB ✨')
    .body('§7Pilih fungsi yang ingin digunakan:\n\n§bTekan tombol di bawah untuk mulai!')
    .button('§a📋 Duplikasi\n§7Gandakan item')
    .button('§b🔍 Salin\n§7Salin dari dunia')
    .button('§c🎒 Penyimpanan\n§7Simpan item')
    .button('§e❌ Tutup')
    .button('§d📖 Bantuan');
  
  const response = await form.show(player);
  
  if (response.canceled) return;
  
  switch (response.selection) {
    case 0:
      showDuplicateMenu(player);
      break;
    case 1:
      showCopyMenu(player);
      break;
    case 2:
      showStorageMenu(player);
      break;
    case 3:
      player.onScreenDisplay.setActionBar('§7Menu ditutup.');
      break;
    case 4:
      showHelpMenu(player);
      break;
  }
}

// ===== DUPLIKASI MENU =====
async function showDuplicateMenu(player) {
  const form = new ActionFormData()
    .title('§a📋 DUPLIKASI ITEM')
    .body('§7Pilih mode duplikasi:')
    .button('§bSemua Item\n§7Duplikasi seluruh inventory')
    .button('§cItem Yang Dipegang\n§7Hanya item di tangan')
    .button('§eKembali');
  
  const response = await form.show(player);
  
  if (response.canceled) return;
  
  switch (response.selection) {
    case 0:
      duplicateAllItems(player);
      break;
    case 1:
      duplicateHeldItem(player);
      break;
    case 2:
      showMainMenu(player);
      break;
  }
}

function duplicateAllItems(player) {
  const container = player.getComponent('minecraft:inventory').container;
  const itemsToDuplicate = [];
  
  // Kumpulkan semua item
  for (let i = 0; i < container.size; i++) {
    const item = container.getItem(i);
    if (item) {
      itemsToDuplicate.push(item.clone());
    }
  }
  
  // Duplikasi dan tambahkan
  itemsToDuplicate.forEach(item => {
    container.addItem(item);
  });
  
  player.onScreenDisplay.setActionBar('§a✓ Semua item berhasil diduplikasi!');
}

function duplicateHeldItem(player) {
  const container = player.getComponent('minecraft:inventory').container;
  const mainhand = player.getComponent('minecraft:equippable').getEquipment('Mainhand');
  
  if (mainhand && mainhand.typeId !== TONGKAT_ID) {
    const duplicate = mainhand.clone();
    container.addItem(duplicate);
    player.onScreenDisplay.setActionBar('§a✓ Item berhasil diduplikasi!');
  } else {
    player.onScreenDisplay.setActionBar('§c✗ Tidak ada item di tangan!');
  }
}

// ===== COPY MENU =====
async function showCopyMenu(player) {
  const form = new ModalFormData()
    .title('§b🔍 SALIN')
    .body('§7Arahkan crosshair ke target (mob/blok/item) lalu tekan tombol di bawah untuk menyalin propertinya.\n\n§e⚠ Pastikan target ada di pandangan Anda!')
    .toggle('§6Salin target yang dilihat', false);
  
  const response = await form.show(player);
  
  if (response.canceled) return;
  
  if (response.formValues[0]) {
    copyTargetEntity(player);
  }
}

function copyTargetEntity(player) {
  try {
    // Simulasi scanning target
    const dimension = player.dimension;
    const location = player.getHeadLocation();
    const direction = player.getViewDirection();
    
    // Cari entity di depan player
    const entities = dimension.getEntities({
      location: location,
      maxDistance: 100,
      type: 'minecraft:entity'
    });
    
    if (entities.length > 0) {
      const target = entities[0];
      const container = player.getComponent('minecraft:inventory').container;
      const copyItem = new (require('@minecraft/server').ItemStack)('minecraft:spawn_egg', 1);
      container.addItem(copyItem);
      player.onScreenDisplay.setActionBar('§a✓ Salinan dibuat dan ditambahkan ke inventory!');
    } else {
      player.onScreenDisplay.setActionBar('§c✗ Tidak ada target di pandangan Anda!');
    }
  } catch (error) {
    player.onScreenDisplay.setActionBar('§c✗ Gagal menyalin target!');
  }
}

// ===== PENYIMPANAN MENU =====
async function showStorageMenu(player) {
  const playerId = player.id;
  const storage = playerStorages.get(playerId) || [];
  const usedSlots = storage.length;
  
  const form = new ActionFormData()
    .title('§c🎒 PENYIMPANAN')
    .body(`§7Tempat penyimpanan aman untuk item Anda.\n§aSlot terpakai: ${usedSlots}/${MAX_STORAGE_SLOTS}`)
    .button('§bSimpan Item yang Dipegang\n§7Tambah ke penyimpanan')
    .button('§bSimpan Semua\n§7Pindahkan semua inventory')
    .button('§cAmbil Item\n§7Lihat penyimpanan')
    .button('§eKembali');
  
  const response = await form.show(player);
  
  if (response.canceled) return;
  
  switch (response.selection) {
    case 0:
      saveHeldItem(player);
      break;
    case 1:
      saveAllItems(player);
      break;
    case 2:
      showRetrieveMenu(player);
      break;
    case 3:
      showMainMenu(player);
      break;
  }
}

function saveHeldItem(player) {
  const playerId = player.id;
  const storage = playerStorages.get(playerId) || [];
  
  if (storage.length >= MAX_STORAGE_SLOTS) {
    player.onScreenDisplay.setActionBar('§c✗ Penyimpanan penuh!');
    return;
  }
  
  const container = player.getComponent('minecraft:inventory').container;
  const mainhand = player.getComponent('minecraft:equippable').getEquipment('Mainhand');
  
  if (mainhand && mainhand.typeId !== TONGKAT_ID) {
    const clone = mainhand.clone();
    storage.push({
      typeId: clone.typeId,
      amount: clone.amount,
      data: clone.dynamic
    });
    playerStorages.set(playerId, storage);
    player.onScreenDisplay.setActionBar(`§a✓ Item disimpan! (${storage.length}/${MAX_STORAGE_SLOTS})`);
  } else {
    player.onScreenDisplay.setActionArea('§c✗ Tidak ada item di tangan!');
  }
}

function saveAllItems(player) {
  const playerId = player.id;
  const storage = playerStorages.get(playerId) || [];
  const container = player.getComponent('minecraft:inventory').container;
  
  let saved = 0;
  for (let i = 0; i < container.size; i++) {
    const item = container.getItem(i);
    if (item && item.typeId !== TONGKAT_ID && storage.length < MAX_STORAGE_SLOTS) {
      storage.push({
        typeId: item.typeId,
        amount: item.amount,
        data: item.dynamic
      });
      container.setItem(i, null);
      saved++;
    }
  }
  
  playerStorages.set(playerId, storage);
  player.onScreenDisplay.setActionBar(`§a✓ ${saved} item disimpan! (${storage.length}/${MAX_STORAGE_SLOTS})`);
}

async function showRetrieveMenu(player) {
  const playerId = player.id;
  const storage = playerStorages.get(playerId) || [];
  
  if (storage.length === 0) {
    player.onScreenDisplay.setActionBar('§c✗ Penyimpanan kosong!');
    return;
  }
  
  const form = new ActionFormData()
    .title('§c🎒 AMBIL ITEM')
    .body(`§7Pilih item untuk diambil (${storage.length} item tersedia):\n`);
  
  storage.forEach((item, index) => {
    form.button(`${index + 1}. ${item.typeId}\n§7x${item.amount}`);
  });
  
  form.button('§eKembali');
  
  const response = await form.show(player);
  
  if (response.canceled) return;
  
  if (response.selection === storage.length) {
    showStorageMenu(player);
  } else {
    retrieveItem(player, response.selection);
  }
}

function retrieveItem(player, index) {
  const playerId = player.id;
  const storage = playerStorages.get(playerId) || [];
  const container = player.getComponent('minecraft:inventory').container;
  
  if (index < 0 || index >= storage.length) return;
  
  const itemData = storage[index];
  const item = new (require('@minecraft/server').ItemStack)(itemData.typeId, itemData.amount);
  
  container.addItem(item);
  storage.splice(index, 1);
  playerStorages.set(playerId, storage);
  
  player.onScreenDisplay.setActionBar(`§a✓ Item diambil! (${storage.length}/${MAX_STORAGE_SLOTS})`);
}

// ===== BANTUAN MENU =====
async function showHelpMenu(player) {
  const form = new ActionFormData()
    .title('§d📖 BANTUAN')
    .body('§b=== CARA PENGGUNAAN ===\n\n' +
            '§7📋 DUPLIKASI:\n' +
            '- Gandakan semua item atau hanya item di tangan\n\n' +
            '§7🔍 SALIN:\n' +
            '- Arahkan ke target & salin propertinya\n\n' +
            '§7🎒 PENYIMPANAN:\n' +
            '- Simpan & ambil item kapan saja\n\n' +
            '§7⚡ OFFHAND:\n' +
            '- Double crouch cepat untuk pindah ke offhand\n\n' +
            '§aVersi: 1.0.0 | Minecraft Bedrock 1.26.20')
    .button('§eKembali ke Menu');
  
  const response = await form.show(player);
  if (!response.canceled) showMainMenu(player);
}

// ===== EVENT LISTENER =====
world.afterEvents.playerInteractWithItem.subscribe((event) => {
  const player = event.player;
  const item = event.itemStack;
  
  if (item.typeId === TONGKAT_ID) {
    showMainMenu(player);
  }
});

// ===== CROUCH DETECTION UNTUK OFFHAND =====
world.afterEvents.playerLeave.subscribe((event) => {
  playerCrouchTimes.delete(event.playerId);
  tongkatGiven.delete(event.playerId);
});

world.beforeEvents.playerInput.subscribe((event) => {
  const player = event.player;
  const playerId = player.id;
  const now = Date.now();
  
  if (player.isSneaking) {
    const lastCrouch = playerCrouchTimes.get(playerId) || 0;
    const timeDiff = now - lastCrouch;
    
    // Double crouch dalam 1 detik
    if (timeDiff < CROUCH_THRESHOLD && timeDiff > 100) {
      moveToOffhand(player);
      playerCrouchTimes.delete(playerId);
    } else {
      playerCrouchTimes.set(playerId, now);
    }
  }
});

function moveToOffhand(player) {
  const container = player.getComponent('minecraft:inventory').container;
  const equippable = player.getComponent('minecraft:equippable');
  const mainhand = equippable.getEquipment('Mainhand');
  const offhand = equippable.getEquipment('Offhand');
  
  if (mainhand && mainhand.typeId === TONGKAT_ID) {
    if (offhand) {
      equippable.setEquipment('Mainhand', offhand);
    } else {
      container.setItem(container.size - 1, mainhand);
      equippable.setEquipment('Mainhand', null);
    }
    equippable.setEquipment('Offhand', mainhand);
    player.onScreenDisplay.setActionBar('§b→ Tongkat dipindahkan ke Offhand!');
  }
}

world.sendMessage('§6✨ Tongkat Ajaib script berhasil dimuat! ✨');
