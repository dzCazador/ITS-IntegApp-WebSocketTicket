const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const turnosController = require('./controllers/turnosController');

const app = express();
const server = http.Server(app);
const io = socketIO(server);

// Indicamos que queremos cargar los archivos estáticos que se encuentran en dicha carpeta
app.use(express.static('./public'))

// Esta ruta carga nuestro archivo index.html en la raíz de la misma
app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname})
})

// Configuración de Socket.IO
turnosController.configureSocket(io);

// El servidor funcionando en el puerto 3000
const PORT = 3000;
server.listen(PORT, () => console.log(`SERVER ON\nhttp://localhost:${PORT}`));

