document.addEventListener("DOMContentLoaded", function() {
    fetch('api.php?action=monedas')
    .then(response => response.json())
    .then(data => {
        const select = document.getElementById('moneda');
        data.forEach(moneda => {
            const option = document.createElement('option');
            option.value = moneda.tag_moneda;
            option.textContent = moneda.nombre;
            select.appendChild(option);
        });
    });

    fetch('api.php?action=bodegas')
    .then(response => response.json())
    .then(data => {
        const select = document.getElementById("bodega");
        data.forEach(bodega => {
            const option = document.createElement('option');
            option.value = bodega.id_bodega;
            option.textContent = bodega.nombre;
            select.appendChild(option);
        });
    });
});

document.getElementById("bodega").addEventListener("change", function() {
    const bodegaId = this.value;
    const sucursalSelect = document.getElementById("sucursal");
    if(!bodegaId) {
        sucursalSelect.innerHTML = '<option value=""></option>'
        sucursalSelect.disabled = true;
        return;
    }

    fetch(`api.php?action=sucursales&id_bodega=${bodegaId}`)
    .then(response => response.json())
    .then(data => {
        sucursalSelect.innerHTML = '<option value=""></option>';
        data.forEach(sucursal => {
            const option = document.createElement('option');
            option.value = sucursal.tag_sucursal;
            option.textContent = sucursal.nombre;
            sucursalSelect.appendChild(option);
        });
        sucursalSelect.disabled = false;
    });

});