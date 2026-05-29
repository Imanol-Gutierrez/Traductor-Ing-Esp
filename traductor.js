// traductor.js
function sintetizador(tablaSimbolos, textoOriginal, reglaAplicada) {
    let traduccion = "";

    if (reglaAplicada === "palabra_sola") {
        traduccion = tablaSimbolos[0].info.traduccion + tablaSimbolos[1].info.traduccion;
    } else if (reglaAplicada === "regla1") {
        // Inglés a Español (The black dog runs)
        const art = tablaSimbolos[0].info.traduccion;
        const adj = tablaSimbolos[1].info.traduccion;
        const sus = tablaSimbolos[2].info.traduccion;
        const ver = tablaSimbolos[3].info.traduccion;
        const sig = tablaSimbolos[4].info.traduccion;
        traduccion = `${art} ${sus} ${adj} ${ver}${sig}`;
    } else if (reglaAplicada === "regla_es_1") {
        // Español a Inglés (el perro negro corre)
        const art = tablaSimbolos[0].info.traduccion;
        const sus = tablaSimbolos[1].info.traduccion; // perro -> dog
        const adj = tablaSimbolos[2].info.traduccion; // negro -> black
        const ver = tablaSimbolos[3].info.traduccion;
        const sig = tablaSimbolos[4].info.traduccion;
        // Invertimos sustantivo y adjetivo para que el inglés quede correcto
        traduccion = `${art} ${adj} ${sus} ${ver}${sig}`;
    } else {
        // Para regla2, regla3 y regla_es_2 la traducción es lineal
        traduccion = tablaSimbolos.map(simbolo => simbolo.info.traduccion).join(" ").replace(/ \./g, ".");
    }

    // --- MANEJO DE MAYÚSCULAS Y MINÚSCULAS ---
    const originalLimpio = textoOriginal.trim();
    const tieneLetras = /[a-zA-ZáéíóúÁÉÍÓÚñÑ]/.test(originalLimpio);

    if (tieneLetras && originalLimpio === originalLimpio.toUpperCase()) {
        traduccion = traduccion.toUpperCase();
    } else if (tieneLetras && originalLimpio === originalLimpio.toLowerCase()) {
        traduccion = traduccion.toLowerCase();
    } else {
        traduccion = traduccion.charAt(0).toUpperCase() + traduccion.slice(1);
    }

    return traduccion;
}

module.exports = sintetizador;