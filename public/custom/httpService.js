class HttpService {
  sendGetRequest(URL, headers) {
    throw new Error("Unimplemented method");
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

  sendPutRequest(URL, requestBody, headers) {
    throw new Error("Unimplemented method");
  }
}
