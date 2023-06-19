let header;
let divCat;
let main;
let divF;
let estado;
let inputI;

function correr() {
  header = tag("header", document.body);
  main = tag("main", document.body);

  pintarTarjetas();
}

function pintarTarjetas(){
  header.innerHTML = "";
  main.innerHTML = "";

  const usuarioTarjeta = localStorage.getItem("usuarioTarjeta");

  if(!usuarioTarjeta){
    pintarLogin();
  }else{
    pintarHeader();
    traerCards(pintarCards);
  }
}

function pintarLogin() {
  const divBg = tag("div", document.body);
  divBg.className = "login"

  const divI = tag("div", divBg);

  const forma = tag("form", divI);
  forma.addEventListener("submit", (e) => {
    e.preventDefault();

    const usuario = {
      email: forma.elements["email"].value,
      password: forma.elements["password"].value,
    };

    logear(usuario, divBg);
  });

  const emailI = tag("input", forma);
  emailI.name = "email";
  emailI.type = "text";

  const passwordI = tag("input", forma);
  passwordI.name = "password";
  passwordI.type = "password";

  const boton = tag("button", forma);
  boton.innerHTML = "entrar";
}

function pintarHeader() {
  divCat = tag("div", header);
  divCat.className = "div-cat";
  divCat.innerHTML = "";

  const span = tag("span", header);
  span.className = "agregar";
  span.innerHTML = "+";
  span.addEventListener("click", () => {
    pintarFormulario(null);
  });
}

function pintarCards(data) {
  ajustarHeader(data.categorias);

  ajustarCards(data.tarjetas);
}

function ajustarHeader(categorias) {
  divCat.innerHTML = "";

  const span = tag("span", divCat);
  span.className = "span-categoria todas";
  span.innerHTML = "Todas";
  span.addEventListener("click", () => {
    traerCards(pintarCards);
  });

  categorias
    .sort((cat1, cat2) => (cat1.titulo > cat2.titulo ? 1 : -1))
    .map((categoria) => {
      const span = tag("span", divCat);
      span.className = "span-categoria";
      span.innerHTML = categoria.titulo;
      span.addEventListener("click", () => {
        traerCardsCategoria(pintarCards, categoria.titulo);
      });
    });
}

function ajustarCards(cards) {
  main.innerHTML = "";

  const divS = tag("div", main);
  divS.className = "salir";

  const spanS = tag("span", divS);
  spanS.innerHTML = "Salir";
  spanS.addEventListener("click", ()=>{
    localStorage.removeItem("usuarioTarjeta");
    pintarTarjetas();
  })

  const tarjetaSeccion = tag("section", main);
  tarjetaSeccion.className = "tarjeta-seccion";

  cards
    .sort((card1, card2) => (card1.anverso > card2.anverso ? 1 : -1))
    .map((card) => {
      const cardObj = new Card();
      cardObj.info = card;
      cardObj.pintar(tarjetaSeccion);
    });
}

function pintarFormulario(data) {
  let edicion = data ? true : false;
  let card;

  if (data) {
    card = data;
  } else {
    card = {
      anverso: "",
      reverso: "",
      categoria: "",
    };
  }

  divF = tag("div", document.body);
  divF.className = "formulario";

  const divX = tag("div", divF);
  divX.className = "cerrar";
  divX.addEventListener("click", () => {
    divF.style.display = "none";
  });

  const spanX = tag("span", divX);
  spanX.innerHTML = "X";

  const form = tag("form", divF);
  form.className = "formulario-form";
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    card.anverso = form.elements["anverso"].value;
    card.reverso = form.elements["reverso"].value;
    card.categoria = form.elements["categoria"].value;

    if (estado === "crear") {
      crearCard(card);
    } else if (estado === "editar") {
      editarCard(card);
    } else {
      borrarCard(card._id);
    }
    divF.style.display = "none";
  });

  const input = tag("input", form);
  input.value = card.anverso;
  input.name = "anverso";
  input.type = "text";

  const inputB = tag("input", form);
  inputB.value = card.reverso;
  inputB.name = "reverso";
  inputB.type = "text";

  const inputC = tag("input", form);
  inputC.value = card.categoria;
  inputC.name = "categoria";
  inputC.type = "text";

  const divB = tag("div", form);

  if (edicion) {
    const buttonE = tag("button", divB);
    buttonE.type = "submit";
    buttonE.innerHTML = "Guardar";
    buttonE.addEventListener("click", () => {
      estado = "editar";
    });

    const buttonD = tag("button", divB);
    buttonD.type = "submit";
    buttonD.className = "borrar";
    buttonD.innerHTML = "Borrar";
    buttonD.addEventListener("click", () => {
      estado = "borrar";
    });
  } else {
    const button = tag("button", divB);
    button.type = "submit";
    button.innerHTML = "Crear";
    button.addEventListener("click", () => {
      estado = "crear";
    });
  }
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
