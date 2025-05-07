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
                    width: 90%;
                    max-width: 600px;
                    margin: auto;
                    display: none; /* 🔥 Oculto por defecto */
                    opacity: 0;
                    transition: opacity 0.3s ease-in-out;
                }
                .form-container h2 {
                    text-align: center;
                    color: #333;
                }
                .form-container label {
                    display: block;
                    font-weight: bold;
                }
                .form-container input {
                    width: 100%;
                    padding: 8px;
                    margin-bottom: 10px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                }
                .form-container button {
                    width: 100%;
                    padding: 10px;
                    background: #28a745;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                }
                .form-container button:hover {
                    background: #218838;
                }
            </style>
            <div class="form-container">
                <h2>Registrar un Emprendimiento</h2>
                <label>Nombre del Evento:</label>
                <input type="text" id="event-name">
                <label>Lugar:</label>
                <input type="text" id="event-location">
                <label>Fecha de Inicio:</label>
                <input type="date" id="event-start">
                <label>Fecha de Fin:</label>
                <input type="date" id="event-end">

                <h3>Agregar Emprendimientos</h3>
                <label>Nombre:</label>
                <input type="text" id="emprendimiento-name">
                <label>Categoría:</label>
                <input type="text" id="emprendimiento-category">
                <label>Descripción:</label>
                <input type="text" id="emprendimiento-description">
                <label>Red Social:</label>
                <input type="url" id="emprendimiento-social">
                <label>Producto:</label>
                <input type="text" id="product-name">
                <label>Precio:</label>
                <input type="number" id="product-price">
                <label>Descripción del Producto:</label>
                <input type="text" id="product-description">
                <label>Imagen del Producto:</label>
                <input type="url" id="product-image">

                <button id="register-btn">Registrar Emprendimiento</button>
            </div>
        `;

        this.shadowRoot.getElementById("register-btn").addEventListener("click", () => this.registerEvent());
    }

    connectedCallback() {
        // 🔥 Capturar el botón en el documento principal cuando el DOM esté listo
        setTimeout(() => {
            const registrarBtn = document.getElementById("registrar-emprendimiento");
            if (registrarBtn) {
                registrarBtn.addEventListener("click", () => {
                    const form = this.shadowRoot.querySelector(".form-container");
                    form.style.display = "block";
                    setTimeout(() => { form.style.opacity = "1"; }, 10); // 🔥 Animación de aparición
                });
            } else {
                console.error("❌ No se encontró `#registrar-emprendimiento` en el DOM.");
            }
        }, 100);
    }

    registerEvent() {
        const name = this.shadowRoot.getElementById("event-name").value;
        const location = this.shadowRoot.getElementById("event-location").value;
        const startDate = this.shadowRoot.getElementById("event-start").value;
        const endDate = this.shadowRoot.getElementById("event-end").value;

        const emprendimiento = {
            nombre: this.shadowRoot.getElementById("emprendimiento-name").value,
            categoria: this.shadowRoot.getElementById("emprendimiento-category").value,
            descripcion: this.shadowRoot.getElementById("emprendimiento-description").value,
            redSocial: this.shadowRoot.getElementById("emprendimiento-social").value,
            producto: {
                nombre: this.shadowRoot.getElementById("product-name").value,
                precio: this.shadowRoot.getElementById("product-price").value,
                descripcion: this.shadowRoot.getElementById("product-description").value,
                foto: this.shadowRoot.getElementById("product-image").value
            }
        };

        if (!name || !location || !startDate || !endDate || !emprendimiento.nombre) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        const newEvent = { name, location, startDate, endDate, emprendimientos: [emprendimiento] };
        const events = JSON.parse(localStorage.getItem("events")) || [];
        events.push(newEvent);
        localStorage.setItem("events", JSON.stringify(events));

        document.dispatchEvent(new CustomEvent("eventsUpdated"));

        // 🔥 Ocultar el formulario después de registrar el emprendimiento
        const form = this.shadowRoot.querySelector(".form-container");
        form.style.opacity = "0";
        setTimeout(() => { form.style.display = "none"; }, 300);
    }
}

customElements.define("bussiness-registration", EventRegistration);
