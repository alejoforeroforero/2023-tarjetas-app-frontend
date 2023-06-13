let direccion = "https://jealous-tiara-bass.cyclic.app/";

async function traerCards(fx) {
  const response = await fetch(direccion);
  const responseData = await response.json();

  const allData = responseData;

  fx(allData);
}

async function traerCardsCategoria(fx, categoria) {
  const direccionCat = `${direccion}categoria/${categoria}`;
  const response = await fetch(direccionCat);
  const responseData = await response.json();

  const allData = responseData;

  fx(allData);
}

async function crearCard(card) {
  let anverso = card.anverso;
  let reverso = card.reverso;
  let categoria = card.categoria;

  const response = await fetch(direccion, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      anverso,
      reverso,
      categoria,
    }),
  });

  const responseData = await response.json();

  traerCards(pintarCards);
}

async function borrarCard(id) {
  const borrarDireccion = `${direccion}${id}`;

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

  const editarDireccion = `${direccion}${card._id}`;
  const response = await fetch(editarDireccion, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      anverso,
      reverso,
      categoria,
    }),
  });

  const responseData = await response.json();

  traerCards(pintarCards);
}
