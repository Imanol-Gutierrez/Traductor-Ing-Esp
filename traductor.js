// traductor.js
function sintetizador(tablaSimbolos) {
    // 1. Mostrar la clasificación completa de cada palabra (Requerimiento del PDF)
    console.log("\n--- CLASIFICACIÓN COMPLETA DE PALABRAS ---");
    tablaSimbolos.forEach(simbolo => {
        console.log(`- "${simbolo.lexema}" -> ${simbolo.token}`);
    });

    // 2. Generar la traducción correspondiente
    let traduccion = "";

    // Si coincide con nuestra regla BNF: <Artículo> <Adjetivo> <Sustantivo> <Verbo> <Signo>
    if (tablaSimbolos.length === 5) {
        const articulo = tablaSimbolos[0].info.traduccion;
        const adjetivo = tablaSimbolos[1].info.traduccion; // ej. negro
        const sustantivo = tablaSimbolos[2].info.traduccion; // ej. perro
        const verbo = tablaSimbolos[3].info.traduccion;
        const signo = tablaSimbolos[4].info.traduccion;

        // Ensamblamos la oración invirtiendo el Adjetivo y el Sustantivo para español
        traduccion = `${articulo} ${sustantivo} ${adjetivo} ${verbo}${signo}`;
    } else {
        // Fallback genérico: traducción palabra por palabra si agregas otras reglas después
        traduccion = tablaSimbolos.map(simbolo => simbolo.info.traduccion).join(" ").replace(/ \./g, ".");
    }

    // Capitalizamos la primera letra para que se vea como una oración real
    traduccion = traduccion.charAt(0).toUpperCase() + traduccion.slice(1);

    return traduccion;
}

module.exports = sintetizador;