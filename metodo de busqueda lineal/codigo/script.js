// Función para guardar datos en la API
function guardarEnAPI(conteo, posicion, tiempo) {
    const url = "https://66ed0daf380821644cdb2114.mockapi.io/api/v1/Axel/folder2";

    const data = {
        conteo: conteo,
        posicion: posicion,
        tiempo: tiempo,
        fecha: new Date().toLocaleString() // Agregar fecha al guardar
    };

    // Realizar la solicitud POST
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Datos guardados en la API:", data);
        agregarFilaATabla(data); // Agregar la nueva fila a la tabla
    })
    .catch(error => {
        console.error("Error al guardar en la API:", error);
    });
}

// Función para cargar los datos desde la API al iniciar la página
function cargarDatosDeAPI() {
    const url = "https://66ed0daf380821644cdb2114.mockapi.io/api/v1/Axel/folder2";

    // Realizar la solicitud GET para obtener los datos
    fetch(url)
    .then(response => response.json())
    .then(datos => {
        datos.forEach(data => {
            agregarFilaATabla(data); // Agregar cada dato a la tabla
        });
    })
    .catch(error => {
        console.error("Error al cargar los datos de la API:", error);
    });
}

// Función para agregar una fila a la tabla
function agregarFilaATabla(data) {
    const tabla = document.getElementById("historialTabla");

    // Crear una nueva fila
    const fila = tabla.insertRow();

    // Agregar las celdas con los datos
    fila.insertCell(0).innerText = data.id;
    fila.insertCell(1).innerText = data.conteo;
    fila.insertCell(2).innerText = data.posicion;
    fila.insertCell(3).innerText = data.tiempo;
    fila.insertCell(4).innerText = data.fecha;

    // Agregar el botón de eliminar
    const celdaEliminar = fila.insertCell(5);
    const botonEliminar = document.createElement("button");
    botonEliminar.innerText = "Eliminar";
    botonEliminar.onclick = function () {
        eliminarFilaDeAPI(data.id, fila); // Eliminar de la API y de la tabla
    };
    celdaEliminar.appendChild(botonEliminar);
}

// Función para eliminar una fila de la API y de la tabla
function eliminarFilaDeAPI(id, fila) {
    const url = `https://66ed0daf380821644cdb2114.mockapi.io/api/v1/Axel/folder2/${id}`;

    // Realizar la solicitud DELETE
    fetch(url, {
        method: 'DELETE'
    })
    .then(() => {
        fila.remove(); // Eliminar la fila de la tabla
        console.log(`Fila con ID ${id} eliminada`);
    })
    .catch(error => {
        console.error("Error al eliminar el dato de la API:", error);
    });
}

// Cargar los datos cuando se carga la página
window.onload = cargarDatosDeAPI;

        
        





// cantidad de elementos a buscar
var cantidadElementos = 10000000;
let historial = {
    lineal: [],
    iterativa: [],
    recursiva: []
};


let idCounter = 0; // Contador para los IDs de las filas

function ejecucion() {
    console.log("iniciar");
    const boton = document.getElementById('boton');
    boton.disabled = true;

    // Obtener elementos del DOM
    var valorLineal = document.querySelectorAll('[id=lineal]');
    var valorIterativo = document.querySelectorAll('[id=iterativa]');
    var valorRecursivo = document.querySelectorAll('[id=recursiva]');
    var tiempoInput = document.querySelectorAll('[id=tiempo]');
    var numEcontrar = document.querySelectorAll('[id=numEncontrar]');
    var posicion = document.querySelectorAll('[id=posicion]');

    // Definir arreglos y llenado de los mismos
    var arreglo1 = new Array(cantidadElementos);
    var arreglo2 = new Array(cantidadElementos);
    var arreglo3 = new Array(cantidadElementos);
    for (let index = 0; index < cantidadElementos; index++) {
        arreglo1[index] = obtenerNumeroAleatorio();
        arreglo2[index] = obtenerNumeroAleatorio();
        arreglo3[index] = obtenerNumeroAleatorio();
    }

    // Ordenar arreglo2 y arreglo3
    arreglo2.sort((a, b) => a - b);
    arreglo3.sort((a, b) => a - b);

    // Obtener los números aleatorios para la búsqueda
    var elemento = new Array(3);
    for (let index = 0; index < 3; index++) {
        elemento[index] = obtenerNumeroAleatorio();
    }

    // Ejecución de cada búsqueda y obtención de índice y tiempo de ejecución
    var elementoBuscado = new Array(3);
    var tiempo = new Array(3);

    // Búsqueda lineal
    var inicioTiempo = performance.now();
    elementoBuscado[0] = busquedaLineal(arreglo1, elemento[0]);
    var finalTiempo = performance.now();
    tiempo[0] = finalTiempo - inicioTiempo;

    // Búsqueda binaria iterativa
    inicioTiempo = performance.now();
    elementoBuscado[1] = busquedaBinariaIterativa(arreglo2, elemento[1]);
    finalTiempo = performance.now();
    tiempo[1] = finalTiempo - inicioTiempo;

    // Búsqueda binaria recursiva
    inicioTiempo = performance.now();
    elementoBuscado[2] = busquedaBinariaRecursiva(arreglo3, elemento[2]);
    finalTiempo = performance.now();
    tiempo[2] = finalTiempo - inicioTiempo;

    // Mostrar en pantalla los resultados
    for (let index = 0; index < 10; index++) {
        valorLineal[index].innerHTML = arreglo1[index];
        valorIterativo[index].innerHTML = arreglo2[index];
        valorRecursivo[index].innerHTML = arreglo3[index];
    }

    for (let index = 0; index < 3; index++) {
        tiempoInput[index].value = tiempo[index];
        numEcontrar[index].value = elemento[index];
        posicion[index].value = elementoBuscado[index];
    }

    // Guardar los resultados en la API
    guardarEnAPI(elemento[0], elementoBuscado[0], tiempo[0]);
    guardarEnAPI(elemento[1], elementoBuscado[1], tiempo[1]);
    guardarEnAPI(elemento[2], elementoBuscado[2], tiempo[2]);

    // Acumular resultados en el historial
    historial.lineal.push(tiempo[0]);
    historial.iterativa.push(tiempo[1]);
    historial.recursiva.push(tiempo[2]);

    // Añadir a la tabla de historial
    const tabla = document.getElementById('historialTabla');
    for (let i = 0; i < 3; i++) {
        idCounter++;
        const row = tabla.insertRow(-1);
        row.insertCell(0).innerText = idCounter;
        row.insertCell(1).innerText = elemento[i];
        row.insertCell(2).innerText = elementoBuscado[i];
        row.insertCell(3).innerText = tiempo[i].toFixed(2) + ' ms';
        row.insertCell(4).innerText = new Date().toLocaleString();
        
        // Botón de eliminar
        const btnEliminar = document.createElement('button');
        btnEliminar.innerText = 'Eliminar';
        btnEliminar.onclick = function() {
            tabla.deleteRow(row.rowIndex);
        };
        row.insertCell(5).appendChild(btnEliminar);
    }

    // Graficar tiempos de ejecución
    var ctx = document.getElementById('graficaBarras').getContext('2d');
    const existingChart = Chart.getChart('graficaBarras');
    if (existingChart) {
        existingChart.destroy();
    }

    var data = {
        labels: [...Array(historial.lineal.length).keys()],
        datasets: [
            {
                label: 'Búsqueda Lineal',
                data: historial.lineal,
                borderColor: 'blue',
                borderWidth: 2,
                fill: false
            },
            {
                label: 'Búsqueda Binaria Iterativa',
                data: historial.iterativa,
                borderColor: 'green',
                borderWidth: 2,
                fill: false
            },
            {
                label: 'Búsqueda Binaria Recursiva',
                data: historial.recursiva,
                borderColor: 'red',
                borderWidth: 2,
                fill: false
            }
        ]
    };

    var miGrafico = new Chart(ctx, {
        type: 'line',
        data: data
    });

    boton.disabled = false;
    console.log("finalizado");
}



function obtenerNumeroAleatorio() {
    const numeroAleatorioDecimal = Math.random();
    const numeroAleatorio = Math.floor(numeroAleatorioDecimal * cantidadElementos) + 1;
    return numeroAleatorio;
}

function busquedaLineal(array, elementoBuscado) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === elementoBuscado) {
            return i; // Retorna el índice del elemento si se encuentra
        }
    }
    return -1; // Retorna -1 si el elemento no se encuentra en el array
}

function busquedaBinariaIterativa(array, elementoBuscado) {
    let inicio = 0;
    let fin = array.length - 1;
    while (inicio <= fin) {
        const medio = Math.floor((inicio + fin) / 2);
        if (array[medio] === elementoBuscado) {
            return medio; // Retorna el índice si el elemento se encuentra en la posición medio
        } else if (array[medio] < elementoBuscado) {
            inicio = medio + 1; // Busca en la mitad derecha del array
        } else {
            fin = medio - 1; // Busca en la mitad izquierda del array
        }
    }
    return -1; // Retorna -1 si el elemento no se encuentra en el array
}

function busquedaBinariaRecursiva(array, elementoBuscado, inicio = 0, fin = array.length - 1) {
    if (inicio > fin) {
        return -1; // Elemento no encontrado
    }
    const medio = Math.floor((inicio + fin) / 2);
    if (array[medio] === elementoBuscado) {
        return medio; // Elemento encontrado, devuelve el índice
    } else if (array[medio] < elementoBuscado) {
        return busquedaBinariaRecursiva(array, elementoBuscado, medio + 1, fin); // Busca en la mitad derecha del array
    } else {
        return busquedaBinariaRecursiva(array, elementoBuscado, inicio, medio - 1); // Busca en la mitad izquierda del array
    }
}
