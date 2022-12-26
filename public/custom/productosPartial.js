function getNewProductModalData() {}

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
    console.log("Unimplemented");
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
});
