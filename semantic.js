// semantic.js
function analizadorSemantico(tablaSimbolos) {
    const tablaErrores = [];

    // Buscamos dinámicamente el sujeto (puede ser un sustantivo o un pronombre) y el verbo
    const sujeto = tablaSimbolos.find(s => s.token === "sustantivo" || s.token === "pronombre_personal");
    const verbo = tablaSimbolos.find(s => s.token === "verbo");

    if (sujeto && verbo) {
        const numeroSujeto = sujeto.info.numero;
        const numeroVerbo = verbo.info.numero;

        // Verificamos que ambos tengan número definido y si no coinciden, lanzamos error
        if (numeroSujeto !== "n/a" && numeroVerbo !== "n/a" && numeroSujeto !== numeroVerbo) {
            tablaErrores.push({
                tipo: "Semántico",
                ubicacion: `Entre '${sujeto.lexema}' y '${verbo.lexema}'`,
                descripcion: `Error de concordancia: El sujeto es '${numeroSujeto}' pero el verbo es '${numeroVerbo}'.`
            });
        }
    }

    return { tablaErrores };
}

module.exports = analizadorSemantico;