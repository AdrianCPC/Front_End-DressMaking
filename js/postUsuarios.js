document.addEventListener("DOMContentLoaded", () => {
    const registrar = document.getElementById("registrar");

    registrar.addEventListener("click", (e) => {
        const nombre = document.getElementById("nombre").value;
        const telefono = document.getElementById("telefono").value;
        const correo = document.getElementById("correo").value;
        const ciudad = document.getElementById("ciudad").value;
        const fecha = document.getElementById("fecha").value;

        const data = {
            nombreUsuario: nombre,
            telefono: telefono,
            email: correo,
            ciudad: ciudad,
            FechaIngreso: fecha
        };

        fetch("https://localhost:44338/api/usuario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => {throw new Error(err.message)}); // Lanzar error con mensaje del backend
                }
                return response.json(); // Si la respuesta es ok, parsear JSON
            })
            .then(responseData => {
                console.log("Datos enviados correctamente. ID:", responseData);
                window.location.href = "usuarios.html"; // Redirigir a la página principal
            })
            .catch(error => {
                console.error("Error al enviar la solicitud:", error);
                alert("Error al registrar usuario: " + error.message); // Mostrar mensaje de error al usuario
            });
    });
});