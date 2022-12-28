//conf del server
const { log } = require('console')
const { Socket } = require('dgram')
const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express()
//config del socket
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)


//middlewere

app.use(express.static('./public'))

const PORT = 8080

const mensajes = [
    { author: 'Pablo', text: 'Hola que tal?' },
    { author: 'carla', text: 'Joya y vos?' },
    { author: 'Alejo', text: 'Hola!!' }
];


// implementacion de socket

io.on('connection', socket => {
    console.log('nuevo cliente conectado!');

    //vamos a enviar el hist del chat cuando un nuevo cliente se conecte
    socket.emit('mensajes', mensajes)

    //escuchamos al cliente
    socket.on('new-mensaje', data => {
        mensajes.push(data)

    //reenviamos por medio broadcast los msn a todos los clientes que esten conectados
    io.sockets.emit('mensajes', mensajes)

    })

})

//conf de socket

httpServer.listen(PORT, () => {
    console.log(`server run on PORT: ${PORT}`);
})