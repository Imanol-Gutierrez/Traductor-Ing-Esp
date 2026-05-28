// server.js
const express = require('express');
const path = require('path');
const compilar = require('./main');

const app = express();
const PORT = 3000;

// Configurar el servidor para leer JSON y servir archivos estáticos
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Ruta (API) que recibe el texto del frontend y lo compila
app.post('/api/traducir', (req, res) => {
    const { texto } = req.body;
    
    if (!texto) {
        return res.status(400).json({ error: "Falta el texto a traducir" });
    }

    // Llamamos a nuestro núcleo de compilación
    const resultado = compilar(texto);
    
    // Enviamos el resultado de vuelta al navegador
    res.json(resultado);
});

// Levantar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor del Compilador corriendo en http://localhost:${PORT}`);
});