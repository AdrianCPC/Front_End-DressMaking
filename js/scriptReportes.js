document.addEventListener("DOMContentLoaded", () => {
    const tablaReportes = document.getElementById("cuerpoTablaReportes");
    let inicioRegistrosReportes = 1;
    let tamañoMaximoRegistrosReportes = 5;

    function obtenerReportes(inicioRegistrosReportes) {
        fetch(`https://localhost:44338/api/reporte`) // API para Reportes
            .then((response) => response.json())
            .then((data) => {
                tablaReportes.innerHTML = "";
                data.forEach((reporte) => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td class="text-center">${reporte.idReporte}</td>
                        <td class="text-center">${reporte.tipo}</td>
                        <td class="text-center">${reporte.fechaGeneracion}</td>
                        <td class="text-center">${reporte.contenido}</td>
                        <td class="text-center">${reporte.idUsuario}</td>
                        <td><a href="editarReporte.html?id=${reporte.idReporte}" class="btn btn-warning">Editar</a></td>
                        <td><button id="borrarReporteBtn" value=${reporte.idReporte} class="btn btn-danger">Eliminar</button></td>
                    `;
                    tablaReportes.appendChild(row);
                });
            })
            .catch((error) =>
                console.error("Error al obtener datos de la API (Reportes):", error)
            );
    }

    obtenerReportes(inicioRegistrosReportes);

    // Paginación para Reportes
    document.getElementById("paginaAnteriorReportes").addEventListener("click", () => {
        if (inicioRegistrosReportes > 1) {
            inicioRegistrosReportes--;
            obtenerReportes(inicioRegistrosReportes);
        }
    });

    document.getElementById("paginaSiguienteReportes").addEventListener("click", () => {
        inicioRegistrosReportes++;
        obtenerReportes(inicioRegistrosReportes);
    });

    // Eventos de los botones "Editar Reporte" y "Eliminar Reporte"
    tablaReportes.addEventListener("click", (event) => {
        if (event.target.id === "borrarReporteBtn") {
            const confirmacion = confirm(
                "¿Estás seguro de que deseas eliminar este reporte?"
            );

            if (confirmacion) {
                fetch(`https://localhost:44338/api/reporte/${event.target.value}`, { // API para Reportes
                    method: "DELETE",
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("Error al eliminar el reporte");
                        }
                        event.target.closest("tr").remove();
                    })
                    .catch((error) =>
                        console.error("Error al eliminar reporte:", error)
                    );
            }
        }
    });
});