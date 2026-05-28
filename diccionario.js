// diccionario.js
const diccionario = {
    // Artículos / Determinantes [cite: 25, 26]
    "the": { tipo: "articulo_definido", traduccion: "el/la", genero: "n/a", numero: "singular/plural" },
    "a": { tipo: "articulo_indefinido", traduccion: "un/una", genero: "n/a", numero: "singular" },
    
    // Sustantivos [cite: 21, 22]
    "dog": { tipo: "sustantivo", traduccion: "perro", genero: "masculino", numero: "singular" },
    "cats": { tipo: "sustantivo", traduccion: "gatos", genero: "masculino", numero: "plural" },
    
    // Adjetivos [cite: 23, 24]
    "fast": { tipo: "adjetivo_calificativo", traduccion: "rápido", genero: "n/a", numero: "n/a" },
    "black": { tipo: "adjetivo_calificativo", traduccion: "negro", genero: "n/a", numero: "n/a" },
    
    // Verbos [cite: 36, 37]
    "runs": { tipo: "verbo", traduccion: "corre", persona: "tercera", numero: "singular" },
    "sleep": { tipo: "verbo", traduccion: "duermen", persona: "tercera", numero: "plural" },
    
    // Signos de puntuación [cite: 47, 64]
    ".": { tipo: "signo_puntuacion", traduccion: "." }
};

module.exports = diccionario;