function pintarLogin() {
  const divBg = tag("div", document.body);
  divBg.className = "login";

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
