document.addEventListener("DOMContentLoaded", () => {
    const btnEditar = document.getElementById("editar");
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    const nombre = document.getElementById("nombre");
    const tipo = document.getElementById("tipo");
    //const telefono = document.getElementById("telefono");
    //const correo = document.getElementById("correo");
    //const ciudad = document.getElementById("ciudad");
    const fecha = document.getElementById("fecha");

    fetch(`https://localhost:44338/api/usuario/${id}`) // URL con el ID
        .then(response => response.json())
        .then(user => { // Recibir un solo objeto Usuario
            nombre.value = user.nombreUsuario; // Usar propiedades del modelo Usuario
            tipo.value = user.tipoUsuario;
            //telefono.value = user.telefono;
            //correo.value = user.email;
            //ciudad.value = user.ciudad;
            fecha.value = user.FechaIngreso.substring(0, 10); // Formato AAAA-MM-DD
        })
        .catch(error => console.error("Error al obtener datos de la API:", error));

    btnEditar.addEventListener("click", () => {
        const data = {
            idUsuario: parseInt(id), // Incluir el ID y convertirlo a entero
            nombreUsuario: nombre.value, // Usar propiedades del modelo Usuario
            tipoUsuario: tipo.value,
            //telefono: telefono.value,
            //email: correo.value,
            //ciudad: ciudad.value,
            FechaIngreso: fecha.value // Usar propiedades del modelo Usuario
        };

        fetch(`https://localhost:44338/api/usuario`, {  //PUT sin ID en la url
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.ok) {
                    console.log("Datos actualizados correctamente");
                    window.location.href = "usuarios.html"; // Redirigir a la página principal
                } else {
                    console.error("Error al enviar la solicitud:", response.status);
                }
            })
            .catch(error => console.error("Error al enviar la solicitud:", error));
    });
});