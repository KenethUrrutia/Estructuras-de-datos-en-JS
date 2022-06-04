class Nodo{
    constructor(carro){
        this.carro = carro;
        this.siguiente = null;
        this.anterior =null;
    }

}

class Carro{
    constructor(marca, linea, modelo){
        this.marca = marca;
        this.linea = linea;
        this.modelo = modelo;

    }

}

class ListaCarros{
    constructor(){
        this.primero = null;
        this.ultimo = null;

    }

    agregarCarro(carro){
        var temporal =  new Nodo(carro)

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

    mostrarLista(){
        var temporal = this.ultimo;
        do {
            console.log(temporal.carro);
            temporal =  temporal.siguiente;

        } while ((temporal != this.ultimo));

    }
}

var lista =  new ListaCarros();

lista.agregarCarro(new Carro("Mazda", "MX5", "2000"));
lista.agregarCarro(new Carro("Toyota", "Corolla", "2010"));
lista.agregarCarro(new Carro("Toyota", "Hilux", "98"));
lista.agregarCarro(new Carro("Honda", "CR-V", "2019"));

lista.mostrarLista();