class Nodo{
    constructor(carro){
        this.carro = carro;
        this.siguiente = null;
        this.anterior = null;
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
        this.cabeza = null;
    }

    agregarCarro(carro){
        var temporal = new Nodo(carro);

        if (this.cabeza ==null) {
            this.cabeza = temporal;
        } else {
            temporal.siguiente = this.cabeza;
            this.cabeza.anterior = temporal;
            this.cabeza = temporal;
        }
        
    }

    mostrarLista(){
        var temporal = this.cabeza;

        while (temporal != null) {
            console.log(temporal.carro);
            temporal = temporal.siguiente;
        }

    }
}



var lista =  new ListaCarros();

lista.agregarCarro(new Carro("Mazda", "MX5", "2000"));
lista.agregarCarro(new Carro("Toyota", "Corolla", "2010"));
lista.agregarCarro(new Carro("Toyota", "Hilux", "98"));
lista.agregarCarro(new Carro("Honda", "CR-V", "2019"));

lista.mostrarLista();