let productosDataTable1 = null;

function getNewProductModalData() {
  const nombreProducto = $("#nombre-nuevo-producto-porductos-partial-form-1")
    .val()
    .trim();
  const preParsePrecioUnitario =
    $("#precio-unitario-nuevo-producto-porductos-partial-form-1")
      .val()
      .trim() || 0;
  const precioUnitario = parseFloat(preParsePrecioUnitario);
  const descripcion = $("#descripcion-nuevo-producto-productos-partial-form-1")
    .val()
    .trim();

  return {
    nombreProducto: nombreProducto,
    precioUnitario: precioUnitario,
    descripcion: descripcion,
  };
}

function clearNewProductModalFields() {
  $("#nombre-nuevo-producto-porductos-partial-form-1").val("");
  $("#precio-unitario-nuevo-producto-porductos-partial-form-1").val("");
  $("#descripcion-nuevo-producto-productos-partial-form-1").val("");
}

function setValueProductModalFields(nombre, precio, descripcion) {
  $("#nombre-editar-actualizar-producto-porductos-partial-form-2").val(nombre);
  $("#precio-unitario-editar-actualizar-producto-porductos-partial-form-2").val(
    precio
  );
  $("#descripcion-editar-actualizar-producto-productos-partial-form-2").val(
    descripcion
  );
}

function setupProductosPartialEventListeners() {
  $("#productos-btn-modal-crear-nuevo-1").click(function (e) {
    if (e) {
      e.preventDefault();
    }
    const newProductoData = getNewProductModalData();

    const http = new HttpService();

    const requestUrl = window.location.origin + "/api/productos/create";

    const callbacks = {
      success: function (response) {
        if (response) {
          if (response.status === "success") {
            $("#modalDialogueCrearProducto").modal("hide");
            productosDataTable1.ajax.reload();
            return new AlertService().showSuccessMessage(response.message);
          } else {
            return new AlertService().showErrorMessage(response.message);
          }
        } else {
          return new AlertService().showErrorMessage(
            "Ha ocurrido un error, intente de nuevo más tarde"
          );
        }
      },
      error: function (error) {
        const errorResponse = error.responseJSON;

        if (errorResponse && errorResponse.message) {
          return new AlertService().showErrorMessage(errorResponse.message);
        }

        return new AlertService().showErrorMessage(
          "Ha ocurrido un error, intente de nuevo más tarde"
        );
      },
    };

    http.sendJsonPostRequest(requestUrl, newProductoData, callbacks);
  });

  $("#modalDialogueCrearProducto").on("hidden.bs.modal", function (e) {
    if (e) {
      e.preventDefault();
    }
    clearNewProductModalFields();
  });

  $("#productos-btn-editar-producto-1").click(function (e) {
    if (e) {
      e.preventDefault();
    }
    const firstElementWithClass = $(
      "#productos-tbl-datagrid-1 .selected-row-data-grid td"
    )[0];
    let productoId = 0;
    if (firstElementWithClass) {
      try {
        productoId = parseInt(firstElementWithClass.innerText);
      } catch (error) {
        console.error(error.message);
        productoId = 0;
      }
    }
    console.log(productoId);

    const http = new HttpService();

    const requestGetUrl =
      window.location.origin + "/api/productos/" + productoId;

    const callbacks = {
      success: function (response) {
        if (response) {
          if (response.status === "success") {
            const nombre = response.data.nombre_producto;
            const precio = response.data.precio_unitario;
            const descripcion = response.data.descripcion;

            setValueProductModalFields(nombre, precio, descripcion);

            // TODO: Checar por que no funciona con jQuery
            const myModal = new bootstrap.Modal(
              document.getElementById("modalDialogueEditarActualizarProducto")
            );
            myModal.show();
          } else {
            return new AlertService().showErrorMessage(response.message);
          }
        } else {
          return new AlertService().showErrorMessage(
            "Ha ocurrido un error, intente de nuevo más tarde"
          );
        }
      },
      error: function (error) {
        const errorResponse = error.responseJSON;

        if (errorResponse && errorResponse.message) {
          return new AlertService().showErrorMessage(errorResponse.message);
        }

        return new AlertService().showErrorMessage(
          "Ha ocurrido un error, intente de nuevo más tarde"
        );
      },
    };

    http.sendGetRequest(requestGetUrl, callbacks, {});
  });

  $("#modalDialogueEditarActualizarProducto").on(
    "hidden.bs.modal",
    function (e) {
      if (e) {
        e.preventDefault();
      }
      setValueProductModalFields("", "", "");
    }
  );

  setupDataTableSelectorRulesEventListener($, "#productos-tbl-datagrid-1");
}

$(document).ready(function () {
  setupProductosPartialEventListeners();

  // Setup DataGrid

  productosDataTable1 = $("#productos-tbl-datagrid-1").DataTable({
    ajax: {
      url: "/api/productos",
      dataSrc: "data",
    },
    columns: [
      { data: "id" },
      { data: "clave_producto" },
      { data: "nombre_producto" },
      { data: "precio_unitario" },
    ],
  });
});
