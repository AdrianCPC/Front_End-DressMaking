document.addEventListener("DOMContentLoaded", () => {
    const tabla = document.getElementById("cuerpoTabla");
    let inicioRegistros = 1;
    let tamañoMaximoRegistros = 5;

    function obtenerUsuarios(inicioRegistros) {
        fetch(`https://localhost:44338/api/usuario`)
            .then((response) => response.json())
            .then((data) => {
                tabla.innerHTML = "";
                data.forEach((user) => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td class="text-center">${user.idUsuario}</td>
                        <td class="text-center">${user.nombreUsuario}</td>
                        <td class="text-center">${user.tipoUsuario}</td>
                        <td class="text-center">${user.FechaIngreso}</td>
                        <td><button id="editar" value=${user.idUsuario} class="btn btn-warning">Editar</button></td>
                        <td><button id="borrar" value=${user.idUsuario} class="btn btn-danger">Eliminar</button></td>
                    `;
                    tabla.appendChild(row);
                });
            })
            .catch((error) =>
                console.error("Error al obtener datos de la API:", error)
            );
    }

    obtenerUsuarios(inicioRegistros);

    // Paginación
    document.getElementById("paginaAnterior").addEventListener("click", () => {
        if (inicioRegistros > 1) {
            inicioRegistros--;
            obtenerUsuarios(inicioRegistros);
        }
    });

    document.getElementById("paginaSiguiente").addEventListener("click", () => {
        inicioRegistros++;
        obtenerUsuarios(inicioRegistros);
    });

    // Eventos de los botones "Editar" y "Eliminar"
    tabla.addEventListener("click", (event) => {
        if (event.target.id === "borrar") {
            const confirmacion = confirm(
                "¿Estás seguro de que deseas eliminar este registro?"
            );

            if (confirmacion) {
                fetch(`https://localhost:44338/api/usuario/${event.target.value}`, {
                    method: "DELETE",
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("Error al eliminar el usuario");
                        }
                        event.target.closest("tr").remove();
                    })
                    .catch((error) =>
                        console.error("Error al eliminar usuario:", error)
                    );
            }
        } else if (event.target.id === "editar") {
            // Redirigir a la página de edición con el ID del usuario
            window.location.href = `editar.html?id=${event.target.value}`;
        }
    });
});