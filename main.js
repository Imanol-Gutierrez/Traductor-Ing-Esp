// main.js
const analizadorLexico = require('./lexer');
const analizadorSintactico = require('./parser');
const analizadorSemantico = require('./semantic');
const sintetizador = require('./traductor');

function compilar(textoEntrada) {
    // Objeto base que enviaremos a la interfaz web
    const resultado = {
        textoOriginal: textoEntrada,
        tablaSimbolos: [],
        errores: [],
        arbolDerivacion: null,
        traduccion: ""
    };

    // 1. Análisis Léxico
    const resLexico = analizadorLexico(textoEntrada);
    resultado.tablaSimbolos = resLexico.tablaSimbolos;

    if (resLexico.tablaErrores.length > 0) {
        resultado.errores = resLexico.tablaErrores;
        return resultado; // Detenemos aquí si hay error
    }

    // 2. Análisis Sintáctico
    const resSintactico = analizadorSintactico(resLexico.tablaSimbolos);
    if (resSintactico.tablaErrores.length > 0) {
        resultado.errores = resSintactico.tablaErrores;
        return resultado; // Detenemos aquí si hay error
    }
    resultado.arbolDerivacion = resSintactico.arbolDerivacion;

    // 3. Análisis Semántico
    const resSemantico = analizadorSemantico(resLexico.tablaSimbolos);
    if (resSemantico.tablaErrores.length > 0) {
        resultado.errores = resSemantico.tablaErrores;
        return resultado; // Detenemos aquí si hay error
    }

    // 4. Síntesis (Traducción)
    resultado.traduccion = sintetizador(resLexico.tablaSimbolos);
    
    return resultado;
}

module.exports = compilar;