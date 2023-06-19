let divCat;

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
