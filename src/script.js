//variables
let cardBeignDragged;
let cards = document.querySelectorAll('.kanbanCard');
let dropzones = document.querySelectorAll('.dropzone');
let dataCards = {
    config:{
        maxid:0
    },
    cards:[]
};

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
        if(title && description){
            let id = dataCards.config.maxid+1;
            const newCard = {
                id,
                title,
                description,
                position:"yellow"
            }
            dataCards.cards.push(newCard);
            dataCards.config.maxid = id;
            save();
            appendComponents(newCard);
            initializeCards();
        }
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

function initializeComponents(dataArray){
    //create all the stored cards and put inside of the todo area
    dataArray.cards.forEach(card=>{
        let htmlString = `
            <div id=${card.id.toString()} class="kanbanCard ${card.position}" draggable="true">
                <div class="content"> 
                    <h4 class="title">${card.title}</h4>
                    <p class="description">${card.description}</p>
                </div>
            </div>
        `
        if(card.position === "yellow")
            $('#yellow').append(htmlString);

        else if(card.position === "blue")
            $('#blue').append(htmlString);

        else if(card.position === "purple")
            $('#purple').append(htmlString);  

        else if(card.position === "red")
            $('#red').append(htmlString);  
    })
}

function appendComponents(card){
    //creates new card inside of the todo area
    let htmlString = `
        <div id=${card.id.toString()} class="kanbanCard yellow" draggable="true">
            <div class="content"> 
                <h4 class="title">${card.title}</h4>
                <p class="description">${card.description}</p>
            </div>
        </div>
    `
    $('#yellow').append(htmlString);

}

function save(){
    localStorage.setItem('@kanban:data', JSON.stringify(dataCards));
}

function position(cardBeignDragged, color){
    const index = dataCards.cards.findIndex(card => card.id === parseInt(cardBeignDragged.id));
    console.log(dataCards.cards[index])
    dataCards.cards[index].position = color;
    save();
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
        position(cardBeignDragged, "yellow");
        
    }
    else if(this.id ==="blue"){
        cardBeignDragged.classList.remove('yellow');
        cardBeignDragged.classList.remove('red');
        cardBeignDragged.classList.remove('purple');
        cardBeignDragged.classList.add('blue');
        position(cardBeignDragged, "blue");

    }
    else if(this.id ==="purple"){
        cardBeignDragged.classList.remove('yellow');
        cardBeignDragged.classList.remove('blue');
        cardBeignDragged.classList.remove('red');
        cardBeignDragged.classList.add('purple');
        position(cardBeignDragged, "purple");
    }
    else if(this.id ==="red"){
        cardBeignDragged.classList.remove('yellow');
        cardBeignDragged.classList.remove('blue');
        cardBeignDragged.classList.remove('purple');
        cardBeignDragged.classList.add('red');
        position(cardBeignDragged, "red");
    }
    
    this.appendChild(cardBeignDragged);
}

function dragleave(){
  
    this.classList.remove('over');
}

function drop(){
    this.classList.remove('over');
}