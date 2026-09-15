/*arreglos iniciales de ingresos y egresos*/
let ingresos = [
    new Ingreso("Salario", 2100.00),
    new Ingreso("Venta coche", 5000.00)
];
let egresos = [
    new Egreso("Alquiler", 2000.00),
    new Egreso("Luz", 500.00)
];


let cargarApp = () => {
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

let totalIngresos = () => {
    let totalIngreso = 0;
    for(let ingreso of ingresos){
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}

let totalEgresos = () => {
    let totalEgreso = 0;
    for(let egreso of egresos){
        totalEgreso += egreso.valor;
    }
    return totalEgreso;
}


let cargarCabecero = () => {
    let totalIngreso = totalIngresos();
    let totalEgreso = totalEgresos();
    let presupuesto = totalIngreso - totalEgreso;
    let porcentajeEgreso = totalIngreso > 0 ? totalEgreso / totalIngreso : 0;
    document.getElementById("presupuesto").innerHTML = formatoMoneda(presupuesto);
    document.getElementById("ingresos").innerHTML = `+ ${formatoMoneda(totalIngreso)}`;
    document.getElementById("egresos").innerHTML = `- ${formatoMoneda(totalEgreso)}`;
    document.getElementById("porcentaje_egreso").innerHTML = formatoPorcentaje(porcentajeEgreso);
}


const formatoMoneda = (valor) =>{
    return  valor.toLocaleString('es-AR', {style:"currency", currency:"ARS", minimumFractionDigits:2});
}


const formatoPorcentaje = (valor) =>{
    return valor.toLocaleString('es-AR', {style:'percent', minimumFractionDigits:2});
}

const escaparHTML = (texto) =>{
    let div = document.createElement("div");
    div.textContent = texto;
    return div.innerHTML;
}

const cargarIngresos = () =>{
    let ingresosHTML = "";
    for(let ingreso of ingresos){
        ingresosHTML += crearIngresoHTML(ingreso);       
    }
    document.getElementById("lista-ingresos").innerHTML = ingresosHTML;
}


const crearIngresoHTML = (ingreso) => {
    let ingresoHTML = `
        <div class="elemento limpiarEstilos">
            <div class="elemento_descripcion">${escaparHTML(ingreso.descripcion)}</div>
            <div class="derecha limpiarEstilos">
                <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
                <div class="elemento_eliminar">
                    <button type="button" class="elemento_eliminar--btn" onclick="eliminarIngreso(${ingreso.id})">
                        <ion-icon name="close-circle-outline"></ion-icon>
                    </button>
                </div>
            </div>
        </div>
    `
    return ingresoHTML;
}

const cargarEgresos = () =>{
    let egresosHTML = "";
    for(let egreso of egresos){
        egresosHTML += crearEgresoHTML(egreso);       
    }
    document.getElementById("lista-egresos").innerHTML = egresosHTML;
}

const crearEgresoHTML = (egreso) => {
    let totalEgreso = totalEgresos();
    let porcentajeEgreso = totalEgreso > 0 ? egreso.valor / totalEgreso : 0;
    let egresoHTML = `
        <div class="elemento limpiarEstilos">
            <div class="elemento_descripcion">${escaparHTML(egreso.descripcion)}</div>
            <div class="derecha limpiarEstilos">
                <div class="elemento_valor">- ${formatoMoneda(egreso.valor)}</div>
                <div class="elemento_porcentaje">${formatoPorcentaje(porcentajeEgreso)}</div>
                <div class="elemento_eliminar">
                    <button type="button" class="elemento_eliminar--btn" onclick="eliminarEgreso(${egreso.id})">
                        <ion-icon name="close-circle-outline"></ion-icon>
                    </button>
                </div>
            </div>
        </div>
    `
    return egresoHTML;
}


const eliminarIngreso = (id) =>{
    let indice = ingresos.findIndex( ingreso => ingreso.id === id );
    if(indice !== -1){
        ingresos.splice(indice, 1);
        cargarCabecero();
        cargarIngresos();
    }
}   


const eliminarEgreso = (id) =>{
    let indice = egresos.findIndex( egreso => egreso.id === id );
    if(indice !== -1){
        egresos.splice(indice, 1);
        cargarCabecero();
        cargarEgresos();
    }
}   


const agregarDato = () =>{
    let forma = document.forms["forma"];
    let tipo = forma["tipo"];
    let descripcion = forma["descripcion"];
    let valor = forma["valor"];

    let textoDescripcion = descripcion.value.trim();
    let importe = Number(valor.value);

    if(textoDescripcion == ""){
        descripcion.focus();
        return;
    }
    if(valor.value == "" || !Number.isFinite(importe) || importe <= 0){
        valor.focus();
        return;
    }

    if(tipo.value == "ingreso"){
        ingresos.push(new Ingreso(textoDescripcion, importe));
        cargarCabecero();
        cargarIngresos();
    }else if(tipo.value == "egreso"){
        egresos.push(new Egreso(textoDescripcion, importe));
        cargarCabecero();
        cargarEgresos();
    }

    descripcion.value = "";
    valor.value = "";
    descripcion.focus();
}
