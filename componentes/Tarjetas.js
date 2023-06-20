function pintarCards(data) {
  ajustarHeader(data.categorias);
  ajustarCards(data.tarjetas);
}

function ajustarCards(cards) {
  main.innerHTML = "";

  const divS = tag("div", main);
  divS.className = "salir";

  const spanS = tag("span", divS);
  spanS.innerHTML = "Salir";
  spanS.addEventListener("click", () => {
    localStorage.removeItem("usuarioTarjeta");
    pintarTarjetas();
  });

  const tarjetaSeccion = tag("section", main);
  tarjetaSeccion.className = "tarjeta-seccion";

  cards
    .sort((card1, card2) => (card1 > card2 ? 1 : -1))
    .map((card) => {
      const cardObj = new Card();
      cardObj.info = card;
      cardObj.pintar(tarjetaSeccion);
    });
}

function pintarCard(el, card) {
  let front = card.front;
  let back = card.back;

  const input = tag("input", el);
  input.value = front;
  input.addEventListener("change", () => {
    front = input.value;
  });

  const inputB = tag("input", el);
  inputB.value = back;
  inputB.addEventListener("change", () => {
    back = inputB.value;
  });

  const editBtn = tag("button", el);
  editBtn.innerHTML = "Edit";
  editBtn.addEventListener("click", () => {
    editarCard(front, back, card._id);
  });

  const deleteBtn = tag("button", el);
  deleteBtn.innerHTML = "Delete";
  deleteBtn.addEventListener("click", () => {
    borrarCard(card._id);
  });
}
