document.addEventListener("DOMContentLoaded", () => {
    const tablaPedidos = document.getElementById("cuerpoTablaPedidos");
    let inicioRegistrosPedidos = 1;
    let tamañoMaximoRegistrosPedidos = 5;

    function obtenerPedidos(inicioRegistrosPedidos) {
        fetch(`https://localhost:44338/api/pedido`) // URL  API para Pedidos
            .then((response) => response.json())
            .then((data) => {
                tablaPedidos.innerHTML = "";
                data.forEach((pedido) => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td class="text-center">${pedido.idPedido}</td>
                        <td class="text-center">${pedido.fecha}</td>
                        <td class="text-center">${pedido.estado}</td>
                        <td class="text-center">${pedido.cantidad}</td>
                        <td class="text-center">${pedido.total}</td>
                        <td class="text-center">${pedido.idCliente}</td>
                        <td><a href="editarPedido.html?id=${pedido.idPedido}" class="btn btn-warning">Editar</a></td>
                        <td><button id="borrarPedidoBtn" value=${pedido.idPedido} class="btn btn-danger">Eliminar</button></td>
                    `;
                    tablaPedidos.appendChild(row);
                });
            })
            .catch((error) =>
                console.error("Error al obtener datos de la API (Pedidos):", error)
            );
    }

    obtenerPedidos(inicioRegistrosPedidos);

    // Paginación para Pedidos
    document.getElementById("paginaAnteriorPedidos").addEventListener("click", () => {
        if (inicioRegistrosPedidos > 1) {
            inicioRegistrosPedidos--;
            obtenerPedidos(inicioRegistrosPedidos);
        }
    });

    document.getElementById("paginaSiguientePedidos").addEventListener("click", () => {
        inicioRegistrosPedidos++;
        obtenerPedidos(inicioRegistrosPedidos);
    });

    // Eventos de los botones "Editar Pedido" y "Eliminar Pedido"
    tablaPedidos.addEventListener("click", (event) => {
        if (event.target.id === "borrarPedidoBtn") {
            const confirmacion = confirm(
                "¿Estás seguro de que deseas eliminar este pedido?"
            );

            if (confirmacion) {
                fetch(`https://localhost:44338/api/pedido/${event.target.value}`, { // URL  API para Pedidos
                    method: "DELETE",
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("Error al eliminar el pedido");
                        }
                        event.target.closest("tr").remove();
                    })
                    .catch((error) =>
                        console.error("Error al eliminar pedido:", error)
                    );
            }
        }
    });
});