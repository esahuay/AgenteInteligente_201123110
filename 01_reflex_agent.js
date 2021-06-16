// MIT License
// Copyright (c) 2020 Luis Espino

var estados = [];

function iniciacionEstados(){
	for (var i = 0; i < 8; i++)
	{
		estados.push(0);
	}
}

function cambiarEstados(lista){
	console.log("EntroCambiarEstado");
	console.log(lista);
	estado=lista[0]+lista[1]+lista[2];
	switch (estado)
	{
		case 'ADIRTYDIRTY':
			estados[0]=1;
			break;
		case 'BDIRTYDIRTY':
			estados[1]=1;
			break;
		case 'ADIRTYCLEAN':
			estados[2]=1;
			break;
		case 'BDIRTYCLEAN':
			estados[3]=1;
			break;
		case 'ACLEANDIRTY':
			estados[4]=1;
			break;
		case 'BCLEANDIRTY':
			estados[5]=1;
			break;
		case 'ACLEANCLEAN':
			estados[6]=1;
			break;
		case 'BCLEANCLEAN':
			estados[7]=1;
			break;
	}
}

function verificarEstados(){
	var i = 0;
	for (let i = 0; i < 8; i++)
	{
		var aux = false;
		var item = estados[i];
		if (item==0)
		{
			console.log("ITEM ======>"+item+" iterador "+i++ +" valido ");
			return false;
		}
	}
	console.log("ITEM ======>"+item+" iterador "+i++ +" valido ");
	return true;
}
function ensuciarProb(states){
	if (getRandomArbitrary(0,100) < 30 ){
        states[1]='DIRTY'
	}
    if (getRandomArbitrary(0,100) < 28) {
		states[2]='DIRTY'
	}
}

function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min;
}

function reflex_agent(location, state){
   	if (state=="DIRTY") return "CLEAN";
   	else if (location=="A") return "RIGHT";
   	else if (location=="B") return "LEFT";
}

async function test(states){
	iniciacionEstados();
	evaluar = verificarEstados();
	console.log("Evaluando Cambiar Estado: Evaluar: "+evaluar);
	while (!evaluar){
		cambiarEstados(states);
		var location = states[0];
		var state = states[0] == "A" ? states[1] : states[2];
		var action_result = reflex_agent(location, state);
		document.getElementById("log").innerHTML+="<br>Location: ".concat(location).concat(" | Action: ").concat(action_result);
		if (action_result == "CLEAN"){
			if (location == "A") states[1] = "CLEAN";
			else if (location == "B") states[2] = "CLEAN";
		}
		else if (action_result == "RIGHT")
		{
			states[0] = "B";
		}
		else if (action_result == "LEFT") 
		{
			states[0] = "A";
		}
		console.log("TIME-OUT");
		await sleep(3000);
		ensuciarProb(states);
		evaluar=verificarEstados();
		console.log("Evaluando Cambiar Estado: Evaluar: "+evaluar);
	}
	document.getElementById("log").innerHTML+="<br>Location: ".concat("Finalizado");
}

function sleep(ms) {
	console.log("Entro a sleep "+ms);
	return new Promise(resolve => setTimeout(resolve, ms));
}

var states = ["A","DIRTY","DIRTY"];
test(states);
