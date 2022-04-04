const table = document.querySelector('#tbody')
let carritoCompras = [];
startEventListeners();
function startEventListeners(){
    document.addEventListener('DOMContentLoaded',() => {
        carritoCompras = JSON.parse(localStorage.getItem('carrito') || []);
        agregarAlHtml();
        console.log(carritoCompras)
    })
    table.addEventListener('click',eliminarElemento)
}


function agregarAlHtml(){
    limpiarHtml();
    carritoCompras.forEach(producto => {
        const col = document.createElement('tr');
        
        col.innerHTML = `
        
            <td><img src="${producto.imagen}" class="img-fluid"></td>
            <td><p>${producto.name}</p></td>
            <td><p>${producto.price}</p></td>
            <td><p>${producto.cantidad}</p></td>
            <td><button type="button" class="btn btn-danger" id=${producto.id}>Eliminar</button></td>
        `
        table.appendChild(col)
    })
    
}
function eliminarElemento(e){
    e.preventDefault();
    
    if(e.target.type == 'button'){
        const index = carritoCompras.findIndex(element => e.target.getAttribute('id') == element.id);
        console.log(e.target)
        if(carritoCompras[index].cantidad > 1){
            let precioOriginal = carritoCompras[index].price / carritoCompras[index].cantidad;
            carritoCompras[index].cantidad--;
            carritoCompras[index].price = precioOriginal * carritoCompras[index].cantidad;
            
        }else{
            carritoCompras.splice(index,1);
        }
        saveInLocalStorage();
        limpiarHtml();
        agregarAlHtml();
    }
    
}
function limpiarHtml(){
    table.innerHTML = '';
}

function saveInLocalStorage(){
    localStorage.setItem('carrito',JSON.stringify(carritoCompras));
}
