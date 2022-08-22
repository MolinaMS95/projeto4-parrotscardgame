
let clicks = 0;

let time = 0;

let idInterval;

function comparador() { 
	return Math.random() - 0.5; 
}

function setup(){
 
    let qtd = prompt('Com quantas cartas quer jogar?');
    while(qtd<4 || qtd>14 || qtd%2 !== 0){
        alert('Insira um número par entre 4 e 14');
        qtd = prompt('Com quantas cartas quer jogar?');
    }

    const cards = document.querySelector('.board');;
    let size = cards.children.length;
    while(size > qtd){
        cards.children[size-1].remove();
        size = cards.children.length;
    }
 
    const deck = [];
    for(let i = 0;i<cards.children.length;i++){
        deck[i] = cards.children[i];
    }

    cards.innerHTML = '';
    deck.sort(comparador);
    for(let i = 0;i<deck.length;i++){
        cards.insertAdjacentElement('beforeend', deck[i]);
    }
    idInterval = setInterval(chronometer, 1000);
}
setup();

function turnCard(selectedCard){
    
    if(selectedCard.lastElementChild.classList.contains('back')){
        selectedCard.firstElementChild.classList.add('turnedFront');
        selectedCard.lastElementChild.classList.remove('back');
        selectedCard.classList.add('turned');
        clicks++;
    }
    const turnedCards = document.querySelectorAll('.turned');
    
    if(turnedCards.length===2){
        setTimeout(unturn, 1000);
        setTimeout(win,500);
    }
    
    else if(turnedCards.length > 2){
        selectedCard.firstElementChild.classList.remove('turnedFront');
        selectedCard.lastElementChild.classList.add('back');
        selectedCard.classList.remove('turned');
        clicks--;
    }
}

function unturn(){
    
    const gif = document.querySelectorAll('.turned div:last-child img');
    
    const card = document.querySelectorAll('.turned');
    
    if(gif[0].className!==gif[1].className){
        card[0].firstElementChild.classList.remove('turnedFront');
        card[0].lastElementChild.classList.add('back');
        card[0].classList.remove('turned');
        card[1].firstElementChild.classList.remove('turnedFront');
        card[1].lastElementChild.classList.add('back');
        card[1].classList.remove('turned');
    }
    
    else{
        card[0].classList.remove('turned');
        card[1].classList.remove('turned');
    }
}

function win(){
    let unturnedCards = document.querySelector('.back');
    if(unturnedCards == null){
        alert(`Você ganhou em ${clicks} jogadas e ${time} segundos!`);
        clearInterval(idInterval);
        let answer = prompt('Gostaria de jogar novamente?');
        while(answer !== 'sim' && answer !== 'não'){
            answer = prompt('Gostaria de jogar novamente?');
        }
        if(answer === 'sim'){
            location.reload();
        }
    }
}

function chronometer(){
    time = time + 1;
    document.querySelector('.counter').innerHTML = time;
}