// parser.js
function analizadorSintactico(tablaSimbolos) {
    const tablaErrores = [];
    let arbolDerivacion = null;

    if (tablaSimbolos.length === 0) return { arbolDerivacion, tablaErrores, reglaAplicada: null };

    const estructuraActual = tablaSimbolos.map(simbolo => simbolo.token);
    let esSintaxisValida = false;
    let reglaAplicada = null;

    if (estructuraActual.length === 2 && estructuraActual[1] === "signo_puntuacion") {
        esSintaxisValida = true;
        reglaAplicada = "palabra_sola";
    } else {
        const reglasBNF = {
            // Reglas en Inglés
            regla1: ["articulo_definido", "adjetivo_calificativo", "sustantivo", "verbo", "signo_puntuacion"],
            regla2: ["pronombre_personal", "verbo", "articulo_indefinido", "sustantivo", "signo_puntuacion"],
            regla3: ["articulo_definido", "sustantivo", "verbo", "adverbio_tiempo", "signo_puntuacion"],
            
            // Reglas en ESPAÑOL (¡NUEVO!)
            // Ej: "el perro negro corre ."
            regla_es_1: ["articulo_definido", "sustantivo", "adjetivo_calificativo", "verbo", "signo_puntuacion"],
            // Ej: "la niña corre mañana ."
            regla_es_2: ["articulo_definido", "sustantivo", "verbo", "adverbio_tiempo", "signo_puntuacion"]
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
            ubicacion: `Estructura general (${estructuraActual.length} tokens)`,
            descripcion: "El orden no coincide con reglas gramaticales en inglés ni en español."
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