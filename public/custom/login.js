function switchToSessionFundsTab() {
  $("#session-funds-tab").tab("show");
}

function switchToInitialLoginAuthTab() {
  $("#login-tab").tab("show");
}

function getFirstLoginFormValues() {
  const username = $("#login-user-1").val() || "";
  const password = $("#login-password-1").val() || "";

  return { username, password };
}

function ajaxResponseValidateCredentials(response) {
  console.log(response);
  if (response && response.status === "success") {
    return switchToSessionFundsTab();
  } else {
    return new AlertService().showErrorMessage(
      "Ha ocurrido un error, intente de nuevo ms tarde"
    );
  }
}

function ajaxErrorValidateCredentials(error) {
  const errorResponse = error.responseJSON;

  if (errorResponse && errorResponse.message) {
    return new AlertService().showErrorMessage(errorResponse.message);
  }

  return new AlertService().showErrorMessage(
    "Ha ocurrido un error, intente de nuevo ms tarde"
  );
}

function setLoginEventListeners() {
  $("#login-btn-submit").click(function (e) {
    if (e) {
      e.preventDefault();
    }

    const loginData = getFirstLoginFormValues();

    const http = new HttpService();

    const requestUrl = window.location.origin + "/api/session/authenticate";

    const requestBody = {
      user: loginData.username,
      password: loginData.password,
    };

    const callbacks = {
      success: ajaxResponseValidateCredentials,
      error: ajaxErrorValidateCredentials,
    };

    http.sendPostRequest(requestUrl, requestBody, callbacks);
  });

  $("#cancel-login-btn-submit").click(function (e) {
    if (e) {
      e.preventDefault();
    }
    switchToInitialLoginAuthTab();
  });
}

$(document).ready(function () {
  setLoginEventListeners();
});
