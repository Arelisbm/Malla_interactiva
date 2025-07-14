
const materias = [
    {codigo:"M1", nombre:"Lectura comprensiva y redacción científica", nivel:1, prerequisitos:[]},
    {codigo:"M2", nombre:"Morfofisiología I", nivel:1, prerequisitos:[]},
    {codigo:"M3", nombre:"Embriología médica", nivel:1, prerequisitos:[]},
    {codigo:"M4", nombre:"Cátedra Alfaro", nivel:1, prerequisitos:[]},
    {codigo:"M5", nombre:"Histología", nivel:1, prerequisitos:[]},
    {codigo:"M6", nombre:"Socioantropología", nivel:1, prerequisitos:[]},
    {codigo:"M7", nombre:"Morfofisiología II", nivel:2, prerequisitos:["M2"]},
    {codigo:"M8", nombre:"Bioseguridad y medio ambiente", nivel:2, prerequisitos:[]},
    {codigo:"M9", nombre:"Metodología de la investigación", nivel:2, prerequisitos:["M1"]},
    {codigo:"M10", nombre:"Genética", nivel:2, prerequisitos:["M5"]},
    {codigo:"M11", nombre:"Bioquímica", nivel:2, prerequisitos:["M5"]},
    {codigo:"M12", nombre:"Fisiopatología I", nivel:3, prerequisitos:["M7"]},
    {codigo:"M13", nombre:"Biología molecular aplicada", nivel:3, prerequisitos:["M10"]},
    {codigo:"M14", nombre:"Microbiología médica", nivel:3, prerequisitos:["M8"]},
    {codigo:"M15", nombre:"Investigación basada en la evidencia", nivel:3, prerequisitos:["M9"]},
    {codigo:"M16", nombre:"Administración de salud y gerencia hospitalaria", nivel:3, prerequisitos:[]},
    {codigo:"M17", nombre:"Bioestadística aplicada", nivel:3, prerequisitos:["M9"]},
    {codigo:"M18", nombre:"Anatomía patológica", nivel:4, prerequisitos:["M5"]},
    {codigo:"M19", nombre:"Fisiopatología II", nivel:4, prerequisitos:["M12"]},
    {codigo:"M20", nombre:"Inmunología clínica", nivel:4, prerequisitos:["M13"]},
    {codigo:"M21", nombre:"Salud pública", nivel:4, prerequisitos:["M16"]},
    {codigo:"M22", nombre:"Semiotecnia y bases semiológicas", nivel:4, prerequisitos:["M12"]},
    {codigo:"M23", nombre:"Diagnóstico por imágenes", nivel:5, prerequisitos:["M22"]},
    {codigo:"M24", nombre:"Semiología", nivel:5, prerequisitos:["M22"]},
    {codigo:"M25", nombre:"Epidemiología", nivel:5, prerequisitos:["M21"]},
    {codigo:"M26", nombre:"Farmacología I", nivel:5, prerequisitos:["M19"]},
    {codigo:"M27", nombre:"Innovación y tecnología aplicadas", nivel:5, prerequisitos:[]},
    {codigo:"M28", nombre:"Preclínica", nivel:5, prerequisitos:["M22"]},
    {codigo:"M29", nombre:"Dermatología", nivel:6, prerequisitos:["M24"]},
    {codigo:"M30", nombre:"Neumología", nivel:6, prerequisitos:["M23"]},
    {codigo:"M31", nombre:"Hematología", nivel:6, prerequisitos:["M19"]},
    {codigo:"M32", nombre:"Farmacología II", nivel:6, prerequisitos:["M26"]},
    {codigo:"M33", nombre:"Gastroenterología", nivel:6, prerequisitos:["M24"]},
    {codigo:"M34", nombre:"Infectología y medicina tropical", nivel:6, prerequisitos:["M14"]},
    {codigo:"M35", nombre:"Emergencia y desastres", nivel:7, prerequisitos:[]},
    {codigo:"M36", nombre:"Endocrinología y nutrición", nivel:7, prerequisitos:["M11"]},
    {codigo:"M37", nombre:"Neurología", nivel:7, prerequisitos:["M32"]},
    {codigo:"M38", nombre:"Neurociencias y salud mental", nivel:7, prerequisitos:["M32"]},
    {codigo:"M39", nombre:"Diagnóstico clínico", nivel:7, prerequisitos:["M22","M24"]},
    {codigo:"M40", nombre:"Cardiología", nivel:7, prerequisitos:["M32"]},
    {codigo:"M41", nombre:"Nefrología", nivel:7, prerequisitos:["M32"]},
    {codigo:"M42", nombre:"Cirugía general", nivel:8, prerequisitos:["M23","M39"]},
    {codigo:"M43", nombre:"Investigación en salud", nivel:8, prerequisitos:["M17"]},
    {codigo:"M44", nombre:"Oftalmología", nivel:8, prerequisitos:["M35"]},
    {codigo:"M45", nombre:"Otorrinolaringología", nivel:8, prerequisitos:["M39"]},
    {codigo:"M46", nombre:"Traumatología y ortopedia", nivel:8, prerequisitos:["M7","M23"]},
    {codigo:"M47", nombre:"Urología", nivel:8, prerequisitos:["M24","M39"]},
    {codigo:"M48", nombre:"Análisis de casos I", nivel:8, prerequisitos:["M28"]},
    {codigo:"M49", nombre:"TIC fase de diseño", nivel:9, prerequisitos:[]},
    {codigo:"M50", nombre:"Análisis de casos II", nivel:9, prerequisitos:["M48"]},
    {codigo:"M51", nombre:"Geriatría y gerontología", nivel:9, prerequisitos:["M36","M48"]},
    {codigo:"M52", nombre:"Bioética", nivel:9, prerequisitos:["M43"]},
    {codigo:"M53", nombre:"Medicina paliativa", nivel:9, prerequisitos:["M36"]},
    {codigo:"M54", nombre:"Pediatría", nivel:9, prerequisitos:["M36","M48"]},
    {codigo:"M55", nombre:"Neonatología", nivel:10, prerequisitos:["M54"]},
    {codigo:"M56", nombre:"Medicina legal", nivel:10, prerequisitos:["M52"]},
    {codigo:"M57", nombre:"Análisis de casos III", nivel:10, prerequisitos:["M50"]},
    {codigo:"M58", nombre:"Obstetricia", nivel:10, prerequisitos:["M54"]},
    {codigo:"M59", nombre:"Ginecología", nivel:10, prerequisitos:["M54"]},
    {codigo:"M60", nombre:"TIC fase de resultados", nivel:10, prerequisitos:["M49"]},
    {codigo:"M61", nombre:"Internado rotativo", nivel:11, prerequisitos:["M60"]}
];

const malla = document.getElementById('malla');
const niveles = {};
materias.forEach(m => {
    if (!niveles[m.nivel]) niveles[m.nivel] = [];
    niveles[m.nivel].push(m);
});

for (let n in niveles) {
    const col = document.createElement("div");
    col.className = "semestre";
    col.innerHTML = `<h2>Nivel ${n}</h2>`;
    niveles[n].forEach(m => {
        const div = document.createElement("div");
        div.className = "materia";
        div.id = m.codigo;
        div.textContent = m.nombre;
        div.onclick = () => completarMateria(m.codigo);
        col.appendChild(div);
    });
    malla.appendChild(col);
}

function desbloquear() {
    materias.forEach(m => {
        const div = document.getElementById(m.codigo);
        if (m.prerequisitos.length === 0 || m.prerequisitos.every(pr => document.getElementById(pr).classList.contains("completada"))) {
            div.classList.add("activa");
        } else {
            div.classList.remove("activa");
        }
    });
}

function completarMateria(codigo) {
    const div = document.getElementById(codigo);
    if (div.classList.contains("activa")) {
        div.classList.toggle("completada");
        desbloquear();
    }
}

desbloquear();
