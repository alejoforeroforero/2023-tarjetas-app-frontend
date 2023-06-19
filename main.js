let header;
let main;

function correr() {
  header = tag("header", document.body);
  main = tag("main", document.body);

  pintarTarjetas();
}

function pintarTarjetas() {
  header.innerHTML = "";
  main.innerHTML = "";

  const usuarioTarjeta = localStorage.getItem("usuarioTarjeta");

  if (!usuarioTarjeta) {
    pintarLogin();
  } else {
    pintarHeader();
    traerCards(pintarCards);
  }
}