let datosTintas = []; 
function cargarArchivo() {
    const archivoInput = document.getElementById('archivoInput').files[0];
    if (!archivoInput) {
        console.error("No se seleccionó ningún archivo");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        
        datosTintas = XLSX.utils.sheet_to_json(worksheet, { raw: true });
        
        
        datosTintas = datosTintas.map(row => {
            const newRow = {};
            for (const key in row) {
                const cleanedKey = key.trim().toUpperCase(); 
                newRow[cleanedKey] = row[key];
            }
            return newRow;
        });
        
        console.log("Datos cargados del archivo Excel:", datosTintas);
    };
    reader.readAsArrayBuffer(archivoInput);
}

function buscarTinta() {
    const colorInput = document.getElementById('colorInput');
    if (!colorInput || !colorInput.value) {
        console.error("Campo de búsqueda vacío");
        return;
    }

    const color = colorInput.value.toLowerCase(); 
    console.log("Color buscado:", color); 

    const tableBody = document.getElementById('resultBody'); 
    tableBody.innerHTML = ''; 

   
    if (!datosTintas || datosTintas.length === 0) {
        console.error("No se han cargado los datos correctamente");
        tableBody.innerHTML = '<tr><td colspan="13">Error al cargar datos</td></tr>';
        return;
    }

    const resultados = datosTintas.filter(tinta => tinta.NOMBRE && tinta.NOMBRE.toLowerCase().includes(color));
    console.log("Resultados encontrados:", resultados); 

  
    resultados.forEach(tinta => {
      
        const row = `<tr>
            <td>${tinta['NOMBRE'] || 'N/A'}</td>
            <td>${tinta['CODIGO'] || 'N/A'}</td>
            <td>${tinta['COMPRAS O INGRESO NUEVO'] || 'N/A'}</td>
            <td>${tinta['INVENTARIO INICIAL SISTEMA'] || 'N/A'}</td>
            <td>${tinta['IMPRENTAB'] || 'N/A'}</td>
            <td>${tinta['SERVICIO DE IMPRENTA'] || 'N/A'}</td>
            <td>${tinta['TOTAL'] || 'N/A'}</td>
            <td>${tinta['VARIACIONES'] || 'N/A'}</td>
            <td>${tinta['TOTAL CONSUMIDO'] || 'N/A'}</td>
            <td>${tinta['INVENTARIO FINAL LBS'] || 'N/A'}</td>
            <td>${tinta['INVENTARIO FINAL KG'] || 'N/A'}</td>
            <td>${tinta['PEDIDO PENDIENTE DE RECIBIR'] || 'N/A'}</td>
            <td>${tinta['RENDIMIENTO PROMEDIO EN VASOS X 1KG '] || 'N/A'}</td>
            <td>${tinta['IMPRESIÓN TOTAL DE UNIDADES DE VASO IMPRESO'] || 'N/A'}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });

   
    if (resultados.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="13">No se encontraron resultados</td></tr>';
    }
}
