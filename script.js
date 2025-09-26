// Datos de productos con imágenes SVG básicas
const productos = [
    {
        id: 1,
        nombre: "iPhone 15 Pro",
        descripcion: "El iPhone más avanzado con chip A17 Pro y cámara de 48MP.",
        precio: "$1,199",
        imagen: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="80" height="80" rx="10" fill="#333"/>
            <rect x="15" y="15" width="70" height="70" rx="5" fill="#1d1d1f"/>
            <circle cx="50" cy="25" r="3" fill="#0071e3"/>
            <rect x="40" y="40" width="20" height="30" rx="2" fill="#0071e3"/>
        </svg>`
    },
    {
        id: 2,
        nombre: "iPhone 15",
        descripcion: "Diseño innovador con Dynamic Island y potente chip A16 Bionic.",
        precio: "$899",
        imagen: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="80" height="80" rx="10" fill="#555"/>
            <rect x="15" y="15" width="70" height="70" rx="5" fill="#2d2d2f"/>
            <circle cx="50" cy="25" r="3" fill="#0071e3"/>
            <rect x="40" y="40" width="20" height="30" rx="2" fill="#0071e3"/>
        </svg>`
    },
    {
        id: 3,
        nombre: "iPhone 14",
        descripcion: "Excelente rendimiento con seguridad avanzada de datos.",
        precio: "$799",
        imagen: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="80" height="80" rx="10" fill="#777"/>
            <rect x="15" y="15" width="70" height="70" rx="5" fill="#3d3d3f"/>
            <circle cx="50" cy="25" r="3" fill="#0071e3"/>
            <rect x="40" y="40" width="20" height="30" rx="2" fill="#0071e3"/>
        </svg>`
    },
    {
        id: 4,
        nombre: "iPhone SE",
        descripcion: "Potencia del chip A15 Bionic en un diseño compacto y asequible.",
        precio: "$429",
        imagen: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <rect x="15" y="15" width="70" height="70" rx="10" fill="#999"/>
            <rect x="20" y="20" width="60" height="60" rx="5" fill="#4d4d4f"/>
            <circle cx="50" cy="30" r="2" fill="#0071e3"/>
            <rect x="40" y="45" width="20" height="25" rx="2" fill="#0071e3"/>
        </svg>`
    },
    {
        id: 5,
        nombre: "iPhone 13",
        descripcion: "Sistema de cámara dual avanzado con modo Cinematográfico.",
        precio: "$699",
        imagen: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="80" height="80" rx="10" fill="#666"/>
            <rect x="15" y="15" width="70" height="70" rx="5" fill="#3a3a3c"/>
            <circle cx="50" cy="25" r="3" fill="#0071e3"/>
            <rect x="35" y="40" width="30" height="25" rx="2" fill="#0071e3"/>
        </svg>`
    },
    {
        id: 6,
        nombre: "iPhone 12",
        descripcion: "Diseño elegante con pantalla Super Retina XDR y 5G.",
        precio: "$599",
        imagen: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="80" height="80" rx="10" fill="#888"/>
            <rect x="15" y="15" width="70" height="70" rx="5" fill="#4a4a4c"/>
            <circle cx="50" cy="25" r="3" fill="#0071e3"/>
            <rect x="35" y="40" width="30" height="25" rx="2" fill="#0071e3"/>
        </svg>`
    }
];

// Carrito de compras
let carrito = [];

// Función para cargar productos en la página
function cargarProductos() {
    const productosGrid = document.getElementById('productos-grid');
    productosGrid.innerHTML = ''; // Limpiar contenedor
    
    productos.forEach(producto => {
        const productoCard = document.createElement('div');
        productoCard.className = 'producto-card';
        
        productoCard.innerHTML = `
            <div class="producto-img">
                ${producto.imagen}
            </div>
            <div class="producto-info">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <div class="producto-precio">${producto.precio}</div>
                <button class="btn agregar-carrito" data-id="${producto.id}">Agregar al Carrito</button>
            </div>
        `;
        
        productosGrid.appendChild(productoCard);
    });
    
    // Asignar event listeners después de crear los productos
    asignarEventListenersCarrito();
}

// Función para asignar event listeners a los botones del carrito
function asignarEventListenersCarrito() {
    document.querySelectorAll('.agregar-carrito').forEach(button => {
        // Remover event listener existente para evitar duplicados
        button.replaceWith(button.cloneNode(true));
    });
    
    // Asignar nuevos event listeners
    document.querySelectorAll('.agregar-carrito').forEach(button => {
        button.addEventListener('click', agregarAlCarrito);
    });
}

// Función para agregar productos al carrito
function agregarAlCarrito(e) {
    const productoId = parseInt(e.target.getAttribute('data-id'));
    const producto = productos.find(p => p.id === productoId);
    
    if (producto) {
        carrito.push(producto);
        actualizarContadorCarrito();
        mostrarNotificacion(`${producto.nombre} agregado al carrito`);
    }
}

// Función para actualizar el contador del carrito
function actualizarContadorCarrito() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = carrito.length;
    
    // Animación del icono del carrito
    const cartIcon = document.getElementById('cart-icon');
    cartIcon.style.transform = 'scale(1.2)';
    setTimeout(() => {
        cartIcon.style.transform = 'scale(1)';
    }, 300);
}

// Función para mostrar notificaciones
function mostrarNotificacion(mensaje) {
    // Remover notificaciones existentes
    const notificacionesExistentes = document.querySelectorAll('.notificacion');
    notificacionesExistentes.forEach(notif => notif.remove());
    
    // Crear elemento de notificación
    const notificacion = document.createElement('div');
    notificacion.className = 'notificacion';
    notificacion.textContent = mensaje;
    
    // Agregar al documento
    document.body.appendChild(notificacion);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        if (document.body.contains(notificacion)) {
            notificacion.style.animation = 'slideOut 0.3s ease-in forwards';
            setTimeout(() => {
                if (document.body.contains(notificacion)) {
                    document.body.removeChild(notificacion);
                }
            }, 300);
        }
    }, 3000);
}

// Función para mostrar modal del carrito
function mostrarModalCarrito() {
    // Remover modal existente
    const modalExistente = document.getElementById('modal-carrito');
    if (modalExistente) {
        modalExistente.remove();
        return;
    }
    
    // Crear modal
    const modal = document.createElement('div');
    modal.id = 'modal-carrito';
    modal.className = 'modal-carrito';
    modal.innerHTML = `
        <div class="modal-contenido">
            <h3>Carrito de Compras</h3>
            <div class="carrito-items" id="carrito-items">
                ${carrito.length === 0 ? '<p>El carrito está vacío</p>' : ''}
                ${carrito.map((item, index) => `
                    <div class="carrito-item">
                        <span>${item.nombre}</span>
                        <span>${item.precio}</span>
                        <button class="btn-eliminar" data-index="${index}">×</button>
                    </div>
                `).join('')}
            </div>
            ${carrito.length > 0 ? `
                <div class="carrito-total">
                    <strong>Total: $${calcularTotal()}</strong>
                </div>
            ` : ''}
            <div class="modal-acciones">
                <button class="btn btn-secundario" id="cerrar-carrito">Cerrar</button>
                ${carrito.length > 0 ? '<button class="btn" id="finalizar-compra">Finalizar Compra</button>' : ''}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Event listeners para el modal
    document.getElementById('cerrar-carrito').addEventListener('click', () => {
        modal.remove();
    });
    
    if (carrito.length > 0) {
        document.getElementById('finalizar-compra').addEventListener('click', finalizarCompra);
    }
    
    // Event listeners para eliminar items
    document.querySelectorAll('.btn-eliminar').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'));
            eliminarDelCarrito(index);
        });
    });
    
    // Cerrar modal al hacer click fuera
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Función para calcular el total del carrito
function calcularTotal() {
    return carrito.reduce((total, item) => {
        const precio = parseInt(item.precio.replace('$', '').replace(',', ''));
        return total + precio;
    }, 0).toLocaleString();
}

// Función para eliminar item del carrito
function eliminarDelCarrito(index) {
    const productoEliminado = carrito[index];
    carrito.splice(index, 1);
    actualizarContadorCarrito();
    mostrarNotificacion(`${productoEliminado.nombre} eliminado del carrito`);
    mostrarModalCarrito(); // Actualizar modal
}

// Función para finalizar compra
function finalizarCompra() {
    if (carrito.length === 0) {
        mostrarNotificacion('El carrito está vacío');
        return;
    }
    
    const total = calcularTotal();
    mostrarNotificacion(`¡Compra finalizada! Total: $${total}`);
    carrito = [];
    actualizarContadorCarrito();
    
    // Cerrar modal
    const modal = document.getElementById('modal-carrito');
    if (modal) {
        modal.remove();
    }
}

// Inicialización cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    cargarProductos();
    actualizarContadorCarrito();
    
    // Personalización de información del estudiante
    document.getElementById('nombre-estudiante').textContent = 'Luis Alejandro Vallejos';
    document.getElementById('nombre-materia').textContent = 'Contexto de Ingenieria de Software';
    
    // Event listener para el icono del carrito en el header
    document.getElementById('cart-icon').addEventListener('click', mostrarModalCarrito);
});

// Manejo del formulario de contacto
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    mostrarNotificacion('Mensaje enviado correctamente');
    this.reset();
});