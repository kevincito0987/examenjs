class Storage {
    static guardarEventos(eventos) {
        localStorage.setItem("eventos", JSON.stringify(eventos));
        document.dispatchEvent(new CustomEvent("eventosActualizados", { detail: eventos }));
    }

    static obtenerEventos() {
        return JSON.parse(localStorage.getItem("eventos")) || [];
    }
}
export default Storage;
