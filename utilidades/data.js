let direccion = "https://jealous-tiara-bass.cyclic.app/";
//let direccion = "http://localhost:3400";

async function logear(usuario, divBg) {
  const direccionLogin = `${direccion}/api/usuarios/login`;

  const email = usuario.email;
  const password = usuario.password;

  const response = await fetch(direccionLogin, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const responseData = await response.json();

  if (responseData.usuarioData) {
    divBg.style.display = "none";

    localStorage.setItem(
      "usuarioTarjeta",
      JSON.stringify({
        usuarioId: responseData.usuarioData.id,
        usuarioEmail: responseData.usuarioData.email,
        token: responseData.usuarioData.token,
      })
    );

    pintarHeader();
    traerCards(pintarCards);
  } else {
    alert(responseData);
  }
}

async function traerCards(fx) {
  const usuarioId = JSON.parse(
    localStorage.getItem("usuarioTarjeta")
  ).usuarioId;

  const uriTarjetas = `${direccion}/api/tarjetas/usuario/${usuarioId}`;

  const response = await fetch(uriTarjetas);

  const responseData = await response.json();

  const allData = responseData;

  fx(allData);
}

async function traerCardsCategoria(fx, categoria) {
  const uriTarjetas = `${direccion}/api/tarjetas/`;
  const direccionCat = `${uriTarjetas}categoria/${categoria}`;

  const response = await fetch(direccionCat);
  const responseData = await response.json();

  const allData = responseData;

  fx(allData);
}

async function crearCard(card) {
  let anverso = card.anverso;
  let reverso = card.reverso;
  let categoria = card.categoria;
  const uriTarjetas = `${direccion}/api/tarjetas/`;
  const usuario = JSON.parse(localStorage.getItem("usuarioTarjeta")).usuarioId;

  const response = await fetch(uriTarjetas, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      anverso,
      reverso,
      categoria,
      usuario,
    }),
  });

  const responseData = await response.json();

  traerCards(pintarCards);
}

async function borrarCard(id) {
  const uriTarjetas = `${direccion}/api/tarjetas/`;
  const borrarDireccion = `${uriTarjetas}${id}`;

  const response = await fetch(borrarDireccion, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseData = await response.json();

  traerCards(pintarCards);
}

async function editarCard(card) {
  const anverso = card.anverso;
  const reverso = card.reverso;
  const categoria = card.categoria;
  const uriTarjetas = `${direccion}/api/tarjetas/`;
  const editarDireccion = `${uriTarjetas}${card._id}`;

  const usuario = JSON.parse(localStorage.getItem("usuarioTarjeta")).usuarioId;

  const response = await fetch(editarDireccion, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      anverso,
      reverso,
      categoria,
      usuario,
    }),
  });

  const responseData = await response.json();

  traerCards(pintarCards);
}
