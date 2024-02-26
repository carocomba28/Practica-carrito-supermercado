const btnCarro = document.querySelector('.contenedor-carro-icon')
const contenedorCarroProductos = document.querySelector('.contenedor-carro-productos')

const datosProductos = [
    { codigo: "C001", nombre: "Castaña de caju", precio: 150, stock: 100 },
    { codigo: "C002", nombre: "Nuez", precio: 200, stock: 200 },
    { codigo: "C003", nombre: "Pistacho", precio: 500, stock: 150 },
    { codigo: "C004", nombre: "Mani", precio: 100, stock: 100 },
    { codigo: "C005", nombre: "Almendra", precio: 125, stock: 500 },
    { codigo: "C006", nombre: "Avellana", precio: 180, stock: 350 },
];


btnCarro.addEventListener('click', () => {
    contenedorCarroProductos.classList.toggle('hidden-carro')
})

const carroInfo = document.querySelector('.carro-producto')
const filaProducto = document.querySelector('.fila-producto')

const listaProductos = document.querySelector('.contenedor-items')

let productosEnCarrito = []
const valorTotal = document.querySelector('.total-pagar')
const contadorProductos = document.querySelector('#contador-productos')

const carroVacio = document.querySelector('.carro-vacio')
const carroTotal = document.querySelector('.carro-total')


listaProductos.addEventListener('click', e => {
    if (e.target.classList.contains('btn-añadir-carro')) {
        const producto = e.target.parentElement
        const infoProducto = {
            cantidad: 1,
            titulo: producto.querySelector('h2').textContent,
            precio: producto.querySelector('p').textContent,
        };

        const mostrarHTML = () => {
            filaProducto.innerHTML = '';
            let total = 0;
            let totalDeProductos = 0;

            productosEnCarrito.forEach(producto => {
                const contenedorProducto = document.createElement('div')
                contenedorProducto.classList.add('carro-producto')
                contenedorProducto.innerHTML = `
        <div class="info-carro-producto">
            <span class="cantidad-producto-carrito">${producto.cantidad}</span>
            <p class="titulo-producto-carrito">${producto.titulo}</p>
            <span class="precio-producto-carrito">${producto.precio}</span>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="icono-quitar">
            <path stroke-linecap="round" stroke-linejoin="round"
                d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
        </svg>`
                filaProducto.append(contenedorProducto)
                total = total + parseInt(producto.cantidad * producto.precio.slice(1))
                totalDeProductos = totalDeProductos + producto.cantidad;
            })
            valorTotal.innerText = `$${total}`;
            contadorProductos.innerText = totalDeProductos;

            const btnEliminarProducto = filaProducto.querySelectorAll('.icono-quitar');
            btnEliminarProducto.forEach(btn => {
                btn.addEventListener('click', () => {
                    const producto = btn.parentElement;
                    const titulo = producto.querySelector('.titulo-producto-carrito').textContent;
                    productosEnCarrito.forEach(producto => {
                        if (producto.titulo === titulo) {
                            if (producto.cantidad > 1) {
                                producto.cantidad--;
                            } else {
                                productosEnCarrito = productosEnCarrito.filter(producto => producto.titulo !== titulo);
                            }
                        }
                    })
                    mostrarHTML();
                })
            })
        }


        const existe = productosEnCarrito.some(producto => producto.titulo === infoProducto.titulo)
        if (existe) {
            const productos = productosEnCarrito.map(producto => {
                if (producto.titulo === infoProducto.titulo) {
                    producto.cantidad++;
                    return producto
                } else {
                    return producto
                }
            })
            productosEnCarrito = [...productos]
        } else {
            productosEnCarrito = [...productosEnCarrito, infoProducto]
        }
        mostrarHTML();
    }
})

filaProducto.addEventListener('click', e => {
    if (e.target.classList.contains('icono-quitar')) {
        const producto = e.target.parentElement;
        const titulo = producto.querySelector('p').textContent;

        productosEnCarrito.forEach((producto, index) => {
            if (producto.titulo === titulo) {
                let cantidad = parseInt(producto.cantidad);
                if (cantidad > 1) {
                    producto.cantidad = --cantidad;
                    const cantidadProducto = producto.parentElement.querySelector('.cantidad-producto-carrito');
                    cantidadProducto.textContent = cantidad;
                } else {
                    productosEnCarrito.splice(index, 1);
                }
            }
        });
        mostrarHTML();
    }
});


const mostrarHTML = () => {
    filaProducto.innerHTML = '';
    let total = 0;
    let totalDeProductos = 0;

    productosEnCarrito.forEach(producto => {
        const contenedorProducto = document.createElement('div')
        contenedorProducto.classList.add('carro-producto')
        contenedorProducto.innerHTML = `
        <div class="info-carro-producto">
            <span class="cantidad-producto-carrito">${producto.cantidad}</span>
            <p class="titulo-producto-carrito">${producto.titulo}</p>
            <span class="precio-producto-carrito">${producto.precio}</span>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="icono-quitar">
            <path stroke-linecap="round" stroke-linejoin="round"
                d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
        </svg>`
        filaProducto.append(contenedorProducto)
        total = total + parseInt(producto.cantidad * producto.precio.slice(1))
        totalDeProductos = totalDeProductos + producto.cantidad;
    })
    valorTotal.innerText = `$${total}`;
    contadorProductos.innerText = totalDeProductos;

    const btnEliminarProducto = filaProducto.querySelectorAll('.icono-quitar');
    btnEliminarProducto.forEach(btn => {
        btn.addEventListener('click', () => {
            const producto = btn.parentElement;
            const titulo = producto.querySelector('.titulo-producto-carrito').textContent;
            productosEnCarrito.forEach(producto => {
                if (producto.titulo === titulo) {
                    if (producto.cantidad > 1) {
                        producto.cantidad--;
                    } else {
                        productosEnCarrito = productosEnCarrito.filter(producto => producto.titulo !== titulo);
                    }
                }
            })
            mostrarHTML();
        })
    })
}
