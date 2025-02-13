document.addEventListener("DOMContentLoaded", () => {
    const registrarClienteBtn = document.getElementById("registrarCliente");

    registrarClienteBtn.addEventListener("click", (e) => {
        const nombreCliente = document.getElementById("nombreCliente").value;
        const direccionCliente = document.getElementById("direccionCliente").value;
        const telefonoCliente = document.getElementById("telefonoCliente").value;
        const emailCliente = document.getElementById("emailCliente").value;

        const data = {
            nombre: nombreCliente,
            direccion: direccionCliente,
            telefono: telefonoCliente,
            email: emailCliente
        };

        fetch("https://localhost:44338/api/cliente", { 
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
                console.log("Cliente registrado correctamente. ID:", responseData);
                window.location.href = "clientes.html"; // Redirigir a la página de clientes
            })
            .catch(error => {
                console.error("Error al enviar la solicitud (registrar cliente):", error);
                alert("Error al registrar cliente: " + error.message); // Muetra mensaje de error al usuario
            });
    });
});