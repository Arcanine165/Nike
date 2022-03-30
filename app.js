const navButton = document.querySelector('.navbar-toggler')
const nav = document.querySelector('#navbarNav');
const addTo = document.getElementsByTagName('button');
const listaTenis = document.querySelector('#lista-tenis')

let carritoCompras = [];
cargarventListeners();

function cargarventListeners(){
    //EventListeners
    listaTenis.addEventListener('click',agregarCarrito)
    //Funcionalidad al responsive
    navButton.addEventListener('click',responsiveNav)

}

function agregarCarrito(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
       
        const productoSelec = e.target.parentElement;
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
function leerData(producto){
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
    }
    else{
    const article = {
        name:producto.querySelector('.card-title').textContent,
        description:producto.querySelector('.card-text').textContent,
        price:Number(producto.querySelector('.price').textContent.replace(/[^0-9]/g,'')),
        id:Date.now(),
        cantidad:1
    }
   
    carritoCompras = [...carritoCompras,article];
    console.log(carritoCompras)
}
}

