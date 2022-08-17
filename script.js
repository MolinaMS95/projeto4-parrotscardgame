const qtd = prompt('Com quantas cartas quer jogar?');
const cartas = document.querySelector('.container');
let tamanho = cartas.children.length;
while(tamanho > qtd){
    cartas.children[tamanho-1].remove();
    tamanho = cartas.children.length;
}
const baralho = [];
for(let i = 0;i<cartas.children.length;i++){
    baralho[i] = cartas.children[i];
}
function comparador() { 
	return Math.random() - 0.5; 
}
cartas.innerHTML = '';
baralho.sort(comparador);
for(let i = 0;i<baralho.length;i++){
    cartas.insertAdjacentElement('beforeend', baralho[i]);
}