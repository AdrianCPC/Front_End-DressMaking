document.addEventListener("DOMContentLoaded", () => {
    const tablaInventarios = document.getElementById("cuerpoTablaInventarios");
    let inicioRegistrosInventarios = 1;
    let tamañoMaximoRegistrosInventarios = 5;

    function obtenerInventarios(inicioRegistrosInventarios) {
        fetch(`https://localhost:44338/api/inventario`) // URL  API para Inventarios
            .then((response) => response.json())
            .then((data) => {
                tablaInventarios.innerHTML = "";
                data.forEach((inventario) => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td class="text-center">${inventario.idInventario}</td>
                        <td class="text-center">${inventario.idMaterial}</td>
                        <td class="text-center">${inventario.cantidad}</td>
                        <td><a href="editarInventario.html?id=${inventario.idInventario}" class="btn btn-warning">Editar</a></td>
                        <td><button id="borrarInventarioBtn" value=${inventario.idInventario} class="btn btn-danger">Eliminar</button></td>
                    `;
                    tablaInventarios.appendChild(row);
                });
            })
            .catch((error) =>
                console.error("Error al obtener datos de la API (Inventarios):", error)
            );
    }

    obtenerInventarios(inicioRegistrosInventarios);

    // Paginación para Inventarios
    document.getElementById("paginaAnteriorInventarios").addEventListener("click", () => {
        if (inicioRegistrosInventarios > 1) {
            inicioRegistrosInventarios--;
            obtenerInventarios(inicioRegistrosInventarios);
        }
    });

    document.getElementById("paginaSiguienteInventarios").addEventListener("click", () => {
        inicioRegistrosInventarios++;
        obtenerInventarios(inicioRegistrosInventarios);
    });

    // Eventos de los botones "Editar Inventario" y "Eliminar Inventario"
    tablaInventarios.addEventListener("click", (event) => {
        if (event.target.id === "borrarInventarioBtn") {
            const confirmacion = confirm(
                "¿Estás seguro de que deseas eliminar este registro de inventario?"
            );

            if (confirmacion) {
                fetch(`https://localhost:44338/api/inventario/${event.target.value}`, { // URL  API para Inventarios
                    method: "DELETE",
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("Error al eliminar el registro de inventario");
                        }
                        event.target.closest("tr").remove();
                    })
                    .catch((error) =>
                        console.error("Error al eliminar registro de inventario:", error)
                    );
            }
        }
    });
});