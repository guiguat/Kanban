//variables
let cardBeignDragged;
let cards = document.querySelectorAll('.kanbanCard');
let dropzones = document.querySelectorAll('.dropzone');
let dataCards = [];

//initialize
dropzones.forEach(dropzone=>{
    dropzone.addEventListener('dragenter', dragenter);
    dropzone.addEventListener('dragover', dragover);
    dropzone.addEventListener('dragleave', dragleave);
    dropzone.addEventListener('drop', drop);
});
$(document).ready(()=>{
    
    if(JSON.parse(localStorage.getItem('@kanban:data'))){
        dataCards = JSON.parse(localStorage.getItem('@kanban:data'));
        initializeComponents(dataCards);
    }
    initializeCards();
    $('#add').click(()=>{
        const title = $('#titleInput').val()!==''?$('#titleInput').val():null;
        const description = $('#descriptionInput').val()!==''?$('#descriptionInput').val():null;
        $('#titleInput').val('');
        $('#descriptionInput').val('');
        const newCard = {
            title,
            description
        }
        dataCards.push(newCard);
        localStorage.setItem('@kanban:data', JSON.stringify(dataCards));
        appendComponents(newCard);
        initializeCards();
    });
});

//functions
function initializeCards(){
    cards = document.querySelectorAll('.kanbanCard');
    
    cards.forEach(card=>{
        card.addEventListener('dragstart', dragstart);
        card.addEventListener('drag', drag);
        card.addEventListener('dragend', dragend);
    });
}
//data
function initializeComponents(dataArray){
    
    dataArray.forEach(card=>{
        let htmlString = `
            <div class="kanbanCard yellow" draggable="true">
                <div class="content"> 
                    <h4 class="title">${card.title}</h4>
                    <p class="description">${card.description}</p>
                </div>
            </div>
        `
        $('#yellow').append(htmlString);
    })
}
function appendComponents(card){
    
    let htmlString = `
        <div class="kanbanCard yellow" draggable="true">
            <div class="content"> 
                <h4 class="title">${card.title}</h4>
                <p class="description">${card.description}</p>
            </div>
        </div>
    `
    $('#yellow').append(htmlString);

}

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