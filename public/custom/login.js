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
  if (response && response.status === "success") {
    return switchToSessionFundsTab();
  } else {
    return new AlertService().showErrorMessage(
      "Ha ocurrido un error, intente de nuevo más tarde"
    );
  }
}

function ajaxResponseLogin(response) {
  if (response && response.status === "success") {
    if (response.redirect) {
      return window.location.replace("/home");
    }
    return window.location.replace("/");
  } else {
    return new AlertService().showErrorMessage(
      "Ha ocurrido un error, intente de nuevo más tarde"
    );
  }
}

function ajaxErrorValidateCredentials(error) {
  const errorResponse = error.responseJSON;

  if (errorResponse && errorResponse.message) {
    return new AlertService().showErrorMessage(errorResponse.message);
  }

  return new AlertService().showErrorMessage(
    "Ha ocurrido un error, intente de nuevo más tarde"
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

  $("#continue-finnish-login-btn-submit").click(function (e) {
    if (e) {
      e.preventDefault();
    }

    const loginData = getFirstLoginFormValues();

    const http = new HttpService();

    const requestUrl = window.location.origin + "/api/session/login";

    const _initialSessionFundsRaw = $("#login-initial-funds-1").val() || 0;
    const initialSessionFunds = parseInt(_initialSessionFundsRaw);

    const requestBody = {
      user: loginData.username,
      password: loginData.password,
      fondosIniciales: initialSessionFunds,
    };

    const callbacks = {
      success: ajaxResponseLogin,
      error: ajaxErrorValidateCredentials,
    };

    http.sendPostRequest(requestUrl, requestBody, callbacks);
  });
}

$(document).ready(function () {
  setLoginEventListeners();
});
