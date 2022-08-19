let qtd = prompt('Com quantas cartas quer jogar?');

while(qtd<4 || qtd>14 || qtd%2 !== 0){
    alert('Insira um número par entre 4 e 14');
    qtd = prompt('Com quantas cartas quer jogar?');
}

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

let jogadas = 0;
function virarCarta(cartaSelecionada){
    if(cartaSelecionada.lastElementChild.classList.contains('back')){
        cartaSelecionada.firstElementChild.classList.add('frontVirado');
        cartaSelecionada.lastElementChild.classList.remove('back');
        cartaSelecionada.classList.add('virada');
        jogadas++;
    }
    const contador = document.querySelectorAll('.virada');
    if(contador.length===2){
        setTimeout(desvirar, 1000);
        setTimeout(ganhar,500);
    }
    else if(contador.length > 2){
        cartaSelecionada.firstElementChild.classList.remove('frontVirado');
        cartaSelecionada.lastElementChild.classList.add('back');
        cartaSelecionada.classList.remove('virada');
        jogadas--;
    }
}

    function desvirar(){
        const gif = document.querySelectorAll('.virada div:last-child img');
        const carta = document.querySelectorAll('.virada');
        if(gif[0].className!==gif[1].className){
            carta[0].firstElementChild.classList.remove('frontVirado');
            carta[0].lastElementChild.classList.add('back');
            carta[0].classList.remove('virada');
            carta[1].firstElementChild.classList.remove('frontVirado');
            carta[1].lastElementChild.classList.add('back');
            carta[1].classList.remove('virada');
        }
        else{
            carta[0].classList.remove('virada');
            carta[1].classList.remove('virada');
        }
    }
    
    function ganhar(){
    let cartasViradas = document.querySelector('.back');
    if(cartasViradas == null){
        alert(`Você ganhou em ${jogadas} jogadas!`);
    }
}