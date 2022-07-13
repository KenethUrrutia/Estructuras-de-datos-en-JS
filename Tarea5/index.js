class Nodo{
  constructor(num){
    this.id = 0;
    this.num = num
    this.siguiente = null;
  }
}

class NodoIndiceHash{
  constructor(index){
    this.index = index;
    this.siguiente = null;
    this.abajo  = null;
  }
}



class IndiceHashnums{
  constructor(posiciones){
    this.cabeza = null;
    this.elementos = 0;
    this.crear(posiciones);
  }

  crear(posiciones){
    
    for (let i = 0; i < posiciones; i++) {
      var temporal = new NodoIndiceHash(i);
        if (this.cabeza != null) {
          temporal.abajo = this.cabeza;
          this.cabeza = temporal;
        }else{
          this.cabeza = temporal
        }
    }
  }

  insertarSiguiente(index, num){
    var temporal = this.cabeza;

    while (temporal != null) {
      
      if (temporal.index == index) {
        var temporalnum = temporal.siguiente;

        if (temporalnum == null) {
          var nuevo  = new Nodo(num);
          temporal.siguiente = nuevo;
          this.elementos++;

          return;
        } else {

          while (temporalnum != null) {
            if (temporalnum.siguiente == null) {
              var nuevo  = new Nodo(num);
              nuevo.id = temporalnum.id+1;
              temporalnum.siguiente = nuevo;
              this.elementos++;
              return
            } else {
              temporalnum = temporalnum.siguiente;
            }
          }

        }
      } 

      temporal = temporal.abajo
    }
    

  }

}

class Hashnums{
  constructor(posiciones){
    this.posiciones = posiciones;
    this.indice = new IndiceHashnums(posiciones);
  }

  add(num){
    var indexnum = (num % this.posiciones);
    this.indice.insertarSiguiente(indexnum, num);
    if (this.indice.elementos/this.posiciones > 0.75) {
      this.rehashing()
    }

  }

  rehashing(){
    this.posiciones = this.posiciones+5;
    var nuevoIndice = new IndiceHashCategorias(this.posiciones) ;

    var tempoIndice = this.indice.cabeza;
    while(tempoIndice!=null){
      var temporalCategoria = tempoIndice.siguiente;


      while (temporalCategoria != null) {
        var categoria = temporalCategoria.categoria;
        var indexCategoria = (categoria.id_categoria % this.posiciones);
        nuevoIndice.insertarSiguiente(indexCategoria, categoria);
          
        temporalCategoria = temporalCategoria.siguiente
      }


      tempoIndice = tempoIndice.abajo;
    }
    this.indice = nuevoIndice;

  }

  graficar(lienzo){
    var codigoDot = `digraph G {\nnode [shape=box height = 0.2];\nrankdir =LR\nnodesep=0;\n`;
    var etiquetas = "";
    var conexiones = "";
    var indices = ""

    var tempoIndice = this.indice.cabeza;
    while(tempoIndice!=null){
      indices += tempoIndice.index + `\n`;
      let indexIndice = tempoIndice.index;
      var temporalnum = tempoIndice.siguiente;

      
      if (temporalnum != null) {
        let idnum = temporalnum.id;
        
        etiquetas += `I`+indexIndice+`C`+ idnum +` [label = "`+temporalnum.num+`" height = 0.1 width= 1] \n`;
        conexiones += indexIndice + ` -> I`+indexIndice+`C`+idnum +`\n` ;
      }

      while (temporalnum != null) {
        if (temporalnum.siguiente != null) {
          let idnum = temporalnum.id;
          let idnumSig = temporalnum.siguiente.id;

          etiquetas += `I`+indexIndice+`C`+idnumSig+ ` [label = "`+temporalnum.num+`" height = 0.1 width= 1] \n`;
          conexiones += `I`+indexIndice+`C`+idnum + ` -> I`+indexIndice+`C`+idnumSig +`\n` ;
        }
          
          
          temporalnum = temporalnum.siguiente
      }


      tempoIndice = tempoIndice.abajo;
    }

    codigoDot += indices + etiquetas + conexiones + `\n}`

    console.log(codigoDot);
    d3.select("#"+lienzo)
      .graphviz()
        .height(2000)
        .width(800)
        .dot(codigoDot)
        .render();

  }
}

var nums = [15,35,68,54,21,85,35,36,32,10,25,35,68,68,9,54,87];
var tabla = new Hashnums(30);

nums.forEach(element => {
    tabla.add(element);
    console.log(element);
});
console.log(tabla);

tabla.graficar("lienzo");