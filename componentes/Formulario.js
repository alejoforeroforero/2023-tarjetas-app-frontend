let divF;
let estado;

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