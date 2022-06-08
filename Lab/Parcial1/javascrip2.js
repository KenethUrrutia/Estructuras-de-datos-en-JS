
function si(k){
    A=[50  ,100 ,50 ,100 ,50 ,100 ,50];
    var prueba = false;
    while (!prueba) {
        k-=A[0];
        if (k<=0) {
            console.log("lunes")
            return
        }
        k-=A[1];
        if (k<=0) {
            console.log("mart")
            return
        }
        k-=A[2];
        if (k<=0) {
            console.log("mierc")
            return
        }
        k-=A[3];
        if (k<=0) {
            console.log("jueves")
            return
        }
        k-=A[4];
        if (k<=0) {
            console.log("viernes")
            return
        }
        k-=A[5];
        if (k<=0) {
            console.log("sabad")
            return
        }
        k-=A[6];
        if (k<=0) {
            console.log("domin")
            return
        }
    }
}

si(101010   );