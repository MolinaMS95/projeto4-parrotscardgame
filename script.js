//quantidade de jogadas(cliques)
let clicks = 0;
//contador de segundos
let time = 0;
//embaralhador de cartas
function comparador() { 
	return Math.random() - 0.5; 
}
//montar o jogo
function setup(){
    //quantas cartas em jogo
    let qtd = prompt('Com quantas cartas quer jogar?');
    while(qtd<4 || qtd>14 || qtd%2 !== 0){
        alert('Insira um número par entre 4 e 14');
        qtd = prompt('Com quantas cartas quer jogar?');
    }
    //remove cartas até chegar ao número certo
    const cards = document.querySelector('.board');;
    let size = cards.children.length;
    while(size > qtd){
        cards.children[size-1].remove();
        size = cards.children.length;
    }
    //monta meu "baralho" com as cartas restantes
    const deck = [];
    for(let i = 0;i<cards.children.length;i++){
        deck[i] = cards.children[i];
    }
    //embaralha e insere as cartas no DOM
    cards.innerHTML = '';
    deck.sort(comparador);
    for(let i = 0;i<deck.length;i++){
        cards.insertAdjacentElement('beforeend', deck[i]);
    }
    setInterval(chronometer, 1000);
}
setup();
//virar a carta ao clicar
function turnCard(selectedCard){
    //impede que o jogador clique em carta já virada e conte jogada
    if(selectedCard.lastElementChild.classList.contains('back')){
        selectedCard.firstElementChild.classList.add('turnedFront');
        selectedCard.lastElementChild.classList.remove('back');
        selectedCard.classList.add('turned');
        clicks++;
    }
    const turnedCards = document.querySelectorAll('.turned');
    //se duas cartas estiverem viradas, conferir se são iguais e se ganhou
    if(turnedCards.length===2){
        setTimeout(unturn, 1000);
        setTimeout(win,500);
    }
    //impede que uma terceira carta vire
    else if(turnedCards.length > 2){
        selectedCard.firstElementChild.classList.remove('turnedFront');
        selectedCard.lastElementChild.classList.add('back');
        selectedCard.classList.remove('turned');
        clicks--;
    }
}
//confere se as cartas são iguais
function unturn(){
    //vetor com os gifs das cartas viradas
    const gif = document.querySelectorAll('.turned div:last-child img');
    //vetor com as cartas viradas
    const card = document.querySelectorAll('.turned');
    //se os gifs são diferentes, desvirar
    if(gif[0].className!==gif[1].className){
        card[0].firstElementChild.classList.remove('turnedFront');
        card[0].lastElementChild.classList.add('back');
        card[0].classList.remove('turned');
        card[1].firstElementChild.classList.remove('turnedFront');
        card[1].lastElementChild.classList.add('back');
        card[1].classList.remove('turned');
    }
    //se são iguais, remove o marcador da carta e ficam viradas
    else{
        card[0].classList.remove('turned');
        card[1].classList.remove('turned');
    }
}
//se todas as cartas do jogo estiverem viradsa, você ganhou
function win(){
    let unturnedCards = document.querySelector('.back');
    if(unturnedCards == null){
        alert(`Você ganhou em ${clicks} jogadas e ${time} segundos!`);
        let answer = prompt('Gostaria de jogar novamente?');
        while(answer !== 'sim' && answer !== 'não'){
            answer = prompt('Gostaria de jogar novamente?');
        }
        if(answer === 'sim'){
            location.reload();
        }
    }
}
//cronômetro
function chronometer(){
    time = time + 1;
    document.querySelector('.counter').innerHTML = time;
}