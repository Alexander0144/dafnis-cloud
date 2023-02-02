class HttpService {
  sendGetRequest(URL, callbacks, headers = {}) {
    $.ajax({
      type: "GET",
      beforeSend: function (request) {
        if (headers) {
          for (key of Object.keys(headers)) {
            request.setRequestHeader(key, headers[key]);
          }
        }
      },
      url: URL,
      dataType: "json",
      success: callbacks.success,
      error: callbacks.error,
    });
  }

  sendPostRequest(URL, requestBody, callbacks, headers = {}) {
    $.ajax({
      type: "POST",
      beforeSend: function (request) {
        if (headers) {
          for (key of Object.keys(headers)) {
            request.setRequestHeader(key, headers[key]);
          }
        }
      },
      url: URL,
      data: requestBody,
      dataType: "json",
      success: callbacks.success,
      error: callbacks.error,
    });
  }

  sendJsonPostRequest(URL, requestBody, callbacks, headers = {}) {
    $.ajax({
      type: "POST",
      beforeSend: function (request) {
        if (headers) {
          for (key of Object.keys(headers)) {
            request.setRequestHeader(key, headers[key]);
          }
        }
      },
      url: URL,
      data: JSON.stringify(requestBody),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: callbacks.success,
      error: callbacks.error,
    });
  }

  sendPutRequest(URL, requestBody, headers) {
    throw new Error("Unimplemented method");
  }
}
