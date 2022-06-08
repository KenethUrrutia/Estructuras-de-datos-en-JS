class Nodo{
    constructor(digito){
        this.digito = digito;
        this.siguiente = null;
        this.anterior = null;

    }

}

class Digito{
    constructor(id, num){
        this.id = id;
        this.num = num
    }

}

class ListaCircular{
    constructor(){
        this.primero = null;
        this.ultimo = null;
    }

    agregar(id, num){
        var temporal =  new Nodo(new Digito(id, num));

        if (this.primero == null) {
            this.primero = temporal;
            this.ultimo = temporal;
            this.ultimo.siguiente = this.primero;
            this.primero.anterior = this.ultimo;
        } else {
            
            this.primero.siguiente = temporal;
            temporal.siguiente = this.ultimo;
            this.ultimo.anterior = temporal;
            temporal.anterior = this.primero;
            this.ultimo = temporal

        }

    }


    mostrarListaFinInicio(){
        var temporal = this.ultimo;
        var etiquetas = "";
        var conexiones = "";
        do {
            console.log(temporal.digito.num);
            etiquetas += temporal.digito.id + "[label=\""+ temporal.digito.num +"\"];\n";

            conexiones += temporal.digito.id + " -> " + temporal.siguiente.digito.id + ";\n"
            conexiones += temporal.digito.id + " -> " +  temporal.anterior.digito.id + ";\n"
            temporal =  temporal.siguiente;
        } while ((temporal != this.ultimo));


        var codigoDot = "digraph G { \nlabel = \"De Fin a Inicio\"\nnode [shape=box]; rankdir=LR;\n " + etiquetas + conexiones +"}"
        console.log("\n");

        d3.select("#lienzo1")
        .graphviz()
          .height(500)
          .width(2000)
          .dot(codigoDot)
          .render();

    }


    mostrarListaInicioFin(){
        var temporal = this.primero;
        var etiquetas = "";
        var conexiones = "";

        do {
            console.log(temporal.digito.num);
            etiquetas += temporal.digito.id + "[label=\""+ temporal.digito.num +"\"];\n";

            conexiones += temporal.digito.id + " -> " + temporal.siguiente.digito.id + ";\n"
            conexiones += temporal.digito.id + " -> " +  temporal.anterior.digito.id + ";\n"
            temporal =  temporal.anterior;
        } while ((temporal != this.primero));


        var codigoDot = "digraph G {\nlabel = \"De Inicio a Fin\" \nnode [shape=box]; rankdir=LR;\n " + etiquetas + conexiones +"}"
        console.log("\n");
        d3.select("#lienzo2")
        .graphviz()
          .height(500)
          .width(2000)
          .dot(codigoDot)
          .render();

    }



    mostrarLista2Veces(){
        var temporal = this.primero;
        var etiquetas = "";
        var conexiones = "";
        var vueltas = 0;
        for (let i = 0; i < 2; i++) {
            
        
            do {
                console.log(temporal.digito.num);
                
                
                if (vueltas == 0) {
                    etiquetas += temporal.digito.id + "[label=\""+ temporal.digito.num +"\"];\n";
                    etiquetas  += (temporal.digito.id+9) + "[label=\""+ temporal.digito.num +"\"];\n";

                    if (temporal == this.ultimo) {
                        conexiones += temporal.digito.id + " -> " + (temporal.siguiente.digito.id) + ";\n"
                        conexiones += (temporal.digito.id) + " -> " +  (temporal.anterior.digito.id+9) + ";\n"
                        temporal =  temporal.anterior;

                    } else if(temporal == this.primero){
                        conexiones += temporal.digito.id + " -> " + (temporal.siguiente.digito.id+9) + ";\n"
                        conexiones += (temporal.digito.id) + " -> " +  (temporal.anterior.digito.id) + ";\n"
                        temporal =  temporal.anterior;

                    } else {
                        conexiones += temporal.digito.id + " -> " + temporal.siguiente.digito.id + ";\n"
                        conexiones += temporal.digito.id + " -> " +  temporal.anterior.digito.id + ";\n"
                        temporal =  temporal.anterior;
                    }

                    
                    
                    
                }
                if (vueltas == 1) {
                    
                    if (temporal == this.ultimo) {
                        conexiones += (temporal.digito.id+9) + " -> " + (temporal.siguiente.digito.id+9) + ";\n"
                        conexiones += (temporal.digito.id+9) + " -> " +  (temporal.anterior.digito.id) + ";\n"
                        temporal =  temporal.anterior;
                    } else if(temporal == this.primero){
                        conexiones += (temporal.digito.id+9) + " -> " + (temporal.siguiente.digito.id) + ";\n"
                        conexiones += (temporal.digito.id+9) + " -> " +  (temporal.anterior.digito.id+9) + ";\n"
                        temporal =  temporal.anterior;
                    } 
                    
                    else {
                        conexiones += (temporal.digito.id+9) + " -> " + (temporal.siguiente.digito.id+9) + ";\n"
                        conexiones += (temporal.digito.id+9) + " -> " +  (temporal.anterior.digito.id+9) + ";\n"
                        temporal =  temporal.anterior;
                    }


                    
                } 
                   
                
                
            } while ((temporal != this.primero));
            vueltas++;
        }
        var codigoDot = "digraph G { \nlabel = \"Doble Recorrido\" \nnode [shape=box]; rankdir=LR;\n " + etiquetas + conexiones +"}"
        console.log(codigoDot);
        d3.select("#lienzo3")
        .graphviz()
        .height(500)
        .width(2000)
        .dot(codigoDot)
        .render();

    }

}




var lista =  new ListaCircular();

lista.agregar(1,2);
lista.agregar(2,0);
lista.agregar(3,1);
lista.agregar(4,9);
lista.agregar(5,4);
lista.agregar(6,0);
lista.agregar(7,8);
lista.agregar(8,5);
lista.agregar(9,4);


lista.mostrarListaFinInicio();
lista.mostrarListaInicioFin();
lista.mostrarLista2Veces()