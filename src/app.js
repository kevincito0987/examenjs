console.log("Esto si funciona");
import Storage from "./data/eventLocalstorageHandler.js";

document.addEventListener("DOMContentLoaded", () => {
    const eventosList = document.getElementById("eventosList");
    const emprendedoresList = document.getElementById("emprendedoresList");
    const registerEventButton = document.getElementById("register-btn1");
    const registerBusinessButton = document.getElementById("registrar-emprendimiento");
    const registrationComponent = document.getElementById("registration-component");
    const businessRegistrationComponent = document.getElementById("bussiness-registration");

    function actualizarVistaEventos() {
        eventosList.innerHTML = "";
        let eventos = Storage.obtenerEventos();

        eventos.sort((a, b) => new Date(a.fechaInicio) - new Date(b.fechaInicio));

        if (eventos.length === 0) {
            eventosList.innerHTML = `<p style="text-align:center; font-style:italic;">No hay eventos registrados.</p>`;
        } else {
            eventos.forEach(evento => {
                let eventoElement = document.createElement("evento-component");
                eventoElement.eventoData = evento;
                eventosList.appendChild(eventoElement);
            });
        }
    }

    function actualizarVistaEmprendedores() {
        emprendedoresList.innerHTML = "";
        let eventos = Storage.obtenerEventos();
        let emprendimientos = [];

        eventos.forEach(evento => {
            if (Array.isArray(evento.emprendimientos)) {
                emprendimientos = [...emprendimientos, ...evento.emprendimientos];
            }
        });

        if (emprendimientos.length === 0) {
            emprendedoresList.innerHTML = `<p style="text-align:center; font-style:italic;">No hay emprendimientos registrados.</p>`;
        } else {
            emprendimientos.forEach(emprendimiento => {
                let empElement = document.createElement("bussiness-component");
                empElement.emprendimientoData = emprendimiento;
                emprendedoresList.appendChild(empElement);
            });
        }
    }

    // 🔥 Mostrar el formulario cuando el usuario haga clic en "Registrar Eventos"
    registerEventButton.addEventListener("click", (event) => {
        event.preventDefault();
        registrationComponent.style.display = "block";
    });

    // 🔥 Mostrar el formulario cuando el usuario haga clic en "Registrar Emprendimiento"
    registerBusinessButton.addEventListener("click", (event) => {
        event.preventDefault();
        if (businessRegistrationComponent) {
            businessRegistrationComponent.style.display = "block";
        } else {
            console.error("❌ `bussiness-registration` no se encuentra en el DOM.");
        }
    });

    // 🔥 Capturar el evento cuando se registra un nuevo evento
    document.addEventListener("eventsUpdated", () => {
        let eventos = Storage.obtenerEventos();
        if (eventos.length === 0) return;

        const nuevoEvento = eventos[eventos.length - 1]; // Último evento registrado
        let eventoElement = document.createElement("evento-component");
        eventoElement.eventoData = nuevoEvento;

        // 🔥 Animación: desplazamos los eventos anteriores hacia abajo
        eventosList.childNodes.forEach(card => {
            card.style.transform = "translateY(50px)";
            setTimeout(() => card.style.transform = "translateY(0)", 300);
        });

        // 🔥 Insertar el nuevo evento al inicio de la lista
        eventosList.prepend(eventoElement);
    });

    // 🔥 Capturar el evento cuando se registra un nuevo emprendimiento
    document.addEventListener("eventsUpdated", () => {
        let eventos = Storage.obtenerEventos();
        let emprendimientos = [];

        eventos.forEach(evento => {
            if (Array.isArray(evento.emprendimientos)) {
                emprendimientos = [...emprendimientos, ...evento.emprendimientos];
            }
        });

        if (emprendimientos.length > 0) {
            const nuevoEmprendimiento = emprendimientos[emprendimientos.length - 1]; // Último agregado
            let empElement = document.createElement("bussiness-component");
            empElement.emprendimientoData = nuevoEmprendimiento;

            // 🔥 Animación: desplazamos los emprendimientos anteriores hacia abajo
            emprendedoresList.childNodes.forEach(card => {
                card.style.transform = "translateY(50px)";
                setTimeout(() => card.style.transform = "translateY(0)", 300);
            });

            // 🔥 Insertar el nuevo emprendimiento al inicio de la lista
            emprendedoresList.prepend(empElement);
        }
    });

    actualizarVistaEventos();
    actualizarVistaEmprendedores();
});
