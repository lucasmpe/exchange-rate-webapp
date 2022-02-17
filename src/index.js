const API_KEY = '67576d3b7a1414279df98d73';
const BASE_URL = 'https://v6.exchangerate-api.com/v6/';

const $baseTabla = document.querySelector('#base-tabla');
const $generarTabla = document.querySelector('#generar-tabla');
const $tabla = document.querySelector('#tabla');
const $alerta = document.querySelector('#liveAlertPlaceholder');

async function cargarMonedas() {
    try {
        const response = await fetch(`${BASE_URL + API_KEY}/codes`);
        const data = await response.json();
        return data.supported_codes;
    } catch (error) {
        return console.error("Error:", error);
    }
}

function listarMonedas() {
    cargarMonedas().then(monedas => {
        monedas.forEach((moneda) => {
            const $option = document.createElement('option');
            $option.setAttribute('value', moneda[0]);
            $option.textContent = `${moneda[0]} (${moneda[1]})`;
            $baseTabla.appendChild($option);
        });
    });
}

function manejarClickGenerarTabla() {
    $generarTabla.onclick = function (e) {
        $alerta.innerHTML = '';
        const base = $baseTabla.options[$baseTabla.selectedIndex].value;
        if (baseValida(base)) {
            cargarCambios(base).then(data => {
                crearElementosDeTabla(data);
                $tabla.classList.remove('invisible');
            });
        } else {
            mostrarAlerta('Elija una opción válida');
        }
        e.preventDefault();
    };
}

function baseValida(base) {
    return base !== 'Elija una moneda base';
}

function mostrarAlerta(message) {
    $alerta.innerHTML = '<div class="alert alert-warning alert-dismissible" role="alert">' + message + 
        '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
}

async function cargarCambios(base) {
    try {
        const response = await fetch(`${BASE_URL + API_KEY}/latest/${base}`);
        return await response.json();
    } catch (error) {
        return console.error("Error:", error);
    }
}

function crearElementosDeTabla(data) {
    const $caption = $tabla.querySelector('caption');
    const $bodyTabla = $tabla.querySelector('tbody');

    $bodyTabla.innerHTML = "";
    $caption.textContent = `Base: ${data.base_code} - Fecha: ${data.time_last_update_utc.split(' ').slice(0, 4).join(' ')}`;

    Object.entries(data.conversion_rates).forEach((parModedaValor) => {
        const $fila = document.createElement('tr');
        const $celda1 = document.createElement('td');
        $celda1.textContent = parModedaValor[0];
        const $celda2 = document.createElement('td');
        $celda2.textContent = parModedaValor[1];
        $fila.appendChild($celda1);
        $fila.appendChild($celda2);
        $bodyTabla.appendChild($fila);
    });
}

function iniciar() {
    listarMonedas();
    manejarClickGenerarTabla();
}

iniciar();
