document.addEventListener("DOMContentLoaded", () => {
    const registrarReporteBtn = document.getElementById("registrarReporteBtn");

    registrarReporteBtn.addEventListener("click", (e) => {
        const tipoReporte = document.getElementById("tipoReporte").value;
        const fechaGeneracionReporte = document.getElementById("fechaGeneracionReporte").value;
        const contenidoReporte = document.getElementById("contenidoReporte").value;
        const idUsuarioReporte = document.getElementById("idUsuarioReporte").value;


        const data = {
            tipo: tipoReporte,
            fechaGeneracion: fechaGeneracionReporte,
            contenido: contenidoReporte,
            idUsuario: parseInt(idUsuarioReporte)
        };

        fetch("https://localhost:44338/api/reporte", { // URL  API para Reportes
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => { throw new Error(err.message) }); // Lanzar error con mensaje del backend
                }
                return response.json(); // Si la respuesta es ok, parsear JSON
            })
            .then(responseData => {
                console.log("Reporte registrado correctamente. ID:", responseData);
                window.location.href = "reportes.html"; // Redirigir a la página de reportes
            })
            .catch(error => {
                console.error("Error al enviar la solicitud (registrar reporte):", error);
                alert("Error al registrar reporte: " + error.message); // Mostrar mensaje de error al usuario
            });
    });
});