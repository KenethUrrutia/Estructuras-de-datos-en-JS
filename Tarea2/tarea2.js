class Nodo{
    constructor(numero){
        this.numero = numero;
        this.id = 0;
        this.abajo = null
    }

}


class Pila{
    constructor(){
        this.punta = null;
    }

    push(numero){
        var temporal = new Nodo(numero);

        temporal.abajo = this.punta;
        if (this.punta !=null) {
            temporal.id = this.punta.id+1;
        }
        this.punta = temporal;

    }

    pop(){
        this.punta = this.punta.abajo;
    }

    mostrar(){
        var temporal = this.punta
        while (temporal!=null) {
            console.log(temporal.numero);
            temporal = temporal.abajo;
        }

    }

    peek(){
        return this.punta.numero

    }
    graficar( lienzo ){
        var nodos = "";

        var temporal = this.punta
        while (temporal!=null) {
            nodos += temporal.numero + " | "
            temporal = temporal.abajo;
        }

        var codigoDot = `digraph G {\nlabel = \"Pila\" \n rankdir=LR;nodo1 [label="` + nodos +` $" shape = "record" ];\n}`
        console.log("\n");
        console.log("Codigo Dot Generado: \n"+codigoDot);
        d3.select("#"+lienzo)
        .graphviz()
          .height(500)
          .width(500)
          .dot(codigoDot)
          .render();
    }

}




var pila1 = new Pila();
var pila2 = new Pila();

pila1.push(2);
pila1.push(0);
pila1.push(1);
pila1.push(9);
pila1.push(4);
pila1.push(0);
pila1.push(8);
pila1.push(5);
pila1.push(4);



pila1.graficar("lienzo1");

pila2.graficar("lienzo2");




function IzqToDer() {
    pila2.push(pila1.peek())
    pila1.pop();
    pila1.graficar("lienzo1");
    pila2.graficar("lienzo2");
}

function DerToIzq() {
    pila1.push(pila2.peek())
    pila2.pop();
    pila2.graficar("lienzo2");
    pila1.graficar("lienzo1");
}


document.getElementById("step").addEventListener("click", IzqToDer);
document.getElementById("stepback").addEventListener("click", DerToIzq);
