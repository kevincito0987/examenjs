class EventList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.shadowRoot.innerHTML = `
            <style>
                .event-container {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr); /* 🔥 Mostrar 3 eventos por fila */
                    gap: 10px;
                    width: 90%;
                    margin: auto;
                    background: white;
                    padding: 10px;
                    border-radius: 8px;
                    box-shadow: 0px 4px 10px rgba(0,0,0,0.2);
                }
                .event-card {
                    border: 1px solid #ddd;
                    padding: 8px;
                    border-radius: 5px;
                    background: #f9f9f9;
                    box-shadow: 0px 2px 6px rgba(0,0,0,0.1);
                    cursor: pointer;
                    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
                }
                .event-card:hover {
                    background: skyblue;
                    transform: translateY(-2px);
                }
                .event-actions {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 10px;
                }
                button {
                    padding: 5px 10px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                }
                button:hover {
                    opacity: 0.8;
                    transform: translateY(-2px);
                }
                .edit-btn { background-color: #f0ad4e; color: white; }
                .delete-btn { background-color: #d9534f; color: white; }
            </style>
            <h2 id="event-title">Eventos Registrados</h2>
            <div class="event-container"></div>
        `;
    }

    connectedCallback() {
        this.render();
        this.shadowRoot.addEventListener("click", (event) => {
            if (event.target.classList.contains("edit-btn")) {
                this.editEvent(event.target.dataset.index);
            } else if (event.target.classList.contains("delete-btn")) {
                this.deleteEvent(event.target.dataset.index);
            }
        });
    }

    render() {
        const events = JSON.parse(localStorage.getItem("events")) || [];
        const container = this.shadowRoot.querySelector(".event-container");

        container.innerHTML = "";
        if (events.length > 0) {
            events.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
            events.forEach((event, index) => {
                const eventCard = document.createElement("div");
                eventCard.classList.add("event-card");
                eventCard.innerHTML = `
                    <h3>${event.name}</h3>
                    <p><strong>Lugar:</strong> ${event.location}</p>
                    <p><strong>Fecha:</strong> ${event.startDate} - ${event.endDate}</p>
                    <div class="event-actions">
                        <button class="edit-btn" data-index="${index}">Editar</button>
                        <button class="delete-btn" data-index="${index}">Eliminar</button>
                    </div>
                `;
                container.appendChild(eventCard);
            });
        } else {
            container.innerHTML = `<p class="no-events">No hay eventos registrados.</p>`;
        }
    }

    editEvent(index) {
        const events = JSON.parse(localStorage.getItem("events")) || [];
        if (!events[index]) return;

        const event = events[index];

        const newName = prompt("Editar Nombre del Evento:", event.name);
        const newLocation = prompt("Editar Lugar:", event.location);
        const newStartDate = prompt("Editar Fecha de Inicio:", event.startDate);
        const newEndDate = prompt("Editar Fecha de Fin:", event.endDate);

        if (newName && newLocation && newStartDate && newEndDate) {
            events[index] = { name: newName, location: newLocation, startDate: newStartDate, endDate: newEndDate };
            localStorage.setItem("events", JSON.stringify(events));
            this.render(); // 🔥 Asegurar actualización en la interfaz
        }
    }

    deleteEvent(index) {
        const events = JSON.parse(localStorage.getItem("events")) || [];
        if (!events[index]) return;

        events.splice(index, 1);
        localStorage.setItem("events", JSON.stringify(events));
        this.render(); // 🔥 Asegurar que se refleje la eliminación
    }
}

customElements.define("event-list", EventList);
