const inputNombre = document.getElementById("inputNombre");
const inputApellido = document.getElementById("inputApellido");
const inputCorreo = document.getElementById("inputCorreo");
const inputCantidad = document.getElementById("cantidad");
const inputCategoria = document.getElementById("categoria");
const submit = document.getElementById("submit");
const reset = document.getElementById("reset");

reset.addEventListener("click", () => {
    document.querySelectorAll('.invalid-feedback').forEach(e => e.remove());
    document.querySelectorAll('.is-invalid').forEach(e => e.classList.remove('is-invalid'));
} );
submit.addEventListener("click", validacionFormulario);

function validacionFormulario() {
    /* Limpia mensajes anteriores de error */
    document.querySelectorAll('.invalid-feedback').forEach(e => e.remove());

    /* comprueba que no este vacio, y que solo contenga letras y/o espacios en blanco */
    validacionNombre(inputNombre);
    validacionNombre(inputApellido);

    /* comprueba que no este vacio, y que tenga el formato correcto */
    validacionCorreo(inputCorreo);

   /* comprueba que no este vacio, y que solo contenga numeros */
    validacionCantidad(inputCantidad);

    obtenerTotal();
}

function crearMensajeError(input, mensaje) {
    input.classList.add('is-invalid');

    const divElement = document.createElement('div');
    divElement.classList.add('invalid-feedback');
    divElement.textContent = mensaje;
    input.after(divElement);
}

function validacionNombre(input) {
    const valueNombre = input.value.trim();
    const regex = /[a-zA-Z\s]/g;

    if(!valueNombre) {
        crearMensajeError(input, 'No puede estar vacio');
        return false;
    } else if(valueNombre.match(regex) === null || valueNombre.match(regex).length !== valueNombre.length) {
        crearMensajeError(input, "No debe contener números ni simbolos extraños");
        return false;
    } else {
        return true;
    }
}

function validacionCorreo(input) {
    const valueCorreo = input.value.trim();
    const regexCorreo = /^\S+@\S+\.[a-z]{2,3}$/g;

    if(!valueCorreo) {
        crearMensajeError(input, 'No puede estar vacio')
        return false;
    } else if(!regexCorreo.test(valueCorreo)) {
        crearMensajeError(input, "No tiene el formato correcto");
        return false;
    } else {
        return true;
    }
}

function validacionCantidad(input) {
    const valueCantidad = input.value.trim();
    const regexCantidad = /[0-9]/g;

    if(!valueCantidad) {
        crearMensajeError(input, 'No puede estar vacio');
        return false;
    } else if(valueCantidad.match(regexCantidad) === null || valueCantidad.match(regexCantidad).length !== valueCantidad.length || valueCantidad < 0) {
        crearMensajeError(input, "Debe ser un valor numerico positivo");
        return false;
    } else {
        return true;
    }
}

/* quitar clase de error al modificarlo */
inputNombre.addEventListener('change', (e) => e.target.classList.remove('is-invalid'));
inputApellido.addEventListener('change', (e) => e.target.classList.remove('is-invalid'));
inputCorreo.addEventListener('change', (e) => e.target.classList.remove('is-invalid'));
inputCantidad.addEventListener('change', (e) => e.target.classList.remove('is-invalid'));
inputCategoria.addEventListener('change', (e) => e.target.classList.remove('is-invalid'));

function obtenerTotal() {
    const descuentos = {
        "Sin Categoria": 0,
        "Estudiante": 0.8,
        "Trainee": 0.5,
        "Junior": 0.15
    }

    let categoria = "";
    if(inputCategoria.value === "Sin Categoria") {
        categoria = "Sin Categoria";
    } else {
        categoria = inputCategoria.options[inputCategoria.value].text;
    }
    const cantidad = inputCantidad.value;
    let total = Math.round((200 * (1 - descuentos[categoria])) * cantidad);
    console.log(total);

    if(document.querySelector('.is-invalid')) {
        return;
    } else {
        const spanTotal = document.getElementById('total');
        spanTotal.textContent = total;
    }
}

