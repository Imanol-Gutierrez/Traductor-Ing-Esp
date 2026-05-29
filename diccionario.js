// diccionario.js
const diccionario = {
    // --- INGLÉS A ESPAÑOL ---
    "the": { tipo: "articulo_definido", traduccion: "el/la", genero: "n/a", numero: "singular/plural" },
    "a": { tipo: "articulo_indefinido", traduccion: "un/una", genero: "n/a", numero: "singular" },
    "an": { tipo: "articulo_indefinido", traduccion: "un/una", genero: "n/a", numero: "singular" },
    "he": { tipo: "pronombre_personal", traduccion: "él", genero: "masculino", numero: "singular" },
    "she": { tipo: "pronombre_personal", traduccion: "ella", genero: "femenino", numero: "singular" },
    "boy": { tipo: "sustantivo", traduccion: "niño", genero: "masculino", numero: "singular" }, 
    "girl": { tipo: "sustantivo", traduccion: "niña", genero: "femenino", numero: "singular" },
    "dog": { tipo: "sustantivo", traduccion: "perro", genero: "masculino", numero: "singular" },
    "apple": { tipo: "sustantivo", traduccion: "manzana", genero: "femenino", numero: "singular" },
    "black": { tipo: "adjetivo_calificativo", traduccion: "negro", genero: "n/a", numero: "n/a" },
    "small": { tipo: "adjetivo_calificativo", traduccion: "pequeño", genero: "n/a", numero: "n/a" },
    "runs": { tipo: "verbo", traduccion: "corre", persona: "tercera", numero: "singular" },
    "eats": { tipo: "verbo", traduccion: "come", persona: "tercera", numero: "singular" },
    "tomorrow": { tipo: "adverbio_tiempo", traduccion: "mañana", genero: "n/a", numero: "n/a" }, 
    "and": { tipo: "conjuncion_coordinante", traduccion: "y", genero: "n/a", numero: "n/a" },

    // --- ESPAÑOL A INGLÉS (¡NUEVO!) ---
    "el": { tipo: "articulo_definido", traduccion: "the", genero: "masculino", numero: "singular" },
    "la": { tipo: "articulo_definido", traduccion: "the", genero: "femenino", numero: "singular" },
    "un": { tipo: "articulo_indefinido", traduccion: "a", genero: "masculino", numero: "singular" },
    "una": { tipo: "articulo_indefinido", traduccion: "a", genero: "femenino", numero: "singular" },
    "él": { tipo: "pronombre_personal", traduccion: "he", genero: "masculino", numero: "singular" },
    "ella": { tipo: "pronombre_personal", traduccion: "she", genero: "femenino", numero: "singular" },
    "niño": { tipo: "sustantivo", traduccion: "boy", genero: "masculino", numero: "singular" },
    "niña": { tipo: "sustantivo", traduccion: "girl", genero: "femenino", numero: "singular" },
    "perro": { tipo: "sustantivo", traduccion: "dog", genero: "masculino", numero: "singular" },
    "manzana": { tipo: "sustantivo", traduccion: "apple", genero: "femenino", numero: "singular" },
    "negro": { tipo: "adjetivo_calificativo", traduccion: "black", genero: "masculino", numero: "singular" },
    "pequeño": { tipo: "adjetivo_calificativo", traduccion: "small", genero: "masculino", numero: "singular" },
    "corre": { tipo: "verbo", traduccion: "runs", persona: "tercera", numero: "singular" },
    "come": { tipo: "verbo", traduccion: "eats", persona: "tercera", numero: "singular" },
    "mañana": { tipo: "adverbio_tiempo", traduccion: "tomorrow", genero: "n/a", numero: "n/a" },
    "y": { tipo: "conjuncion_coordinante", traduccion: "and", genero: "n/a", numero: "n/a" },

    // Signos de puntuación
    ".": { tipo: "signo_puntuacion", traduccion: "." }
};

module.exports = diccionario;