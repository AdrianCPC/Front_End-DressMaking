document.addEventListener("DOMContentLoaded", () => {
    const btnGuardarCambiosCliente = document.getElementById("guardarCambiosCliente");
    const urlParams = new URLSearchParams(window.location.search);
    const idCliente = urlParams.get("id");

    const nombreCliente = document.getElementById("nombreCliente");
    const direccionCliente = document.getElementById("direccionCliente");
    const telefonoCliente = document.getElementById("telefonoCliente");
    const emailCliente = document.getElementById("emailCliente");

    fetch(`https://localhost:44338/api/cliente/${idCliente}`) 
        .then(response => response.json())
        .then(cliente => { // Recibir un solo objeto Cliente
            nombreCliente.value = cliente.nombre;
            direccionCliente.value = cliente.direccion;
            telefonoCliente.value = cliente.telefono;
            emailCliente.value = cliente.email;
        })
        .catch(error => console.error("Error al obtener datos del cliente de la API:", error));

    btnGuardarCambiosCliente.addEventListener("click", () => {
        const data = {
            idCliente: parseInt(idCliente), // Incluir el ID del cliente y convertirlo a entero
            nombre: nombreCliente.value,
            direccion: direccionCliente.value,
            telefono: telefonoCliente.value,
            email: emailCliente.value
        };

        fetch(`https://localhost:44338/api/cliente`, { 
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.ok) {
                    console.log("Datos del cliente actualizados correctamente");
                    window.location.href = "clientes.html"; // Redirigir a la página de clientes
                } else {
                    console.error("Error al enviar la solicitud (actualizar cliente):", response.status);
                }
            })
            .catch(error => console.error("Error al enviar la solicitud (actualizar cliente):", error));
    });
});