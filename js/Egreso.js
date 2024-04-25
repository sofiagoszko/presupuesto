class Egreso extends Dato{
    static idEgreso = 0;

    constructor(descripcion, valor){
        super(descripcion, valor);
        this._id = ++Egreso.idEgreso;
    }

    get id(){
        return this._id;
    }

}
