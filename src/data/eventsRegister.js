class EventRegistration extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.shadowRoot.innerHTML = `
            <style>
                .form-container {
                    background: white;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0px 0px 5px rgba(0,0,0,0.2);
                }
            </style>
            <div class="form-container">
                <h2>Registrar un Evento</h2>
                <label>Nombre:</label>
                <input type="text" id="event-name">
                <label>Lugar:</label>
                <input type="text" id="event-location">
                <label>Fecha de Inicio:</label>
                <input type="date" id="event-start">
                <label>Fecha de Fin:</label>
                <input type="date" id="event-end">
                <button id="register-btn">Registrar</button>
            </div>
        `;

        this.shadowRoot.getElementById("register-btn").addEventListener("click", () => this.registerEvent());
    }

    registerEvent() {
        const name = this.shadowRoot.getElementById("event-name").value;
        const location = this.shadowRoot.getElementById("event-location").value;
        const startDate = this.shadowRoot.getElementById("event-start").value;
        const endDate = this.shadowRoot.getElementById("event-end").value;

        if (!name || !location || !startDate || !endDate) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        const newEvent = { name, location, startDate, endDate };
        const events = JSON.parse(localStorage.getItem("events")) || [];
        events.push(newEvent);
        localStorage.setItem("events", JSON.stringify(events));

        document.dispatchEvent(new Event("eventsUpdated"));
    }
}

customElements.define("event-registration", EventRegistration);
