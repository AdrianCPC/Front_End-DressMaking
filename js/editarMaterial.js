document.addEventListener("DOMContentLoaded", () => {
    const btnGuardarCambiosMaterialBtn = document.getElementById("guardarCambiosMaterialBtn");
    const urlParams = new URLSearchParams(window.location.search);
    const idMaterial = urlParams.get("id");

    const nombreMaterial = document.getElementById("nombreMaterial");
    const tipoMaterial = document.getElementById("tipoMaterial");
    const cantidadDisponibleMaterial = document.getElementById("cantidadDisponibleMaterial");
    const precioUnitarioMaterial = document.getElementById("precioUnitarioMaterial");


    fetch(`https://localhost:44338/api/material/${idMaterial}`) //URL API para Materiales y el endpoint de obtener por ID
        .then(response => response.json())
        .then(material => { // Recibir un solo objeto Material
            nombreMaterial.value = material.nombre;
            tipoMaterial.value = material.tipo;
            cantidadDisponibleMaterial.value = material.cantidadDisponible;
            precioUnitarioMaterial.value = material.precioUnitario;
        })
        .catch(error => console.error("Error al obtener datos del material de la API:", error));

    btnGuardarCambiosMaterialBtn.addEventListener("click", () => {
        const data = {
            idMaterial: parseInt(idMaterial), 
            nombre: nombreMaterial.value,
            tipo: tipoMaterial.value,
            cantidadDisponible: parseInt(cantidadDisponibleMaterial.value),
            precioUnitario: parseFloat(precioUnitarioMaterial.value)
        };

        fetch(`https://localhost:44338/api/material`, { // URL API para Materiales (PUT sin ID en la url)
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.ok) {
                    console.log("Datos del material actualizados correctamente");
                    window.location.href = "materiales.html"; // Redirigir a la página de materiales
                } else {
                    console.error("Error al enviar la solicitud (actualizar material):", response.status);
                }
            })
            .catch(error => console.error("Error al enviar la solicitud (actualizar material):", error));
    });
});