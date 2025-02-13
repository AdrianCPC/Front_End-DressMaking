document.addEventListener("DOMContentLoaded", () => {
    const btnGuardarCambiosPedidoBtn = document.getElementById("guardarCambiosPedidoBtn");
    const urlParams = new URLSearchParams(window.location.search);
    const idPedido = urlParams.get("id");

    const fechaPedido = document.getElementById("fechaPedido");
    const estadoPedido = document.getElementById("estadoPedido");
    const cantidadPedido = document.getElementById("cantidadPedido");
    const totalPedido = document.getElementById("totalPedido");
    const idClientePedido = document.getElementById("idClientePedido");

    fetch(`https://localhost:44338/api/pedido/${idPedido}`) // URL API para Pedidos y el endpoint de obtener por ID
        .then(response => response.json())
        .then(pedido => { // Recibir un solo objeto Pedido
            fechaPedido.value = pedido.fecha.substring(0, 10); // Formato AAAA-MM-DD
            estadoPedido.value = pedido.estado;
            cantidadPedido.value = pedido.cantidad;
            totalPedido.value = pedido.total;
            idClientePedido.value = pedido.idCliente;
        })
        .catch(error => console.error("Error al obtener datos del pedido de la API:", error));

    btnGuardarCambiosPedidoBtn.addEventListener("click", () => {
        const data = {
            idPedido: parseInt(idPedido), // Incluir el ID del pedido y convertirlo a entero
            fecha: fechaPedido.value,
            estado: estadoPedido.value,
            cantidad: parseInt(cantidadPedido.value),
            total: parseFloat(totalPedido.value),
            idCliente: parseInt(idClientePedido.value)
        };

        fetch(`https://localhost:44338/api/pedido`, { // URL API para Pedidos (PUT sin ID en la url)
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.ok) {
                    console.log("Datos del pedido actualizados correctamente");
                    window.location.href = "pedidos.html"; // Redirigir a la página de pedidos
                } else {
                    console.error("Error al enviar la solicitud (actualizar pedido):", response.status);
                }
            })
            .catch(error => console.error("Error al enviar la solicitud (actualizar pedido):", error));
    });
});