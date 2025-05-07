class BussinessList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.shadowRoot.innerHTML = `
            <style>
                .bussiness-container {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr); /* 🔥 Mostrar 3 emprendimientos por fila */
                    gap: 10px;
                    width: 90%;
                    margin: auto;
                    background: white;
                    padding: 10px;
                    border-radius: 8px;
                    box-shadow: 0px 4px 10px rgba(0,0,0,0.2);
                }
                .bussiness-card {
                    border: 1px solid #ddd;
                    padding: 8px;
                    border-radius: 5px;
                    background: #f9f9f9;
                    box-shadow: 0px 2px 6px rgba(0,0,0,0.1);
                    cursor: pointer;
                    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
                }
                .bussiness-card:hover {
                    background: skyblue;
                    transform: translateY(-2px);
                }
                .bussiness-actions {
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
            <h2 id="bussiness-title">Emprendimientos Registrados</h2>
            <div class="bussiness-container"></div>
        </style>
        `;
    }

    connectedCallback() {
        this.render();
        this.shadowRoot.addEventListener("click", (event) => {
            if (event.target.classList.contains("delete-all-btn")) {
                this.deleteAllBussinesses();
            } else if (event.target.classList.contains("delete-btn")) {
                this.deleteBussiness(event.target.dataset.index);
            }
        });
    }

    render() {
        const events = JSON.parse(localStorage.getItem("events")) || [];
        const container = this.shadowRoot.querySelector(".bussiness-container");

        container.innerHTML = "";
        let emprendimientos = events.flatMap(event => Array.isArray(event.emprendimientos) ? event.emprendimientos : []);

        emprendimientos.forEach((emp, index) => {
            const bussinessCard = document.createElement("div");
            bussinessCard.classList.add("bussiness-card");
            bussinessCard.dataset.index = index;
            bussinessCard.innerHTML = `
                <h3>${emp.nombre}</h3>
                <p><strong>Categoría:</strong> ${emp.categoria}</p>
                <p>${emp.descripcion}</p>
                <p><strong>Producto:</strong> ${emp.producto.nombre} - $${emp.producto.precio}</p>
                <img src="${emp.producto.foto}" style="max-width:50px;">
                <div class="bussiness-actions">
                    <button class="delete-btn" data-index="${index}">Eliminar</button>
                </div>
            `;
            container.appendChild(bussinessCard);
        });
    }

    deleteBussiness(index) {
        const events = JSON.parse(localStorage.getItem("events")) || [];
        let emprendimientos = events.flatMap(event => Array.isArray(event.emprendimientos) ? event.emprendimientos : []);

        if (!emprendimientos[index]) return;

        this.shadowRoot.querySelector(`.bussiness-card[data-index="${index}"]`).remove();
        emprendimientos.splice(index, 1);
        events.forEach(event => event.emprendimientos = emprendimientos);

        localStorage.setItem("events", JSON.stringify(events));
        this.render();
    }

    deleteAllBussinesses() {
        if (!confirm("¿Estás seguro de que quieres eliminar todos los emprendimientos? Esta acción no se puede deshacer.")) return;

        const events = JSON.parse(localStorage.getItem("events")) || [];
        events.forEach(event => event.emprendimientos = []);

        localStorage.setItem("events", JSON.stringify(events));
        this.shadowRoot.querySelector(".bussiness-container").innerHTML = "";
    }
}

customElements.define("bussiness-list", BussinessList);