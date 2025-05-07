const registerEvent = () => {
    let opc = prompt(Number("Ingresa el numero de eventos que vas a agregar: "))
    let event = {
        lugar: prompt("Indica el lugar del evento: "),
        fechaInicio: prompt("Indica la fecha de inicio del evento: "),
        fechaFinalizacion: prompt("Indica la fecha de finalizacion del evento: "),
        horarios: prompt("Indica los horarios del evento: ")
    }
    for (i=0 in opc) {
        let {...nuevoEvento} = event
        console.log("Evento guardado: ", eventoGuardado);
        let eventoGuardado = localStorage.setItem(nuevoEvento)
    }
}