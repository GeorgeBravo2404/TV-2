const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/:canal', (req, res) => {
  const nombre = req.params.canal;
  const archivo = `enlaces/${nombre}.txt`;

  if (fs.existsSync(archivo)) {
    const enlace = fs.readFileSync(archivo, 'utf8').trim();
    res.redirect(enlace);
  } else {
    res.status(404).send('Canal no encontrado');
  }
});

app.listen(PORT, () => {
  console.log(`✅ Servidor en http://localhost:${PORT}`);
});
