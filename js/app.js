// VARIABLES
const PRESUPUESTO_USUARIO = Number(prompt("Ingrese el presupuesto Semanal: "));
const $formulario = document.querySelector("#agregar-gasto");
let cantidadPresupuesto;

// CLASES
class Presupuesto {
  constructor(presupuesto, restante) {
    this.presupuesto = presupuesto;
    this.restante = presupuesto;
  }
  presupuestoRestante(cantidad = 0) {
    return (this.restante -= cantidad);
  }
}

class Interfaz {
  insertarPresupuesto(cantidad) {
    const $spanPresupuesto = document.querySelector("span#total");
    const $spanRestante = document.querySelector("span#restante");
    $spanPresupuesto.innerHTML = `${cantidad}`;
    $spanRestante.innerHTML = `${cantidad}`;
  }

  imprimirMensaje(mensaje, tipo) {
    const divMensaje = document.createElement("div");
    divMensaje.classList.add("text-center", "alert");
    if (tipo === "error") {
      divMensaje.classList.add("alert-danger");
    } else {
      divMensaje.classList.add("alert-success");
    }
    divMensaje.appendChild(document.createTextNode(mensaje));
    document.querySelector(".primario").insertBefore(divMensaje, $formulario);

    setTimeout(() => {
      document.querySelector(".primario .alert").remove();
    }, 3000);
  }

  agregarGastoListado(nombre, gasto) {
    const $gastosListado = document.querySelector("#gastos");
    const li = document.createElement("li");
    li.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-items-baseline"
    );
    li.innerHTML = `
                    ${nombre}
                    <span class="badge badge-primary badge-pill">$${gasto}</span>
    `;
    $gastosListado.appendChild(li);
  }

  presupuestoRestante(cantidad) {
    const $spanRestante = document.querySelector("span#restante");
    const presupuestoRestanteUsuario = cantidadPresupuesto.presupuestoRestante(
      cantidad
    );
    $spanRestante.innerHTML = `${presupuestoRestanteUsuario}`;
    this.comprobarPresupuestoRestante();
  }

  comprobarPresupuestoRestante() {
    const presupuestoTotal = cantidadPresupuesto.presupuesto;
    const presupuestoRestante = cantidadPresupuesto.restante;
    if (presupuestoTotal / 4 > presupuestoRestante) {
      const $restante = document.querySelector(".restante");
      $restante.classList.remove("alert-success", "alert-warning");
      $restante.classList.add("alert-danger");
    } else if (presupuestoTotal / 2 > presupuestoRestante) {
      const $restante = document.querySelector(".restante");
      $restante.classList.remove("alert-success");
      $restante.classList.add("alert-warning");
    }
  }
}

// EVENTLISTENERS
document.addEventListener("DOMContentLoaded", () => {
  if (
    PRESUPUESTO_USUARIO === null ||
    PRESUPUESTO_USUARIO === "" ||
    isNaN(PRESUPUESTO_USUARIO) === true
  ) {
    window.location.reload();
  } else {
    cantidadPresupuesto = new Presupuesto(PRESUPUESTO_USUARIO);
    const UI = new Interfaz();
    UI.insertarPresupuesto(cantidadPresupuesto.presupuesto);
  }
});

$formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombreGasto = document.querySelector("#gasto").value;
  const nombreCantidad = Number(document.querySelector("#cantidad").value);

  const UI = new Interfaz();

  if (
    nombreGasto === "" ||
    nombreCantidad === 0 ||
    isNaN(nombreCantidad) === true
  ) {
    UI.imprimirMensaje("Hubo un error", "error");
  } else {
    UI.imprimirMensaje("Agregado", "correcto");
    UI.agregarGastoListado(nombreGasto, nombreCantidad);
    UI.presupuestoRestante(nombreCantidad);
  }
});
