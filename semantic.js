// semantic.js
function analizadorSemantico(tablaSimbolos) {
    const tablaErrores = [];

    // Para nuestra regla: <Artículo> <Adjetivo> <Sustantivo> <Verbo> <Signo>
    // Sabemos que el sustantivo está en la posición 2 y el verbo en la posición 3
    const sustantivo = tablaSimbolos[2];
    const verbo = tablaSimbolos[3];

    // Verificamos que ambos existan (por seguridad)
    if (sustantivo && verbo) {
        // Validar concordancia de número (singular vs plural)
        const numeroSustantivo = sustantivo.info.numero;
        const numeroVerbo = verbo.info.numero;

        if (numeroSustantivo !== numeroVerbo) {
            tablaErrores.push({
                tipo: "Semántico", // [cite: 56]
                ubicacion: `Entre '${sustantivo.lexema}' y '${verbo.lexema}'`, // [cite: 57]
                descripcion: `Error de concordancia: El sustantivo es '${numeroSustantivo}' pero el verbo es '${numeroVerbo}'.` // [cite: 58]
            });
        }
    }

    // Aquí se podrían agregar más reglas semánticas en el futuro (ej. concordancia de género)

    return { tablaErrores };
}

module.exports = analizadorSemantico;