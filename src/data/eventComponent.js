class EventComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.shadowRoot.innerHTML = `
            <style>
                .event {
                    border: 1px solid #ccc;
                    padding: 15px;
                    margin: 10px;
                    border-radius: 5px;
                    background: #fff;
                }
                .emprendimientos {
                    margin-top: 10px;
                    padding: 10px;
                    border-top: 1px solid #ccc;
                }
            </style>
            <div class="event">
                <h3 id="event-name"></h3>
                <p><strong>Lugar:</strong> <span id="event-location"></span></p>
                <p><strong>Fecha:</strong> <span id="event-start"></span> - <span id="event-end"></span></p>
                <div class="emprendimientos"></div>
            </div>
        `;
    }

    set eventData(event) {
        this.shadowRoot.getElementById("event-name").textContent = event.name;
        this.shadowRoot.getElementById("event-location").textContent = event.location;
        this.shadowRoot.getElementById("event-start").textContent = event.startDate;
        this.shadowRoot.getElementById("event-end").textContent = event.endDate;

        const emprendimientosDiv = this.shadowRoot.querySelector(".emprendimientos");
        emprendimientosDiv.innerHTML = ''; // 🔥 Limpia los emprendimientos antes de agregarlos

        // 🔥 Validación para evitar errores si `event.emprendimientos` está vacío
        if (Array.isArray(event.emprendimientos) && event.emprendimientos.length > 0) {
            event.emprendimientos.forEach(emp => {
                let empElement = document.createElement("emprendimiento-component");
                empElement.emprendimientoData = emp;
                emprendimientosDiv.appendChild(empElement);
            });
        } else {
            emprendimientosDiv.innerHTML = `<p style="font-style:italic; color:gray;">No hay emprendimientos asociados.</p>`;
        }
    }
}

customElements.define("event-component", EventComponent);
