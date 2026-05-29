const btnTraducir = document.getElementById('btn-traducir');
const btnDictar = document.getElementById('btn-dictar');
const btnIntercambiar = document.getElementById('btn-intercambiar'); // Nuevo botón
const inputArchivo = document.getElementById('archivo-txt');
const textoEntrada = document.getElementById('texto-entrada');
const textoSalida = document.getElementById('texto-salida');

const tituloEntrada = document.getElementById('titulo-entrada');
const tituloSalida = document.getElementById('titulo-salida');

const tablaErrores = document.getElementById('tabla-errores');
const tablaSimbolos = document.getElementById('tabla-simbolos');
const arbolDerivacion = document.getElementById('arbol-derivacion');

let esInglesAEspanol = true; // Estado inicial

// 1. Enviar texto al servidor (Backend)
btnTraducir.addEventListener('click', async () => {
    const texto = textoEntrada.value.trim();
    if (!texto) {
        alert("Por favor ingresa un texto para analizar.");
        return;
    }

    try {
        const respuesta = await fetch('/api/traducir', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ texto })
        });
        
        const resultado = await respuesta.json();
        renderizarResultados(resultado);
    } catch (error) {
        console.error("Error en la petición:", error);
    }
});

// 2. Mostrar los resultados en pantalla
function renderizarResultados(data) {
    if (data.errores && data.errores.length > 0) {
        textoSalida.innerHTML = "<span style='color:red;'>Traducción abortada. Revisa la tabla de errores.</span>";
        tablaErrores.innerHTML = data.errores.map(err => 
            `<strong>[Error ${err.tipo}]</strong> ${err.ubicacion}: ${err.descripcion}<br>`
        ).join("");
    } else {
        textoSalida.innerText = data.traduccion;
        tablaErrores.innerHTML = "<span style='color:green;'>✅ Texto libre de errores. Análisis Semántico y Sintáctico correctos.</span>";
    }

    if (data.tablaSimbolos.length > 0) {
        tablaSimbolos.innerHTML = data.tablaSimbolos.map(simbolo => 
            `> "${simbolo.lexema}" -> <strong>${simbolo.token}</strong><br>`
        ).join("");
    }

    if (data.arbolDerivacion) {
        arbolDerivacion.innerText = JSON.stringify(data.arbolDerivacion, null, 2);
    } else {
        arbolDerivacion.innerText = "Árbol no generado debido a errores sintácticos.";
    }
}

// 3. Cargar Archivos .TXT
inputArchivo.addEventListener('change', (evento) => {
    const archivo = evento.target.files[0];
    if (archivo) {
        const lector = new FileReader();
        lector.onload = (e) => {
            textoEntrada.value = e.target.result;
        };
        lector.readAsText(archivo);
    }
});

// 4. Reconocimiento de Voz
let reconocimiento;
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
    reconocimiento = new SpeechRecognition();
    reconocimiento.lang = 'en-US'; // Idioma por defecto
    reconocimiento.interimResults = false;

    btnDictar.addEventListener('click', () => {
        textoEntrada.value = "Escuchando...";
        reconocimiento.start();
    });

    reconocimiento.addEventListener('result', (evento) => {
        const transcripcion = evento.results[0][0].transcript;
        textoEntrada.value = transcripcion + " ."; 
    });

    reconocimiento.addEventListener('error', () => {
        textoEntrada.value = "Error al reconocer la voz.";
    });
} else {
    btnDictar.style.display = 'none';
}

// 5. Intercambiar Idiomas (¡NUEVA FUNCIÓN!)
btnIntercambiar.addEventListener('click', () => {
    esInglesAEspanol = !esInglesAEspanol;
    
    // Cambiamos los títulos visuales
    if (esInglesAEspanol) {
        tituloEntrada.innerText = "Inglés (Entrada)";
        tituloSalida.innerText = "Español (Salida)";
        if (reconocimiento) reconocimiento.lang = 'en-US'; // Voz en inglés
    } else {
        tituloEntrada.innerText = "Español (Entrada)";
        tituloSalida.innerText = "Inglés (Salida)";
        if (reconocimiento) reconocimiento.lang = 'es-ES'; // Voz en español
    }

    // Limpiamos la pantalla para no confundir al usuario
    textoEntrada.value = "";
    textoSalida.innerText = "Esperando traducción...";
    tablaErrores.innerHTML = "Sin errores.";
    tablaSimbolos.innerHTML = "Esperando análisis...";
    arbolDerivacion.innerText = "Esperando análisis...";
});