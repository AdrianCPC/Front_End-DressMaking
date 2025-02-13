document.addEventListener("DOMContentLoaded", () => {
    const btnGuardarCambiosReporteBtn = document.getElementById("guardarCambiosReporteBtn");
    const urlParams = new URLSearchParams(window.location.search);
    const idReporte = urlParams.get("id");

    const tipoReporte = document.getElementById("tipoReporte");
    const fechaGeneracionReporte = document.getElementById("fechaGeneracionReporte");
    const contenidoReporte = document.getElementById("contenidoReporte");
    const idUsuarioReporte = document.getElementById("idUsuarioReporte");


    fetch(`https://localhost:44338/api/reporte/${idReporte}`) // API para Reportes y el endpoint de obtener por ID
        .then(response => response.json())
        .then(reporte => { // Recibir un solo objeto Reporte
            tipoReporte.value = reporte.tipo;
            fechaGeneracionReporte.value = reporte.fechaGeneracion.substring(0, 10); // Formato AAAA-MM-DD
            contenidoReporte.value = reporte.contenido;
            idUsuarioReporte.value = reporte.idUsuario;
        })
        .catch(error => console.error("Error al obtener datos del reporte de la API:", error));

    btnGuardarCambiosReporteBtn.addEventListener("click", () => {
        const data = {
            idReporte: parseInt(idReporte), // Incluir el ID del reporte y convertirlo a entero
            tipo: tipoReporte.value,
            fechaGeneracion: fechaGeneracionReporte.value,
            contenido: contenidoReporte.value,
            idUsuario: parseInt(idUsuarioReporte.value)
        };

        fetch(`https://localhost:44338/api/reporte`, { // API para Reportes (PUT sin ID en la url)
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.ok) {
                    console.log("Datos del reporte actualizados correctamente");
                    window.location.href = "reportes.html"; // Redirigir a la página de reportes
                } else {
                    console.error("Error al enviar la solicitud (actualizar reporte):", response.status);
                }
            })
            .catch(error => console.error("Error al enviar la solicitud (actualizar reporte):", error));
    });
});