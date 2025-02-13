document.addEventListener("DOMContentLoaded", () => {
    const tablaMateriales = document.getElementById("cuerpoTablaMateriales");
    let inicioRegistrosMateriales = 1;
    let tamañoMaximoRegistrosMateriales = 5;

    function obtenerMateriales(inicioRegistrosMateriales) {
        fetch(`https://localhost:44338/api/material`) // URL API para Materiales
            .then((response) => response.json())
            .then((data) => {
                tablaMateriales.innerHTML = "";
                data.forEach((material) => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td class="text-center">${material.idMaterial}</td>
                        <td class="text-center">${material.nombre}</td>
                        <td class="text-center">${material.tipo}</td>
                        <td class="text-center">${material.cantidadDisponible}</td>
                        <td class="text-center">${material.precioUnitario}</td>
                        <td><a href="editarMaterial.html?id=${material.idMaterial}" class="btn btn-warning">Editar</a></td>
                        <td><button id="borrarMaterialBtn" value=${material.idMaterial} class="btn btn-danger">Eliminar</button></td>
                    `;
                    tablaMateriales.appendChild(row);
                });
            })
            .catch((error) =>
                console.error("Error al obtener datos de la API (Materiales):", error)
            );
    }

    obtenerMateriales(inicioRegistrosMateriales);

    // Paginación para Materiales
    document.getElementById("paginaAnteriorMateriales").addEventListener("click", () => {
        if (inicioRegistrosMateriales > 1) {
            inicioRegistrosMateriales--;
            obtenerMateriales(inicioRegistrosMateriales);
        }
    });

    document.getElementById("paginaSiguienteMateriales").addEventListener("click", () => {
        inicioRegistrosMateriales++;
        obtenerMateriales(inicioRegistrosMateriales);
    });

    // Eventos de los botones "Editar Material" y "Eliminar Material"
    tablaMateriales.addEventListener("click", (event) => {
        if (event.target.id === "borrarMaterialBtn") {
            const confirmacion = confirm(
                "¿Estás seguro de que deseas eliminar este material?"
            );

            if (confirmacion) {
                fetch(`https://localhost:44338/api/material/${event.target.value}`, { // URL API para Materiales
                    method: "DELETE",
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("Error al eliminar el material");
                        }
                        event.target.closest("tr").remove();
                    })
                    .catch((error) =>
                        console.error("Error al eliminar material:", error)
                    );
            }
        }
    });
});