/* === ARCHIVO JAVASCRIPT UNIFICADO Y LIMPIO === */
/* === ARCHIVO JAVASCRIPT UNIFICADO Y LIMPIO === */

// 1. RENDERIZADO INICIAL
function renderizarTodo() {
    const contenedor = document.getElementById('contenedor-categorias');
    const menuDinamico = document.getElementById('menu-desplegable');
    if (!contenedor || !menuDinamico) return;

    contenedor.innerHTML = "";
    menuDinamico.innerHTML = "";

    CATEGORIAS.forEach(c => {
        // --- LÓGICA PARA LAS TARJETAS DE INICIO ---
        const div = document.createElement('div');
        const yaVisto = localStorage.getItem('visto_cat_' + c.titulo);
        div.className = 'card-mini' + (yaVisto ? ' activa' : '');

        div.onclick = () => {
            localStorage.setItem('visto_cat_' + c.titulo, 'true');
            div.classList.add('activa');
            filtrarPor(c.titulo);
        };

        div.innerHTML = `
            <div class="img-mini-bg" style="background-image: url('${c.imagen}')"></div>
            <h3>${c.titulo}</h3>
        `;
        contenedor.appendChild(div);

        // --- LÓGICA PARA EL MENÚ DESPLEGABLE (Categorías) ---
        const a = document.createElement('a');
        a.href = "javascript:void(0)";
        a.onclick = () => {
            filtrarPor(c.titulo);
            cerrarMenuMovil(); 
        };
        a.innerText = c.titulo;
        menuDinamico.appendChild(a);
    });
}

// 2. FILTRADO DE IMÁGENES
function filtrarPor(cat) {
    ocultarTodo();
    cerrarMenuMovil(); // <--- Añadido aquí para asegurar cierre
    const seccion = document.getElementById('seccion-imagenes');
    const contenedor = document.getElementById('contenedor-galeria');

    seccion.style.display = "block";
    document.getElementById('titulo-seccion-dinamico').innerText = cat === 'todos' ? "DIARIO DE SUEÑOS" : cat;

    contenedor.className = "contenedor-galeria-fija";
    contenedor.innerHTML = "";

    const filtrados = cat === 'todos' ? MIS_SUENOS : MIS_SUENOS.filter(s => s.categoria === cat);

    // 1. Modifica la parte de crear imágenes dentro de filtrarPor()
function filtrarPor(cat) {
    // ... tu código anterior (ocultarTodo, etc.) ...

    filtrados.forEach((s) => {
        const img = document.createElement('img');
        img.src = s.imagen;
        
        // Añadimos la clase 'revelar' para que empiece invisible
        const yaVisto = localStorage.getItem('visto_' + s.titulo);
        img.className = 'card-img-full revelar' + (yaVisto === 'true' ? ' visto' : '');

        img.onclick = () => {
            img.classList.add('visto');
            localStorage.setItem('visto_' + s.titulo, 'true');
            abrirModal(s);
        };
        contenedor.appendChild(img);
        
        // Le decimos al observador que vigile esta nueva imagen
        observador.observe(img);
    });
}

// 2. CREAR EL OBSERVADOR (Añade esto al final de tu script.js)
const opciones = {
    threshold: 0.1 // Se activa cuando el 10% de la imagen es visible
};

const observador = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Cuando entra en pantalla, le ponemos la clase que activa la animación
            entry.target.classList.add('revelado');
            // Una vez revelada, dejamos de vigilarla para ahorrar recursos
            observer.unobserve(entry.target);
        }
    });
}, opciones);

    filtrados.forEach((s) => {
        const img = document.createElement('img');
        img.src = s.imagen;
        const yaVisto = localStorage.getItem('visto_' + s.titulo);
        img.className = 'card-img-full' + (yaVisto === 'true' ? ' visto' : '');

        img.onclick = () => {
            img.classList.add('visto');
            localStorage.setItem('visto_' + s.titulo, 'true');
            localStorage.setItem('visto_cat_' + s.categoria, 'true');
            abrirModal(s);
        };
        contenedor.appendChild(img);
    });
}

// 3. GESTIÓN DEL MODAL (Sin cambios, funciona bien)
function abrirModal(s) {
    const modalImg = document.getElementById('modalImage');
    modalImg.classList.remove('foto-zoom');
    modalImg.src = s.imagen;
    modalImg.onclick = toggleZoom;

    document.getElementById('titulo-foto-pie').innerText = s.titulo;
    document.getElementById('modalTitle').innerText = s.titulo;
    document.getElementById('txtSueno').innerText = s.sueno;
    document.getElementById('txtReflexion').innerText = s.reflexion;
    document.getElementById('txtInterpretacion').innerText = s.interpretacion;
    document.getElementById('txtPoema').innerText = s.poema;
    document.getElementById('txtImpacto').innerText = s.impacto;

    const tira = document.getElementById('tira-pelicula');
    tira.innerHTML = "";
    const todas = [s.imagen, ...(s.extras || [])];

    todas.forEach(src => {
        const mini = document.createElement('img');
        mini.src = src;
        mini.onmouseenter = () => { modalImg.src = src; modalImg.classList.remove('foto-zoom'); };
        mini.onclick = () => { modalImg.src = src; modalImg.classList.remove('foto-zoom'); };
        tira.appendChild(mini);
    });

    document.getElementById('modalSueno').style.display = "block";
}

function toggleZoom() {
    document.getElementById('modalImage').classList.toggle('foto-zoom');
}

// 4. NAVEGACIÓN Y SECCIONES
function ocultarTodo() {
    document.getElementById('seccion-inicio').style.display = "none";
    document.getElementById('seccion-imagenes').style.display = "none";
    document.getElementById('sobre-mi-seccion').style.display = "none";
}

function mostrarInicio() { 
    ocultarTodo(); 
    document.getElementById('seccion-inicio').style.display = "block"; 
    cerrarMenuMovil();
}

function mostrarSobreMi() { 
    ocultarTodo(); 
    document.getElementById('sobre-mi-seccion').style.display = "block"; 
    cerrarMenuMovil();
}

function activarColorPerfil() {
    const foto = document.getElementById('foto-perfil');
    if (foto) foto.classList.toggle('foto-activa');
}

// 5. LÓGICA DEL MENÚ HAMBURGUESA
function cerrarMenuMovil() {
    const navLinks = document.getElementById('nav-links');
    if (navLinks) {
        navLinks.classList.remove('active');
    }
}

// Inicialización corregida
window.addEventListener('load', () => {
    const btnSubir = document.getElementById('btn-subir');

// Detectamos el movimiento del scroll
window.onscroll = function() {
    // Si bajamos más de 300px, mostramos el botón
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        btnSubir.classList.add('mostrar');
    } else {
        btnSubir.classList.remove('mostrar');
    }
};

// Al hacer clic, subimos suavemente
btnSubir.onclick = function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Subida suave y fluida
    });
};
    renderizarTodo();

    const menuIcon = document.getElementById('menu-icon');
    const navLinks = document.getElementById('nav-links');

    if (menuIcon && navLinks) {
        // Al hacer click en la hamburguesa:
        menuIcon.onclick = (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
        };
        menuIcon.onclick = (e) => {
    e.stopPropagation();
    if (window.navigator.vibrate) window.navigator.vibrate(10); // Vibración aún más corta
    navLinks.classList.toggle('active');
};

        // Al hacer click en cualquier parte de la web:
        document.onclick = (e) => {
            // Si el menú está abierto y el click NO es dentro del menú ni en el icono:
            if (navLinks.classList.contains('active')) {
                if (!menuIcon.contains(e.target) && !navLinks.contains(e.target)) {
                    cerrarMenuMovil();
                }
            }
        };
    }
});
// Busca el enlace de "Explorar"
const enlaceExplorar = document.querySelector('.dropdown > a');
const contenedorExplorar = document.querySelector('.dropdown');

if (enlaceExplorar) {
    enlaceExplorar.onclick = (e) => {
        // Si estamos en móvil (pantalla pequeña)
        if (window.innerWidth <= 600) {
            e.preventDefault(); // Evita que el enlace haga cosas raras
            e.stopPropagation();
            // Togleamos la clase para abrir/cerrar el submenú
            contenedorExplorar.classList.toggle('abierto-movil');
        }
    };
}
