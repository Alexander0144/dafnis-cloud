let cuentasMainTableDataGrid1 = null;

function clearNewCuentaMainModalFields() {
  $("#nombre-titulo-nueva-cuenta-cobro-partial").val("");
  $("#tipo-de-cuenta-nueva-cuenta-cobro-partial-new").prop("selectedIndex", 0);
}

function setupMainCuentasEventListeners() {
  $("#cuentas-btn-agregar-cuenta-1").click(function (e) {
    if (e) {
      e.preventDefault();
    }
    console.log("UNIMPLEMENTED");
  });

  $("#cuentas-cobros-btn-modal-crear-nuevo").click(function (e) {
    if (e) {
      e.preventDefault();
    }
    console.log("UNIMPLEMENTED");
  });

  $("#cuentas-btn-eliminar-cuenta-1").click(function (e) {
    if (e) {
      e.preventDefault();
    }
    console.log("UNIMPLEMENTED");
  });

  $("#modalDialogueAgregarCuentaCobro").on("hidden.bs.modal", function (e) {
    if (e) {
      e.preventDefault();
    }
    clearNewCuentaMainModalFields();
  });

  // Setup row select

  setupDataTableSelectorRulesEventListener(
    $,
    "#cuentas-cobros-table-datagrid-1"
  );
}

$(document).ready(function () {
  setupMainCuentasEventListeners();

  // Setup DataGrid

  cuentasMainTableDataGrid1 = $("#cuentas-cobros-table-datagrid-1").DataTable({
    ajax: {
      url: "/api/cuentas-cobros",
      dataSrc: "data",
    },
    columns: [
      { data: "id" },
      { data: "folio_de_ticket" },
      { data: "nombre_cuenta" },
      { data: "tipo_de_cuenta" },
      { data: "estatus_de_cuenta" },
    ],
  });
});
