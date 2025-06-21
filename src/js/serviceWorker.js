if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/link-inv-gen/sw.js')
    .then(() => console.log('✅ Service Worker terdaftar!'))
    .catch((err) => console.error('❌ Gagal daftar SW:', err));
}
