//variables
let cardBeignDragged;

function initializeApp(){
    const cards = document.querySelectorAll('.kanbanCard');
    const dropzones = document.querySelectorAll('.dropzone');
    cards.forEach(card=>{
        card.addEventListener('dragstart', dragstart);
        card.addEventListener('drag', drag);
        card.addEventListener('dragend', dragend);
    });
    dropzones.forEach(dropzone=>{
        dropzone.addEventListener('dragenter', dragenter);
        dropzone.addEventListener('dragover', dragover);
        dropzone.addEventListener('dragleave', dragleave);
        dropzone.addEventListener('drop', drop);
    });
}
initializeApp();
//cards
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
function dragenter(){

}

function dragover({target}){
    this.classList.add('over');
    cardBeignDragged = document.querySelector('.is-dragging');
    if(this.id ==="yellow"){
        cardBeignDragged.classList.remove('red');
        cardBeignDragged.classList.remove('blue');
        cardBeignDragged.classList.remove('purple');
        cardBeignDragged.classList.add('yellow');
    }
    else if(this.id ==="blue"){
        cardBeignDragged.classList.remove('yellow');
        cardBeignDragged.classList.remove('red');
        cardBeignDragged.classList.remove('purple');
        cardBeignDragged.classList.add('blue');
    }
    else if(this.id ==="purple"){
        cardBeignDragged.classList.remove('yellow');
        cardBeignDragged.classList.remove('blue');
        cardBeignDragged.classList.remove('red');
        cardBeignDragged.classList.add('purple');
    }
    else if(this.id ==="red"){
        cardBeignDragged.classList.remove('yellow');
        cardBeignDragged.classList.remove('blue');
        cardBeignDragged.classList.remove('purple');
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