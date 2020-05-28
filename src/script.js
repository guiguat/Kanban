//variables
const cards = document.querySelectorAll('.kanbanCard');
const dropzones = document.querySelectorAll('.dropzone');
let cardBeignDragged;
//cards
cards.forEach(card=>{
    card.addEventListener('dragstart', dragstart);
    card.addEventListener('drag', drag);
    card.addEventListener('dragend', dragend);
});

function dragstart(){
    dropzones.forEach( dropzone=>dropzone.classList.add('highlight'));
    this.classList.add('is-dragging');
}

function drag(){
    
}

function dragend(){
    dropzones.forEach( dropzone=>dropzone.classList.remove('highlight'));
    this.classList.remove('is-dragging');
}

// Release cards area
dropzones.forEach(dropzone=>{
    dropzone.addEventListener('dragenter', dragenter);
    dropzone.addEventListener('dragover', dragover);
    dropzone.addEventListener('dragleave', dragleave);
    dropzone.addEventListener('drop', drop);
});

function dragenter(){

}

function dragover({target}){
    this.classList.add('over');
    cardBeignDragged = document.querySelector('.is-dragging');
    if(this.id ==="green"){
        cardBeignDragged.classList.remove('red');
        cardBeignDragged.classList.remove('blue');
        cardBeignDragged.classList.add('green');
    }
    if(this.id ==="blue"){
        cardBeignDragged.classList.remove('green');
        cardBeignDragged.classList.remove('red');
        cardBeignDragged.classList.add('blue');
    }
    if(this.id ==="red"){
        cardBeignDragged.classList.remove('green');
        cardBeignDragged.classList.remove('blue');
        cardBeignDragged.classList.add('red');
    }
    
    this.appendChild(cardBeignDragged);
}

function dragleave(){
  
    this.classList.remove('over');
}

function drop(){
    this.classList.remove('over');
}