// diccionario.js
const diccionario = {
    // Artículos
    "the": { tipo: "articulo_definido", traduccion: "el/la", genero: "n/a", numero: "singular/plural" },
    "a": { tipo: "articulo_indefinido", traduccion: "un/una", genero: "n/a", numero: "singular" },
    "an": { tipo: "articulo_indefinido", traduccion: "un/una", genero: "n/a", numero: "singular" },

    // Pronombres
    "he": { tipo: "pronombre_personal", traduccion: "él", genero: "masculino", numero: "singular" },
    "she": { tipo: "pronombre_personal", traduccion: "ella", genero: "femenino", numero: "singular" },
    "it": { tipo: "pronombre_personal", traduccion: "eso", genero: "neutro", numero: "singular" },
    "they": { tipo: "pronombre_personal", traduccion: "ellos", genero: "masculino", numero: "plural" },

    // Sustantivos
    "boy": { tipo: "sustantivo", traduccion: "niño", genero: "masculino", numero: "singular" }, 
    "girl": { tipo: "sustantivo", traduccion: "niña", genero: "femenino", numero: "singular" },
    "student": { tipo: "sustantivo", traduccion: "estudiante", genero: "n/a", numero: "singular" },
    "teacher": { tipo: "sustantivo", traduccion: "profesor", genero: "masculino", numero: "singular" },
    "dog": { tipo: "sustantivo", traduccion: "perro", genero: "masculino", numero: "singular" },
    "car": { tipo: "sustantivo", traduccion: "carro", genero: "masculino", numero: "singular" },
    "apple": { tipo: "sustantivo", traduccion: "manzana", genero: "femenino", numero: "singular" },
    "book": { tipo: "sustantivo", traduccion: "libro", genero: "masculino", numero: "singular" },

    // Adjetivos 
    "fast": { tipo: "adjetivo_calificativo", traduccion: "rápido", genero: "n/a", numero: "n/a" },
    "black": { tipo: "adjetivo_calificativo", traduccion: "negro", genero: "n/a", numero: "n/a" },
    "small": { tipo: "adjetivo_calificativo", traduccion: "pequeño", genero: "n/a", numero: "n/a" },
    "happy": { tipo: "adjetivo_calificativo", traduccion: "feliz", genero: "n/a", numero: "n/a" },
    "big": { tipo: "adjetivo_calificativo", traduccion: "grande", genero: "n/a", numero: "n/a" },

    // Verbos 
    "runs": { tipo: "verbo", traduccion: "corre", persona: "tercera", numero: "singular" },
    "run": { tipo: "verbo", traduccion: "corren", persona: "tercera", numero: "plural" },
    "reads": { tipo: "verbo", traduccion: "lee", persona: "tercera", numero: "singular" },
    "eats": { tipo: "verbo", traduccion: "come", persona: "tercera", numero: "singular" },
    "buys": { tipo: "verbo", traduccion: "compra", persona: "tercera", numero: "singular" },
    "studies": { tipo: "verbo", traduccion: "estudia", persona: "tercera", numero: "singular" },
    "works": { tipo: "verbo", traduccion: "trabaja", persona: "tercera", numero: "singular" },

    // Adverbios 
    "tomorrow": { tipo: "adverbio_tiempo", traduccion: "mañana", genero: "n/a", numero: "n/a" }, 
    "today": { tipo: "adverbio_tiempo", traduccion: "hoy", genero: "n/a", numero: "n/a" }, 
    "here": { tipo: "adverbio_lugar", traduccion: "aquí", genero: "n/a", numero: "n/a" },

    // Conjunciones (¡NUEVO!)
    "and": { tipo: "conjuncion_coordinante", traduccion: "y", genero: "n/a", numero: "n/a" },

    // Signos de puntuación
    ".": { tipo: "signo_puntuacion", traduccion: "." }
};

module.exports = diccionario;