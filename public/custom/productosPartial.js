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
}

$(document).ready(function () {
  setupProductosPartialEventListeners();

  // Setup DataGrid

  productosDataTable1 = $("#productos-tbl-databrid-1").DataTable({
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
