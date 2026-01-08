document.addEventListener('DOMContentLoaded', function(){
    document.getElementById("form").addEventListener('submit', function(event){
        event.preventDefault();

        if(validate()) {
            const formData = new FormData(this);
        
            const data = {};

            for(let[key,value] of formData.entries()) {
                if(key.endsWith("[]")) {
                    key = key.slice(0, -2);
                }
                if(key === 'precio' && value.includes(",")) {
                    value = value.replace(",",".");
                }
                if(data[key]) {
                    if(Array.isArray(data[key])) {
                        data[key].push(value);
                    } else {
                        data[key] = [data[key],value];
                    }
                } else {
                    data[key] = value;
                }
            }

            fetch('submit.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                if(data.status === "success") {
                    alert("Datos ingresados con éxito");
                    this.reset();
                    setTimeout(() => {
                       location.reload(); 
                    }, 1000);
                } else if (data.status === "error") {
                    alert(`Hubo un error al ingresar el registro en la base de datos: ${data.message}`);
                }
            })
            .catch(error => {
                console.error("Error:",error);
            });  
        }
      
    });

    function validate() {
        const codigo = document.getElementById("codigo").value.trim();
        if(codigo === '' || !codigo) {
            alert("El código del producto no puede estar vacío");
            return false;
        }
        if(codigo.length < 5 || codigo.length > 15) {
            alert("El código del producto debe tener entre 5 y 15 caracteres");
            return false;
        }
        const regexAlphNum = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/;
        if(!regexAlphNum.test(codigo)) {
            alert("El código del producto debe tener letras y números");
            return false;
        }

        checkProducto(codigo).then(resultado => {
            if (resultado.productoexiste) {
                alert("El código del producto ya está registrado");
                return false;
            }
        });

        const nombreProducto = document.getElementById("nombre").value.trim();
        if(!nombreProducto || nombreProducto === '') {
            alert("El nombre del producto no debe estar en blanco");
            return false;
        }
        if(nombreProducto.length < 2 || nombreProducto.length > 50) {
            alert("El nombre del producto debe estar entre 2 y 50 caracteres");
            return false;
        }

        let precio = document.getElementById("precio").value.trim();     

        if(!precio || precio === '') {
            alert("El precio del producto no debe estar en blanco");
            return false;
        }
        
        if(precio.includes(",")){
            precio = precio.replace(",",".");
        }
 
        const precioNum = parseFloat(precio);
        const regexDecimal = /^\d*\.?\d{1,2}$/;
        if(precioNum < 0 || !regexDecimal.test(precio)) {
            alert("El precio del producto debe ser un número positivo hasta 2 decimales");
            return false;
        }

        const bodega = document.getElementById("bodega").value.trim();
        if(!bodega || bodega === '') {
            alert("Debe seleccionar una bodega");
            return false;
        }

        const sucursal = document.getElementById("sucursal").value.trim();
        if(!sucursal || sucursal === '') {
            alert("Debe seleccionar una sucursal para la bodega seleccionada");
            return false;
        }

        const moneda = document.getElementById("moneda").value.trim();
        if(!moneda || moneda === ''){
            alert("Debe seleccionar una moneda para el producto");
            return false;
        }

        const descripcion = document.getElementById("descripcion").value.trim();
        if(!descripcion || descripcion === '') {
            alert("La descripción del producto no puede estar en blanco");
            return false;
        }
        if(descripcion.length < 10 || descripcion.length > 1000) {
            alert("La descripción del producto debe tener entre 10 y 1000 caracteres");
            return false;
        }

        const materiales = document.querySelectorAll('input[name="materiales[]"]:checked');
        if(materiales.length < 2) {
            alert("Debe seleccionar al menos dos materiales para el producto");
            return false;
        }

        return true;
    }

    async function checkProducto(codigo) {
        try {
            const response = await fetch(`api.php?action=checkproducto&codigoproducto=${codigo}`);
            const data = await response.json();
            let result = data;
            return result;
        } catch (error) {
            console.error("Error al obtener la consulta", error);
            return null;
        }
    }

});



