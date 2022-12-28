//01 conf socket del lado del cliente
const socket = io.connect();


//03 armamos la funcion render 

function render(data){
    const html= data.map(item =>{
        return (`<div> <strong> ${item.author} </strong>: <em>${item.text}</em> </div>`)
    }).join(' ')//salto de linea

    document.getElementById("mensajes").innerHTML= html
}

function alertMsj(data){
    document.getElementById('nameMsj').innerHTML=``

}






//04 funcion que se ejecura cuando doy click al btn de enviar
function addMensaje(){
    const authorName = document.getElementById('author').value 
    const textMsn= document.getElementById("text").value

    const mensaje2={
        author:authorName,
        text:textMsn,
    }

    document.getElementById("text").value= ''

    //enviamos la data al sv
    socket.emit('new-mensaje', mensaje2)

    return false
}



//02 eventos para enviar y recibir mensajes
socket.on('mensajes', data => {
    render(data)
    alertMsj(data)
})

