const table = document.querySelector('#tbody')
let carritoCompras = [];
const navButton = document.querySelector('.navbar-toggler');
const nav = document.querySelector('#navbarNav');

startEventListeners();
function startEventListeners(){
    document.addEventListener('DOMContentLoaded',() => {
        carritoCompras = JSON.parse(localStorage.getItem('carrito') || []);
        agregarAlHtml();
        console.log(carritoCompras)
    })
    
    navButton.addEventListener('click',responsiveNav);
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
            <td><button type="button" class="btn btn-success" onClick = "sumar(this)" id=${producto.id}>+</button></td>
            <td><button type="button" class="btn btn-danger" onClick = "eliminarElemento(this)" id=${producto.id} >-</button></td>
            
        `
        table.appendChild(col)
    })
    calcularTotal();
}
function eliminarElemento(e){
    
    const index = carritoCompras.findIndex(element => e.id == element.id);
    console.log(index)
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
function limpiarHtml(){
    table.innerHTML = '';
}

function saveInLocalStorage(){
    localStorage.setItem('carrito',JSON.stringify(carritoCompras));
}

function responsiveNav(){
    if(!nav.classList.contains('show')){
        nav.classList.add('show')
    }else{
        nav.classList.remove('show')
    }
    
}
function sumar(e){
    const index = carritoCompras.findIndex(element => e.id == element.id);
    let precioOriginal = carritoCompras[index].price / carritoCompras[index].cantidad;
    carritoCompras[index].cantidad++;
    carritoCompras[index].price = precioOriginal * carritoCompras[index].cantidad;
    saveInLocalStorage();
    limpiarHtml();
    agregarAlHtml();
}
function calcularTotal(){
    let precioTotal = 0;
    carritoCompras.forEach(element => {
        precioTotal += element.price
        
    })
    total.innerHTML =`Total: $${precioTotal}`;
}