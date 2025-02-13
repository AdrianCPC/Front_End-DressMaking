document.addEventListener("DOMContentLoaded", () => {
    const tablaClientes = document.getElementById("cuerpoTablaClientes");
    let inicioRegistrosClientes = 1;
    let tamañoMaximoRegistrosClientes = 5;

    function obtenerClientes(inicioRegistrosClientes) {
        fetch(`https://localhost:44338/api/cliente`) 
            .then((response) => response.json())
            .then((data) => {
                tablaClientes.innerHTML = "";
                data.forEach((cliente) => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td class="text-center">${cliente.idCliente}</td>
                        <td class="text-center">${cliente.nombre}</td>
                        <td class="text-center">${cliente.direccion}</td>
                        <td class="text-center">${cliente.telefono}</td>
                        <td class="text-center">${cliente.email}</td><td><a href="editarCliente.html?id=${cliente.idCliente}" class="btn btn-warning">Editar</a></td>
                        <td><button id="borrarClienteBtn" value=${cliente.idCliente} class="btn btn-danger">Eliminar</button></td>
                    `;
                    tablaClientes.appendChild(row);
                });
            })
            .catch((error) =>
                console.error("Error al obtener datos de la API (Clientes):", error)
            );
    }

    obtenerClientes(inicioRegistrosClientes);

    // Paginación para Clientes
    document.getElementById("paginaAnteriorClientes").addEventListener("click", () => {
        if (inicioRegistrosClientes > 1) {
            inicioRegistrosClientes--;
            obtenerClientes(inicioRegistrosClientes);
        }
    });

    document.getElementById("paginaSiguienteClientes").addEventListener("click", () => {
        inicioRegistrosClientes++;
        obtenerClientes(inicioRegistrosClientes);
    });

    // Eventos de los botones "Editar Cliente" y "Eliminar Cliente"
    tablaClientes.addEventListener("click", (event) => {
        if (event.target.id === "borrarClienteBtn") {
            const confirmacion = confirm(
                "¿Estás seguro de que deseas eliminar este cliente?"
            );

            if (confirmacion) {
                fetch(`https://localhost:44338/api/cliente/${event.target.value}`, { 
                    method: "DELETE",
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("Error al eliminar el cliente");
                        }
                        event.target.closest("tr").remove();
                    })
                    .catch((error) =>
                        console.error("Error al eliminar cliente:", error)
                    );
            }
        }
    });
});