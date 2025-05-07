const registerEvent = () => {
    let event = {
        lugar: prompt("Indica el lugar del evento: "),
        fechaInicio: prompt("Indica la fecha de inicio del evento: "),
        fechaFinalizacion: prompt("Indica la fecha de finalizacion del evento: "),
        horarios: prompt("Indica los horarios del evento: ")
    }

    let opc = prompt(Number("Ingresa el numnero de eventos que vas a agregar: "))
    let eventosFavoritos = JSON.parse(localStorage.getItem("eventos-favoritos")) || []
}