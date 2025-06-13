const { exec } = require('child_process');
const cron = require('node-cron');
const path = require('path');

// Ejecutar extracción y subir a GitHub
function actualizarTodo() {
  try {
    console.log('🚀 Ejecutando extracción...');
    execSync('node extractor.js', { stdio: 'inherit' });

    console.log('📤 Subiendo a GitHub...');
    execSync('git add .', { stdio: 'inherit' });
    execSync('git commit -m "🔁 Auto update enlaces"', { stdio: 'inherit' });
    execSync('git push', { stdio: 'inherit' });

    console.log('✅ Todo actualizado y subido a GitHub.');
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
}

// Ejecutar una vez al iniciar
actualizarTodo();

// Programar cada hora
cron.schedule('0 * * * *', actualizarTodo);
