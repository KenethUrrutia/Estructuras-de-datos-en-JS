class Nodonum{
    constructor(num){
        this.izquierda = null;
        this.derecha = null;
        this.num = num;
        this.altura = 0;
        this.id = 0;
    }
  }

class AVLnums{

    constructor(){
      this.raiz = null
      this.contador = 0;
      this.conexiones = ""
      this.etiquetas = ""
      this.textoHTML = ""
    }
    
    max(hi, hd){
      if (hi > hd) 
        return hi
      return hd
      
    }
    
    altura(nodo){
      if (nodo != null) 
        return nodo.altura
      return -1
    }
    
    insertar(num){
      this.raiz = this._insertar(num, this.raiz)

    }
    
    _insertar(num, nodo){
      if(nodo == null) {

        var nuevo = new Nodonum(num);
        nuevo.id = this.contador;
        this.contador++;
        return  nuevo
      }

        
      else{

        if(num < nodo.num){
          nodo.izquierda = this._insertar(num, nodo.izquierda)
          if(this.altura(nodo.derecha)-this.altura(nodo.izquierda) == -2){
            
              if(num < nodo.izquierda.num){
                  nodo = this.RotacionSimpleDerecha(nodo);
                  
              }
              else{
                  nodo = this.RotacionDobleIzquierda(nodo);
              }
              
          }
        }else if(num > nodo.num){
          nodo.derecha = this._insertar(num, nodo.derecha);
          if(this.altura(nodo.derecha)-this.altura(nodo.izquierda)== 2){
              
              if(num > nodo.derecha.num){
                  nodo = this.RotacionSimpleIzquierda(nodo);
              }else{
                  nodo = this.RotacionDobleDerecha(nodo);
              }
          }
        }else{
            nodo.num = num;
        }
      }
      nodo.altura = this.max(this.altura(nodo.izquierda),this.altura(nodo.derecha))+1
      return nodo;
    }

    RotacionSimpleDerecha(nodo){
      
        var aux = nodo.izquierda;
        nodo.izquierda = aux.derecha;
        aux.derecha = nodo;

        nodo.altura = this.max(this.altura(nodo.derecha),this.altura(nodo.izquierda))+1;
        aux.altura = this.max(this.altura(nodo.izquierda), nodo.altura)+1;
        return aux;
    }

    RotacionSimpleIzquierda(nodo){
        var aux = nodo.derecha;
        nodo.derecha = aux.izquierda;
        aux.izquierda = nodo;

        nodo.altura = this.max(this.altura(nodo.derecha),this.altura(nodo.izquierda))+1;
        aux.altura = this.max(this.altura(nodo.derecha),nodo.altura)+1;
        return aux;
    }

    RotacionDobleDerecha(nodo){
      nodo.derecha = this.RotacionSimpleDerecha(nodo.derecha);
      return this.RotacionSimpleIzquierda(nodo);
    }

    RotacionDobleIzquierda(nodo){

      nodo.izquierda = this.RotacionSimpleIzquierda(nodo.izquierda);
      return this.RotacionSimpleDerecha(nodo);
    }

    _graficar(nodo){
        
      if(nodo.izquierda!=null){
          this._graficar(nodo.izquierda)
          this.conexiones += `n`+nodo.id+` -> n`+nodo.izquierda.id+ `;\n`;
      }else{
          this.etiquetas += `null`+nodo.id+`I [label="null"; shape="none"]\n`;
          this.conexiones += `n`+nodo.id+` -> null`+nodo.id+ `I;\n`;
      }

      this.etiquetas += `n`+nodo.id+` [label="`+nodo.num+`\n Altura: `+nodo.altura+`\nBalance:`+(this.altura(nodo.derecha)-this.altura(nodo.izquierda))+`"]\n`;

      if (nodo.derecha!=null) {
          this._graficar(nodo.derecha);
          this.conexiones += `n`+nodo.id+` -> n`+nodo.derecha.id+ `;\n`;
      }else{
          this.etiquetas += `null`+nodo.id+`D [label="null"; shape="none"]\n`;
          this.conexiones += `n`+nodo.id+` -> null`+nodo.id+ `D;\n`;  
      }
    }

    graficar(lienzo){
      this.etiquetas = "";
      this.conexiones = ""
      this._graficar(this.raiz);

      var codigoDot = `digraph G {\n`+this.etiquetas + this.conexiones + `}`

      codigoDot += this.etiquetas + this.conexiones +"}"

      d3.select("#"+lienzo)
      .graphviz()
        .height(700)
        .width(1200)
        .dot(codigoDot)
        .render();

    }
}



var nums = [11,23,35,46,54,26,83,20,100,54,2,1,6,8];
var avl = new AVLnums();

nums.forEach(element => {
    avl.insertar(element);
});

avl.graficar("lienzo");