const express = require('express');
// Inicializamos express
const app = express();
// Le pasamos la constante app que creamos arriba
const http = require('http').Server(app);
// Le pasamos la constante http
const io = require('socket.io')(http);

const listaTurnos = ["Enzo Francescoli", "Ariel Ortega", "Franco Armani", "Miguel Borja", "Enzo Pérez"];   
const listaAtendidos = [];   

// Indicamos que queremos cargar los archivos estáticos que se encuentran en dicha carpeta
app.use(express.static('./public'))

// Esta ruta carga nuestro archivo index.html en la raíz de la misma
app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname})
})

// El servidor funcionando en el puerto 3000
http.listen(3000, () => console.log('SERVER ON\n http://localhost:3000'))

function enviarListados(alerta){
    io.sockets.emit('ListaDeTurnos', {pendientes:listaTurnos,atendidos:listaAtendidos,alerta:alerta}); //Envio Arreglo listaTurno a todos los sockets
}

// Intervalo para ejecutar enviarListados cada 1 minuto
setInterval(() => {
    enviarListados(false); 
}, 60000); // 60000 milisegundos = 1 minuto


io.on('connection', (socket) => {
    // "connection" se ejecuta la primera vez que se abre una nueva conexión
    console.log('Usuario conectado')
    // Se imprimirá solo la primera vez que se ha abierto la conexión

    /*Escucho los mensajes enviados por el cliente y se los propago a todos*/
    socket.on('VentanaTurnoActual', data => {
        console.log('VentanaTurnoActual')
        enviarListados(false)
    });
    socket.on('AtenderTurno', puesto => {
        console.log('AtenderTurno')
        if (listaTurnos.length>0) {
            listaAtendidos.unshift({nombre:listaTurnos[0],puesto:puesto,hora:Date.now()})//agrega elemento al princio de un arreglo
            listaTurnos.shift() //borra primer elemento de la lista
            enviarListados(true)
        }
    });    
    socket.on('CrearTurno', data => {
        console.log('CrearTurno')
        listaTurnos.push(data) //Agrego item al final de la lista
        enviarListados(false)
    });       

})


 