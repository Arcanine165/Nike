const table = document.querySelector('#tbody')
let carritoCompras = [];
startEventListeners();
function startEventListeners(){
    document.addEventListener('DOMContentLoaded',() => {
        carritoCompras = JSON.parse(localStorage.getItem('carrito') || []);
        agregarAlHtml();
        console.log(carritoCompras)
    })
}


function agregarAlHtml(){
    
    carritoCompras.forEach(producto => {
        const col = document.createElement('tr');
        
        col.innerHTML = `
        
            <td><img src="${producto.imagen}" class="img-fluid"></td>
            <td><p>${producto.name}</p></td>
            <td><p>${producto.description}</p></td>
            <td><p>${producto.price}</p></td>
            <td><p>${producto.cantidad}</p></td>
            <td><button type="button" class="btn btn-danger">Eliminar</button></td>
        `
        table.appendChild(col)
    })
    
}


