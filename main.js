let cuadrados = document.querySelectorAll(".box");// Busca todos los cuadrados
let show = document.getElementById("showShip");// Boton showships
let fire = document.getElementById("fire");//Boton para disparar

function creadorMatriz() {   //Crea mi matriz base
	let columna = []
	for (let h = 0; h < 9; h++) {
		let fila = [];
		for (let k = 0; k < 9; k++) {
			fila.push(0)
		}
		columna.push(fila)
	}
	return columna
};

let matriz = creadorMatriz();
//console.log(matriz.length)

function randomPosition(matriz) { //Posiciona barcos de manera aleatoria
	let nuevaMatriz = matriz;
	for (let l = 0; l < 10; l++) {
		let filaRandom = Math.floor(Math.random() * 9)
		let columnaRandom = Math.floor(Math.random() * 9)
		if (nuevaMatriz[filaRandom][columnaRandom] != 1) {
			nuevaMatriz[filaRandom][columnaRandom] = 1
		} else {
			let filaRandom = Math.floor(Math.random() * 9)
			let columnaRandom = Math.floor(Math.random() * 9)
			nuevaMatriz[filaRandom][columnaRandom] = 1
		}
	}
	return nuevaMatriz
};

let nuevaMatrizFinal = randomPosition(matriz);
//console.log(nuevaMatrizFinal)

function traductorMatriz(nuevaMatrizFinal) { // Me traduce la matriz con barcos a coordenadas xy
	let traduccion = []
	for (let i = 0; i < nuevaMatrizFinal.length; i++) {
		for (let j = 0; j < nuevaMatrizFinal[i].length; j++) {
			if (nuevaMatrizFinal[i][j] === 1) {
				let x = i + 1;
				let y = j + 1;
				traduccion.push(x + "x " + y + "y")
			}
		}
	}
	return traduccion
};

let miTraduccion = traductorMatriz(nuevaMatrizFinal);

let contador = 10;//Cantidad de oportunidades para el jugador

function colorCordenadas(e) { // Si al clickear se encuentra con un barco enemigo se vuelve rojo
	if (contador >= 1) {
		let coordenadas = e.target.id;
		//console.log(coordenadas)
		if (miTraduccion.includes(coordenadas)) {
			e.target.style.background = "red";
		} else {
			e.target.style.background = "gray";
		}
		contador--;
	}
};

function showShips(e) { // Muestra los barcos enemigos que no han sido encontrados
	for (let x of miTraduccion) {
		for(let j of cuadrados){
			if(j.id === x){
				if(j.style.background !== "red"){
					j.style.borderColor = "rgb(255, 209, 6)";
					j.style.borderWidth = "3px";
				}
			}
		}
	}
};

function fireTorpedos(e){
	let posicionTorpedo = prompt("Please enter target", "ej: 3x 2y");
	
	for(let cuadrado of cuadrados){
		if(miTraduccion.includes(posicionTorpedo)){
			if(cuadrado.id === posicionTorpedo){
				cuadrado.style.background = "red";
			}
		}else{
			if(cuadrado.id === posicionTorpedo){
				cuadrado.style.background = "gray";
			}
		}
	}
};


for (let cuadrado of cuadrados) {
	cuadrado.addEventListener("click", colorCordenadas);//Pongo a escuchar a los cuadrados
};

show.addEventListener("click", showShips); // Pongo a escuchar al boton show ships

fire.addEventListener("click", fireTorpedos)


