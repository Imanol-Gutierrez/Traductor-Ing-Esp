// parser.js
function analizadorSintactico(tablaSimbolos) {
    const tablaErrores = [];
    let arbolDerivacion = null;

    if (tablaSimbolos.length === 0) return { arbolDerivacion, tablaErrores };

    const bnfEsperado = [
        "articulo_definido", 
        "adjetivo_calificativo", 
        "sustantivo", 
        "verbo", 
        "signo_puntuacion"
    ];

    const estructuraActual = tablaSimbolos.map(simbolo => simbolo.token);
    let esSintaxisValida = true;

    if (estructuraActual.length !== bnfEsperado.length) {
        esSintaxisValida = false;
        tablaErrores.push({
            tipo: "Sintáctico",
            ubicacion: "Estructura de la oración",
            descripcion: "La oración no cumple con la regla BNF esperada."
        });
    } else {
        for (let i = 0; i < bnfEsperado.length; i++) {
            if (estructuraActual[i] !== bnfEsperado[i]) {
                esSintaxisValida = false;
                tablaErrores.push({
                    tipo: "Sintáctico",
                    ubicacion: `Posición ${i + 1} ('${tablaSimbolos[i].lexema}')`,
                    descripcion: `Se esperaba '${bnfEsperado[i]}' pero se encontró '${estructuraActual[i]}'.`
                });
                break; 
            }
        }
    }

    if (esSintaxisValida) {
        arbolDerivacion = {
            nodo: "<Oración>",
            hijos: [
                {
                    nodo: "<Sujeto>",
                    hijos: [
                        { nodo: "<Artículo>", valor: tablaSimbolos[0].lexema },
                        { nodo: "<Adjetivo>", valor: tablaSimbolos[1].lexema },
                        { nodo: "<Sustantivo>", valor: tablaSimbolos[2].lexema }
                    ]
                },
                {
                    nodo: "<Predicado>",
                    hijos: [
                        { nodo: "<Verbo>", valor: tablaSimbolos[3].lexema }
                    ]
                },
                {
                    nodo: "<Puntuación>",
                    valor: tablaSimbolos[4].lexema
                }
            ]
        };
    }

    return { arbolDerivacion, tablaErrores };
}

module.exports = analizadorSintactico;