

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
        var codigoDot = "digraph { node [shape=box]; rankdir=LR;\n";
        while(temporal!=null){
            console.log(temporal.stand);
            codigoDot+= temporal.stand + "-> ";

            temporal = temporal.siguiente;
        }

        codigoDot += "null; null[shape=none]; }";

        console.log(codigoDot);
        d3.select("#lienzo")
        .graphviz()
          .dot(codigoDot)
          .render();

    }

}



var lista = new ListaStand();

lista.addStand("Star_Platinum");
lista.addStand("The_World");
lista.addStand("Tusk");
lista.addStand("Echoes");
lista.addStand("Highway_Star");
lista.addStand("Justice");
lista.addStand("Crazy_Diamond");

lista.mostrarlistaStand();
