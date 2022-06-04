
class Nodo{

    constructor(Psmash){
        this.personaje = Psmash;
        this.siguiente = null;
        this.tam = 0;   
    }
}

class ListaPersonajesSmash{

    constructor(){
        this.cabeza=null;
        this.ultimo=null;
    }

    agregarPsmash(nombrePersonaje){
        var temporal = new Nodo(nombrePersonaje);

        if (this.cabeza == null) {
            this.cabeza = temporal;
            this.ultimo = this.cabeza;
            this.tam++;
        } else {
            this.ultimo.siguiente = temporal;
            temporal.siguiente = this.ultimo;
            this.ultimo = temporal;
            this.tam++;
        }
        
    }


    mostrarpersonajes(){
        var temporal = this.cabeza;
        var cont = 0;
        while(cont < this.tam){
            console.log(temporal.personaje);
            console.log(cont);
            temporal = temporal.siguiente;
        }

    }
}

var lista = new ListaPersonajesSmash();

lista.agregarPsmash("Mario");
lista.agregarPsmash("Dedede");
lista.agregarPsmash("Link");
lista.agregarPsmash("Wario");
lista.agregarPsmash("DKK");

lista.mostrarpersonajes();