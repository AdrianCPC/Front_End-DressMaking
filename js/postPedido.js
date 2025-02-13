document.addEventListener("DOMContentLoaded", () => {
    const registrarPedidoBtn = document.getElementById("registrarPedidoBtn");

    registrarPedidoBtn.addEventListener("click", (e) => {
        const fechaPedido = document.getElementById("fechaPedido").value;
        const estadoPedido = document.getElementById("estadoPedido").value;
        const cantidadPedido = document.getElementById("cantidadPedido").value;
        const totalPedido = document.getElementById("totalPedido").value;
        const idClientePedido = document.getElementById("idClientePedido").value;

        const data = {
            fecha: fechaPedido,
            estado: estadoPedido,
            cantidad: parseInt(cantidadPedido),
            total: parseFloat(totalPedido),
            idCliente: parseInt(idClientePedido)
        };

        fetch("https://localhost:44338/api/pedido", { //  URL API para Pedidos
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
                console.log("Pedido registrado correctamente. ID:", responseData);
                window.location.href = "pedidos.html"; // Redirigir a la página de pedidos
            })
            .catch(error => {
                console.error("Error al enviar la solicitud (registrar pedido):", error);
                alert("Error al registrar pedido: " + error.message); // Mostrar mensaje de error al usuario
            });
    });
});