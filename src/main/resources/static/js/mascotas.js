// Se ejecuta cuando el HTML ha cargado por completo
$(document).ready(function () {
    listarMascotas();
});

// 1. LEER (GET): Obtiene el JSON de la API y dibuja las filas en la tabla
function listarMascotas() {
    $.ajax({
        url: '/api/mascotas',
        type: 'GET',
        dataType: 'json',
        success: function (mascotas) {
            let tbody = $('#tbodyMascotas');
            tbody.empty(); // Limpiamos la tabla antes de llenarla

            mascotas.forEach(mascota => {
                tbody.append(`
                    <tr>
                        <td class="fw-semibold">${mascota.nombre}</td>
                        <td>${mascota.edad}</td>
                        <td><span class="badge text-bg-info">${mascota.raza}</span></td>
                        <td class="text-muted">${mascota.observaciones || 'Sin observaciones'}</td>
                        <td class="text-center">
                            <button class="btn btn-primary btn-sm me-2"
                                    onclick="prepararEditar(${mascota.id}, '${mascota.nombre}', ${mascota.edad}, '${mascota.raza}', '${mascota.observaciones || ''}')">
                                <i class="bi bi-pencil-fill"></i>
                            </button>
                            <button class="btn btn-danger btn-sm"
                                    onclick="prepararEliminar(${mascota.id}, '${mascota.nombre}')">
                                <i class="bi bi-trash-fill"></i>
                            </button>
                        </td>
                    </tr>
                `);
            });
        },
        error: function (error) {
            console.error("Error al obtener el listado de mascotas:", error);
        }
    });
}

// 2. CONFIGURAR MODAL PARA NUEVA MASCOTA: Resetea el formulario
function prepararNuevo() {
    $('#modalMascotaTitle').text('Agregar Mascota');
    $('#btnGuardar').text('Agregar').removeClass('btn-primary').addClass('btn-success');
    $('#formMascota')[0].reset();
    $('#mascotaId').val(''); // Aseguramos que el ID oculto esté vacío
}

// 3. CONFIGURAR MODAL PARA EDITAR: Carga los datos de la fila seleccionada en los inputs
function prepararEditar(id, nombre, edad, raza, observaciones) {
    $('#modalMascotaTitle').text('Actualizar Mascota');
    $('#btnGuardar').text('Actualizar').removeClass('btn-success').addClass('btn-primary');

    // Inyectamos los valores en los inputs del formulario
    $('#mascotaId').val(id);
    $('#nombre').val(nombre);
    $('#edad').val(edad);
    $('#raza').val(raza);
    $('#observaciones').val(observaciones);

    // Mostramos el modal de manera manual
    $('#modalMascota').modal('show');
}

// 4. CREAR / ACTUALIZAR (POST / PUT): Envía los datos del formulario en formato JSON
function guardarMascota() {
    let id = $('#mascotaId').val();

    // Construimos el objeto con los datos capturados
    let mascotaData = {
        nombre: $('#nombre').val(),
        edad: parseInt($('#edad').val()),
        raza: $('#raza').val(),
        observaciones: $('#observaciones').val()
    };

    // Validación simple en el cliente
    if (!mascotaData.nombre || isNaN(mascotaData.edad)) {
        alert("Por favor, complete los campos de Nombre y Edad.");
        return;
    }

    let url = '/api/mascotas';
    let type = 'POST'; // Por defecto es una inserción

    // Si el ID oculto tiene un valor, significa que estamos editando un registro existente
    if (id) {
        url += '/' + id;
        type = 'PUT'; // Cambiamos el verbo HTTP a PUT para actualizar
    }

    $.ajax({
        url: url,
        type: type,
        contentType: 'application/json',
        data: JSON.stringify(mascotaData), // Convertimos el objeto JS a cadena JSON
        success: function () {
            $('#modalMascota').modal('hide'); // Cerramos el modal
            listarMascotas(); // Recargamos la tabla de inmediato sin refrescar la página entera
        },
        error: function (error) {
            console.error("Error al guardar la mascota:", error);
        }
    });
}

// 5. CONFIGURAR MODAL DE ELIMINACIÓN: Personaliza la pregunta con el nombre seleccionado
function prepararEliminar(id, nombre) {
    $('#eliminarMascotaId').val(id);
    $('#textoEliminar').text(`¿Está seguro de eliminar la mascota ${nombre}?`);
    $('#modalEliminar').modal('show');
}

// 6. ELIMINAR (DELETE): Hace la petición de borrado al servidor mediante el ID
function confirmarEliminar() {
    let id = $('#eliminarMascotaId').val();

    $.ajax({
        url: '/api/mascotas/' + id,
        type: 'DELETE',
        success: function () {
            $('#modalEliminar').modal('hide'); // Cerramos el modal de confirmación
            listarMascotas(); // Refrescamos el listado
        },
        error: function (error) {
            console.error("Error al eliminar la mascota:", error);
        }
    });
}