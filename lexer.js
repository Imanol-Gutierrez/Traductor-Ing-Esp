// lexer.js
const diccionario = require('./diccionario');

function analizadorLexico(textoEntrada) {
    // 1. Limpiamos y normalizamos el texto
    let textoLimpio = textoEntrada.toLowerCase().trim();
    
    // 2. MAGIA DE UX: Autocompletar el punto si el usuario lo olvida
    if (!textoLimpio.endsWith('.')) {
        textoLimpio += " .";
    } else {
        // Si ya tiene punto, aseguramos que haya un espacio antes para separarlo
        textoLimpio = textoLimpio.replace(/\./g, ' .'); 
    }

    // 3. Separar por espacios
    const palabras = textoLimpio.split(/\s+/); 
    
    const tablaSimbolos = [];
    const tablaErrores = [];
    
    palabras.forEach((palabra, index) => {
        if (palabra === "") return; 
        
        if (diccionario[palabra]) {
            tablaSimbolos.push({
                lexema: palabra,
                token: diccionario[palabra].tipo,
                info: diccionario[palabra]
            });
        } else {
            tablaErrores.push({
                tipo: "Léxico",
                ubicacion: `Posición ${index + 1} ('${palabra}')`,
                descripcion: `El lexema '${palabra}' no está clasificado en el diccionario.`
            });
        }
    });
    
    return { tablaSimbolos, tablaErrores };
}

module.exports = analizadorLexico;