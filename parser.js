// parser.js
function analizadorSintactico(tablaSimbolos) {
    const tablaErrores = [];
    let arbolDerivacion = null;

    if (tablaSimbolos.length === 0) return { arbolDerivacion, tablaErrores, reglaAplicada: null };

    const estructuraActual = tablaSimbolos.map(simbolo => simbolo.token);
    let esSintaxisValida = false;
    let reglaAplicada = null;

    // Regla especial para UNA sola palabra (Palabra + Punto)
    if (estructuraActual.length === 2 && estructuraActual[1] === "signo_puntuacion") {
        esSintaxisValida = true;
        reglaAplicada = "palabra_sola";
    } else {
        // Reglas BNF normales
        const reglasBNF = {
            // Reglas cortas de 5 tokens
            regla1: ["articulo_definido", "adjetivo_calificativo", "sustantivo", "verbo", "signo_puntuacion"],
            regla2: ["pronombre_personal", "verbo", "articulo_indefinido", "sustantivo", "signo_puntuacion"],
            regla3: ["articulo_definido", "sustantivo", "verbo", "adverbio_tiempo", "signo_puntuacion"],
            
            // ¡NUEVA! Regla compuesta de 10 tokens (Oración 1 + Conjunción + Oración 2)
            // Ej: "He eats an apple and she reads a book ."
            regla_compuesta: [
                "pronombre_personal", "verbo", "articulo_indefinido", "sustantivo", // 4 tokens
                "conjuncion_coordinante",                                           // 1 token (and)
                "pronombre_personal", "verbo", "articulo_indefinido", "sustantivo", // 4 tokens
                "signo_puntuacion"                                                  // 1 token (.)
            ]
        };

        for (const [nombreRegla, estructuraBnf] of Object.entries(reglasBNF)) {
            if (JSON.stringify(estructuraActual) === JSON.stringify(estructuraBnf)) {
                esSintaxisValida = true;
                reglaAplicada = nombreRegla;
                break;
            }
        }
    }

    if (!esSintaxisValida) {
        tablaErrores.push({
            tipo: "Sintáctico",
            ubicacion: `Estructura general (${estructuraActual.length} tokens detectados)`,
            descripcion: "El orden de las palabras no coincide con ninguna regla BNF (simple o compuesta) del sistema."
        });
    } else {
        arbolDerivacion = {
            nodo: `<Oración (${reglaAplicada})>`,
            hijos: tablaSimbolos.map(s => ({ nodo: `<${s.token}>`, valor: s.lexema }))
        };
    }

    return { arbolDerivacion, tablaErrores, reglaAplicada };
}

module.exports = analizadorSintactico;