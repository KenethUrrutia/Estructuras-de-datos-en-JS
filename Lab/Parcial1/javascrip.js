
//creamos clase nodo
class Nodo {

    constructor(numero){
        this.numero = numero;
        this.anterior = null;
    }

}



class Cola{

    constructor(){
        this.primero = null;
        this.ultimo = null;
        this.actual = null;
    }

    add(num){
        var tempo = new Nodo(num);
        

        if (this.primero == null) {
            this.primero = tempo;
            this.ultimo = tempo;
        } else {
            this.primero.anterior = tempo;
            this.ultimo = tempo;
        }
    }

    delete(){
        this.actual = this.primero;
        this.primero = this.primero.anterior;

    }

    mostrarCola(){
        var tempo = this.primero;
        var lista = "";
        do {
            lista = tempo.numero = ` <- ` + lista;
            
        } while (tempo!=this.ultimo);
        console.log(lista);
    }

    

}

function name(a,b) {
    
}




var lista = new Cola();

lista.add(1);
lista.add(2);
lista.delete();
lista.add(3);
lista.add(4);
lista.add(5);
lista.add(6);
lista.delete();
lista.add(7);


lista.mostrarCola();