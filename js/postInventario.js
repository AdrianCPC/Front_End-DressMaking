document.addEventListener("DOMContentLoaded", () => {
    const registrarInventarioBtn = document.getElementById("registrarInventarioBtn");

    registrarInventarioBtn.addEventListener("click", (e) => {
        const idMaterialInventario = document.getElementById("idMaterialInventario").value;
        const cantidadInventario = document.getElementById("cantidadInventario").value;


        const data = {
            idMaterial: parseInt(idMaterialInventario),
            cantidad: parseInt(cantidadInventario)
        };

        fetch("https://localhost:44338/api/inventario", { // URL  API para Inventarios
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
                console.log("Registro de inventario creado correctamente. ID:", responseData);
                window.location.href = "inventarios.html"; // Redirigir a la página de inventarios
            })
            .catch(error => {
                console.error("Error al enviar la solicitud (registrar inventario):", error);
                alert("Error al registrar inventario: " + error.message); // Mostrar mensaje de error al usuario
            });
    });
});