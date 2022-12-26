function ajaxResponseLogout(response) {
  if (response && response.status === "success") {
    if (response.redirect && response.location) {
      return window.location.replace(response.location);
    }
    return window.location.replace("/");
  } else {
    return new AlertService().showErrorMessage(
      "Ha ocurrido un error, intente de nuevo más tarde"
    );
  }
}

function ajaxErrorLogout(error) {
  if (error && error.responseJSON && error.responseJSON.message) {
    const errorResponse = error.responseJSON;
    return new AlertService().showErrorMessage(errorResponse.message);
  }

  return new AlertService().showErrorMessage(
    "Ha ocurrido un error, intente de nuevo más tarde"
  );
}

function setMainLayoutEventListeners() {
  $("#dropdown-cerrar-sesion-logoff").click(function (e) {
    if (e) {
      e.preventDefault();
    }
    const http = new HttpService();

    const requestUrl = window.location.origin + "/api/session/logout";

    const callbacks = {
      success: ajaxResponseLogout,
      error: ajaxErrorLogout,
    };

    http.sendPostRequest(requestUrl, {}, callbacks);
  });
}

$(document).ready(function () {
  setMainLayoutEventListeners();
});
