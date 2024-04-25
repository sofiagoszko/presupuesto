class Ingreso extends Dato{
    static idIngreso = 0;

    constructor(descripcion, valor){
        super(descripcion, valor);
        this._id = ++Ingreso.idIngreso;
    }

    get id(){
        return this._id;
    }

}

