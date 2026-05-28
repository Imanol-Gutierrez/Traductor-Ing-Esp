const btnTraducir = document.getElementById('btn-traducir');
const btnDictar = document.getElementById('btn-dictar');
const inputArchivo = document.getElementById('archivo-txt');
const textoEntrada = document.getElementById('texto-entrada');
const textoSalida = document.getElementById('texto-salida');

const tablaErrores = document.getElementById('tabla-errores');
const tablaSimbolos = document.getElementById('tabla-simbolos');
const arbolDerivacion = document.getElementById('arbol-derivacion');

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

// 2. Mostrar los resultados del compilador en pantalla
function renderizarResultados(data) {
    // Renderizar Errores
    if (data.errores && data.errores.length > 0) {
        textoSalida.innerHTML = "<span style='color:red;'>Traducción abortada debido a errores. Revisa la tabla de errores.</span>";
        tablaErrores.innerHTML = data.errores.map(err => 
            `<strong>[Error ${err.tipo}]</strong> ${err.ubicacion}: ${err.descripcion}<br>`
        ).join("");
    } else {
        textoSalida.innerText = data.traduccion;
        tablaErrores.innerHTML = "<span style='color:green;'>✅ Texto libre de errores. Análisis Semántico y Sintáctico correctos.</span>";
    }

    // Renderizar Tabla de Símbolos
    if (data.tablaSimbolos.length > 0) {
        tablaSimbolos.innerHTML = data.tablaSimbolos.map(simbolo => 
            `> "${simbolo.lexema}" -> <strong>${simbolo.token}</strong><br>`
        ).join("");
    }

    // Renderizar Árbol de Derivación (JSON bonito)
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

// 4. Reconocimiento de Voz (Puntos Extra)
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SpeechRecognition) {
    const reconocimiento = new SpeechRecognition();
    reconocimiento.lang = 'en-US'; // Escucha en inglés
    reconocimiento.interimResults = false;

    btnDictar.addEventListener('click', () => {
        textoEntrada.value = "Escuchando...";
        reconocimiento.start();
    });

    reconocimiento.addEventListener('result', (evento) => {
        const transcripcion = evento.results[0][0].transcript;
        textoEntrada.value = transcripcion + " ."; // Añade punto al final para nuestro lexer
    });

    reconocimiento.addEventListener('error', () => {
        textoEntrada.value = "Error al reconocer la voz.";
    });
} else {
    btnDictar.style.display = 'none';
    console.warn("El navegador no soporta la Web Speech API.");
}