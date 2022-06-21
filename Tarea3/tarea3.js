class NodoMatriz{
    constructor(letra, col ,fila){
        this.letra = letra;
        this.col =col;
        this.fila =fila;
        this.abajo=null
        this.siguiente=null
    }
}

class NodoMatrizD{
    constructor(letra, col ,fila){
        this.letra = letra;
        this.col =col;
        this.fila =fila;
        this.abajo=null
        this.arriba = null;
        this.siguiente=null
        this.anterior = null
    }
}



class ListaDispersa {
    constructor() {
        this.primero = null;
        this.ultimo = null;
    }

    busquedaCol(col) {
        var temp = this.primero
        while (temp != null) {
            if (temp.col == col) {
                return temp
            }
            temp = temp.siguiente
        }
        return null
    }
    busquedaFila(fila) {
        var temp = this.primero
        while (temp != null) {
            if (temp.fila == fila) {
                return temp
            }
            temp = temp.abajo
        }
        return null
    }

    ordenarCol(nodo){
        var aux = this.primero
        while(aux != null){
            if(aux.col < nodo.col){
                aux = aux.siguiente
            }else{
                if(aux == this.primero){
                    nodo.siguiente = aux;
                    aux.anterior = nodo;
                    this.primero = nodo;
                }else{
                    nodo.anterior = aux.anterior;
                    aux.anterior.siguiente = nodo;
                    nodo.siguiente = aux;
                    aux.anterior = nodo;
                    return;
                }
            }
        }
        this.ultimo.siguiente = nodo;
        nodo.anterior = this.ultimo;
        this.ultimo = nodo;
    }
    ordenarFila(nodo){
        var aux = this.primero
        while(aux != null){
            if(aux.fila < nodo.fila){
                aux = aux.abajo
            }else{
                if(aux == this.primero){
                    nodo.abajo = aux;
                    aux.arriba = nodo;
                    this.primero = nodo;
                }else{
                    nodo.arriba = aux.arriba;
                    aux.arriba.abajo = nodo;
                    nodo.abajo = aux;
                    aux.arriba = nodo;
                    return;
                }
            }
        }
        this.ultimo.abajo = nodo;
        nodo.arriba = this.ultimo;
        this.ultimo = nodo;
    }

    insertarCol(col){
        var nodo = new NodoMatrizD(null,col,0);
        if (this.primero == null){
            this.primero = this.ultimo = nodo;
            return;
        }
        this.ordenarCol(nodo);
    }
    insertarFila(fila){
        var nodo = new NodoMatrizD(null,0,fila);
        if (this.primero == null){
            this.primero = this.ultimo = nodo;
            return;
        }
        this.ordenarFila(nodo);

    }
}

class MatrizDispersa{
    constructor() {
        this.lista_horizontal = new ListaDispersa();
        this.lista_vertical = new ListaDispersa();
    }

    insertar(letra, col, fila) {
        var nodoCol = this.lista_horizontal.busquedaCol(col);
        var nodoFila = this.lista_vertical.busquedaFila(fila);

        if(nodoCol == null && nodoFila == null){
            this.caso1(letra, col, fila);
        }else if (nodoCol == null && nodoFila !=null){
            this.caso2(letra, col, fila);
        }else if(nodoCol !=null && nodoFila ==null){
            this.caso3(letra, col, fila);
        }else{
            this.caso4(letra, col, fila);
        }
    }
    caso1(letra,col,fila){
        this.lista_horizontal.insertarCol(col);
        this.lista_vertical.insertarFila(fila);

        var nodoCol = this.lista_horizontal.busquedaCol(col)
        var nodoFila = this.lista_vertical.busquedaFila(fila)
        var nuevo = new NodoMatriz(letra,col,fila);
        nodoCol.abajo = nuevo;
        nodoFila.siguiente = nuevo;


    }
    caso2(letra,col,fila){
        this.lista_horizontal.insertarCol(col)   

        var nodoCol = this.lista_horizontal.busquedaCol(col)
        var nodoFila = this.lista_vertical.busquedaFila(fila)
        var agregado = false;

        var nuevo = new NodoMatrizD(letra,col,fila);
        var nodoFilaSig = nodoFila.siguiente;

        var cabecera = 0;

        while(nodoFilaSig != null){
            cabecera = nodoFilaSig.col;
            if(cabecera < col){
                nodoFilaSig = nodoFilaSig.siguiente;
            }else{
                nuevo.siguiente = nodoFilaSig;
                nuevo.anterior = nodoFilaSig.anterior;
                nodoFilaSig.anterior.siguiente = nuevo;
                nodoFilaSig.anterior = nuevo;
                agregado = true;
                break;
            }
        }
        if(agregado == false){
            nodoFilaSig = nodoFila.siguiente;
            while(nodoFilaSig.siguiente != null){
                nodoFilaSig = nodoFilaSig.siguiente;
            }
            nuevo.anterior = nodoFilaSig;
            nodoFilaSig.siguiente = nuevo;
        }
        nodoCol.abajo = nuevo;
        nuevo.arriba = nodoCol;

    }
    caso3(letra,col,fila){
        this.lista_vertical.insertarFila(fila)

        var nodoCol = this.lista_horizontal.busquedaCol(col)
        var nodoFila = this.lista_vertical.busquedaFila(fila)
        var agregado = false;

        var nuevo = new NodoMatrizD(letra,col,fila);
        var nodoColAb = nodoCol.abajo;
        let cabecera = 0;

        while(nodoColAb != null ){
            cabecera = nodoColAb.fila;
            if(cabecera < fila){
                nodoColAb = nodoColAb.abajo;
            }else{
                nuevo.abajo = nodoColAb;
                nuevo.arriba = nodoColAb.arriba;
                nodoColAb.arriba.abajo = nuevo;
                nodoColAb.arriba = nuevo;
                agregado = true;
                break;
            }
        }
        if(!agregado){
            nodoColAb = nodoCol.abajo;
            while(nodoColAb.abajo != null){
                nodoColAb = nodoColAb.abajo;
            }
            nodoColAb.abajo = nuevo;
            nuevo.arriba = nodoColAb;
        }
        nodoFila.siguiente = nuevo;
        nuevo.anterior = nodoFila;

    }
    caso4(letra,col,fila){
        let nodoCol = this.lista_horizontal.busquedaCol(col);
        let nodoFila = this.lista_vertical.busquedaFila(fila);

        var agregadoFila = false;
        var agregadoCol = false;
        let nuevo = new NodoMatrizD(letra, col, fila);
        let nodoFilaSig = nodoFila.siguiente;
        let cabecera = 0;
        
        while(nodoFilaSig != null){
            cabecera = nodoFilaSig.col;
            if (cabecera < col) {
                nodoFilaSig = nodoFilaSig.siguiente;
            } else {
                nuevo.siguiente = nodoFilaSig;
                nuevo.anterior = nodoFilaSig.anterior;
                nodoFilaSig.anterior.siguiente = nuevo;
                nodoFilaSig.anterior = nuevo;
                agregadoFila = true;
                break;
            }
        }
        if(agregadoFila == false){
            nodoFilaSig = nodoFila.siguiente;
            while(nodoFilaSig.siguiente != null){
                nodoFilaSig = nodoFilaSig.siguiente;
            }
            nuevo.anterior = nodoFilaSig;
            nodoFilaSig.siguiente = nuevo;
        }

        var nodoColAb = nodoCol.abajo;
        cabecera = 0;

        while(nodoColAb != null ){
            cabecera = nodoColAb.fila;
            if(cabecera < fila){
                nodoColAb = nodoColAb.abajo;
            }else{
                nuevo.abajo = nodoColAb;
                nuevo.arriba = nodoColAb.arriba;
                nodoColAb.arriba.abajo = nuevo;
                nodoColAb.arriba = nuevo;
                agregadoCol = true;
                break;
            }
        }
        if(!agregadoCol){
            nodoColAb = nodoCol.abajo;
            while(nodoColAb.abajo != null){
                nodoColAb = nodoColAb.abajo;
            }
            nodoColAb.abajo = nuevo;
            nuevo.arriba = nodoColAb;
        }
    }

    graficar(lienzo){
        var codigoDot = `digraph G {\n label = "nombre"\n node [shape=box]; rankdir=LR; \n `;

        var etiquetas = `\n`;
        var ranks = `\n`;
        var conexiones = `\n`;
        var temporalCol = this.lista_horizontal.primero;
        var temFila = this.lista_vertical.primero;
        var temporalLetra = null;

        var rankFila = "{ rank = same;";

        while (temFila != null) {
            if (temFila.abajo != null) {
                 
                conexiones += `C0F`+temFila.fila + ` -> ` + `C0F`+temFila.abajo.fila+` [dir=both]; `;
            }
            temFila = temFila.abajo
        }

        while (temporalCol != null) {
            etiquetas += `C`+temporalCol.col + ` [label = "`+temporalCol.col +`" group=0 ];\n//hijos de `+ temporalCol.col+`\n`;
            //etiquetas += `F`+temporalFila.fila + ` [label = "`+temporalFila.fila +`" ];\n`;

            var rankCol = `{ rank = same; C`+temporalCol.col + `; `;
            if (temporalCol.siguiente != null) {
                conexiones += `C`+temporalCol.col + ` -> C` + temporalCol.siguiente.col + `[dir=both];\n`
                
                temporalLetra = temporalCol.abajo;

                while (temporalLetra != null) {
                    if (temporalLetra.letra!= null) {
                        etiquetas += `C`+temporalCol.col+`F`+temporalLetra.fila + ` [label = <<B>`+temporalLetra.letra+`</B>> fontcolor=red group=`+temporalLetra.fila+`];\n`;
                    }

                    rankCol += `C`+temporalCol.col+`F`+temporalLetra.fila+`; `;
                   
                    var temporalFila = this.lista_vertical.busquedaFila(temporalLetra.fila);
                    
                    if (temporalLetra.anterior == null) {
                        etiquetas += `C0F`+ temporalFila.fila +`[label = "`+ temporalFila.fila +`"  group=`+temporalFila.fila+`]; \n`
                        rankFila += `C0F`+temporalFila.fila + `;`;
                        conexiones += `C0F`+temporalFila.fila + ` -> ` + `C`+temporalCol.col+`F`+temporalLetra.fila+` [dir=both];\n `;
                    } else{
                        rankFila += `C0F`+temporalFila.fila + `;`;
                        etiquetas += `C0F`+ temporalFila.fila +`[label = "`+ temporalFila.fila +`"  group=`+temporalFila.fila+`]; \n`

                        conexiones +=  `C`+temporalLetra.anterior.col+ `F`+temporalLetra.fila + ` -> ` + `C`+temporalLetra.col+`F`+temporalLetra.fila+` [dir=both];\n`;
                    }
                    if (temporalLetra.siguiente != null) {
                        conexiones +=  `C`+temporalLetra.col+ `F`+temporalLetra.fila + ` -> ` + `C`+temporalLetra.siguiente.col+`F`+temporalLetra.fila+`[dir=both]; \n`;
                    }

                    if (temporalLetra.abajo != null) {
                        
                        conexiones += `C`+temporalCol.col+`F`+temporalLetra.fila +` -> C`+temporalCol.col+`F`+(temporalLetra.abajo.fila) +` [dir=both];\n`

                    }  

                    temporalLetra = temporalLetra.abajo;
                }



                

            } else {
                
                temporalLetra = temporalCol.abajo;

                while (temporalLetra != null) {
                    if (temporalLetra.letra!= null) {
                        etiquetas += `C`+temporalCol.col+`F`+temporalLetra.fila + ` [label = <<B>`+temporalLetra.letra+`</B>> fontcolor=red group=`+temporalLetra.fila+`];\n`;
                    }

                    rankCol += `C`+temporalCol.col+`F`+temporalLetra.fila+`; `;
                   
                    var temporalFila = this.lista_vertical.busquedaFila(temporalLetra.fila);
                    
                    if (temporalLetra.anterior == null) {
                        etiquetas += `C0F`+ temporalFila.fila +`[label = "`+ temporalFila.fila +`"  group=`+temporalFila.fila+`]; \n`
                        rankFila += `C0F`+temporalFila.fila + `;`;
                        conexiones += `C0F`+temporalFila.fila + ` -> ` + `C`+temporalCol.col+`F`+temporalLetra.fila+` [dir=both];\n `;
                    } else{
                        rankFila += `C0F`+temporalFila.fila + `;`;
                        etiquetas += `C0F`+ temporalFila.fila +`[label = "`+ temporalFila.fila +`"  group=`+temporalFila.fila+`]; \n`

                        conexiones +=  `C`+temporalLetra.anterior.col+ `F`+temporalLetra.fila + ` -> ` + `C`+temporalLetra.col+`F`+temporalLetra.fila+` [dir=both];\n`;
                    }
                    if (temporalLetra.siguiente != null) {
                        conexiones +=  `C`+temporalLetra.col+ `F`+temporalLetra.fila + ` -> ` + `C`+temporalLetra.siguiente.col+`F`+temporalLetra.fila+`[dir=both]; \n`;
                    }

                    if (temporalLetra.abajo != null) {
                        
                        conexiones += `C`+temporalCol.col+`F`+temporalLetra.fila +` -> C`+temporalCol.col+`F`+(temporalLetra.abajo.fila) +` [dir=both];\n`

                    }  

                    temporalLetra = temporalLetra.abajo;
                }




            }
            
    

            
            
            conexiones += `C`+temporalCol.col +` -> C`+temporalCol.col+`F`+temporalCol.abajo.fila +` [dir=both];\n`

            ranks += rankCol + `}\n\n`;

            temporalCol = temporalCol.siguiente;
        }

        
        rankFila+=`}\n`
        codigoDot += etiquetas + conexiones + ranks + rankFila+"}"

        d3.select("#"+lienzo)
        .graphviz()
          .height(600)
          .width(800)
          .dot(codigoDot)
          .render();
        
    }


}

class IndiceMatrizOrtogonal{
    constructor(){
        this.cabeza = null
        this.ultimo = null
    }
    insertarlista(col){
        var temporal = new NodoMatriz(col, col,0);
        if(this.cabeza == null){
            this.cabeza = temporal
            this.ultimo = temporal
        }else{
            this.ultimo.siguiente = temporal
            temp = this.ultimo
            this.ultimo = temporal
        }

        var temp = this.ultimo

        for (let fila = 7; fila > 0; fila--) {
           var nuevonodo = new NodoMatriz(null,col,fila)
           var auxanterior = temp.abajo
           temp.abajo = nuevonodo
           nuevonodo.abajo = auxanterior
        }

        var temporalIndice = this.cabeza;
        while (temporalIndice.siguiente != null) {
            var temporalIndiceSiguiente = temporalIndice.siguiente

            var temporalLetra  = temporalIndice.abajo;
            var temporalLetraSiguiente  = temporalIndiceSiguiente.abajo;

                while (temporalLetra != null) {
                    temporalLetra.siguiente = temporalLetraSiguiente
                    temporalLetra = temporalLetra.abajo
                    temporalLetraSiguiente = temporalLetraSiguiente.abajo
                }
            temporalIndice = temporalIndice.siguiente;
        }
    

    }

    buscarlista(_buscar){
        var temporal = this.cabeza
        while(temporal != null){
            if(temporal.col == _buscar){
                return temporal
            }
            temporal =temporal.siguiente
        }
        return null
    }

}

class MatrizOrtogonal{
    constructor(){
        this.indice = new IndiceMatrizOrtogonal();
        for (let col = 1; col <= 7; col++) {
            this.indice.insertarlista(col); 
        }
    }

    insercionMatriz(letra, col, fila){
        var temporalCol = this.indice.buscarlista(col)
        var temporalFila = temporalCol.abajo
        while(temporalFila != null){
            if(temporalFila.fila == fila){
                temporalFila.letra = letra
                return
            }
            temporalFila = temporalFila.abajo
        }
    }

    graficar(lienzo){
        var codigoDot = `digraph G {\n label = "Apellido"\n node [shape=box]; rankdir=LR; \n `;

        var etiquetas = `\n`;
        var ranks = `\n`;
        var conexiones = `\n`;
        var temporalIndice = this.indice.cabeza;
        var temporalLetra = null;

        while (temporalIndice != null) {
            etiquetas += `C`+temporalIndice.col + ` [label = "`+temporalIndice.col +`" ];\n//hijos de `+ temporalIndice.col+`\n`;

            var rankCol = `{ rank = same; C`+temporalIndice.col + `; `;

            if (temporalIndice.siguiente != null) {
                conexiones += `C`+temporalIndice.col + ` -> C` + temporalIndice.siguiente.col + `;\n`
                
                temporalLetra = temporalIndice.abajo;

                while (temporalLetra != null) {
                    if (temporalLetra.letra== null) {
                        etiquetas += `C`+temporalIndice.col+`F`+temporalLetra.fila + ` [label = "" ];\n`;
                        
                    } else {
                        etiquetas += `C`+temporalIndice.col+`F`+temporalLetra.fila + ` [label = <<B>`+temporalLetra.letra+`</B>> fontcolor=red ];\n`;
                    }

                    rankCol += `C`+temporalIndice.col+`F`+temporalLetra.fila+`; `;

                    if (temporalIndice.siguiente != null) {
                        
                        conexiones += `C`+temporalIndice.col+`F`+temporalLetra.fila +` -> C`+temporalIndice.siguiente.col+`F`+temporalLetra.fila +`;\n`

                    } 
                    if (temporalLetra.abajo != null) {
                        
                        conexiones += `C`+temporalIndice.col+`F`+temporalLetra.fila +` -> C`+temporalIndice.col+`F`+(temporalLetra.abajo.fila) +`;\n`

                    }  

                    temporalLetra = temporalLetra.abajo;

                }




            } else {
                
                temporalLetra = temporalIndice.abajo;

                while (temporalLetra != null) {
                    if (temporalLetra.letra== null) {
                        etiquetas += `C`+temporalIndice.col+`F`+temporalLetra.fila + ` [label = "" ];\n`;
                        
                    } else {
                        etiquetas += `C`+temporalIndice.col+`F`+temporalLetra.fila + ` [label = <<B>`+temporalLetra.letra+`</B>> fontcolor=red];\n`;
                    }

                    rankCol += `C`+temporalIndice.col+`F`+temporalLetra.fila+`; `;

                    if (temporalLetra.siguiente != null) {
                        
                        conexiones += `C`+temporalIndice.col+`F`+temporalLetra.fila +` -> C`+temporalIndice.siguiente.col+`F`+temporalLetra.siguiente.fila +`;\n`

                    } 
                    if (temporalLetra.abajo != null) {
                        
                        conexiones += `C`+temporalIndice.col+`F`+temporalLetra.fila +` -> C`+temporalIndice.abajo.col+`F`+temporalLetra.abajo.fila +`;\n`

                    } 

                    temporalLetra = temporalLetra.abajo;

                }



            }

            
            conexiones += `C`+temporalIndice.col +` -> C`+temporalIndice.col+`F`+temporalIndice.abajo.fila +`;\n`

            ranks += rankCol + `}\n`;

            temporalIndice = temporalIndice.siguiente;
        }

        codigoDot += etiquetas + conexiones + ranks+"}"

        d3.select("#"+lienzo)
        .graphviz()
          .height(600)
          .width(800)
          .dot(codigoDot)
          .render();
    }

}






var matrizDispersa = new MatrizDispersa();
matrizDispersa.insertar("K",1,1)
matrizDispersa.insertar("E",2,2)
matrizDispersa.insertar("N",3,3)
matrizDispersa.insertar("E",4,4)
matrizDispersa.insertar("T",5,5)
matrizDispersa.insertar("H",6,6)
matrizDispersa.graficar("lienzo1")

var matrizOrtogonal = new MatrizOrtogonal();
matrizOrtogonal.insercionMatriz("U",1,1)
matrizOrtogonal.insercionMatriz("R",2,2)
matrizOrtogonal.insercionMatriz("R",3,3)
matrizOrtogonal.insercionMatriz("U",4,4)
matrizOrtogonal.insercionMatriz("T",5,5)
matrizOrtogonal.insercionMatriz("I",6,6)
matrizOrtogonal.insercionMatriz("A",7,7)
matrizOrtogonal.graficar("lienzo2")

