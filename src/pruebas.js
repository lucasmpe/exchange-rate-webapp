function probarBaseValida() {
    const base = 'Elija una moneda base';
    console.assert(
        baseValida(base) === false, 'baseValida valida una base inválida'
    );
}

probarBaseValida();
