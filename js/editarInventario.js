document.addEventListener("DOMContentLoaded", () => {
    const btnGuardarCambiosInventarioBtn = document.getElementById("guardarCambiosInventarioBtn");
    const urlParams = new URLSearchParams(window.location.search);
    const idInventario = urlParams.get("id");

    const idMaterialInventario = document.getElementById("idMaterialInventario");
    const cantidadInventario = document.getElementById("cantidadInventario");


    fetch(`https://localhost:44338/api/inventario/${idInventario}`) // URL  API para Inventarios y el endpoint de obtener por ID
        .then(response => response.json())
        .then(inventario => { // Recibir un solo objeto Inventario
            idMaterialInventario.value = inventario.idMaterial;
            cantidadInventario.value = inventario.cantidad;
        })
        .catch(error => console.error("Error al obtener datos del inventario de la API:", error));

    btnGuardarCambiosInventarioBtn.addEventListener("click", () => {
        const data = {
            idInventario: parseInt(idInventario), 
            idMaterial: parseInt(idMaterialInventario.value),
            cantidad: parseInt(cantidadInventario.value)
        };

        fetch(`https://localhost:44338/api/inventario`, { // URL API para Inventarios (PUT sin ID en la url)
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.ok) {
                    console.log("Datos del inventario actualizados correctamente");
                    window.location.href = "inventarios.html"; // Redirigir a la página de inventarios
                } else {
                    console.error("Error al enviar la solicitud (actualizar inventario):", response.status);
                }
            })
            .catch(error => console.error("Error al enviar la solicitud (actualizar inventario):", error));
    });
});