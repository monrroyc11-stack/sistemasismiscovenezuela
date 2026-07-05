const modulos = [
    { id: "sismos", titulo: "Monitoreo Sísmico (USGS)", funcion: "cargarSismos" },
    { id: "clima", titulo: "Reporte Meteorológico", funcion: "mostrarClima" },
    { id: "protocolo", titulo: "Protocolos de Evacuación", funcion: "mostrarProtocolo" },
    { id: "directorio", titulo: "Directorio de Emergencia", funcion: "mostrarDirectorio" }
    // Puedes seguir agregando aquí hasta los 50 módulos
];

function generarMenu() {
    const nav = document.getElementById('menu-lateral');
    modulos.forEach(m => {
        const btn = document.createElement('button');
        btn.className = 'btn-nav';
        btn.innerText = m.titulo;
        btn.onclick = () => window[m.funcion]();
        nav.appendChild(btn);
    });
}

// Lógica inteligente de los módulos
async function cargarSismos() {
    const panel = document.getElementById('display-panel');
    panel.innerHTML = "<h3>Analizando actividad sísmica...</h3>";
    try {
        const res = await fetch("https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=5&minmagnitude=3");
        const data = await res.json();
        panel.innerHTML = "<h3>Sismos Recientes</h3>" + data.features.map(f => 
            `<div style="margin-bottom:15px; border-bottom:1px solid #444;">
                <strong>${f.properties.place}</strong><br>
                Magnitud: ${f.properties.mag} | ${new Date(f.properties.time).toLocaleString()}
            </div>`
        ).join("");
    } catch(e) { panel.innerHTML = "Error de conexión con sensores remotos."; }
}

function mostrarProtocolo() {
    document.getElementById('display-panel').innerHTML = `
        <h3>Protocolo de Actuación</h3>
        <ul>
            <li>Mantener calma y evaluar estructura.</li>
            <li>Identificar zonas de seguridad.</li>
            <li>No usar ascensores.</li>
            <li>Reportar al punto de encuentro AnacoEs.</li>
        </ul>`;
}

// Iniciar sistema
window.onload = generarMenu;
