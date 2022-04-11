const navButton = document.querySelector('.navbar-toggler');
const nav = document.querySelector('#navbarNav');
const addTo = document.getElementsByTagName('button');
const listaTenis = document.querySelector('#lista-tenis');
const table = document.querySelector('#tbody')
const dropItems = document.querySelector('.dropdown-menu')
const dropDown = document.querySelector('#carrito');
const showedtable = document.querySelector('.table');
const vaciar = document.querySelector('#vaciar');
const body = document.querySelector('body')
const container = document.querySelector('.container');
const total = document.querySelector('#total');
let carritoCompras = [];

cargarventListeners();

function cargarventListeners(){
    //EventListeners
    
    listaTenis.addEventListener('click',agregarCarrito);
    //Funcionalidad al responsive
    navButton.addEventListener('click',responsiveNav);
    //LocalStorage
    document.addEventListener('DOMContentLoaded',() => {
        carritoCompras = JSON.parse(localStorage.getItem('carrito') || []);
        
        agregarAlHtml();
    })
    vaciar.addEventListener('click',vaciarCarrito);
    //DropDownCarrito
    window.innerWidth > 800 ? dropDown.addEventListener("mouseenter",drop) : dropDown.addEventListener("click",dropOut);
    dropItems.addEventListener('mouseleave',dropOut);
    container.addEventListener('mouseover',dropOut);
    

}

function agregarCarrito(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
       
        const productoSelec = e.target.parentElement;
        
        leerData(productoSelec);
        
    }
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
function responsiveNav(){
    if(!nav.classList.contains('show')){
        nav.classList.add('show')
    }else{
        nav.classList.remove('show')
    }
    
}
function drop(){
    if(!dropItems.classList.contains('show')){
        dropItems.classList.add('show')
    }

    
}
function dropOut(){
    dropItems.classList.remove('show');
    
}
function leerData(producto){
    
    const exits = carritoCompras.some(product => product.name === producto.querySelector('.card-title').textContent);
    if(exits){
        const productos = carritoCompras.map(product => {
            if(product.name === producto.querySelector('.card-title').textContent){
                const precioOriginal = product.price / product.cantidad;
                product.cantidad++;
                product.price = precioOriginal * product.cantidad;
                
                return product;
            }else{
                return product;
            }
        })
        carritoCompras = [...productos];
        
        saveInLocalStorage(carritoCompras)
        agregarAlHtml();
        popAddItem();
    }
    else{
    const article = {
        name:producto.querySelector('.card-title').textContent,
        description:producto.querySelector('.card-text').textContent,
        price:Number(producto.querySelector('.price').textContent.replace(/[^0-9]/g,'')),
        id:Date.now(),
        imagen:producto.parentElement.querySelector('img').getAttribute('src'),
        cantidad:1
    }
   
    carritoCompras = [...carritoCompras,article];
    
    saveInLocalStorage(carritoCompras);
    agregarAlHtml();
    popAddItem();
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

function limpiarHtml(){
    table.innerHTML = '';
}

function saveInLocalStorage(){
    localStorage.setItem('carrito',JSON.stringify(carritoCompras));
    
}

function vaciarCarrito(){
    carritoCompras = [];
    saveInLocalStorage();
    agregarAlHtml();

}
 function popAddItem(){
    
    const navbar = document.querySelector('nav');
    
    const element = document.createElement('div');
    
    element.classList.add('card','text-white','bg-secondary', 'center-screen','text-center')
    
    const p = document.createElement('p');
    p.innerHTML ="Articulo Agregado";
    
    element.appendChild(p);
    insertAfter(element,navbar)
    setTimeout(()=>{
        body.removeChild(element)
    },2000)

 }
 function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

function calcularTotal(){
    let precioTotal = 0;
    carritoCompras.forEach(element => {
        precioTotal += element.price
        
    })
    total.innerHTML =`Total: $${precioTotal}`;
}