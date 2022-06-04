
//creamos clase nodo
class Nodo {

    constructor(stand){
        this.stand = stand;
        this.siguiente = null;
    }

}



class ListaStand{

    constructor(){
        this.cabeza = null;
    }

    addStand(nombreStand){
        var tempo = new Nodo(nombreStand);
        tempo.siguiente = this.cabeza;
        this.cabeza = tempo;
    }

    mostrarlistaStand(){
        var temporal = this.cabeza;
        while(temporal!=null){
            console.log(temporal.stand);
            temporal = temporal.siguiente;
        }

    }

}



var lista = new ListaStand();

lista.addStand("Star Platinum");
lista.addStand("The World");
lista.addStand("Tusk");
lista.addStand("Echoes");
lista.addStand("Highway Star");
lista.addStand("Justice");
lista.addStand("Crazy Diamond");

lista.mostrarlistaStand();
