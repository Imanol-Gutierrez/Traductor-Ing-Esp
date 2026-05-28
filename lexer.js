// lexer.js
const diccionario = require('./diccionario');

function analizadorLexico(textoEntrada) {
    const textoLimpio = textoEntrada.toLowerCase().replace(/\./g, ' .');
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
            // Generar tabla de errores indicando tipo, ubicación y descripción [cite: 55, 56, 57, 58]
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