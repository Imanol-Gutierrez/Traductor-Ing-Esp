// main.js
const analizadorLexico = require('./lexer');
const analizadorSintactico = require('./parser');
const analizadorSemantico = require('./semantic');
const sintetizador = require('./traductor');

function compilar(textoEntrada) {
    const resultado = {
        textoOriginal: textoEntrada,
        tablaSimbolos: [],
        errores: [],
        arbolDerivacion: null,
        traduccion: ""
    };

    // 1. Análisis Léxico
    // Nota: El lexer ya usa textoEntrada.toLowerCase(), por lo que detecta palabras
    // sin importar si las escribes en MAYÚSCULAS o minúsculas.
    const resLexico = analizadorLexico(textoEntrada);
    resultado.tablaSimbolos = resLexico.tablaSimbolos;

    if (resLexico.tablaErrores.length > 0) {
        resultado.errores = resLexico.tablaErrores;
        return resultado; 
    }

    // 2. Análisis Sintáctico
    const resSintactico = analizadorSintactico(resLexico.tablaSimbolos);
    if (resSintactico.tablaErrores.length > 0) {
        resultado.errores = resSintactico.tablaErrores;
        return resultado; 
    }
    resultado.arbolDerivacion = resSintactico.arbolDerivacion;

    // 3. Análisis Semántico (Se mantiene igual, verifica concordancia básica)
    const resSemantico = analizadorSemantico(resLexico.tablaSimbolos);
    if (resSemantico.tablaErrores.length > 0) {
        resultado.errores = resSemantico.tablaErrores;
        return resultado; 
    }

    // 4. Síntesis (Traducción con soporte de mayúsculas/minúsculas)
    resultado.traduccion = sintetizador(resLexico.tablaSimbolos, textoEntrada, resSintactico.reglaAplicada);
    
    return resultado;
}

module.exports = compilar;