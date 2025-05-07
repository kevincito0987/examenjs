const registerEvent = () => {
    let opc = prompt(Number("Ingresa el numnero de eventos que vas a agregar: "))
    let event = {
        lugar: prompt("Indica el lugar del evento: "),
        fechaInicio: prompt("Indica la fecha de inicio del evento: "),
        fechaFinalizacion: prompt("Indica la fecha de finalizacion del evento: "),
        horarios: prompt("Indica los horarios del evento: ")
    }
    let eventosFavoritos = JSON.parse(localStorage.getItem("eventos-favoritos")) || []
    for (i=0 in opc) {
        let {...nuevoEvento} = event
        console.log("Evento guardado: ", eventoGuardado);
        let eventoGuardado = localStorage.setItem(nuevoEvento)
    }
}