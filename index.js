// index.js
const cron = require('node-cron');
const { extraerTodosLosM3U8 } = require('./extraer');
const { exec } = require('child_process');

// Ejecutar al iniciar
extraerTodosLosM3U8();

// Ejecutar cada hora
cron.schedule('0 * * * *', () => {
  console.log('⏰ Ejecutando extracción automática...');
  extraerTodosLosM3U8();

  // Subir a GitHub automáticamente
  exec('npm run update', (err, stdout, stderr) => {
    if (err) {
      console.error('❌ Error al subir a GitHub:', stderr);
    } else {
      console.log('✅ Subido a GitHub automáticamente');
    }
  });
});
