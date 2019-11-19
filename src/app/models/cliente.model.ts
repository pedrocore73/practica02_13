export class Cliente {
    nombre: string;
    cif: string;
    direccion: {
        calle: string;
        cp: string;
        localidad: string;
    };
    email: string;
    formaPago: string;

    constructor(nombre, cif, calle, cp, localidad, email, formaPago) {
        this.nombre = nombre;
        this.cif = cif;
        this.direccion = {
            calle: calle,
            cp: cp,
            localidad: localidad
        };
        this.email = email;
        this.formaPago = formaPago;
    }

}