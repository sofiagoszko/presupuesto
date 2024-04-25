/*arreglos iniciales de ingresos y egresos*/
let ingresos = [
    new Ingreso("Salario", 2100.00),
    new Ingreso("Venta coche", 5000.00)
];
let egresos = [
    new Egreso("Alquiler", 2000.00),
    new Egreso("Luz", 500.00)
];


/*cuando se carga la pagina*/
let cargarApp = () => {
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

/*calcula el total de ingresos hasta el momento*/
let totalIngresos = () => {
    let totalIngreso = 0;
    for(let ingreso of ingresos){
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}

/*calcula el total de egresos hasta el momento*/
let totalEgresos = () => {
    let totalEgreso = 0;
    for(let egreso of egresos){
        totalEgreso += egreso.valor;
    }
    return totalEgreso;
}

/*actualiza los valores html*/
let cargarCabecero = () => {
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = [totalEgresos()/totalIngresos()];
    document.getElementById("presupuesto").innerHTML = formatoMoneda(presupuesto);
    document.getElementById("ingresos").innerHTML = `+ ${formatoMoneda(totalIngresos())}`;
    document.getElementById("egresos").innerHTML = `- ${formatoMoneda(totalEgresos())}`;
    if(totalIngresos() > 0){
        document.getElementById("porcentaje_egreso").innerHTML = formatoPorcentaje(porcentajeEgreso);}
    else{
        document.getElementById("porcentaje_egreso").innerHTML = formatoPorcentaje(0);
    }    
}

/*para darle formato a los numeros*/
const formatoMoneda = (valor) =>{
    return  valor.toLocaleString('es-AR', {style:"currency", currency:"ARS", minimumFractionDigits:2});
}

/*para darle formato a los porcentajes*/
const formatoPorcentaje = (valor) =>{
    return valor.toLocaleString('es-AR', {style:'percent', minimumFractionDigits:2});
}

/*lista los ingresos*/
const cargarIngresos = () =>{
    let ingresosHTML = "";
    for(let ingreso of ingresos){
        ingresosHTML += crearIngresoHTML(ingreso);       
    }
    document.getElementById("lista-ingresos").innerHTML = ingresosHTML;
}

/*crea cada ingreso para despues sumarlo al listado total*/
const crearIngresoHTML = (ingreso) => {
    let ingresoHTML = `
        <div class="elemento limpiarEstilos">
            <div class="elemento_descripcion">${ingreso.descripcion}</div>
            <div class="derecha limpiarEstulos">
                <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
                <div class="elemento_eliminar">
                    <button class="elemento_eliminar--btn">
                        <ion-icon name="close-circle-outline" onclick="eliminarIngreso(${ingreso.id})"></ion-icon>
                    </button>
                </div>
            </div>
        </div>
    `
    return ingresoHTML;
}

/*lista los egresos*/
const cargarEgresos = () =>{
    let egresosHTML = "";
    for(let egreso of egresos){
        egresosHTML += crearEgresoHTML(egreso);       
    }
    document.getElementById("lista-egresos").innerHTML = egresosHTML;
}

/*crea cada ingreso para despues sumarlo al listado total*/
const crearEgresoHTML = (egreso) => {
    let porcentajeEgreso = [egreso.valor/totalEgresos()];
    let egresoHTML = `
        <div class="elemento limpiarEstilos">
            <div class="elemento_descripcion">${egreso.descripcion}</div>
            <div class="derecha limpiarEstilos">
                <div class="elemento_valor">- ${formatoMoneda(egreso.valor)}</div>
                <div class="elemento_porcentaje">${formatoPorcentaje(porcentajeEgreso)}</div>
                <div class="elemento_eliminar">
                    <button class="elemento_eliminar--btn">
                        <ion-icon name="close-circle-outline" onclick="eliminarEgreso(${egreso.id})"></ion-icon>
                    </button>
                </div>
            </div>
        </div>
    `
    return egresoHTML;
}


/*elimina el ingreso enviado como parámetro*/
const eliminarIngreso = (id) =>{
    let indice = ingresos.findIndex( ingreso => ingreso.id === id );
    //for (let ingreso of ingresos)
    ingresos.splice(indice, 1);
    cargarCabecero();
    cargarIngresos();
}   


/*elimina el egreso enviado como parámetro*/
const eliminarEgreso = (id) =>{
    let indice = egresos.findIndex( egreso => egreso.id === id );
    egresos.splice(indice, 1);
    cargarCabecero();
    cargarEgresos();
}   


/*agregar elementos nuevos*/
const agregarDato = () =>{
    let forma = document.forms["forma"];
    let tipo = forma["tipo"];
    let descripcion = forma["descripcion"];
    let valor = forma["valor"];

    console.log(tipo.value);
    console.log(descripcion.value);
    console.log(valor.value);

    if(descripcion.value != "" && valor.value != ""){
        if(tipo.value == "ingreso"){
            ingresos.push(new Ingreso(descripcion.value, +valor.value));
            cargarCabecero();
            cargarIngresos();

        }else if(tipo.value == "egreso"){
            egresos.push(new Egreso(descripcion.value, +valor.value));
            cargarCabecero();
            cargarEgresos();
        }
    }
}
