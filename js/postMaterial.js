document.addEventListener("DOMContentLoaded", () => {
    const registrarMaterialBtn = document.getElementById("registrarMaterialBtn");

    registrarMaterialBtn.addEventListener("click", (e) => {
        const nombreMaterial = document.getElementById("nombreMaterial").value;
        const tipoMaterial = document.getElementById("tipoMaterial").value;
        const cantidadDisponibleMaterial = document.getElementById("cantidadDisponibleMaterial").value;
        const precioUnitarioMaterial = document.getElementById("precioUnitarioMaterial").value;


        const data = {
            nombre: nombreMaterial,
            tipo: tipoMaterial,
            cantidadDisponible: parseInt(cantidadDisponibleMaterial),
            precioUnitario: parseFloat(precioUnitarioMaterial)
        };

        fetch("https://localhost:44338/api/material", { //URL API para Materiales
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
                console.log("Material registrado correctamente. ID:", responseData);
                window.location.href = "materiales.html"; // Redirigir a la página de materiales
            })
            .catch(error => {
                console.error("Error al enviar la solicitud (registrar material):", error);
                alert("Error al registrar material: " + error.message); // Mostrar mensaje de error al usuario
            });
    });
});