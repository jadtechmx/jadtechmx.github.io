document.getElementById("messageForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Evitar el envío predeterminado del formulario

  // Obtener los datos del formulario
  const phoneNumber = document.getElementById("phoneNumber").value;

  // Configurar los headers
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Basic "); // Coloca aquí el token si es necesario

  // Crear el cuerpo de la solicitud
  const raw = JSON.stringify({
    phoneNumber: phoneNumber,
  });

  // Configurar las opciones de la solicitud
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  // Hacer la solicitud fetch
  fetch("http://localhost:4000/api/sendmsg", requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then((result) => {
      console.log(result);
      var myModal = new bootstrap.Modal(
        document.getElementById("successModal")
      );
      myModal.show(); // Mostrar el modal de éxito
      document.getElementById("phoneNumber").value = ""; // Limpiar el campo de teléfono
    })
    .catch((error) => {
      console.error("Error:", error);
      document.getElementById("errorAlert").style.display = "block"; // Mostrar la alerta de error
      setTimeout(() => {
        document.getElementById("errorAlert").style.display = "none"; // Ocultar la alerta después de 3 segundos
      }, 3000);
      document.getElementById("phoneNumber").value = ""; // Limpiar el campo de teléfono en caso de error
    });
});
