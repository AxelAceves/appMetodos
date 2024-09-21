       // Obtener elementos
        const openModal = document.getElementById('openModal');
        const modal = document.getElementById('modal');
        const closeModal = document.getElementById('closeModal');

        // Mostrar el modal
        openModal.addEventListener('click', () => {
            modal.style.display = 'flex';
        });

        // Ocultar el modal
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Ocultar el modal si se hace clic fuera del contenido
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
 
      
      
      
      // programa hasing   
      
var codigosASCII = [];

function encriptarTexto() {
  var input = document.getElementById('encriptacion').value;
  var arrayResult = [];
  codigosASCII = []; // Reiniciar para cada nuevo input

  for (var i = 0; i < input.length; i++) {
    var char = input.charAt(i);
    var charCode = char.charCodeAt(0);
    var obj = {};
    obj[charCode] = char;
    codigosASCII.push(obj);
    arrayResult.push(charCode); // Agregar todos los códigos ASCII
  }

  arrayResult.sort(function(a, b) {
    return a - b;
  });

  var result = "{}";

  if (codigosASCII.length > 0) {
    result = "{";
    for (var i = 0; i < codigosASCII.length; i++) {
      var key = Object.keys(codigosASCII[i])[0];
      result += '"' + key + '": "' + codigosASCII[i][key] + '", ';
    }
    result = result.slice(0, -2) + '}'; // Elimina la última coma
  }

  var arrayOutput = 'Números ASCII alatorio : ' + (arrayResult.length > 0 ? '[' + arrayResult.join(', ') + ']' : '[]');

  document.getElementById('resultado').innerText = 'codigosASCII = ' + result + "\n\n" + arrayOutput;
}

function mostrarNumerosASCII() {
  var numeros = codigosASCII.map(function (item) {
    return Object.keys(item)[0];
  });

  var numerosString = numeros.join(", ");
  document.getElementById('resultadoNumeros').innerText = numerosString;
}

function mostrarLetrasCorrespondientes() {
  var input = document.getElementById('desencriptacion').value;
  var valores = input.split(', ');
  var letras = [];

  for (var i = 0; i < valores.length; i++) {
    var valor = parseInt(valores[i].trim());
    if (!isNaN(valor) && valor >= 0 && valor <= 255) {
      letras.push(String.fromCharCode(valor));
    }
  }

  document.getElementById('resultado2').innerText = letras.join('');
}

function desencriptarTexto() {
  var input = document.getElementById('desencriptacion').value;
  var valores = input.split(', ');
  var letras = [];

  for (var i = 0; i < valores.length; i++) {
    var valor = parseInt(valores[i].trim());
    if (!isNaN(valor) && valor >= 0 && valor <= 255) {
      letras.push(String.fromCharCode(valor));
    }
  }

  document.getElementById('resultado2').innerText = letras.join('');
}

function copiarNumerosASCII() {
  var resultadoNumeros = document.getElementById('resultadoNumeros');
  var range = document.createRange();
  range.selectNode(resultadoNumeros);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  document.execCommand('copy');
  window.getSelection().removeAllRanges();
  alert('Números ASCII copiados al portapapeles: ' + resultadoNumeros.textContent);
}
 
  
  

 class Nodo {
  constructor(id, textoOriginal, codigosASCII, numerosASCII, textoDesencriptado) {
    this.id = id;
    this.textoOriginal = textoOriginal;
    this.codigosASCII = codigosASCII;
    this.numerosASCII = numerosASCII;
    this.textoDesencriptado = textoDesencriptado;
    this.siguiente = null;
  }
}

var listaEnlazada = null;

function agregarNumeroAscii(id, numeroAscii) {
  var current = listaEnlazada;
  while (current !== null && current.id !== id) {
    current = current.siguiente;
  }

  if (current) {
    current.numerosASCII.push(numeroAscii);
  }
}

function guardarEnTabla() {
  var textoOriginal = document.getElementById('encriptacion').value;
  var codigosASCII = document.getElementById('resultado').innerText;
  var numerosASCII = document.getElementById('resultadoNumeros').innerText;
  var textoDesencriptado = document.getElementById('resultado2').innerText;

  // Validar que los campos no estén vacíos
  if (!textoOriginal || !codigosASCII || !numerosASCII || !textoDesencriptado) {
    alert("Por favor, complete todos los campos antes de agregar a la tabla.");
    return;
  }

  var numerosASCIIArray = numerosASCII.split(', ').map(Number); // Convertir la cadena en un array de números

    // Preparar los datos para enviar a la API
  var data = {
    "texto-original": textoOriginal,
    "codigo": codigosASCII,
    "numero": numerosASCIIArray,
    "desinciptacion": textoDesencriptado
  };

  // Hacer la solicitud POST a la API
  fetch('https://66ed0daf380821644cdb2114.mockapi.io/api/v1/Axel/folder', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Datos enviados a la API:', data);
    // Actualizar la tabla con los datos recién guardados
    agregarFilaTabla(data);
  })
  .catch(error => {
    console.error('Error al enviar datos a la API:', error);
  });
}

function agregarFilaTabla(data) {
  var cuerpoTabla = document.getElementById('cuerpoTabla');
  var newRow = cuerpoTabla.insertRow(-1);
  var newCell, newText;

  newCell = newRow.insertCell(0);
  newText = document.createTextNode(data.id);
  newCell.appendChild(newText);

  newCell = newRow.insertCell(1);
  newText = document.createTextNode(data['texto-original']);
  newCell.appendChild(newText);

  newCell = newRow.insertCell(2);
  newText = document.createTextNode(data.codigo);
  newCell.appendChild(newText);

  newCell = newRow.insertCell(3);
  newText = document.createTextNode(data.numero.join(', '));
  newCell.appendChild(newText);

  newCell = newRow.insertCell(4);
  newText = document.createTextNode(data.desinciptacion);
  newCell.appendChild(newText);

  // Añadir el botón de eliminar
  newCell = newRow.insertCell(5);
  var deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Eliminar';
  deleteBtn.onclick = function () {
    eliminarFila(newRow.rowIndex - 1, data.id); // Resta 1 porque rowIndex es 1 basado
  };
  newCell.appendChild(deleteBtn);
}

function eliminarFila(index, id) {
  var cuerpoTabla = document.getElementById('cuerpoTabla');
  cuerpoTabla.deleteRow(index);

  // Eliminar de la API
  fetch(`https://66ed0daf380821644cdb2114.mockapi.io/api/v1/Axel/folder/${id}`, {
    method: 'DELETE'
  })
  .then(() => {
    console.log('Elemento eliminado de la API');
  })
  .catch(error => {
    console.error('Error al eliminar el elemento de la API:', error);
  });
}
function cargarDatosAPI() {
  fetch('https://66ed0daf380821644cdb2114.mockapi.io/api/v1/Axel/folder')
    .then(response => response.json())
    .then(data => {
      data.forEach(item => {
        agregarFilaTabla(item);
      });
    })
    .catch(error => {
      console.error('Error al obtener los datos de la API:', error);
    });
}

// Llamar a esta función al cargar la página
window.onload = cargarDatosAPI;