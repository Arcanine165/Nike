const navButton = document.querySelector('.navbar-toggler')
const nav = document.querySelector('#navbarNav');
const addTo = document.getElementsByTagName('button');
const listaTenis = document.querySelector('#lista-tenis');
const table = document.querySelector('#tbody')
const dropItems = document.querySelector('.dropdown-menu')
const dropDown = document.querySelector('#dropdownMenuButton');
let carritoCompras = [];
cargarventListeners();

function cargarventListeners(){
    //EventListeners
    listaTenis.addEventListener('click',agregarCarrito)
    //Funcionalidad al responsive
    navButton.addEventListener('click',responsiveNav);

    //DropDownCarrito
    dropDown.addEventListener('click',drop)


}

function agregarCarrito(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
       
        const productoSelec = e.target.parentElement;
        console.log(productoSelec.parentElement.querySelector('img').getAttribute('src'))
        leerData(productoSelec);
        
    }
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
    }else{
        dropItems.classList.remove('show')
    }
    
}
function leerData(producto){
    console.log(producto.parentElement.querySelector('img').getAttribute('src'))
    const exits = carritoCompras.some(product => product.name === producto.querySelector('.card-title').textContent);
    if(exits){
        const productos = carritoCompras.map(product => {
            if(product.name === producto.querySelector('.card-title').textContent){
                product.cantidad++;
                return product;
            }else{
                return product;
            }
        })
        carritoCompras = [...productos];
        console.log(carritoCompras)
        agregarAlHtml();
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
    console.log(carritoCompras)
    agregarAlHtml();
}
}

function agregarAlHtml(){
    limpiarHtml();
    carritoCompras.forEach(producto => {
        const lel = producto.imagen;
        const col = document.createElement('tr');
        
        col.innerHTML = `
        
            <td><img src="${producto.imagen}" class="img-fluid"></td>
            <td><p>${producto.name}</p></td>
            <td><p>${producto.description}</p></td>
            <td><p>${producto.price}</p></td>
            <td><p>${producto.cantidad}</p></td>
        `
        table.appendChild(col)
    })
    
}

function limpiarHtml(){
    table.innerHTML = '';
}