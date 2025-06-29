const databaseURL = "https://ciberseguroslp-default-rtdb.firebaseio.com/collection.json";

let sendData = () => {
    const form = document.getElementById('form');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log(form)

    // Elimina esta línea si no usas mapeo
    // data.event_type = eventTypeMap[data.event_type]; 

    data['fecha'] = new Date().toLocaleString('es-CO', { timeZone: 'America/Guayaquil' });

    fetch(databaseURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) throw new Error(`Error en la solicitud: ${response.statusText}`);
        return response.json();
    })
    .then(result => {
        alert('Agradeciendo tu preferencia, nos mantenemos actualizados y enfocados en atenderte como mereces.');
        form.reset();
    })
    .catch(error => {
        console.error(error);
        alert('Hemos experimentado un error. ¡Vuelve pronto!');
    });
};


let loaded = () => {
    const form = document.getElementById('form');
    const emailElement = document.getElementById('email');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (emailElement.value.trim() === "") {
            emailElement.focus();
            emailElement.animate([
                { transform: "translateX(0)" },
                { transform: "translateX(25px)" },
                { transform: "translateX(-25px)" },
                { transform: "translateX(0)" }
            ], {
                duration: 400,
                easing: "ease-in-out"
            });
            return;
        }

        sendData();
    });
};

window.addEventListener("load", loaded);
