class AlertService {
  showSuccessMessage(message) {
    Swal.fire({
      icon: "success",
      title: "Ok",
      text: message,
    });
  }

  showErrorMessage(message) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: message,
    });
  }

  showInfoMessage(message) {
    Swal.fire({
      icon: "info",
      title: "Importante",
      text: message,
    });
  }
}
