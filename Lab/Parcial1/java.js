
    a=[17, 10, 12, 7, 11];
    var aux;
        for(var i=1; i<5-1; i++)
            for(var j=4; j<5; j++)
                if (a[i]>a[j])
                {
                    aux = a[i];
                    a [i] =a [ j] ;
                    a[j]=aux;
                }
    console.log(a); // Mostramos, por consola, la lista ya ordenada
