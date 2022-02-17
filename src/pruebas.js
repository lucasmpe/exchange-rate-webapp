function probarBaseValida() {
    const base = 'Elija una moneda base';
    console.assert(
        baseValida(base) === false, 'baseValida valida una base inválida'
    );
}

function probarMostrarAlerta() {
    mostrarAlerta('Elija una opción válida');
    console.assert(
        $alerta.innerHTML !== '', 'mostrarAlerta no muestra el mensaje pasado por parámetro'
    );
}

function pruebasUnitarias() {
    probarBaseValida();
    probarMostrarAlerta();
}

pruebasUnitarias();
