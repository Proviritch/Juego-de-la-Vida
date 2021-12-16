
"use strict";
//Variables
    // Auxiliares 

let aux;

    //Matrices

let matriz = [];

let casillasVivasAlrededor = [];

let posicionCasillasVivas = [];

let numCasillasVivasAlrededor = []

let casillasMayor1 = []

    //Etiquetas html

const article = document.getElementsByTagName("article");

    //Botones

const botonAceptar = document.getElementsByTagName("input")[2];

const botonQuitar = document.getElementsByTagName("input")[3];

const botonIniciar = document.getElementsByTagName("button")[0];

const botonTerminar = document.getElementsByTagName("button")[1];

    //Campos de formulario

const input1 = document.getElementsByTagName("input")[0];

const input2 = document.getElementsByTagName("input")[1];

    //Filas y Columnas

let numFila, numColumna;



const rellenarCasillasVivasAlrededor = (numFila,numColumna) => {

    /* posicionCasillasVivas.push([numFila, numColumna]); */


    casillasVivasAlrededor.push([numFila-1, numColumna]);
    casillasVivasAlrededor.push([numFila-1, numColumna+1]);
    casillasVivasAlrededor.push([numFila-1, numColumna-1]);
    casillasVivasAlrededor.push([numFila, numColumna-1]);
    casillasVivasAlrededor.push([numFila, numColumna+1]);
    casillasVivasAlrededor.push([numFila+1, numColumna-1]);
    casillasVivasAlrededor.push([numFila+1, numColumna]);
    casillasVivasAlrededor.push([numFila+1, numColumna+1]);
    console.log(casillasVivasAlrededor);

}




//Evento para seleccionar las casillas vivas y las casillas al rededor de las vivas
botonAceptar.addEventListener("click", (e) => {
    e.preventDefault();

    numFila = Number(input1.value);
    numColumna = Number(input2.value);

    article[numFila].getElementsByTagName("div")[numColumna].classList.add("vivo");

    matriz[numFila][numColumna] = true;

    posicionCasillasVivas.push([numFila, numColumna]);

    rellenarCasillasVivasAlrededor(numFila, numColumna);
    
    //Debe repetirse
/*     posicionCasillasVivas.push([numFila, numColumna]);


    casillasVivasAlrededor.push([numFila-1, numColumna]);
    casillasVivasAlrededor.push([numFila-1, numColumna+1]);
    casillasVivasAlrededor.push([numFila-1, numColumna-1]);
    casillasVivasAlrededor.push([numFila, numColumna-1]);
    casillasVivasAlrededor.push([numFila, numColumna+1]);
    casillasVivasAlrededor.push([numFila+1, numColumna-1]);
    casillasVivasAlrededor.push([numFila+1, numColumna]);
    casillasVivasAlrededor.push([numFila+1, numColumna+1]);
    console.log(casillasVivasAlrededor); */
    

});




//Evento para quitarle la clase vivo a la casilla seleccionada
botonQuitar.addEventListener("click", (e) => {
    e.preventDefault();

    numFila = Number(input1.value);
    numColumna = Number(input2.value);

    article[numFila].getElementsByTagName("div")[numColumna].classList.remove("vivo");

    matriz[numFila][numColumna] = false;
    

    for (let h = 0; h < posicionCasillasVivas.length; h++) {
        
        if (posicionCasillasVivas[h][0] === numFila && posicionCasillasVivas[h][1] === numColumna) {
            posicionCasillasVivas.splice(h,1);
            break;
        }

    }


});



const rellenarNumCasillasVivasAlrededor = async () => {

    for (let i = 0; i < 50; i++) {

        numCasillasVivasAlrededor.push([]); 

        for (let j = 0; j < 50; j++) {
            
            numCasillasVivasAlrededor[i].push(0)

        }
    }

    return numCasillasVivasAlrededor;
}





const rellenarMatriz = () => {

    for (let i = 0; i < 50; i++) {

        matriz.push([]);
       /*  numCasillasVivasAlrededor.push([]);  */

        for (let j = 0; j < 50; j++) {
            
            matriz[i].push(false);
            /* numCasillasVivasAlrededor[i].push(0) */

        }
    }

}

rellenarMatriz();
/* rellenarNumCasillasVivasAlrededor(); */


//Debe repetirse
const contarNumCasillasVivasAlrededor = async () => {
    for (let r = 0; r < casillasVivasAlrededor.length; r++) {

        let fila = casillasVivasAlrededor[r][0];
        let columna = casillasVivasAlrededor[r][1];

        for (let p = 0; p < casillasVivasAlrededor.length; p++) {

            if (casillasVivasAlrededor[p][0] === fila && casillasVivasAlrededor[p][1] === columna) {
                ++numCasillasVivasAlrededor[fila][columna];
                break;
            }

        }
    }


    return numCasillasVivasAlrededor;
};


//Debe repetirse
const posicionCasillasMayorA1 = async () => {
    let u = -1;
    for (let s = 0; s < numCasillasVivasAlrededor.length; s++) {

        for (let a = 0; a < numCasillasVivasAlrededor.length; a++) {
            if (numCasillasVivasAlrededor[s][a] > 0) {
                ++u;
                casillasMayor1[u] = [s,a, numCasillasVivasAlrededor[s][a]];
            }
        }

    }

    console.log(casillasMayor1);
    console.log(casillasMayor1[0][0]);
    return casillasMayor1;

};




const excepcionCasillasMayorA1 = async () => {
    for (let x = 0; x < posicionCasillasVivas.length; x++) {

        let coincidencia = 0;
        let horizontal = posicionCasillasVivas[x][0];
        let vertical = posicionCasillasVivas[x][1];

        for (let w = 0; w < casillasMayor1.length; w++) {
            console.log(w);
            if (casillasMayor1[w][0] === horizontal && casillasMayor1[w][1] === vertical) {
                ++coincidencia;
                break;
            }

        }

        if (coincidencia === 0) {

            casillasMayor1.push([horizontal, vertical, 0]);
            
        }
        

    }

    return casillasMayor1;
}



//Debe repetirse
const comprobacionVivasOMuertas = async () => {

    posicionCasillasVivas = [];

    for (let y = 0; y < casillasMayor1.length; y++) {

        let row = casillasMayor1[y][0];
        let column = casillasMayor1[y][1];

        if (matriz[row][column] === false) {

            if (casillasMayor1[y][2] === 3) {

                matriz[row][column] = true;
                posicionCasillasVivas.push([row, column]);
                article[row].getElementsByTagName("div")[column].classList.add("vivo");

            } else {

                matriz[row][column] = false;
                article[row].getElementsByTagName("div")[column].classList.remove("vivo");

            }

        } else {
            
            if (casillasMayor1[y][2] < 2 || casillasMayor1[y][2] > 3) {

                matriz[row][column] = false;
                article[row].getElementsByTagName("div")[column].classList.remove("vivo");

            } else {

                matriz[row][column] = true;
                posicionCasillasVivas.push([row, column]);

            }

        }
            
    }
    return matriz;

}




const ejecutoraPrograma = () => {

    aux = setInterval(async () => {
        let resultado0 = await rellenarNumCasillasVivasAlrededor();
        let resultado = await contarNumCasillasVivasAlrededor();
        let resultado2 = await posicionCasillasMayorA1();
        let resultado3 = await excepcionCasillasMayorA1();
        let resultado4 = await comprobacionVivasOMuertas(); 
        console.log(resultado);
        console.log(resultado4);
    
        casillasVivasAlrededor = [];
    
        casillasMayor1 = [];
    
        numCasillasVivasAlrededor = [];
    
        for (let l = 0; l < posicionCasillasVivas.length; l++) {
    
            rellenarCasillasVivasAlrededor(posicionCasillasVivas[l][0], posicionCasillasVivas[l][1]);
    
        }
    }, 100);

}




botonIniciar.addEventListener("click", async () => {

    ejecutoraPrograma();

    /* setInterval(async () => {
        let resultado0 = await rellenarNumCasillasVivasAlrededor();
        let resultado = await contarNumCasillasVivasAlrededor();
        let resultado2 = await posicionCasillasMayorA1();
        let resultado3 = await comprobacionVivasOMuertas(); 
        console.log(resultado);
        console.log(resultado2);
    
        casillasVivasAlrededor = [];
    
        casillasMayor1 = [];
    
        numCasillasVivasAlrededor = [];
    
        for (let l = 0; l < posicionCasillasVivas.length; l++) {
    
            rellenarCasillasVivasAlrededor(posicionCasillasVivas[l][0], posicionCasillasVivas[l][1]);
    
        }
    }, 500); */

})


botonTerminar.addEventListener("click", () => {
    clearInterval(aux);
})


//Crea otra función que seleccione las casillas de numCasillasVivasAlrededor con un contador mayor a 1
//Y agrégalas en otro arreglo colocando además el número de esas casillas [2, 2 (-> posición), 1|2|3... (contador)]




