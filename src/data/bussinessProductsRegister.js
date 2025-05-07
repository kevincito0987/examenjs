const registerBussinessProduct = () => {
    let productBussiness = {
        nombre: "",
        categoria: "",
        descripcion: "",
        redSocial: "",
        producto: {
            nombre: "",
            precio: "",
            descripcion: "",
            redSocial: "",
        }
    }
    for (i=0 in opc) {
        let {...nuevoEmprendimiento} = productBussiness
        console.log("Emprendimiento guardado: ", eventoGuardado);
        let eventoGuardado = localStorage.setItem(nuevoEmprendimiento)
    }
}